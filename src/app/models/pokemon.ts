export class Pokemon {
    // La infromació general s'obté de: https://pokeapi.co/api/v2/pokemon/1/
    //Informació bàsica
    private _id: number;
    private _name: string;
    private _species: string; // Altres aspectes s'obtenen a través de l'espècie: https://pokeapi.co/api/v2/pokemon-species/1/
    private _types: string[];
    private _height: number;
    private _weight: number;
    private _imgURL: string; // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png
    
    // Característiques de combat
    private _hp: number;
    private _attack: number;
    private _defense: number;
    private _specialAttack: number;
    private _specialDefense: number;
    private _speed: number;
    private _abilities: string[];

    // Altres dades
    private _captureRate: number; // species
    private _evolutionChain: string; // species // Les evolucions les treiem de: https://pokeapi.co/api/v2/evolution-chain/1/
    private _evolutions: number[];

    // Els llocs on es troba https://pokeapi.co/api/v2/pokemon/1/encounters

    constructor() {
        this._id = 0;
        this._name = "";
        this._species = "";
        this._types = [];
        this._height = 0;
        this._weight = 0;
        this._imgURL = "";
        this._hp = 0;
        this._attack = 0;
        this._defense = 0;
        this._specialAttack = 0;
        this._specialDefense = 0;
        this._speed = 0;
        this._abilities = [];
        this._captureRate = 0;
        this._evolutionChain = "";
        this._evolutions = [];
    }


    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get species(): string {
        return this._species;
    }
    get types(): string[] {
        return this._types;
    }
    get height(): number {
        return this._height;
    }
    get weight(): number {
        return this._weight;
    }
    get imgURL(): string {
        return this._imgURL;
    }
    get hp(): number {
        return this._hp;
    }
    get attack(): number {
        return this._attack;
    }
    get defense(): number {
        return this._defense;
    }
    get specialAttack(): number {
        return this._specialAttack;
    }
    get specialDefense(): number {
        return this._specialDefense;
    }
    get speed(): number {
        return this._speed;
    }
    get abilities(): string[] {
        return this._abilities;
    }
    get captureRate(): number {
        return this._captureRate;
    }
    get evolutionChain(): string {
        return this._evolutionChain;
    }
    get evolutions(): number[] {
        return this._evolutions;
    }


    set id(value: number) {
        this._id = value;
    }
    set name(value: string) {
        this._name = value;
    }
    set species(value: string) {
        this._species = value;
    }
    set types(value: string[]) {
        this._types = value;
    }
    set height(value: number) {
        this._height = value;
    }
    set weight(value: number) {
        this._weight = value;
    }
    set imgURL(value: string) {
        this._imgURL = value;
    }
    set hp(value: number) {
        this._hp = value;
    }
    set attack(value: number) {
        this._attack = value;
    }
    set defense(value: number) {
        this._defense = value;
    }
    set specialAttack(value: number) {
        this._specialAttack = value;
    }
    set specialDefense(value: number) {
        this._specialDefense = value;
    }
    set speed(value: number) {
        this._speed = value;
    }
    set abilities(value: string[]) {
        this._abilities = value; 
    }
    set captureRate(value: number) {
        this._captureRate = value;
    }
    set evolutionChain(value: string) {
        this._evolutionChain = value;
    }
    set evolutions(value: number[]) {
        this._evolutions = value;
    }
}
