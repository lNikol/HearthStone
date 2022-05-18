"use strict"
class Tavern{
    constructor(level, coins){
        this.level = level;
        this.freezeBlock1 = new FrzBlock(false);
        this.upgradeBlock1 = new UpBlock(this);
        this.refreshBlock1 = new refBlock(1);
        this.playerCoins = coins;
        this.enemyLevel = this.level;
        this.playerLevel = this.level;
        this.maxCreatures = this.level >= 5 ? 7:this.level+2;
        this.tempCoins = maxCoins;

        this.update(this.playerCoins, maxCoins);
    } 
    setTavern(){
        return this;
    }
    update(coins, tempMaxCoins){
        this.playerCoins = coins;
        bottomCoinsText.innerHTML = `${this.playerCoins}/${tempMaxCoins}`;
            for(let i = 0; this.tempCoins >= i; i++){
                let tempCoinBlock = document.getElementById(`coinBlock${this.tempCoins-i}`);
                if(tempCoinBlock) tempCoinBlock.style.visibility = "hidden";
            }
        
            for(let i = 0 ; i < coins; i++){
                let tempCoinBlock = document.getElementById(`coinBlock${i}`);   
                if(tempCoinBlock) tempCoinBlock.style.visibility = "visible"; 
            }
    } 
    updateMaxCreaturesForBuy(){
        this.maxCreatures = this.level >= 5 ? 7:this.level+2;
        return this.maxCreatures;
    }
    
    /**
     * @param {number} coins 
     */
    update_2(coins){
        this.tempCoins = coins;
    }
    
    updateTurn(t, playerCoins, maxCoins){
    turn = t;
    maxCoins = turn >= 10 ? 10: turn;
    this.update_2(maxCoins);
    playerCoins = maxCoins;
    this.update(playerCoins, maxCoins);
    }

    updateTavernCost(){
        this.upgradeBlock1.createCost(this)
    }
}

/**
 * @param {boolean} freeze
 */
class FrzBlock{
    constructor(freeze){
        this.freeze = freeze; // Дальше создам систему заморозки
        this.cost = 0;
        this.createFreezeBlock();
    }
    createFreezeBlock(){
        freezeBlock.setAttribute("FrzBlock", JSON.stringify(this.setFreezeBlock()))
    }
    setFreezeBlock(){
        return this;
    }

}

/**
 * @param {number} cost
 */
class UpBlock{

    constructor(tavern){
        this.createUpgradeBlock();
        this.tavern = tavern;
        this.cost = this.createCost(this.tavern);
    }

    createCost(tavern){
        switch(tavern.level){
            case 1: this.cost = 5; return `${this.cost}`; // on level 2 
            case 2: this.cost = 7; return `${this.cost}`; // on level 3
            case 3: this.cost = 8; return `${this.cost}`; // on level 4
            case 4: this.cost = 11; return `${this.cost}`; // on level 5
            case 5: this.cost = 10; return `${this.cost}`; // on level 6
            case 6: this.cost = 0; return ''; 
            default: break;
        }
        return this.cost;
    }
    
    upgradeCost(tavern){ 
        if(tavern.playerCoins >= this.cost && game.tavern.level !== 6 && game.battle === false){
            tavern.playerCoins -= this.cost;
            tavern.level++; tavern.playerLevel++; tavern.enemyLevel++;
            tavern.update(tavern.playerCoins, maxCoins);
            this.createCost(tavern); tavern.updateMaxCreaturesForBuy();
            this.setCostInBlock(this.createCost(tavern));
        }
        else if(tavern.playerCoins <= this.cost && game.battle === false) alert(`You have ${tavern.playerCoins}/${this.cost} for upgrade your tavern`)
        else return;

        // if(monster.tier == 1 && monster.type == CreatureTypes.Pirate){ //battlecry pirate 1*
        // this.cost -=1; // наброски, но надо изменить, т.к при каждом движении мыши оно тнимает
        // console.log(this.cost)
        // }
        // else return;
    }
    
    createUpgradeBlock(){
        upgradeBlock.setAttribute("UpBlock", JSON.stringify(this.setUpgradeBlock()));
    } 
    setCostInBlock(coin){
        upgradeText.innerHTML = coin;
    }

    setUpgradeBlock(){
        return this;
    }
}

/**
 * @param {number} cost
 */
class refBlock{
    constructor(cost){
        this.cost = cost;
        this.rBlock = this.createRefreshBlock();
    }
    createRefreshBlock(){
        refreshBlock.setAttribute("refBlock", JSON.stringify(this.setRefreshBlock()))
    }
    setRefreshBlock(){
        return this;
    }
    refreshTavern(block, maxAmountOfCoins){
        if(game.tavern.playerCoins >= 1 && game.battle === false){
            game.tavern.playerCoins -= this.cost; game.tavern.update(game.tavern.playerCoins, maxAmountOfCoins)
            game.deleteTavernCreatures();
            game.addCreatureToBlock(block, game.playerArray, game.enemyArray, game.tavern.maxCreatures);
        }
        else if(game.tavern.playerCoins < 1){alert("You need 1 coin for refresh tavern")}
    }
}