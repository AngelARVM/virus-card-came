import { nanoid } from "nanoid";

export class User {
  protected _id: string = nanoid()
  protected _name: string
  protected _logoDir: string

  constructor(name: string, logo: string){
    this._name = name;
    this._logoDir = `./img/avatar/${logo}.png`;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get logoDir(): string {
    return this._logoDir;
  }

  set setLogoDir(logo: string){
    this._logoDir = logo;
  }
}