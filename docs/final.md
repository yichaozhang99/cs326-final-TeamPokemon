**Title:** Team Pokemon

**Subtitle:** Pokemon Strategy Tool

**Semester:** Fall 2020

**Overview:** Our application is a tool that can be used in association with the popular early generation video game of Pokemon. The goal of this video game is to collect various “animals” with special and unique abilities in order to eventually build the strongest team. The strategic element of the game comes from the elements and “types” that each Pokemon possesses. There is a creative setup of some types being strong against other types and vice versa. Our strategy tool provides the user a simple yet effective experience in determining what Pokemon they should capture in order to defeat an enemy they are facing. It does this by identifying the searched Pokémon’s weaknesses and giving suggestions based on Pokemon who have the same type as the other Pokémon’s weakness. We also provide a tab which keeps track of past searches and potential recruits so that the user can easily go back and locate previous searches and keep track of the Pokemon he/she would like to capture. Lastly, the dashboard which shows the weaknesses of the specified pokemon also displays other information including name, type, abilities, location, weaknesses, and evolutions which could prove useful for the user in some way.


**Team Members:** Ryan Coulter (RyanHCoulter), Jakob Falus (MiniShark27), Yichao Zhang (yichaozhang99)


**User Interface:**
<img src="https://github.com/RyanHCoulter/cs326-final-TeamPokemon/blob/main/docs/geodude.png"/>

This image is the main page where the client will type in the pokemon they are looking to find. Once they search it will create the pokemon in our database which will be later grabbed when opening the history page. In addition, it will open the dash for that pokemon.

<img src="https://github.com/RyanHCoulter/cs326-final-TeamPokemon/blob/main/docs/geodude_dash.png"/>

This is the geodude dashboard that will load. It will have a variety of characteristics listed on the side as well as recruits which are good pokemon to defeat it. Each recruit will have the option to click it which will save that pokemon to the database for later view in the history as well as open up the dash for the pokemon. 

<img src="https://github.com/RyanHCoulter/cs326-final-TeamPokemon/blob/main/docs/mankey.png"/>

For example, if mankey was clicked, this would load and the mankey dash and have the same options as before with geodude but now with mankey. 

<img src="https://github.com/RyanHCoulter/cs326-final-TeamPokemon/blob/main/docs/history-tab.png"/>

This is the history page which pulls the previous pokemon that have been viewed and displays them in a table with a brief overlay of the information from the dash as well as the option to open the dash again. 


**APIs:**

POST /getInfo
body: {pokemonName: string}
=> Promise<pokemonEntry|{error:string}>
  
  
GET /getHistory
 => Promise(<pokemonEntry[]>)
 
 
POST /debugGetEntry (For Testing since it doesn’t add data to the database)
body: {pokemonName: string}
=> Promise<pokemonEntry|{error:string}>


GET /
	=> index.html
  
  
GET /recuits
=> Recruits.html


GET /dashboard
=> dashboard.html

We created the ability to Update and Delete, but do not find them necessary for the purposes of our application.


**Database:** 

| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| imageURL | String    | The URL to get the pokemon image  |
| type | String   | The pokemons type (fire, water, ground, etc) \* |
| name  | String    | The name of the pokemon **PRIMARY KEY**  |
| location | String   | Where to find the pokemon. \* |
| abilities  | String    | List of abilities the pokemon can have \*  |
| evolutions | String   | What pokemon it evolves to (if applicable) \* |
| enemies  | String   | Enemeies associated with this pokemon \*  |


\* The string is a comma delimited representation of a string array ('a,b,c')

Information stored in our database is about the pokemon that is searched for. 
We can add pokemon by name. 
Delete pokemon by name. 
Update a pokemon entry. 
Lastly it can be called to return the last 10 (or less) entries which will be shown in the history tab.


**URL Routes/Mappings:** A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

**Authentication/Authorization:** A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.

**Division of Labor:** 

**Ryan:** milestone3.md file creation, database logic development and partial implementation, secrets.json, Fetch calls as necessary: (new file),Post on mainpage, Get when going to history page, Post from history to dash on entry click, Post on enemy click (dash page), final.md creation and editing

**Yichao:** secrets.json, database logic development and implementation,addPokemon(pokemonEntry)=>Promise<boolean>, getPokemon(pokemonName)=>Promise<pokemonEntry|null>, getRecents()=>Promise<pokemonEntry[]>(ordered descending orderAdded max10), docs/setup.md, final.md creation and editing

**Kobi:** database logic development and implementation, secrets.json, Setup express and call above functions as needed, Get info from pokeApi if not already available, final.md creation and editing

**Important note:** Jakob may have less commits in github because a major role he played was assisting through shared screens via zoom, so he helped with the code but did not actually commit the changes. 


**Conclusion:** 

What we learned:A lot of times in classes, you learn information but only temporarily understand it for an exam and then forget about it. This project allowed us to take the knowledge from the course and implement it in our own functioning project. Accessing information from the Pokemon API, displaying it in a user firendly way, and storing all that infromation in a databse. These are all essential companents of a wesbite that we can now say we have done and are able to do again. On top of that, we understand the purpose and function behind each of the steps we took in creating our working web application. 

Difficulties encountered: As expected, a big difficulty for us was finding times where we could all meet and discuss the project. Since a lot of our parts had to interact with each other, it was essential that we understand hwo we were organizing information and sending it to each part of the application, so meeting as a group was essential.  i

Information that would have helped:

Technical hurdles:

**Link:**

https://cs326-final-pokemon.herokuapp.com/
