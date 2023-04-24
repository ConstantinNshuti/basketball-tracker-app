import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Team } from 'src/app/models/team';
import { NBAService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input()
  team!: Team;
  avgScored: number=0;
  avgConceded: number=0;
  wonLost: boolean [] = [];


  constructor(private nbaService: NBAService, public router: Router) {

   }

  ngOnInit(): void {
    this.completeInformationen();
  }

  deleteTeam(teamId: number): void {
    const index = this.nbaService.teams.findIndex(t => t.teamId === teamId);
    if (index !== -1) {
      this.nbaService.teams.splice(index, 1);
    }
  }

  getWinner(game: Game): string {
    if (game.home_team_score > game.visitor_team_score) {
      return game.home_team_abbreviation;
    } else {
      return game.visitor_team_abbreviation;
    }
  }

  completeInformationen(){
    let abbreviation:string= this.team.abbreviation;
    let games: Game[]= this.team.games;
    let nWinn= 0;
    let summeWinn =0;
    let nLost =0;
    let summeLost =0;
    games.forEach((game)=>{
      if(abbreviation==this.getWinner(game)){
        ++nWinn;
        this.wonLost.push(true);
        if(abbreviation==game.home_team_abbreviation){
          summeWinn += game.home_team_score ;
        }else{
          summeWinn += game.visitor_team_score;
        }
      }else{
        ++nLost;
        this.wonLost.push(false);
        if(abbreviation==game.home_team_abbreviation){
          summeLost += game.home_team_score ;
        }else{
          summeLost += game.visitor_team_score;
        }
      }
    });
    this.avgScored = +(summeWinn/nWinn);
    this.avgConceded = +(summeLost/nLost);
  }

}
