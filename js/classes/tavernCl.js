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
        this.firstCost = 0;
        this.cost = this.createCost(this.tavern);
    }

    createCost(tavern){
        switch(tavern.level){
            case 1: this.cost = 5; this.firstCost = this.cost; return `${this.cost}`; // on level 2 
            case 2: this.cost = 7; this.firstCost = this.cost; return `${this.cost}`; // on level 3
            case 3: this.cost = 8; this.firstCost = this.cost; return `${this.cost}`; // on level 4
            case 4: this.cost = 11; this.firstCost = this.cost; return `${this.cost}`; // on level 5
            case 5: this.cost = 10; this.firstCost = this.cost; return `${this.cost}`; // on level 6
            case 6: this.cost = 0; return ''; 
            default: break;
        }
        return this.cost;
    }

    updateCost(cost){
        if(this.cost>0){
        this.cost -= cost;
        this.setCostInBlock(this.cost);
        }
    }

    upgradeCost(tavern){ 
        if(tavern.playerCoins >= this.cost && game.tavern.level !== 6 && game.battle === false){
            tavern.playerCoins -= this.cost;
            tavern.level++; tavern.playerLevel++; tavern.enemyLevel++;
            tavern.update(tavern.playerCoins, maxCoins);
            this.createCost(tavern); tavern.updateMaxCreaturesForBuy();
            this.setCostInBlock(this.createCost(tavern));
        }
        else if(tavern.playerCoins <= this.cost && game.battle === false) {checkPopUp(all); genPopUpBlock(all, `You have ${tavern.playerCoins}/${this.cost} for upgrade your tavern`)}
        else if(tavern.level === 6 && game.battle === false){checkPopUp(all); genPopUpBlock(all, 'Your level of tavern is maxed');}
        else {checkPopUp(all); genPopUpBlock(all, 'Right now combat you cannot upgrade');}
    }
    
    createUpgradeBlock(){
        upgradeBlock.setAttribute("UpBlock", JSON.stringify(this.setUpgradeBlock()));
    } 

    setCostInBlock(coin){
        if(this.cost !== this.firstCost) {upgradeText.style.color = "lightgreen"; upgradeText.innerHTML = coin;}
        else {upgradeText.style.color = "white"; upgradeText.innerHTML = coin;}
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

    updateCost(cost){
        this.cost -= cost;
        refreshText.innerHTML = this.cost;
        this.setCostInBlock(this.cost);
    }

    setCostInBlock(){
        if(this.cost !== 1) {refreshText.style.color = "lightgreen";}
        else {refreshText.style.color = "white"; }
    }

    createRefreshBlock(){
        refreshBlock.setAttribute("refBlock", JSON.stringify(this.setRefreshBlock()))
    }

    setRefreshBlock(){
        return this;
    }

    refreshTavern(block, maxAmountOfCoins){
        setTimeout(() => {
            if(game.tavern.playerCoins >= 1){
                if(game.battle === false){
                    refreshCost(this, block, maxAmountOfCoins);
                    if(this.cost === 0){
                        this.cost = 1;
                    }
                    
                }
                else{checkPopUp(all); genPopUpBlock(all, "Right now combat, you cannot refresh")}
            }
            else{checkPopUp(all); genPopUpBlock(all, "You need 1 coin for refresh tavern")}

        }, 100);       
    }
}