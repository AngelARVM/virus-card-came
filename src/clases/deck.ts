import { ColorCatalog, TypeCatalog } from "../types/catalogs";
import shuffle from "../utils/shuffle";
import { Card } from "./card";

export class Deck {
  list: Array<Card> = [];
  private organsCount: number = 5;
  private virusCount: number = 4;
  private medicineCount: number = 4;
  private  colors: ColorCatalog[] = [ColorCatalog.RED, ColorCatalog.BLUE, ColorCatalog.GREEN, ColorCatalog.YELLOW]
  
  constructor(){
    this.list = this.generateDeck();
  }

  private generateDeck(): Array<Card>{
    let deck:Array<Card> = [];
    this.colors.forEach(color => {
      deck.push(...this.generateOrgans(color, this.organsCount));
      deck.push(...this.generateVirus(color, this.virusCount));
      deck.push(...this.generateMedicine(color, this.medicineCount));
    })
    return this.shuffle(deck);
  }

  pickCard(): Card {
    return this.list.pop() as Card;
  }

  get cardsLeft() {
    return this.list;
  }

  private generateOrgans(color: ColorCatalog, count: number): Array<Card> {
    let cards:Array<Card> = [];
    if (color === ColorCatalog.RAINBOW) {
      cards.push(new Card(TypeCatalog.ORGAN, color));
    } else {
      for (let i = 0; i < count; i++) {
        cards.push(new Card(TypeCatalog.ORGAN, color as ColorCatalog));
      }
    }
    return cards;
  }

  private generateVirus(color: ColorCatalog, count: number): Array<Card> {
    let cards:Array<Card> = [];
    if (color === ColorCatalog.RAINBOW) {
      cards.push(new Card(TypeCatalog.VIRUS, color));
    } else {
      for (let i = 0; i < count; i++) {
        cards.push(new Card(TypeCatalog.VIRUS, color));
      }
    }
    return cards;
  }

  private generateMedicine(color: ColorCatalog, count: number): Array<Card> {
    let cards:Array<Card> = [];
    if (color === ColorCatalog.RAINBOW) {
      cards.push(new Card(TypeCatalog.MEDICINE, color));
    } else {
      for (let i = 0; i < count; i++) {
        cards.push(new Card(TypeCatalog.MEDICINE, color as ColorCatalog));
      }
    }
    return cards;
  }

  /** Fisher-Yates */
  protected shuffle(deck: Array<Card>): Array<Card>{
    return shuffle(deck);
  }
}