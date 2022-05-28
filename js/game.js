"use strict";

function addCreatureToBlock(block, playerArr, enmArray, maxToAdd){
    let data = game.data.dataBase;
    let check;
    let array = [];

    let randomCreatureToAdd; 
    let temp = 0;
    for(let i = 0; i < maxToAdd; i++){     
        randomCreatureToAdd = setTier(data, game.tavern.level);
        if(randomCreatureToAdd !== undefined){
            if(check === undefined) check = randomCreatureToAdd;
            while((playerArr.includes(randomCreatureToAdd) || 
            array.includes(randomCreatureToAdd)) && temp < 25)
            { randomCreatureToAdd = setTier(data, game.tavern.level); temp++;}

            let ranBlock = randomCreatureToAdd.Creatureblock;
            if(enmArray !== undefined && game.battle) {
               enmArray = array;
               ranBlock.removeAttribute("buy");
               ranBlock.setAttribute("battle", "in battle");
            }
            else if(enmArray !== undefined && !game.battle){
                ranBlock.removeAttribute("battle");
                ranBlock.setAttribute("buy", "only for buy");
            }
            checkBlockForCreature(randomCreatureToAdd, block, i)

              
        }
        check = randomCreatureToAdd;
        array.push(randomCreatureToAdd);
    }    
}


function checkBlockForCreature(creature, parent, index){
    if(!parent.childNodes[index].childNodes[0] && game.battle === true) {
        creature.updateVisibility(true, "visible")
        creature.element = Elements.TopCreatureBlock;
        parent.childNodes[index].appendChild(creature.Creatureblock); 
    }
    else if (parent.childNodes[index].childNodes[0] === undefined && game.battle === false) {
        creature.updateVisibility(true, "visible")
        creature.element = Elements.TopCreatureBlock;
        parent.childNodes[index].appendChild(creature.Creatureblock); 
    }
    else{index++;}
}


async function refreshSystem(block, playerArray, enemyArr, maxCreaturesToAdd){
    
   
    // Переписать след момент 
        // если рандом существо = одному из существ игрока - перерандомить
        // + переписать систему на проверку повторности элементов
    


}


function getCreatureObject(parentBlock, battleCreature, i, enemyArr){
    if (parentBlock.childNodes[i].childNodes[0]) {
        battleCreature = JSON.parse(parentBlock.childNodes[i].childNodes[0].attributes.insideCreature.nodeValue);
        let dbCreature = game.data.dataBase[battleCreature.tier][battleCreature.id];
        if(enemyArr) enemyArr.push(dbCreature);
        return dbCreature;
    }            
}



//def - defence, att - attack
function setNewHP(attCreature, forAttDMG, defCreature, forDefDMG){
    attCreature.setHP(forAttDMG, game.playerArray);
    defCreature.setHP(forDefDMG, game.enemyArray);
}


function checkDivineShield(firstCreature, secondCreature){
    for(let i = 0; i < firstCreature.unique.length; i++){
        if (firstCreature.unique[i] === Unics.Divine_Shield 
        && firstCreature.Creatureblock.childNodes[5].style.visibility !== "hidden"){
            setNewHP(firstCreature, firstCreature.hp, 
            secondCreature, secondCreature.hp - firstCreature.attack);
            firstCreature.Creatureblock.childNodes[5].style.visibility = "hidden";
        }
        else if(secondCreature.unique[i] === Unics.Divine_Shield 
            && secondCreature.Creatureblock.childNodes[5].style.visibility !== "hidden"){   
            setNewHP(secondCreature, secondCreature.hp , 
            firstCreature, firstCreature.hp - secondCreature.attack);
            secondCreature.Creatureblock.childNodes[5].style.visibility = "hidden";
        }
        else{
            setNewHP(firstCreature, firstCreature.hp - secondCreature.attack, 
                secondCreature, secondCreature.hp - firstCreature.attack)
        }
}    
}


