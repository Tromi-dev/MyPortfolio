# Hall of Fame

This Hall of Fame spreadsheet was created to document my Pokémon team victories in an external, preserved way": including a hand-made ID and search system for rendering any section of data in the sheet. This sheet(s) uses some of the more complex parts of google sheets, such as the `=QUERY()` function, conditional formatting, and custom scripts for API calls.

## Features

- search to display certain teams.
  - view all the necessary information on each team member, the game they featured in, and the rules imposed upon me during each playthrough.
- view each species (and sometimes form) of Pokémon I have used, alongside the amount of times used in a self sustaining list.

# How to Use it

To use the search feature, you must enter the specific `id` for that team entry; therefore you must know the specific information each character in the id represents in order to apply it:
An example id `762002N` can be split up into 5 sections:

| Section | Meaning                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    7    | The number of the Pokémon **region** the game takes place in, in chronological order. _`i.e. Kanto, Johto, Hoenn, Orre, Sinnoh, Unova, Kalos, Alola, Galar, Paldea`_ . If the number exceeds past 9, then hexadecimal syntax will be used, `e.g. 10 = A`. If the game is fan-made (rom hack, Pokérogue, etc.) and does NOT take place in an official reigon listed above, then a **percent** (%) will be used instead. **_This examples indicates we are in the Kalos region._** |
|    6    | The number of the Pokémon **generation** the game was released, in chronological order. **_This example indicates we are in Generation 6._**                                                                                                                                                                                                                                                                                                                                     |
|    2    | The **index** of the game in the list of games with the **same reigon and generation** values _— See chart below for the full reference_. If the game is fan-made (rom hack, Pokérogue, etc.) then and `R` will be appended to distinguish from official games. **_This example indicates we are in Pokémon Y._**                                                                                                                                                                |
|   002   | The index of the **playthrough** for that specific game, in chronological order. **_This example indicates it is the 2nd playthrough._**                                                                                                                                                                                                                                                                                                                                         |
|    N    | OPTIONAL — Present if the playthrough is a Nuzlocke.                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Full ID Index

|         Game         | ID Reference |
| :------------------: | :----------: |
|         Red          |     111      |
|         Blue         |     112      |
|        Yellow        |     113      |
|        Green         |     114      |
|         Gold         |     221      |
|        Silver        |     222      |
|       Crystal        |     223      |
|         Ruby         |     331      |
|       Sapphire       |     332      |
|       Emerald        |     333      |
|       Fire Red       |     131      |
|      Leaf Green      |     132      |
|      Collusseum      |     431      |
| XD: Gale of Darkness |     432      |
|       Diamond        |     541      |
|        Pearl         |     542      |
|       Platinum       |     543      |
|      Heart Gold      |     241      |
|     Soul Silver      |     242      |
|        Black         |     651      |
|        White         |     652      |
|       Black 2        |     653      |
|       White 2        |     654      |
|          X           |     761      |
|          Y           |     762      |
|      Omega Ruby      |     361      |
|    Alpha Sapphire    |     362      |
|         Sun          |     871      |
|         Moon         |     872      |
|      Ultra Sun       |     873      |
|      Ultra Moon      |     874      |
|   Lets go Pikachu    |     171      |
|    Lets go Eevee     |     172      |
|        Sword         |     981      |
|        Shield        |     982      |
|  Brilliant Diamond   |     581      |
|    Shining Pearl     |     582      |
|    Legends Arceus    |     583      |
|       Scarlet        |     A91      |
|        Violet        |     A92      |
|     Legends Z-A      |     791      |
|      PokeRogue       |     %%1R     |
|   Emerald Seaglass   |     391R     |
|       Lazarus        |     %91R     |
|    Emerald Rogue     |     %92R     |
