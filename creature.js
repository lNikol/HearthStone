// Сделать проверку выхода блока существа(creature${count})
// из границ родительного блока (bottomCreatureBlock${count})
"use strict";

function getIndex(creature){
  let object;
  let text = window.navigator.userAgent;
  let text2 = text.match(regex)
  let array = [];
  for(let index = 0 ; index < text2.length; index++){
    let text3 = text2[index].replace('/','');
    array.push(text3);
    
    if(index == (text2.length-1)) {
      switch(array[array.length-1]){
        case "Firefox": object = JSON.parse(creature.attributes[4].nodeValue); break;
        default: object = JSON.parse(creature.attributes[3].nodeValue); break;
      }
    }
}
return object;
}

/**
 * @param {number} x0 
 * @param {number} x1 
 * @param {number} x2 
 * @param {number} y0 
 * @param {number} y1 
 * @param {number} y2 
 * @returns {boolean}
 */
function checkTopCoordsXY(x0, x1, x2, y0, y1, y2){
  return ((x0 >= x1 && x0 <= x2) && (y0 >= y1 && y0 <= y2))
}

/**
   * @param {number} x0 
   * @param {number} x1 
   * @param {number} x2 
   * @param {number} y0 
   * @param {number} y1 
   * @param {number} y2 
   * @returns {boolean}
   */
function checkBottomCoordsXY(x0, x1, x2, y0, y1, y2){
  return ((x0 >= x1 && x0 <= x2) && (y0 >= y1 && y0 <= y2))
}

/**
 * @param {object} creatureObject
 */
function deleteBlock(block, creatureObject){
    if (block.parentNode){
      let blockForDelete = game.data.dataBase[creatureObject.tier][creatureObject.id];
      block.parentNode.removeChild(block);
      block.style.cssText = `position:relative; left:0; top:0; float: left; margin-left:15px;`;
      blockForDelete.element = "bottomPlayerCreatures";
      if(block.attributes.sell){delete game.playerArray[blockForDelete.id]; }
    }
}

function addBlockToPlayer(block, creatureObject){
    block.style.cssText += `margin-left: 15px;`
    bottomPlayerCreatures.append(block)
}

function deleteTempCreature(creatureObject){
  let tempBlock = document.getElementById(`tempCreature${creatureObject.id}`);
  if (tempBlock == undefined) return; else all.removeChild(tempBlock);
}

/**
 * 
 * @param {number} id 
 */
function setCSS_addInBlock(block, id){
  let objectBlock = JSON.parse(block.attributes.insidecreature.nodeValue)
  let secondBlock = game.data.dataBase[objectBlock.tier][objectBlock.id];
  block.style.cssText += "relative; left:0; top:0;";
  if (bottomAllCreaturesBlock.childNodes[id].childNodes[0] === undefined) { 
    bottomAllCreaturesBlock.childNodes[id].appendChild(block);
    block.removeAttribute("handcard");
    block.setAttribute("sell", "only for sell");
    secondBlock.element = Elements.BottomCreatureBlock;
  }  
}

// Добавление существ на стол игрока
function addCreaturesToPlayerField(e, block){
  if (checkBottomCoordsXY(e.pageX, 530, 1370, e.pageY, 520, 580) &&
  (block.attributes.handcard || block.attributes.sell)) {
    block.onmouseup = function(){
      block.style.cssText = `z-index:auto; position:relative; left:0; top:0; float: left; margin-left:15px;`;
      document.onmousemove = null;
      if(checkBottomCoordsXY(e.pageX, 500, 630, e.pageY, 520, 600)) setCSS_addInBlock(block, 0);
      else if(checkBottomCoordsXY(e.pageX, 631, 760, e.pageY, 520, 600)) setCSS_addInBlock(block, 1);
      else if(checkBottomCoordsXY(e.pageX, 761, 890, e.pageY, 520, 600)) setCSS_addInBlock(block, 2);
      else if(checkBottomCoordsXY(e.pageX, 891, 1020, e.pageY, 520, 600)) setCSS_addInBlock(block, 3);
      else if(checkBottomCoordsXY(e.pageX, 1021, 1150, e.pageY, 520, 600)) setCSS_addInBlock(block, 4);
      else if(checkBottomCoordsXY(e.pageX, 1151, 1280, e.pageY, 520, 600)) setCSS_addInBlock(block, 5);
      else if(checkBottomCoordsXY(e.pageX, 1281, 1410, e.pageY, 520, 600)) setCSS_addInBlock(block, 6);
      else {block.style.cssText += `left:0px; top:0px; position: relative;`}
    }
  }
  
}


