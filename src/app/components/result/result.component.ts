import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { NBAService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  team: Team = {
    teamId: 0,
    abbreviation: "",
    full_name: "",
    imageURL: "",
    conference: "",
    games: []
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nbaService: NBAService
  ) { }

  ngOnInit() {    
    this.route.paramMap.subscribe(paramMap =>{
      if(paramMap.has('teamCode')){
        const teamId= +paramMap.get('teamCode')!.slice();
        console.log(teamId);
        const i = this.nbaService.teams.findIndex(t => t.teamId === teamId); 
        console.log(i);
        if(i!=-1){
          this.team = this.nbaService.teams[i];
        }else{
          this.router.navigateByUrl('/home');
        }

      }else{
        this.router.navigateByUrl('/home');
      }
    })
  }

}
