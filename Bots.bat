@echo off
tsc custom_modules\generalUse.ts
tsc Pokèbot\PokeDB.ts
tsc custom_modules\coinflip.ts
tsc custom_modules\containsWordFunctions.ts
tsc custom_modules\dice.ts
tsc custom_modules\forwardMessages.ts
tsc custom_modules\info.ts
tsc custom_modules\inspiroBot.ts
tsc custom_modules\playableMaze.ts
tsc custom_modules\pokedex.ts
tsc custom_modules\stupidStuff.ts
tsc custom_modules\TicTacToe.ts
tsc custom_modules\xkcd.ts
tsc AllTheBots.ts
node AllTheBots.js
PAUSE