/**
 * @param {string} element
 * @param {boolean} visible
 * @param {object} att
 */
class Creature {
  constructor(tier, attack, hp, type, id, unique, width = 100, height = 130) {
    // get stats from bd , add tier , remove hp & attack, add hp in battle, hp after battle = hp, new hp (if is increase) = hp + up

    this.element = Elements.TopCreatureBlock;
    this.visible = true;
    this.unique = unique;
    this.attack = attack;
    this.hp = hp;
    this.type = type;
    this.tier = tier; // исправить - ??
    this.firstHP = this.hp;  
    this.firstAttack = this.attack;  
    this.id = id;    
    this.model = `creature${id}`;

    this.blockInWhichAddCreatureBlock = document.getElementById(`${this.element}0`);
    this.img = this.createImage();
    this.CreatureHpImg = this.createHpImage();
    this.CreatureAttackImg = this.createAttackImage();
    this.Creatureblock = this.createCreatureBlock(this.element);   
    this.attackText = this.createAttackText();
    this.defaultHP = this.createHpText();  
    this.unicBlock = this.createUniqueBlock();
    
  }

  replaceHPCSS(block) {
    // Изменение шрифта и отступа в зависимости от числа
    if (this.hp >= 10 && this.hp <= 99) block.style.cssText += `font-size: ${totalTextSize}px; left:${leftPX + 3}px; 
    bottom:${totalBottom}px;`;
    else if (this.hp >= 100) block.style.cssText += `font-size: ${totalTextSize-1}px; left:${leftPX-1}px; bottom:${totalBottom}px;`;
    else block.style.cssText += `font-size:${defaultTextSize}px; left:${leftPX + 6}px; bottom:${defaultBottom - 1}px;`;
    if (this.hp !== this.firstHP) block.style.cssText += `color: green;` // lightgreen

  }

  replaceAttackCSS(block) {
    // Изменение шрифта и отступа в зависимости от числа
    if (this.attack >= 10 && this.attack <= 99) block.style.cssText += `font-size: ${totalTextSize - 1}px; left:4px; bottom:${totalBottom - 28}px;`;
    else if (this.attack >= 100) block.style.cssText += `font-size: ${totalTextSize - 2}px; left:0px; bottom:${totalBottom - 28}px;`;
    else block.style.cssText += `font-size:${defaultTextSize}px; left:8px; bottom:${defaultBottom - 27 - 1}px;`;
    if (this.attack !== this.firstAttack) block.style.cssText += `color: green;` // lightgreen
  }

  update() {
    this.replaceHPCSS(this.Creatureblock.childNodes[4]);
    this.replaceAttackCSS(this.Creatureblock.childNodes[3]);
  }
  
  removeCreatureBlock(){
    this.blockInWhichAddCreatureBlock.removeChild(this.Creatureblock); 
  }
  setHP(otherHP) {
    this.hp = otherHP;
    this.Creatureblock.childNodes[4].textContent = this.hp;
    this.update();
  }

  setAttack(otherAttack) {
    this.attack = otherAttack;
    this.Creatureblock.childNodes[3].textContent = this.attack;
    this.update();
  }

  setCreature() {
    return this;
  }

  getHP() {
    return this.hp;
  }
  
