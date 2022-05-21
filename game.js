"use strict";
// сделать презагрузку html & css
// fix annimation onmouseover
function SetTimer(gameTurn){
    let TurnTimer = turn * 10;
    if(turn) setInterval(() => {
        timeText.innerHTML = `${TurnTimer}`; if(TurnTimer > 0) TurnTimer-=15;//--
        else { 
           timeText.innerHTML = 'Sec';
           if(gameTurn) game.deleteTavernCreatures(); gameTurn = false; game.battle = true; game.createBattle();
           //this.addCreatureToBlock(enemyBlock, game.tavern.maxCreatures)
        }
       }, 1000);
}

function setTier(data, level){
    let randomForTier = Math.floor(Math.random()*level+1)
    let randomTier = randomForTier <= level? randomForTier: randomForTier;
    let random = data[randomTier][Math.floor(Math.random() * data[randomTier].length)]
    let randomCount = 0;
    while (random === undefined && randomCount < 50) {random = random; randomCount++; }
    let randomCreature = random;
    return randomCreature;
}

class Game{
    constructor(boolean = true){
        this.isActive = boolean;
        this.data = new DataBaseHS();
        this.IsTurn = false;
        this.battle = false;
        this.battleCount = 0;
        this.playerArray = [];
        this.enemyArray = [];
        //this.createFirstHTML();
        this.createGameHTML();
        this.data.genDB();

        
    }
    update(time){
        
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
    
    createGameHTML(){

       const start = new Date().getTime();
       generateGameHTML();

       playerCoins = maxCoins;
       this.tavern = new Tavern(1, maxCoins);
       

       let maxCreaturesForBuy = this.tavern.level >= 5 ? 7:this.tavern.level+2;
       bottomCoinsText.innerHTML = `${this.tavern.playerCoins}/${maxCoins}`
       upgradeText.innerHTML = `${this.tavern.upgradeBlock1.createCost(this.tavern)}`;
       refreshText.innerHTML = `${this.tavern.refreshBlock1.cost}`
       document.onselectstart = function () { return false; };
       freezeText.innerHTML = `${this.tavern.freezeBlock1.cost}`

 

       let playerHero = new Hero("bottomAvatar", "playerHero", 40,`${ImageSrc}/Galewing/${origImage}.webp`, 1);
       let enemyHero = new Hero("topAvatar", "enemyHero", 40, `${ImageSrc}/Bob.png`, 1);
       this.data.addInDB(0, playerHero, playerHero.id);
       this.data.addInDB(0, enemyHero, enemyHero.id);

       let timer = 0;
       //if(!this.IsTurn && this.battle) setInterval(() => { timeText.innerHTML = `${timer}`; timer++;}, 1000);
       const end = new Date().getTime();
       this.createTurn(maxCreaturesForBuy);

       console.log(`LoadingTime: ${end - start}ms`);

        // let dd = this.data.dataBase[topCreatureBlocks.tier][0];
        // dd.setAttack(21); 
        // dd.setHP(121);
        

        //let test = document.getElementById(Elements.TopAllCreaturesBlock).childNodes;
        // let test2 = this.data.dataBase[1][0];
        // let test4 = this.data.dataBase[1][1]; //[1] will be tier & id
        
        // let tempTest = getIndex(test[0].childNodes[0]).id;
        // let tempTest2 = getIndex(test[1].childNodes[0]).id; // fix
        
        // console.log("tempTest_id: " + tempTest, "tempTest2_id: " + tempTest2);

        //this.newCreatureHP(test2, test4);

    }
    
    createBattle(){
        
        let enemyCreature;
        let playerCreature;
        
        function getNewPlayerBattleArray(playerArr){
            let returnArray = [];
            for(let i = 0; i < playerArr.length; i++){
                if(playerArr[i] !== undefined && playerArr[i].element === "bottomCreatureBlock") returnArray.push(playerArr[i]);
            }
            console.log(returnArray)
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
                        if (playerBattleCreatureA.unique[i] === Unics.Divine_Shield){
                            console.log('y pleera sit')
                            enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp - playerBattleCreatureA.attack, game.enemyArray);
                            playerBattleCreatureA.setHP(playerBattleCreatureA.hp, game.playerArray);
                            delete playerBattleCreatureA.unique[i];
                        }                    
                    }    
                }
                else if(enemyBattleCreatureA.unique.includes(Unics.Divine_Shield)){
                    for(let i = 0; i < enemyBattleCreatureA.unique.length; i++){
                        if (enemyBattleCreatureA.unique[i] === Unics.Divine_Shield){
                            console.log('y vraga sit')
                            playerBattleCreatureA.setHP(playerBattleCreatureA.hp - enemyBattleCreatureA.attack, game.playerArray);
                            enemyBattleCreatureA.setHP(enemyBattleCreatureA.hp, game.enemyArray);
                            delete enemyBattleCreatureA.unique[i];
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
        function checkWinner(){
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
            let enemyCreaturesAtTheEndOfBattle = getParentArrayOfCreatures(topAllCreaturesBlock);
            let playerCreaturesAtTheEndOfBattle = getParentArrayOfCreatures(bottomAllCreaturesBlock);
            console.log(enemyCreaturesAtTheEndOfBattle.length, playerCreaturesAtTheEndOfBattle.length);
            //game.createTurn();
        }
        function battleSystem(playerBattleCreatureB){
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
                for(let i = 0; i < game.enemyArray.length * 10; i++){
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
        if(this.battle && this.battleCount === 0){
            this.addCreatureToBlock(topAllCreaturesBlock, this.playerArray, this.enemyArray, getNewPlayerBattleArray(this.playerArray).length);
            getCreatures(enemyCreature, playerCreature);

            for(let i = 0; i < this.playerArray.length; i++){
                let playerBattleCreature;
                if(this.playerArray[i] !== undefined && this.playerArray[i].element === "bottomCreatureBlock") {
                    playerBattleCreature = this.playerArray[i];
                    battleSystem(playerBattleCreature);
                }
            }
            
        }
        this.battleCount = 1;
        // if(this.battleCount === 1 && this.battle === true) checkWinner();
        this.battle = false;
    }

    createTurn(){
        this.battleCount = 0;
        this.IsTurn = true; this.battle = false;
        SetTimer(this.IsTurn)
        refreshBlock.onclick = function() {game.tavern.refreshBlock1.refreshTavern(topAllCreaturesBlock, maxCoins);} // in the future 1 will replace to the tier of creature
        upgradeBlock.onclick = function() {game.tavern.upgradeBlock1.upgradeCost(game.tavern)};
        setTimeout(() => { this.addCreatureToBlock(topAllCreaturesBlock, this.playerArray, undefined, this.tavern.maxCreatures)}, 1);
        
        // for (let i = 0; i < this.tavern.maxCreatures; i++) { // 7 max and it works
        //      setTimeout(() => {
        //          creature = this.data.dataBase[1][i];
        //          creature.element = Elements.TopCreatureBlock;
        //          creature.blockInWhichAddCreatureBlock = document.getElementById(`${creature.element}${i}`)
        //          creature.blockInWhichAddCreatureBlock.appendChild(creature.Creatureblock)
        //      }, 1);
        // }

           
    }

    addCreatureToBlock(block, playerArray, enemyArr, maxCreaturesToAdd){
        // Переписать след момент 
        // если рандом существо = одному из существ игрока - перерандомить
        // + переписать систему на проверку повторности элементов
        let data = this.data.dataBase;
        let check;
        let array = [];

        let randomCreatureToAdd; 
        for(let i = 0; i < maxCreaturesToAdd; i++){     
            randomCreatureToAdd = setTier(data, this.tavern.level);
            if(randomCreatureToAdd !== undefined){
                if(check === undefined) check = randomCreatureToAdd;
                while((playerArray.includes(randomCreatureToAdd) || array.includes(randomCreatureToAdd))) randomCreatureToAdd = setTier(data, this.tavern.level);
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
    newCreatureHP(monster1, monster2){
        monster2.setHP(100);
        monster2.setHP(monster2.hp - monster1.attack)
        
        if (monster2.hp <= 0) topAllCreaturesBlock.removeChild(topAllCreaturesBlock.childNodes[monster2.id])
        else return;
        
        //console.log(monster2.element+`${monster1.model}`) //check
        
    }


    getCreatureFromGame(temp){
        return getIndex(temp.childNodes[0]);
    }
}
