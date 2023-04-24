import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../models/team';
import { Game } from '../models/game';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NBAService {
  public teams: Team[] = [];
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'free-nba.p.rapidapi.com')
      .set('x-rapidapi-key', this.apiKey);

    const teamsUrl = `${this.apiUrl}/teams`;
    return this.http.get(teamsUrl, { headers })
      .pipe(
        map((response: any) => {
          const teams: Team[] = response.data.map((teamData: any) => {
            const team: Team = {
              teamId: teamData.id,
              abbreviation: teamData.abbreviation,
              full_name: teamData.full_name,
              imageURL: `https://interstate21.com/nba-logos/${teamData.abbreviation}.png`,
              conference: teamData.conference,
              games: []
            };
            return team;
          });
          return teams;
        })
      );
  }


  getGames(teamId: number): Observable<Game[]> {
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'free-nba.p.rapidapi.com')
      .set('x-rapidapi-key', this.apiKey);

    const today = new Date();
    const dates = [];

    // Füge die Daten der letzten 12 Tage hinzu
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      dates.push(dateString);
    }

    const gamesUrl = `${this.apiUrl}/games?per_page=100&team_ids[]=${teamId}&dates[]=${dates.join('&dates[]=')}`;
    return this.http.get(gamesUrl, { headers })
      .pipe(
        map((response: any) => {
          const games: Game[] = response.data
            .filter((gameData: any) => gameData.visitor_team_score > 0 && gameData.home_team_score > 0)
            .map((gameData: any) => {
              const game: Game = {
                home_team_score: gameData.home_team_score,
                visitor_team_score: gameData.visitor_team_score,
                visitor_team_abbreviation: gameData.visitor_team.abbreviation,
                home_team_abbreviation: gameData.home_team.abbreviation
              };
              return game;
            });
          return games;
        })
      );
  }
}
