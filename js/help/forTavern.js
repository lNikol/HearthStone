function refreshCost(tempRefBlock, block, maxAmountOfCoins){
    tempRefBlock.setCostInBlock();
    game.tavern.playerCoins -= tempRefBlock.cost; 
    game.tavern.update(game.tavern.playerCoins, maxAmountOfCoins)
    game.deleteTavernCreatures();
    addCreatureToBlock(block, game.playerArray, game.enemyArray, game.tavern.maxCreatures);

}