  createCreatureBlock(element) {
    
    let creature = createBlock(`creature${this.id}`, `creature`, `z-index:auto`);
    creature.setAttribute("buy", "only for buy");
    topCount++;

    creature.append(this.img, this.CreatureHpImg, this.CreatureAttackImg);
    
    let seen = []
    if (this.visible) {
      creature.style.cssText += `visibility: visible;`;
      creature.setAttribute("insideCreature", JSON.stringify(this, function(key, val) {
        if (val != null && typeof val == "object") {
             if (seen.indexOf(val) >= 0) {
                 return;
             }
             seen.push(val);
         }
         return val;
     }) );
    } else creature.style.cssText += `visibility: hidden;`;
    
    this.blockInWhichAddCreatureBlock.append(creature);  
    
    
    let bool = false;

    let thisObj = getIndex(creature);
    
    creature.onmouseover = function () {
      
      let tempCreature = document.createElement("div");
      tempCreature.id = `tempCreature${thisObj.id}`;
      tempCreature.style.cssText = `z-index: ${thisObj.id};
        width:100px; height: 100px; position:absolute; display:inline-block;
        left: ${creature.getBoundingClientRect().x + 75}px; 
        top: ${creature.getBoundingClientRect().y - 70}px;`;

      let tempCreatureImage = document.createElement("img");
      tempCreatureImage.src = `${ImageSrc}/Tier ${thisObj.tier}/${thisObj.id}/${cardImage}.webp`;
      tempCreature.append(tempCreatureImage);
      tempCreatureImage.onerror = function(e) {alert('Image not found'); console.clear();};
      let uniqueInfo = thisObj.unique;
      
      if (!bool) {
        let tempBlock = document.createElement("div");
        tempBlock.style.cssText = `
          width:200px; height:${100 * uniqueInfo.length}px; background-color:gray; position:absolute; 
          font-size:16px; color:black; text-align: center;
          left:209px; `;

        for (let i = 0; i < uniqueInfo.length; i++) {
          if (creature.parentNode.parentNode.id == Elements.BottomAllCreaturesBlock ) {
            tempBlock.style.cssText += `top: ${creature.getBoundingClientRect().y - 450}px;`;
            tempBlock.id = `${thisObj.id}`;
          } else if (creature.parentNode.parentNode.id == Elements.TopAllCreaturesBlock) {
            tempBlock.style.cssText += ` top: ${creature.getBoundingClientRect().y - 279}px;`;
            tempBlock.id = `${thisObj.id}`;
          }

          let title = document.createElement("div");
          title.id = `tempBlock${thisObj.id}${i}`;
          title.style.cssText = `width:200px; height:24px; font-size:22px; color:white; text-align:center; margin-bottom:3px;
          left: ${title.getBoundingClientRect().x}px; 
          top: ${title.getBoundingClientRect().y}px;`;

          function getUnic() {
            //game.tavern.upgradeBlock1.upgradeCost(thisObj)
            switch (uniqueInfo[i]) {
              case Unics.Reborn:
                 return "После первой смерсти воскресает с 1 ед. здоровья";
              case Unics.Taunt:
                 return "Противники вынуждены атаковать это существо";
              case Unics.Battlecry:
                 return "Бонусный эффект при разыгрывании из руки";
              case Unics.Deathrattle:
                 return "Срабатывает в момент гибели";
              case Unics.Start_of_Combat:
                 return "Бонусный эффект в начале фазы боя";
              case Unics.Divine_Shield:
                 return "Когда существо в первый раз получает урон, он не засчитывается"
              case Unics.Blood_Gem:
                 return "Заклинание, дающее вашему существу +1/+1";
              case Unics.Poison:
                return "Уничтожает существо, которому наносит урон";
              case "": break;
            }
          }

            /**
             * Если кратко, то здесь проводится проверка по значению у временных блоков
             * уникальных качеств существ
             * Весь этот код выполняется при наведении курсора мыши на существо
             */ 

             title.innerHTML = uniqueInfo[i];
             tempBlock.appendChild(title);
             tempBlock.innerHTML += getUnic();  
             tempBlock.style.cssText += `visibility:hidden;`
             tempCreature.append(tempBlock);
             
             setTimeout(() => {
               if (tempBlock.textContent === "undefined") tempCreature.removeChild(tempBlock);
               else {tempBlock.style.cssText += `visibility:visible;`;}
             }, 100);
            
          if (tempBlock.innerHTML == "") break;
          else{ if(creature.parentNode !== bottomPlayerCreatures) all.append(tempCreature); }
        }
      }
    };

    // Фикс бага при продажи существа (не удалялись временные блоки)
    creature.onmouseout = function () { deleteTempCreature(thisObj);  };

    creature.onselectstart = function () { return false; };
    creature.onmousedown = function (e) {
      deleteTempCreature(thisObj);
     
      creature.style.cssText += `z-index:10000;`;
      function moveAt(e) {
        function replaceCSSforBuyCreatures(creature){
          creature.style.cssText += `left:0px; top:0px; position: relative;`
        }

        // поменять границы на большие
        // Проверка, коснулись ли блока героя игрока
        if (creature.style.visibility !== "hidden" &&
        creature.attributes.buy){   
          creature.onmouseup = function(e){
            creature.style.cssText += `z-index:auto;`;
            creature.style.marginLeft = 0;
            document.onmousemove = null;
            if(checkBottomCoordsXY(e.pageX, 910, 995, e.pageY, 680, 718) && game.tavern.playerCoins >= 3 && bottomPlayerCreatures.childNodes.length <= 2){
              creature.removeAttribute("buy");
              game.tavern.playerCoins -= 3;
              //переписать потом на уникальные id
              let blockForAdd = game.data.dataBase[thisObj.tier][thisObj.id];
              game.tavern.update(game.tavern.playerCoins, maxCoins);
              game.playerArray[blockForAdd.id] = blockForAdd;
              game.drawPlayerArray();
              
              creature.setAttribute("handcard", "Ready");
              deleteBlock(creature, thisObj);
              addBlockToPlayer(creature, thisObj);
            }
            else if(checkBottomCoordsXY(e.pageX, 910, 995, e.pageY, 680, 718) &&
            creature.attributes.buy && bottomPlayerCreatures.childNodes.length <= 2){
              alert ("Your coins are: " + game.tavern.playerCoins + " but You need 3 or more coins" );
              replaceCSSforBuyCreatures(creature);
            }
            else if(checkBottomCoordsXY(e.pageX, 910, 995, e.pageY, 680, 718) && bottomPlayerCreatures.childNodes.length === 3){
              alert(`You have limits on the number of creatures in your hand (${bottomPlayerCreatures.childNodes.length}/3)`);
              replaceCSSforBuyCreatures(creature);
            }
            else {replaceCSSforBuyCreatures(creature)}
          }
        }
        creature.style.left = e.pageX - creature.offsetWidth / 2 + "px";
        creature.style.top = e.pageY - creature.offsetHeight / 2 + "px";
      }
      function replaceCreatureCSS(creature){
        creature.onmouseup = function() {
        creature.style.cssText += `z-index:auto;`;
        document.onmousemove = null; 
        creature.style.cssText += `left:0px; top:0px; float:left; margin-left:15px; position: relative;`}
      }
      
      document.onmousemove = function (e) {
        creature.style.cssText += `margin-left:15px;`;
        if(game.battle === false){         
        // Проверяем, коснулось ли блока topAvatar
        if (checkTopCoordsXY(e.pageX, 910, 1035, e.pageY, 140, 210) && creature.parentNode && creature.attributes.sell) {
          // Прототип продажи и удаления существа (не удаляется из бд новые значения) (прописано, но не активизировано)
            creature.onmouseup = function(){
            creature.style.cssText += `z-index:auto;`;
            creature.style.marginLeft = 0;
            document.onmousemove = null;
            game.drawPlayerArray();
            deleteBlock(creature, thisObj);            
            game.tavern.playerCoins++; // ++
            game.tavern.update_2(game.tavern.playerCoins);
            game.tavern.update(game.tavern.playerCoins, maxCoins);
            creature.removeAttribute("sell");
            creature.setAttribute("buy", "only for buy");
            creature.style.marginLeft = 0;
          }
        }
        else{replaceCreatureCSS(creature);}

          creature.style.position = "absolute";
          deleteTempCreature(thisObj);
          moveAt(e);
          addCreaturesToPlayerField(e, creature);
        }
      };
      

      // отследить окончание переноса
      creature.onmouseup = function () {
        creature.style.cssText += `z-index:auto;`;
        
        document.onmousemove = null;
        creature.onmouseup = null;
       };

      creature.ondragstart = function () { return false; };

    };
    count++; // вывод, скок существ загружено 
    return creature;
    
  }

