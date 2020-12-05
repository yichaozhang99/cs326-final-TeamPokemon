**Team:** Team Pokemon

**Application:** Pokemon Strategy Tool

**Discord Team Overview:**
Ryan Coulter, RyanHCoulter
Jakob Falus, MiniShark27
Yichao (Ethan) Zhang, yichaozhang99

**Description of databse table:**

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


**Division of Labor:**

**Ryan:** milestone3.md file creation, database logic development and partial implementation, secrets.json

**Yichao:** secrets.json, database logic development and implementation

**Kobi:** database logic development and implementation, secrets.json

**Important note:** Jakob may have less commits in github because a major role he played was assisting through shared screens via zoom, so he helped with the code but did not actually commit the changes. 


**Google Doc Link**

https://docs.google.com/document/d/19ZNJshdDOZC8JR73dwGfCc18sy461omPPFlCWZ_VoPo/edit?usp=sharing
