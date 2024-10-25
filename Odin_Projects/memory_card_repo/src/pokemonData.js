// function getPokemon() {
//     return fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
//         .then(response => {
//             console.log('response', response)
//             return response.json()
//         }) //initial fetch of response get it as json
//         .then(data => {

//             //iterate through all the array object items in data.results
//             //for each object item use its url to make a fetch for the image
//             //then get the json of the image response obj
//             //then get the prop needed for image
//             //so all of these will be objects of names and images
//             //then use promise.all on this array of objs

//             const promises = data.results.map(pokemonObj => {

//                 const { name, url } = pokemonObj;

//                 return fetch(url)
//                     .then(response => {

//                         return response.json()
//                     })
//                     .then(pokemonData => {

//                         const image = pokemonData.sprites.front_default;
//                         .then(pokemons => {

//                             //then do what you want here
//                             console.log('poke data', pokemons, pokemons.length);
//                             // do a pokemon.foreach to use name to get the abilities

//                             // rray of Pokemon objects

//                             pokemons.map(async(pokemon) => {

//                                 let split = pokemon.image.split('/');

//                                 const id = split[split.length - 1].substring(0, 2);
//                                 console.log('each pokemon id', id)

//                                 return fetch(`https://pokeapi.co/api/v2/characteristic/${id}`)
//                                     .then(res => {

//                                         if (res.ok) {
//                                             return res.json()
//                                         } else {
//                                             throw new Error('Failed to fetch Pokémon data');
//                                         }

//                                     })
//                                     .then(data => {
//                                         console.log('Characteristic data:', data.descriptions[7].description);


//                                         const desc = data.descriptions[7].description;
//                                         return {...pokemon, description: desc }


//                                     })
//                                     .catch(error => {
//                                         console.error('Error fetching characteristic data:', error);
//                                         return {...pokemon, description: 'no description available' }
//                                     })




//                                 // if (fetchedChars.ok) {
//                                 //     let chars = await fetchedChars.json();
//                                 //     const desc = chars.descriptions[7].description
//                                 //     pokemon.description = desc;
//                                 //     console.log('pokemon', pokemon)
//                                 // } else {
//                                 //     pokemon.description = "no description";
//                                 // }





//                             })
//                             console.log('this poke', pokemons)
//                             return pokemons; // Return the a
//                         })

//                         //
//                     });
//             });

//             return Promise.all(promises); // Wait for all inner fetches to complete
//         })

//         .catch(error => {
//             console.error('Error fetching Pokémon:', error);
//             return []; // Return an empty array in case of error
//         });
// }

// export default getPokemon;



function getPokemon() {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=100') //fetch pokemon list of pokemon
        .then(response => {
            if (!response.ok) {
                throw new Error('failed to fetch')
            }
            return response.json()
        })
        .then(data => {
            const promises = data.results.map(pokemonObj => { //for each pokemon obj in pokemon list
                const { name, url } = pokemonObj;
                return fetch(url) // use url to  to fetch image
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('failed to get poke details for image')
                        }
                        return response.json()
                    })
                    .then(pokemonData => {
                        const image = pokemonData.sprites.front_default;
                        const id = pokemonData.id;
                        //use id from imageobj to fetch description
                        return fetch(`https://pokeapi.co/api/v2/characteristic/${id}`) //fetch description
                            .then(res => {
                                if (res.ok) {
                                    return res.json();
                                } else {
                                    throw new Error('failed to get description data')
                                }
                            })
                            .then(charData => { //desc obj
                                const desc = charData.descriptions[7].description;
                                return { name, image, description: desc };
                            })
                            .catch(error => {
                                console.error('err fetching description data')
                                return { name, image, description: 'no desc available' };
                            })
                    })
                    .catch(err => {
                        console.error('err fetching poke details', error)
                        return { name, image, description: 'no desc available' };
                    })
            })
            return Promise.all(promises);
        })
        .then(pokemons => {
            console.log('pokemons with descriptions: ', pokemons);
            return pokemons;

        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            return [];
        })
}

export default getPokemon;