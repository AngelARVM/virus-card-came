import { Player } from "./player";
import { User } from "./user";

export class Lobby {
  private _players: Array<Player> = [];
  private maxPlayers: number = 8
  private playersCount: number = 0;
  
  constructor(user: User){
    this._players.push(new Player(user));
    this.playersCount++;
  }
  
  get players(): Array<Player> {
    return this._players;
  }

  set addPlayer(user: User){
    if (this.players.length < this.maxPlayers) {
      this.players.push(new Player(user));
      this.playersCount++;
    }
  }

  set removePlayer(user: User){
    this._players = this.players.filter(player => player.user.id !== user.id);
    this.playersCount--;
  }
}