function checkPoison(firstCreature, secondCreature){
    if(checkCertainUnique(firstCreature, Unics.Poison)){
        console.log('tyt est poison') 
        setNewHP(firstCreature, firstCreature.hp - secondCreature.attack, secondCreature, 0)
    }
    else if (checkCertainUnique(secondCreature, Unics.Poison)){
        console.log('tam est poison')
        setNewHP(secondCreature, secondCreature.hp - firstCreature.attCreature, firstCreature, 0)
        
    }
    else if(checkCertainUnique(firstCreature, Unics.Poison) 
    && checkCertainUnique(secondCreature, Unics.Poison)){
        firstCreature.setHP(0, game.playerArray);
        secondCreature.setHP(0, game.enemyArray);
    }

   
}


function checkCertainUnique(creatureCheck, unique){
    return creatureCheck.unique.includes(unique);
}


function updateHPinBattle(enemyBattleCreatureA, playerBattleCreatureA){
    while((enemyBattleCreatureA!== undefined && enemyBattleCreatureA.hp > 0) &&
    (playerBattleCreatureA !== undefined && playerBattleCreatureA.hp > 0)){
        if(checkCertainUnique(playerBattleCreatureA, Unics.Divine_Shield) || checkCertainUnique(enemyBattleCreatureA, Unics.Divine_Shield)){
            checkDivineShield(playerBattleCreatureA, enemyBattleCreatureA);
        }
        else if(checkCertainUnique(playerBattleCreatureA, Unics.Poison) || checkCertainUnique(enemyBattleCreatureA, Unics.Poison)){
            checkPoison(playerBattleCreatureA, enemyBattleCreatureA);
        }
        else{
            setNewHP(playerBattleCreatureA, playerBattleCreatureA.hp - enemyBattleCreatureA.attack,
            enemyBattleCreatureA, enemyBattleCreatureA.hp - playerBattleCreatureA.attack);
        }
    }           

}


function battleSystem(playerBattleCreatureB){
    enemyHeroBlock.childNodes[1].style.visibility = 'visible';

    let enemyBattleCreature;
    for(let j = 0; j < game.enemyArray.length; j++){
        if(game.enemyArray[j].unique.includes(Unics.Taunt)) { enemyBattleCreature = game.enemyArray[j];}
    }
    
    if(enemyBattleCreature !== undefined && enemyBattleCreature.hp > 0){
        if(enemyBattleCreature.unique.includes(Unics.Taunt)){ updateHPinBattle(enemyBattleCreature, playerBattleCreatureB); }
    }
    
    else{
        enemyBattleCreature = game.enemyArray[Math.floor(Math.random() * game.enemyArray.length)];
        updateHPinBattle(enemyBattleCreature, playerBattleCreatureB);
        for(let i = 0; i < game.enemyArray.length * 10; i++){
        if(playerBattleCreatureB.hp > 0 && enemyBattleCreature.hp <= 0 
            && game.enemyArray.includes(enemyBattleCreature)) {
            delete game.enemyArray[enemyBattleCreature];
            enemyBattleCreature = game.enemyArray[Math.floor(Math.random() * game.enemyArray.length)];
            updateHPinBattle(enemyBattleCreature, playerBattleCreatureB);
        }
    }
}


}


function getCreatures(enemyCreature, playerCreature){
    for (let i = 0; i < topAllCreaturesBlock.childNodes.length; i++){ enemyCreature = getCreatureObject(topAllCreaturesBlock, enemyCreature, i, game.enemyArray);}
    for (let i = 0; i < bottomAllCreaturesBlock.childNodes.length; i++){ playerCreature = getCreatureObject(bottomAllCreaturesBlock, playerCreature, i, undefined);}
}


function deleteAllTempCreatures(){
    let tempCreaturesLength = document.getElementsByClassName("tempCreature");
    for (let i = 0; i < tempCreaturesLength.length; i++) all.removeChild(tempCreaturesLength[i])
}


async function SetTimer(gameTurn){
    timeText.innerHTML = ''
    let TurnTimer = turn * 10;
    setInterval(() => {
        if(TurnTimer > 0) {timeText.innerHTML = `${TurnTimer}`; TurnTimer -= 30;}//--
        else {             
            if(gameTurn){
                timeText.innerHTML = 'Sec';
                game.deleteTavernCreatures();
                gameTurn = false; game.battle = true;
                game.createBattle(playerCoins);
                timeText.innerHTML = ''
            }
        }
       }, 1000);
}


