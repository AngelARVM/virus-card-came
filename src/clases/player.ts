import { Card } from "./card";
import { User } from "./user";

export class Player {
  user: User
  private _hand: Array<Card> = [];
  private _laydown: Array<Card> = [];

  constructor (user: User){
    this.user = user;
  }

  // add virus logic here
  move(card: Card){
    this._laydown.push(card);
    this._hand = this._hand.filter(handCard => handCard.id !== card.id)
  }

  play(card: Card){
    this._laydown.push(card);
    this._hand = this._hand.filter(handCard => handCard.id !== card.id)
  }

  set addCardToHand(card: Card){
    this._hand.push(card);
  }
  
  get cardsInHand(): Array<Card> {
    return this._hand;
  }

  get laydown(): Array<Card> {
    return this._laydown;
  }
}