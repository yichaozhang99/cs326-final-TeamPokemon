/**@typedef pokemonEntry An entry stored in the database with information to be displayed on the frontend
 * @property {string} imageUrl Url link to image for pokemon
 * @property {string[]} type Array of the pokemon's type(s)
 * @property {string} name The pokemon's name
 * @property {string[]} location Locations (In gen 1 only) where the pokemon can be found
 * @property {string[]} abilities The pokemon's abilities (not neccesarily only gen 1 at the moment)
 * @property {string[]} evolutionLine The pokemon's eveloution line (only lists gen 1 eveloutions)
 * @property {string[]} enemies List of pokemon by name who have an advantageous type against this pokemon
 */
const database=require('./database.js');
const express=require('express');
const fetch=require('node-fetch');
const bodyParser=require('body-parser');
const path=require('path');
const app = express();
const port = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve() + '/client'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


//The Get/Post Request Declarations
app.get('/getHistory', async (req, res) => {
  res.send(await database.getRecents());
});

app.post('/getInfo', getInfo);

app.post('/debugGetEntry', async (req, res) => {
  res.send(await getPokemonEntry(req.body.pokemonName));
});

//Page Navigation
app.get('/', async (req, res) => {
  res.sendFile('client/index.html', { root: path.resolve() });
});

app.get('/recruits', async (req, res) => {
  res.sendFile('client/recruits.html', { root: path.resolve() });
});

app.get('/dashboard', async (req, res) => {
  const pokemon = req.query.pokemon;
  if (pokemon === undefined) {
    res.send({ error: 'must specify url parameter \'pokemon\'' });
  }
  res.sendFile('client/dashboard.html', { root: path.resolve() });
});

/**Takes a post request to /getInfo and returns the correct respose (adding to the database as neccesary)
 * @param {object} req Request Info
 * @param {object} res Result output
 */
async function getInfo(req, res) {
  if (req.body.pokemonName === undefined) {
    res.send({ error: 'pokemonName must be set to the desired pokemon\'s name in the body' });
  }
  const lowercase=req.body.pokemonName.toLowerCase();
  const info = await database.getPokemon(lowercase);
  if (info === null) {
    const newInfo = await getPokemonEntry(req.body.pokemonName);
    if (newInfo.error !== undefined) {
      res.send(newInfo);
    } else {
      const added = await database.addPokemon(newInfo);
      if (!added) {
        res.send({ error: 'An error occured adding ' + req.body.pokemonName + '\'s data to the database' });
      } else {
        res.send(await database.getPokemon(req.body.pokemonName));
      }
    }
  } else {
    res.send(info);
  }
}

/**Returns a Promise for the data at the specified url
 * Note: Returns Promise not data at Promise
 *  (Returns promises and not results so they can be used in Promise.all)
 * @param {string} url The link whose data will be fetched
 * @returns {Promise<any>} Json form of the output of the fetch request
 */
async function doFetch(url) {
  return fetch(url)
    .then(x => x.json())
    .catch(x => console.log('Error on link: ' + url, x));
}

/** Gets information on a pokemon from the generation 1 games
 * @param {string} name Name of Pokemon being found
 * @returns {Promise<pokemonEntry|{error:string}>} The details of the found pokemon
 */
async function getPokemonEntry(name) {
  //General Info Retreival
  const normalInfo = await doFetch('https://pokeapi.co/api/v2/pokemon/' + name);
  //Error Messages As Neccesary
  if (normalInfo === undefined) {
    return { error: "pokemon name: " + name + ' not valid' };
  }
  if (normalInfo.id > 151) {
    return { error: "pokemon name: " + name + ' is not a gen 1 pokemon' };
  }
  //Gen 1 Location Retrieval
  const allLocations = await doFetch(normalInfo.location_area_encounters);
  const gen1Locations = allLocations
    .filter((x) => x.version_details
      .reduce((a, e) => a || e.version.name === 'blue' || e.version.name === 'red', false))
    .map(x => x.location_area.url);
  const locationInfo = await Promise.all(gen1Locations.map(x => doFetch(x)));
  const locationNames = locationInfo
    .map(x => x.location.name)
    .reduce((a, e) => a.includes(e) ? a : a.concat(e), []);
  //Evolution chain retrievel
  const species = await doFetch(normalInfo.species.url);
  let evolutionChain = await doFetch(species.evolution_chain.url);
  const chain = [];
  do {
    evolutionChain = chain.length ? evolutionChain[0] : evolutionChain.chain;
    chain.push(evolutionChain.species);
    evolutionChain = evolutionChain.evolves_to;
  } while (evolutionChain.length);
  const gen1Chain = chain
    .filter(x => parseInt(x.url.substring(42, x.url.length - 1)) <= 151)
    .map(x => x.name);
  //Enemy List Retrieval
  const typeInfos = await Promise.all(normalInfo.types.map(x => doFetch(x.type.url)));
  const advantageousTypes = await Promise.all(typeInfos
    .reduce((a, e) => a.concat(e.damage_relations.double_damage_from
      .map(x => doFetch(x.url))), []));
  const enemyList =(await advantageousTypes)
    .filter(x => !['dark', 'steel', 'fairy'].includes(x.name))
    .reduce((a, e) => a.concat(e.pokemon
      .filter(x => parseInt(x.pokemon.url.substring(34, x.pokemon.url.length - 1)) <= 151)), [])
    .map(x => x.pokemon.name);
  //Return Object with correct formatting
  return {
    imageUrl: normalInfo.sprites.other['official-artwork'].front_default,
    type: normalInfo.types.reduce((a, e) => a.concat(e.type.name), []),
    name: normalInfo.name,
    location: locationNames,
    abilities: normalInfo.abilities.map(ability => ability.ability.name),
    evolutionLine: gen1Chain,
    enemies: enemyList
  };
}
