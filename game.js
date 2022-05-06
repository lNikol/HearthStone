"use strict";
// сделать презагрузку html & css
// fix annimation onmouseover
function SetTimer(turn){
    let TurnTimer = turn * 10;
    if(turn) setInterval(() => {
        timeText.innerHTML = `${TurnTimer}`; if(TurnTimer > 0) TurnTimer--;//--
        else { 
           timeText.innerHTML = 'Sec';
           if(turn) game.deleteTavernCreatures(); game.turn = false; game.battle = true;
           //this.addCreatureToBlock(enemyBlock, game.tavern.maxCreatures)
           game.createBattle();
        }
       }, 1000);
}

function setTier(data, level){
    let randomForTier = Math.floor(Math.random()*level+1)
    let randomTier = randomForTier <= level? randomForTier: randomForTier;
    let random; random = data[randomTier][Math.floor(Math.random() * data[randomTier].length)]
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
        this.playerArray = [];
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

 

       let testHero = new Hero("bottomAvatar", "hero", 40,`${ImageSrc}/Galewing/${origImage}.webp`, 1);
       let testHero2 = new Hero("topAvatar", "hero", 40, `${ImageSrc}/Bob.png`, 1);
       this.data.addInDB(0, testHero, testHero.id);
       this.data.addInDB(0, testHero2, testHero2.id);

       let timer = 0;
       if(!this.IsTurn && this.battle) setInterval(() => { timeText.innerHTML = `${timer}`; timer++;}, 1000);
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
        
        // this.getTopCreatures(tempTest, tempTest2, test);
        //this.newCreatureHP(test2, test4);

    }
    
    createBattle(enemyArrayOfCreatures){

    }

    createTurn(){
        SetTimer(turn)
        this.IsTurn = true;
        let buyArray;

        refreshBlock.onclick = function() {game.tavern.refreshBlock1.refreshTavern(1, topAllCreaturesBlock, maxCoins);} // in the future 1 will replace to the tier of creature
        upgradeBlock.onclick = function() {game.tavern.upgradeBlock1.upgradeCost(game.tavern)};
        let creature;
        for (let i = 0; i < this.tavern.maxCreatures; i++) { // 7 max and it works
            setTimeout(() => {
                creature = this.data.dataBase[1][i];
                creature.element = Elements.TopCreatureBlock;
                creature.blockInWhichAddCreatureBlock = document.getElementById(`${creature.element}${i}`)
                creature.blockInWhichAddCreatureBlock.appendChild(creature.Creatureblock)
            }, 1);
        }

        console.log(this.playerArray)
        buyArray = this.playerArray;
           
    }

    addCreatureToBlock(block, tier){
        // Переписать след момент 
        // если рандом существо = одному из существ игрока - перерандомить
        // + переписать систему на проверку повторности элементов
        let data = this.data.dataBase;
        let check;
        let array = [];
        for(let i = 0; i < game.tavern.maxCreatures; i++){     
            let randomCreatureToAdd = setTier(data, this.tavern.level);           
            if(randomCreatureToAdd !== undefined){
                if(check === undefined) check = randomCreatureToAdd;    
                while((this.playerArray.includes(randomCreatureToAdd) || array.includes(randomCreatureToAdd))) randomCreatureToAdd = setTier(data, this.tavern.level);
                block.childNodes[i].appendChild(randomCreatureToAdd.Creatureblock);   
            }
            check = randomCreatureToAdd;
            array.push(randomCreatureToAdd)
        }    
    }

    deleteTavernCreatures(){
        for (let i = 0; i < topAllCreaturesBlock.childNodes.length; i++){
            let parentBlockChildren = topAllCreaturesBlock.childNodes[i];
            if(parentBlockChildren !== undefined && parentBlockChildren.childNodes[0] !== undefined){
                    let objectCreature = JSON.parse(parentBlockChildren.childNodes[0].attributes.insideCreature.nodeValue);
                    let dataCreature = this.data.dataBase[objectCreature.tier][objectCreature.id];
                    dataCreature.element = ''; dataCreature.visible = false;
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
    // test2  - длина дочерних элементов
    // Получение рандомного существа сверху, для будущей системы боя
    getTopCreatures(firstTopCreatureId, secondTopCreatureId, test2){
        //  let newObjID = Math.floor(Math.random()*test2.length);
        //  console.log("newObjID: "+newObjID);

        // while((newObjID >= firstTopCreatureId && newObjID <= secondTopCreatureId) == false){
        //     newObjID = Math.floor(Math.random()*test2.length);
        //     console.log("new newObjID : " + newObjID)   
            //console.log(this.getCreatureFromGame(test2[newObjID]))
        //}
       
    }

    getCreatureFromGame(temp){
        return getIndex(temp.childNodes[0]);
    }
}
