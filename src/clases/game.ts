import { TypeCatalog } from "../types/catalogs";
import shuffle from "../utils/shuffle";
import { Card } from "./card";
import { Deck } from "./deck";
import { Player } from "./player";
import { User } from "./user";

export class Game {
  private _players: Array<Player>;
  private _currentPlayer: Player;
  private _deck: Deck;
  private round = 0;
  private initialHandSize = 3;

  constructor(players: User[]) {
    this._players = shuffle(players.map(user => new Player(user)));
    this._currentPlayer = this._players[0];
    this._deck = new Deck();

    this.start();
  }

  get cardsLeft(): Array<Card> {
    return this._deck.list
  }

  get players(): Array<Partial<Player>> {
    const formatedPlayers = this._players.map(player => {
      return {
        name: player.user.name,
        user: player.user,
        cardsInHand: player.cardsInHand.map((card: Card): Card => {
          return {
            ...card,
            imgDir: './img/card/card_back.png'
          } as Card
        }),
        laydown: player.laydown,
      }
    })
    return formatedPlayers
  }

   endTurn(): void{
    const winCondition = this.checkWinCondition();
    if (winCondition) {
      alert(this.currentPlayer.user.name + " wins!")
      return;
    }
    
    this.nextTurn();

    const isNewRound = this._players.indexOf(this._currentPlayer) === 0;

    if (isNewRound) {
      this.round++;
    }
  }

  

  dealCard(player: Player): void {
    const pickedCard = this._deck.pickCard();
    player.addCardToHand = pickedCard;
  }  

  get currentPlayer() {
    return this._currentPlayer;
  }

  private nextTurn() {
    const currentPlayerIndex = this._players.indexOf(this._currentPlayer);
    this._currentPlayer = this._players[(currentPlayerIndex + 1) % this._players.length];
  }

  private start() {
    this._players.forEach(player => {
      for (let i = 0; i < this.initialHandSize; i++) {
        this.dealCard(player);
      }
    });
  }

  private checkWinCondition() {
    const laydown = this.currentPlayer.laydown
    const points = laydown.reduce((acc: Record<string, number>, card) => {
      if (card.type === TypeCatalog.VIRUS) acc[card.color]++
      else acc[card.color]++
      return acc
    }, {
      red: 0,
      blue: 0,
      green: 0,
      yellow: 0,
    })

    if (Object.values(points).every(val => val >= 1)) return true

    return false
  }
}