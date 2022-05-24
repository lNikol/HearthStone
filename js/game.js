"use strict";
// сделать презагрузку html & css
// fix annimation onmouseover
function deleteAllTempCreatures(){
    let tempCreaturesLength = document.getElementsByClassName("tempCreature");
    for (let i = 0; i < tempCreaturesLength.length; i++) all.removeChild(tempCreaturesLength[i])
}
async function SetTimer(gameTurn){
    timeText.innerHTML = ''
    let TurnTimer = turn * 10;
    setInterval(() => {
        if(TurnTimer > 0) {timeText.innerHTML = `${TurnTimer}`; TurnTimer-=30;}//--
        else {             
            if(gameTurn){
                timeText.innerHTML = 'Sec';
                game.deleteTavernCreatures();
                gameTurn = false; game.battle = true;
                game.createBattle(playerCoins);
                timeText.innerHTML = ''
            }
           game.battle = false; 
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
                    setTimeout(() => { enemyHeroBlock.childNodes[1].style.visibility = 'hidden'; }, 775); game.deleteTavernCreatures(); game.enemyArray = []; game.createTurn();
                }
            }
                break;
                case 1: 
                for(let i = 0; i < tempArrayForUpdate.length; i++){
                    if(tempArrayForUpdate[i]) {
                    attackForHero += tempArrayForUpdate[i].tier; 
                    game.enemyHero.updateHP(game.enemyHero.hp - attackForHero);
                    setTimeout(() => { enemyHeroBlock.childNodes[1].style.visibility = 'hidden'; }, 775); game.deleteTavernCreatures(); game.enemyArray = []; game.createTurn();
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
    game.update();
    setTimeout(() => {
        game.tavern.playerCoins = maxCoins;
        game.tavern.update_2(game.tavern.playerCoins);
        game.tavern.update(game.tavern.playerCoins, maxCoins);    
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
        this.playerArray = [];
        this.enemyArray = [];
        this.createGameHTML();
        this.data.genDB();
        this.enemyHero = new Hero("topAvatar", "enemyHeroBlock", 40, `${ImageSrc}/tavern/Bob.png`, this.tavern.enemyLevel);
        this.playerHero = new Hero("bottomAvatar", "playerHeroBlock", 40,`${ImageSrc}/Galewing/${origImage}.webp`, this.tavern.playerLevel);
        this.data.addInDB(0, this.enemyHero, this.enemyHero.id);
        this.data.addInDB(0, this.playerHero, this.playerHero.id);
        this.updateVisibilityForHp();
        //this.createFirstHTML();

        
    }
    update(){
        this.enemyHero.tavern = this.tavern.level;
        this.playerHero.tavern = this.tavern.level;
    }
    createFirstHTML(){
        //rewrite
        
        //this.createGameHTML();
    // let firstPage = createBlock('firstPage', '', `width: 400px; height:400px; margin: auto auto;`)
    
    // let input = document.createElement('input');
    // input.id = 'input';
    // input.style.cssText = `width: 200px; height:100px; margin:auto auto;`;

    // let button = document.createElement('button');
    // button.style.cssText = `width:125px; height: 50px; margin-left:10px;`;
    // button.textContent = 'Write Your name';
    // button.onclick = () => {
    //     localStorage.setItem("Name", input.value); 
    //     console.log(localStorage);
    //     document.body.removeChild(firstPage);
    //     this.createGameHTML();
    // };

    // firstPage.append(input);
    // firstPage.append(button);
    // document.body.append(firstPage);
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
        
        function getCreatureObject(parentBlock, battleCreature, i, enemyArr){
            if (parentBlock.childNodes[i].childNodes[0]) {
                battleCreature = JSON.parse(parentBlock.childNodes[i].childNodes[0].attributes.insideCreature.nodeValue);
                let dbCreature = game.data.dataBase[battleCreature.tier][battleCreature.id];
                if(enemyArr) enemyArr.push(dbCreature);
                return dbCreature;
            }            
        }

        function updateHPinBattle(enemyBattleCreatureA, playerBattleCreatureA){
            while(enemyBattleCreatureA.hp > 0 && playerBattleCreatureA.hp > 0){
                if(playerBattleCreatureA.unique.includes(Unics.Divine_Shield)){
                    for(let i = 0; i < playerBattleCreatureA.unique.length; i++){
                        if (playerBattleCreatureA.unique[i] === Unics.Divine_Shield && playerBattleCreatureA.Creatureblock.childNodes[5].style.visibility !== "hidden"){
                            enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp - playerBattleCreatureA.attack, game.enemyArray);
                            playerBattleCreatureA.setHP(playerBattleCreatureA.hp, game.playerArray);
                            playerBattleCreatureA.Creatureblock.childNodes[5].style.visibility = "hidden"
                        } else {
                            enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp - playerBattleCreatureA.attack, game.enemyArray);
                            playerBattleCreatureA.setHP(playerBattleCreatureA.hp - enemyBattleCreatureA.attack, game.playerArray);    
                        };
                    }    
                }
                else if(enemyBattleCreatureA.unique.includes(Unics.Divine_Shield)){
                    for(let i = 0; i < enemyBattleCreatureA.unique.length; i++){
                        if (enemyBattleCreatureA.unique[i] === Unics.Divine_Shield && enemyBattleCreatureA.Creatureblock.childNodes[5].style.visibility !== "hidden"){
                            playerBattleCreatureA.setHP(playerBattleCreatureA.hp - enemyBattleCreatureA.attack, game.playerArray);
                            enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp, game.enemyArray);
                            enemyBattleCreatureA.Creatureblock.childNodes[5].style.visibility = "hidden"
                        } else{
                            playerBattleCreatureA.setHP(playerBattleCreatureA.hp - enemyBattleCreatureA.attack, game.playerArray);
                            enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp - playerBattleCreatureA.attack, game.enemyArray);
                        }
                    }   
                }
                else if(playerBattleCreatureA.unique.includes(Unics.Poison) || enemyBattleCreatureA.unique.includes(Unics.Poison)){
                    if(playerBattleCreatureA.unique.includes(Unics.Poison)){
                        console.log('tyt est poison')
                        playerBattleCreatureA.setHP(playerBattleCreatureA.hp - enemyBattleCreatureA.attack, game.playerArray);
                        enemyBattleCreatureA.setHP(0, game.enemyArray);
                    }
                    else{
                        console.log('tam est poison')
                        enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp - playerBattleCreatureA.attack, game.enemyArray)
                        playerBattleCreatureA.setHP(0, game.playerArray);
                    }
                }
            else{
                enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp - playerBattleCreatureA.attack, game.enemyArray);
                playerBattleCreatureA.setHP(playerBattleCreatureA.hp - enemyBattleCreatureA.attack, game.playerArray);
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
                if(enemyBattleCreature.unique.includes(Unics.Taunt)){ updateHPinBattle(enemyBattleCreature, playerBattleCreatureB); } //rewrite 
            }
            
            else{
                enemyBattleCreature = game.enemyArray[Math.floor(Math.random() * game.enemyArray.length)];
                updateHPinBattle(enemyBattleCreature, playerBattleCreatureB);
                for(let i = 0; i < game.enemyArray.length * 30; i++){
                if(playerBattleCreatureB.hp > 0 && enemyBattleCreature.hp <= 0 && game.enemyArray.includes(enemyBattleCreature)) {
                    delete game.enemyArray[enemyBattleCreature]
                    enemyBattleCreature = game.enemyArray[Math.floor(Math.random() * game.enemyArray.length)];
                    updateHPinBattle(enemyBattleCreature, playerBattleCreatureB);
                }
            }
        }
        
        
        }

        function getCreatures(enemyCreatureA, playerCreatureA){
            for (let i = 0; i < topAllCreaturesBlock.childNodes.length; i++){ enemyCreatureA = getCreatureObject(topAllCreaturesBlock, enemyCreature, i, game.enemyArray);}
            for (let i = 0; i < bottomAllCreaturesBlock.childNodes.length; i++){ playerCreatureA = getCreatureObject(bottomAllCreaturesBlock, playerCreature, i, undefined);}
        }

        if(this.battle === true && this.battleCount === 0){
            this.addCreatureToBlock(topAllCreaturesBlock, this.playerArray, this.enemyArray, getNewPlayerBattleArray(this.playerArray).length);
            getCreatures(enemyCreature, playerCreature);

            for(let i = 0; i < this.playerArray.length; i++){
                let playerBattleCreature;
                if(this.playerArray[i] !== undefined && this.playerArray[i].element === "bottomCreatureBlock") {
                    playerBattleCreature = this.playerArray[i];
                    battleSystem(playerBattleCreature);
                }
            }
            
            checkWinner();
            turn++; maxCoins = (turn >= 10) ? 10: turn;
            
        }
        
        this.battleCount = 1;
    }

    createTurn(){
        this.battleCount = 0;
        this.battleCount = 0;
        this.IsTurn = true; this.battle = false;
        SetTimer(this.IsTurn)
        refreshBlock.onclick = function() {game.tavern.refreshBlock1.refreshTavern(topAllCreaturesBlock, maxCoins);} // in the future 1 will replace to the tier of creature
        upgradeBlock.onclick = function() {game.tavern.upgradeBlock1.upgradeCost(game.tavern)};
        setTimeout(() => { this.addCreatureToBlock(topAllCreaturesBlock, this.playerArray, undefined, this.tavern.maxCreatures) }, 1);
           
    }

    async addCreatureToBlock(block, playerArray, enemyArr, maxCreaturesToAdd){
        // Переписать след момент 
        // если рандом существо = одному из существ игрока - перерандомить
        // + переписать систему на проверку повторности элементов
        let data = this.data.dataBase;
        let check;
        let array = [];

        let randomCreatureToAdd; 
        let temp = 0;
        for(let i = 0; i < maxCreaturesToAdd; i++){     
            randomCreatureToAdd = setTier(data, this.tavern.level);
            if(randomCreatureToAdd !== undefined){
                if(check === undefined) check = randomCreatureToAdd;
                while((playerArray.includes(randomCreatureToAdd) || array.includes(randomCreatureToAdd)) && temp < 25) randomCreatureToAdd = setTier(data, this.tavern.level); temp++;
                if(enemyArr !== undefined && this.battle === true) {
                   let ranBlock = randomCreatureToAdd.Creatureblock;
                   enemyArr = array;
                   ranBlock.removeAttribute("buy");
                   ranBlock.setAttribute("battle", "in battle");
                };
                randomCreatureToAdd.updateVisibility(true, "visible")
                randomCreatureToAdd.element = Elements.TopCreatureBlock;
                block.childNodes[i].appendChild(randomCreatureToAdd.Creatureblock);   
            }
            check = randomCreatureToAdd;
            array.push(randomCreatureToAdd)
        }    

    }
    getCreaturesFromParentBlock(parent){
        let tempObjectCreature = JSON.parse(parent.childNodes[0].attributes.insideCreature.nodeValue);
        let tempDataCreature = this.data.dataBase[tempObjectCreature.tier][tempObjectCreature.id];
        return tempDataCreature;
    }
    deleteTavernCreatures(){
        // Удаление оставшихся временных блоков существ (их начальная информация)
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

    drawPlayerArray(){
        //console.log(this.playerArray);            
    }

    /**
     * @param {Object} monster1 
     * @param {Object} monster2 
    */
}
