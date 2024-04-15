import { Minipokemon } from "./minipokemon";

export class Pokedex {

   public  _descriptions: any;
   public  _id:	number;
   public  _is_main_series:	boolean;
   public  _name: string;
   public  _names: any;
   public  _pokemon_entries: Minipokemon[];
   public  _region: string | null;
   public  _version_groups:	any;
   
   constructor() {
       //this._descriptions = 0;
       this._id = 0;
       this._is_main_series = true;
       this._name = "";
       // this._names = "";
       this._pokemon_entries =[];
       this._region = null;
       // this._version_groups = "";
    }


}
    