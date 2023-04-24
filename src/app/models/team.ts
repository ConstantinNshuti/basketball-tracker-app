import { Game } from "./game";

export interface Team {
    teamId: number;
    abbreviation: string;
    full_name: string;
    imageURL: string;//https://interstate21.com/nba-logos/'abbreviation'.png
    conference: string; //jedes Mal conference dahinter hinzufügen
    games: Game[];
}
