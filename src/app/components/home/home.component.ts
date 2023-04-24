import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { NBAService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  teams: Team[] = [];

  selectedTeam!: Team;

  constructor(public nbaService: NBAService) { }

  ngOnInit(): void {
    this.getAllTeams();
  }

  getAllTeams(){
    this.nbaService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  onSelect(team: Team) {
    // Rufe die Spiele für das ausgewählte Team auf
    this.nbaService.getGames(team.teamId).subscribe(games => {
      const teamIndex = this.nbaService.teams.findIndex(t => t.teamId === team.teamId);
      if (teamIndex >= 0) {
        // Aktualisiere das vorhandene Team-Objekt
        this.nbaService.teams[teamIndex].games = games;
      } else {
        // Füge das Team mit den Spielen zur Liste hinzu
        this.nbaService.teams.push({
          teamId: team.teamId,
          abbreviation: team.abbreviation,
          full_name: team.full_name,
          imageURL: team.imageURL,
          conference: team.conference,
          games: games
        });
      }
    });
  }









}