  createImage() {
    
    let iamg = document.createElement("img");
    iamg.src = `${ImageSrc}/Tier ${this.tier}/${this.id}/${origImage}.webp`;
    iamg.style.cssText += `z-index:auto;
    width: ${defaultCreatureWidth}px; height: ${defaultCreatureHeight}px; border-radius:50%; `;
    return iamg;
  }

  createHpImage() {
    
    let hpImage = new Image();
    hpImage.src = `${ImageSrc}/Health.png`;
    hpImage.style.cssText += `
    width:35px; height:50px; position:relative; bottom:60px; left:75px; z-index:auto;`;
    return hpImage;
  }

  createHpText() {

    let hpBlock = document.createElement("div");
    hpBlock.innerHTML += this.hp;
    hpBlock.id = "CreatureHP";
    hpBlock.style.cssText += `z-index:auto; width:50px; height: 30px; position:relative; color:black; font-weight:bold;text-shadow: white 1.5px 0 3px; `; //text-shadow: black 2px 1px 3px;
    
    this.replaceHPCSS(hpBlock);
    this.Creatureblock.append(hpBlock);
    return hpBlock.textContent;
  }

  createAttackText() {

    let attackBlock = document.createElement("div");
    attackBlock.innerHTML += this.attack;
    attackBlock.id = "CreatureAttack";
    attackBlock.style.cssText += `z-index:auto; width:50px; height: 30px; position:relative; color:black; font-weight:bold; `;
    
    this.replaceAttackCSS(attackBlock);
    this.Creatureblock.append(attackBlock);
    return this.attack;
  }

