import { nanoid } from "nanoid";
import { ColorCatalog, TypeCatalog } from "../types/catalogs";


export class Card {
  id: string
  type: TypeCatalog;
  color: ColorCatalog;
  imgDir: string = '';

  constructor(
    type:TypeCatalog,
    color:ColorCatalog,
  ){
    this.color = color;
    this.type = type;
    this.id = nanoid();
    this.imgDir = this.getImgDir(type, color);
  }

  private getImgDir(type: TypeCatalog, color:ColorCatalog ): string {
    return `./img/card/${color}_${type}.png`
  }
}

