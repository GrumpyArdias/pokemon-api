#Pokemon-API

##Instalacion

Una vez descargado el archivo, ejecutar los comando:

``` npm install ```

Una vez instalado todos los paquetes, ejecutar el comando:

``` npm run start  ```


##Pokemon

- GET (ALL)
  ``` http://localhost:3000/api/pokemon ```

- GET (ONE)
    ``` http://localhost:3000/api/pokemon/id ```

- POST
    ``` http://localhost:3000/api/pokemon ```

- PUT 
  ``` http://localhost:3000/api/pokemon/id ```

- DELETE
    ``` http://localhost:3000/api/pokemon/id ``` 

- POST
  ``` http://localhost:3000/api/pokemon/move/id ``` 

* Este último sirve para encontrar todas las habilidades que un Pokémon puede usar

### Objeto Pokémon de referencia

{
  "level": number,
  "name": string,
  "type": string,
  "actualPS": number,
  "maxPs": number,
  "baseAttack": number,
  "baseDefense": number,
  "baseSpecialAttack": number,
  "baseSpecialDefense": number,
  "baseSpeed": number,
  "movements": string[]
}

##Movimientos

- GET (ALL)
  ``` http://localhost:3000/api/moves ```

- GET (ONE)
    ``` http://localhost:3000/api/moves/id ```

- POST
    ``` http://localhost:3000/api/moves ```

- PUT 
  ``` http://localhost:3000/api/moves/id ```

- DELETE
    ``` http://localhost:3000/api/moves/id ``` 

- POST
  ``` http://localhost:3000/api/moves/pokemon/id ``` 

* Este último sirve para encontrar todos los Pokemón que pueden usar una habilidad

### Objeto Movimiento de referencia

{
"name": string,
"type": string,
"power": number
}

##Combate

- GET (ALL)
  ``` http://localhost:3000/api/combat ```

- GET (ONE)
    ``` http://localhost:3000/api/combat/id ```

- POST
    ``` http://localhost:3000/api/combat ```

- PUT 
  ``` http://localhost:3000/api/combat/id ```

- DELETE
    ``` http://localhost:3000/api/combat/id ``` 

* El método put en este caso es donde se realiza la lógica del combate, retroalimentar el body del put, con el retorno, para realizar la lógica completa del combate.

### Objeto Combate de referencia

{
  "user": string,
  "firstPokemon":string,
  "secondPokemon":string,
  "firstPokemonAttack": string,
  "secondPokemonAttack": string,
  "firstPokemonCurrentHp": number,
  "secondPokemonCurrentHp": number,
  "thereIsAWinner": boolean,
}


## NOTAS: 

Para que el proyecto funcione es necesario una cuenta de mongo Atlas y en un archivo .env crear una variable de entorno llamada MONGO_URI en caso de necesitarla se facilitara, contacten conmigo para ello a través de info@marioherrero.com