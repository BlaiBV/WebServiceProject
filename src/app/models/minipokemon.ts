export class Minipokemon {
    // La infromació general s'obté de: https://pokeapi.co/api/v2/pokemon/1/
    //Informació bàsica
    private _id: number;
    private _name: string;
    private _url: string;
    private _imgURL: string; // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png
 

    constructor() {
        this._id = 0;
        this._name = "";
        this._url = "";
        this._imgURL = "";
    }


    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get imgURL(): string {
        return this._imgURL;
    }
    get url(): string {
        return this._url;
    }


    set id(value: number) {
        this._id = value;
    }
    set name(value: string) {
        this._name = value;
    }
    set imgURL(value: string) {
        this._imgURL = value;
    }
    set url(value: string) {
        this._url = value;
    }
}