function setTier(data, level){
    let randomForTier = Math.floor(Math.random()*level+1)
    let randomTier = randomForTier <= level? randomForTier: randomForTier;
    let random = data[randomTier][Math.floor(Math.random() * data[randomTier].length)]
    let randomCount = 0;
    while (random === undefined && randomCount < 50) {randomCount++; random = random; }
    return random;
}


function checkWinner(){
    setTimeout(() => {
        function getParentArrayOfCreatures(parent){
            let tempArray = [];
            for (let i = 0; i < parent.childNodes.length; i++){
                let parentBlockChildren = parent.childNodes[i];
                if(parentBlockChildren !== undefined && parentBlockChildren.childNodes[0] !== undefined){
                    let dataCreature = game.getCreaturesFromParentBlock(parentBlockChildren);
                    tempArray.push(dataCreature);
                }
            }
            return tempArray;
        }
        // num = 0 - hero num = 1 - enemy
        function updateHpInBlock(number, tempArrayForUpdate, hero){
            game.update();
            let attackForHero = hero.tavern;
            switch(number){
                case 0: 
                for(let i = 0; i < tempArrayForUpdate.length; i++){
                    if(tempArrayForUpdate[i]) {
                    attackForHero += tempArrayForUpdate[i].tier; 
                    game.playerHero.updateHP(game.playerHero.hp - attackForHero);
                    setTimeout(() => { enemyHeroBlock.childNodes[1].style.visibility = 'hidden'; game.deleteTavernCreatures(); game.enemyArray = []; game.createTurn(); }, 775);
                }
            }
                break;
                case 1: 
                for(let i = 0; i < tempArrayForUpdate.length; i++){
                    if(tempArrayForUpdate[i]) {
                    attackForHero += tempArrayForUpdate[i].tier; 
                    game.enemyHero.updateHP(game.enemyHero.hp - attackForHero);
                    setTimeout(() => { enemyHeroBlock.childNodes[1].style.visibility = 'hidden'; game.deleteTavernCreatures(); game.enemyArray = []; game.createTurn(); }, 775);
                }
            }
            
                break;
                default: enemyHeroBlock.childNodes[1].style.visibility = 'hidden'; game.deleteTavernCreatures(); game.enemyArray = []; game.createTurn(); break;
            }
            
            for(let i = 0; i < tempArrayForUpdate.length; i++) { tempArrayForUpdate[i].setHP(tempArrayForUpdate[i].firstHP, undefined)}
        }

        let enemyCreaturesAtTheEndOfBattle = getParentArrayOfCreatures(topAllCreaturesBlock);
        let playerCreaturesAtTheEndOfBattle = getParentArrayOfCreatures(bottomAllCreaturesBlock);
        if(enemyCreaturesAtTheEndOfBattle.length >= 1 && playerCreaturesAtTheEndOfBattle.length === 0){ updateHpInBlock(0, enemyCreaturesAtTheEndOfBattle, game.enemyHero); game.battle = false; return}
        else if(enemyCreaturesAtTheEndOfBattle.length === 0 && playerCreaturesAtTheEndOfBattle.length >= 1){ updateHpInBlock(1, playerCreaturesAtTheEndOfBattle, game.playerHero); game.battle = false; return}
        else {updateHpInBlock(undefined, playerCreaturesAtTheEndOfBattle, game.playerHero); game.battle = false; return}
        
        
    }, (timeForTimeout));
    turn++; maxCoins = (turn >= 10) ? 10: turn;
    setTimeout(() => {
        game.tavern.playerCoins = maxCoins;
        game.tavern.update_2(game.tavern.playerCoins);
        game.tavern.update(game.tavern.playerCoins, maxCoins);    
        if(game.tavern.cost !== 0) game.tavern.upgradeBlock1.updateCost(1);
    }, timeForTimeout);
}

function replaceHPtoFirstHP(creatureObj){ creatureObj.hp = creatureObj.firstHP; return creatureObj;}

