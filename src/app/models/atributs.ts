export interface Atributs {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    is_default: boolean,
    order: number,
    weight: number,
    abilities: [
        {
            is_hidden: boolean,
            slot: number,
            ability: {
                name: string,
                url: string
            }
        }
    ],
    forms: [
        {
            name: string,
            url: string
        }
    ],
    game_indices: [
        {
            game_index: number,
            version: {
                name: string,
                url: string
            }
        }
    ],
    held_items: [
        {
            item: {
                name: string,
                url: string
            },
            version_details: [
                {
                    rarity: number,
                    version: {
                        name: string,
                        url: string
                    }
                }
            ]
        }
    ],
    location_area_encounters: string,
    moves: [
        {
            move: {
                name: string,
                url: string
            },
            version_group_details: [
                {
                    level_learned_at: number,
                    version_group: {
                        name: string,
                        url: string
                    },
                    move_learn_method: {
                        name: string,
                        url: string
                    }
                }
            ]
        }
    ],
    species: {
        name: string,
        url: string
    },
    sprites: {
        /*back_default: string,
        back_female: null,
        back_shiny: string,
        back_shiny_female: null,*/
        front_default: string,
       /*front_female: null,
        front_shiny: string,
        front_shiny_female: null,*/
        other: {
            /*dream_world: {
                front_default: string,
                front_female: null
            },*/
            home: {
                front_default: string,
                front_female: null,
                front_shiny: string,
                front_shiny_female: null
            },
            /*showdown: {
                back_default: string,
                back_female: null,
                back_shiny: string,
                back_shiny_female: null,
                front_default: string,
                front_female: null,
                front_shiny: string,
                front_shiny_female: null
            }*/
        },
        /*versions: {
            generation_i: {
                red_blue: {
                    back_default: string,
                    back_gray: string,
                    front_default: string,
                    front_gray: string
                },
                yellow: {
                    back_default: string,
                    back_gray: string,
                    front_default: string,
                    front_gray: string
                }
            },
            generation_ii: {
                crystal: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                },
                gold: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                },
                silver: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                }
            },
            generation_iii: {
                emerald: {
                    front_default: string,
                    front_shiny: string
                },
                firered_leafgreen: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                },
                ruby_sapphire: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                }
            },
            generation_iv: {
                diamond_pearl: {
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                },
                heartgold_soulsilver: {
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                },
                platinum: {
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            generation_v: {
                black_white: {
                    animated: {
                        back_default: string,
                        back_female: string,
                        back_shiny: string,
                        back_shiny_female: string,
                        front_default: string,
                        front_female: string,
                        front_shiny: string,
                        front_shiny_female: string
                    },
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            generation_vi: {
                omegaruby_alphasapphire: {
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                },
                x_y: {
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            generation_vii: {
                icons: {
                    front_default: string,
                    front_female: string
                },
                ultra_sun_ultra_moon: {
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            generation_viii: {
                icons: {
                    front_default: string,
                    front_female: string
                }
            }
        }*/
    },
    cries: {
        latest: string,
        legacy: string
    },
    stats: [
        {
            base_stat: number,
            effort: number,
            stat: {
                name: string,
                url: string
            }
        }
    ],
    types: [
        {
            slot: number,
            type: {
                name: string,
                url: string
            }
        }
    ],
    past_types: [
        {
            generation: {
                name: string,
                url: string
            },
            types: [
                {
                    slot: number,
                    type: {
                        name: string,
                        url: string
                    }
                }
            ]
        }
    ]

}