  createAttackImage() {
    
    let atImage = new Image();
    atImage.src = `${ImageSrc}/Attack.png`;
    atImage.style.cssText = `z-index:auto;
    width:50px; height:57.5px; position:relative; bottom:60px; left:-50px;`;
    return atImage;
  }

  createUniqueBlock(){

    for (let i = 0;  i < this.unique.length; i++){
      switch(this.unique[i]){
      case Unics.Divine_Shield:
        let uniqueBlockDivine_Shield = 
        createBlock("uniqueBlockDivine_Shield", "",
        `width: ${defaultCreatureWidth}px; height: ${defaultCreatureHeight + 10}px; 
        opacity:0.3; position:relative; z-index:auto;
        border-radius:50%; bottom:${defaultBottom * 2}px; left:0; background-color:gold; user-select:none;`
        );
        
        uniqueBlockDivine_Shield.onselectstart = function () { return false; };
        this.Creatureblock.append(uniqueBlockDivine_Shield) ;
        break;

       case Unics.Reborn:
          let uniqueBlockReborn = 
          createBlock("uniqueBlockReborn", "",
          `width: ${defaultCreatureWidth + 10}px; height: ${defaultCreatureHeight + 10}px; 
          opacity:0.3; position:relative; z-index:auto;
          border-radius:50%; bottom:${defaultBottom*2}px; left:-5px; background-color:rgb(31, 81, 255);
          user-select:none;`
          );

          uniqueBlockReborn.onselectstart = function () { return false; };
          this.Creatureblock.append(uniqueBlockReborn) ;
          break;
      
      case Unics.Deathrattle:
        let deathImg = createImageBlock(`${ImageSrc}/Death.png`, "deathImg", "", 
        `width:25px; height:25px; position:relative; z-index:auto;
        bottom: ${ defaultBottom + 12 }px; transform: scale(1.5); margin-left:40px;`);
        this.Creatureblock.append(deathImg)
        break;
      
      case Unics.Poison:
        let poisonImg = createImageBlock(`${ImageSrc}/poison.png`, "poisonImg", "",
        `width:25px; height:32px; position:relative; z-index:auto;
        bottom: ${ defaultBottom + 19 }px; transform: scale(1.1); margin-left:40px;
        `);
        this.Creatureblock.append(poisonImg)
        break;
      }
    }
  }
}