class Game{
    constructor(boolean = true){
        this.isActive = boolean;
        this.data = new DataBaseHS();
        this.IsTurn = false;
        this.battle = false;
        this.battleCount = 0;
        this.playerName = '';
        this.playerArray = [];
        this.enemyArray = [];
        generateFirstHTML();
        this.enemyHero; this.playerHero;
        
    }

    updateChoose(Tchoose){
        this.choose = Tchoose;
    }

    update(){
        this.enemyHero.tavern = this.tavern.level;
        this.playerHero.tavern = this.tavern.level;
    }


    updateVisibilityForHp(){
        this.battle === false ? enemyHeroBlock.childNodes[1].style.visibility = 'hidden': enemyHeroBlock.childNodes[1].style.visibility = 'visible';
    }

    createGameHTML(){
 
       const start = new Date().getTime();
       generateGameHTML();
       playerCoins = maxCoins;
       this.tavern = new Tavern(1, maxCoins);
       

       let maxCreaturesForBuy = this.tavern.level >= 5 ? 7:this.tavern.level+2;
       bottomCoinsText.innerHTML = `${this.tavern.playerCoins}/${maxCoins}`
       upgradeText.innerHTML += `${this.tavern.upgradeBlock1.createCost(this.tavern)}`;
       refreshText.innerHTML = `${this.tavern.refreshBlock1.cost}`
       document.onselectstart = function () { return false; };
       freezeText.innerHTML = `${this.tavern.freezeBlock1.cost}`


       const end = new Date().getTime();
       this.createTurn(maxCreaturesForBuy);

       console.log(`LoadingTime: ${end - start}ms`);
    }
    
    createBattle(){
        this.battle = true; this.IsTurn = false;
      
        let enemyCreature;
        let playerCreature;
        function getNewPlayerBattleArray(playerArr){
            let returnArray = [];
            for(let i = 0; i < playerArr.length; i++){
                if(playerArr[i] !== undefined && playerArr[i].element === "bottomCreatureBlock") returnArray.push(playerArr[i]);
            }
            return returnArray;
        }
        
        

        if(this.battle === true && this.battleCount === 0){
            addCreatureToBlock(topAllCreaturesBlock, this.playerArray, this.enemyArray, getNewPlayerBattleArray(this.playerArray).length);
            getCreatures(enemyCreature, playerCreature);

            for(let i = 0; i < this.playerArray.length; i++){
                let playerBattleCreature;
                if(this.playerArray[i] !== undefined && this.playerArray[i].element === "bottomCreatureBlock") {
                    playerBattleCreature = this.playerArray[i];
                    battleSystem(playerBattleCreature);
                }
            }
            
            checkWinner();
            
            
        }
        
        this.battleCount = 1;
    }

    createTurn(){
        this.battleCount = 0;
        this.IsTurn = true; this.battle = false;
        SetTimer(this.IsTurn)
        refreshBlock.onclick = function() {game.tavern.refreshBlock1.refreshTavern(topAllCreaturesBlock, maxCoins); refreshText.innerHTML = 1;} 
        upgradeBlock.onclick = function() {game.tavern.upgradeBlock1.upgradeCost(game.tavern)};
        setTimeout(() => { addCreatureToBlock(topAllCreaturesBlock, this.playerArray, undefined, this.tavern.maxCreatures) }, 1);
           
    }

    
    getCreaturesFromParentBlock(parent){
        let tempObjectCreature = JSON.parse(parent.childNodes[0].attributes.insideCreature.nodeValue);
        let tempDataCreature = this.data.dataBase[tempObjectCreature.tier][tempObjectCreature.id];
        return tempDataCreature;
    }
    deleteTavernCreatures(){
        // delete tempBlocks which have start creatures info
        deleteAllTempCreatures();

        for (let i = 0; i < topAllCreaturesBlock.childNodes.length; i++){
            let parentBlockChildren = topAllCreaturesBlock.childNodes[i];
            if(parentBlockChildren !== undefined && parentBlockChildren.childNodes[0] !== undefined){
                let dataCreature = this.getCreaturesFromParentBlock(parentBlockChildren);
                dataCreature.element = Elements.TopCreatureBlock; dataCreature.updateVisibility(false, "hidden");
                parentBlockChildren.removeChild(parentBlockChildren.childNodes[0]);
            }
        }
    }
}
