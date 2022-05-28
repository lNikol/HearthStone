
/**
 * @param {string} element
 * @param {boolean} visible
 * @param {object} att
 */

 class Creature {
    constructor(tier, attack, hp, type, id, unique,) {
      // get stats from bd , add tier , remove hp & attack, add hp in battle, hp after battle = hp, new hp (if is increase) = hp + up
      this.element = Elements.TopCreatureBlock;
      this.visible = true;
      
      this.tier = tier; 
      this.attack = attack;
      this.hp = hp;
      this.firstHP = this.hp;  
      this.firstAttack = this.attack;  
      this.type = type;
      this.id = id;    
      this.model = `creature${id}`;
      this.unique = unique;
      this.firstUnique = this.unique;
      //BC - battleCry
      this.BCamount = (this.unique.includes(Unics.Battlecry))? 1: 0;
      this.blockInWhichAddCreatureBlock = document.getElementById(`${this.element}0`);
      this.img = this.createImage();
      this.CreatureHpImg = this.createHpImage();
      this.CreatureAttackImg = this.createAttackImage();
      this.Creatureblock = this.createCreatureBlock();   
      this.attackText = this.createAttackText();
      this.defaultHP = this.createHpText();  
      createUniqueBlock(this);
      
    }
  
    replaceHPCSS(block) {
      if(game.battle){
        if (true && this.hp !== this.firstHP) block.style.cssText += `color: forestgreen;`;
        else{block.style.cssText += 'color:black;';}
      }
      else{
        if (this.hp >= 10 && this.hp <= 99) block.style.cssText += `font-size: ${totalTextSize}px; left:${leftPX + 3}px; 
        bottom:${totalBottom}px;`;
        else if (this.hp >= 100) block.style.cssText += `font-size: ${totalTextSize-1}px; left:${leftPX-1}px; bottom:${totalBottom}px;`;
        else if (this.hp === this.firstHP && block.style.color === "forestgreen") block.style.cssText += "color:black";
        else block.style.cssText += `font-size:${defaultTextSize}px; left:${leftPX + 6}px; bottom:${defaultBottom - 1}px;`;
      }


      
      setTimeout(() => {
        
       }, 1); 
  
    }
  
    replaceAttackCSS(block) {
      // Изменение шрифта и отступа в зависимости от числа
      if (this.attack >= 10 && this.attack <= 99) block.style.cssText += `font-size: ${totalTextSize - 1}px; left:4px; bottom:${totalBottom - 28}px;`;
      else if (this.attack >= 100) block.style.cssText += `font-size: ${totalTextSize - 2}px; left:0px; bottom:${totalBottom - 28}px;`;
      else block.style.cssText += `font-size:${defaultTextSize}px; left:8px; bottom:${defaultBottom - 27 - 1}px;`;
      setTimeout(() => {
        if (game.battle === true && this.attack !== this.firstAttack) block.style.cssText += `color: green;` 
        else if (game.battle === false && this.attack === this.firstAttack && block.style.color === "green") block.style.cssText += "color:black";}, 1); // lightgreen
    }
  
    update() {
      this.replaceHPCSS(this.Creatureblock.childNodes[4]);
      this.replaceAttackCSS(this.Creatureblock.childNodes[3]);
    }
  
    updateVisibility(visible, visibility){
      this.visible = visible;
      this.Creatureblock.style.visibility = visibility;
    }
  
    removeCreatureBlock(){
      this.updateVisibility(false, "hidden");
      this.blockInWhichAddCreatureBlock.removeChild(this.Creatureblock); 
      updateAttribute(this.Creatureblock, this);
    }
  
    setHP(otherHP, array) {
      this.hp = otherHP;
      this.Creatureblock.childNodes[4].textContent = this.hp;
      let shield = this.Creatureblock.childNodes[5];

      if(this.hp <= 0 && game.battle === true) {
      setTimeout(() => {
        this.hp = this.firstHP;
        this.Creatureblock.childNodes[4].textContent = this.hp;
        this.Creatureblock.removeAttribute("battle");
        this.Creatureblock.attributes.sell ? this.Creatureblock.removeAttribute("sell"): '';
        this.Creatureblock.setAttribute("buy", "only for buy");
        this.updateVisibility(false, "hidden");
        
        checkCreatureClass(this);

        if(this.Creatureblock.parentNode !== null){
        this.Creatureblock.parentNode.removeChild(this.Creatureblock);
        updateAttribute(this.Creatureblock, this);
        DivineVisibility(shield, this);
        for(let i = 0; i < array.length; i++) if (this === array[i]) delete array[i];
        }
        }, 600);
       
      }
      else if(this.hp > 0 && game.battle === false){
        this.hp = this.firstHP; this.unique = this.firstUnique;
        this.Creatureblock.childNodes[4].textContent = this.hp;
        DivineVisibility(shield, this);
        this.Creatureblock.attributes.battle ? this.Creatureblock.removeAttribute("battle"): '';
      }
      else {DivineVisibility(shield, this);
      this.Creatureblock.attributes.battle ? this.Creatureblock.removeAttribute("battle"): '';
 }
      
      this.update();
    }
  
    setAttack(otherAttack) {
      this.attack = otherAttack;
      this.Creatureblock.childNodes[3].textContent = this.attack;
      this.update();
    }
    
    createCreatureBlock() {
      
      let creature = createBlock(`creature${this.id}`, `creature`, ``);
      creature.setAttribute("buy", "only for buy");
      topCount++;
  
      creature.append(this.img, this.CreatureHpImg, this.CreatureAttackImg);
      
      let seen = []
      if (this.visible) {
        creature.style.cssText += `visibility: visible;`;
        creature.setAttribute("insideCreature", JSON.stringify(this, function(key, val) {
          if (val != null && typeof val == "object") {
               if (seen.indexOf(val) >= 0) return;
               seen.push(val);
           }
           return val;
       }) );
      } else creature.style.cssText += `visibility: hidden;`;
      
      this.blockInWhichAddCreatureBlock.append(creature);  
      
      
      let bool = false;
  
      let thisObj = JSON.parse(creature.attributes.insidecreature.nodeValue);
      
      creature.onmouseover = function () {
        
        let tempCreature = document.createElement("div");
        tempCreature.className = "tempCreature"; tempCreature.id = `tempCreature${thisObj.id}`;
        tempCreature.style.cssText = `z-index: ${thisObj.id};
          width:100px; height: 100px; position:absolute; display:inline-block;
          left: ${creature.getBoundingClientRect().x + 75}px; 
          top: ${creature.getBoundingClientRect().y - 70}px;`;
  
        let tempCreatureImage = document.createElement("img");
        tempCreatureImage.src = `${ImageSrc}/Tier ${thisObj.tier}/${thisObj.id}/${cardImage}.webp`;
        if(tempCreatureImage.src !== undefined) tempCreature.append(tempCreatureImage);
        tempCreatureImage.onerror = function(e) {/*genPopUpBlock(all,'Image not found');*/ console.clear();};
        let uniqueInfo = thisObj.unique;
        
        if (!bool) {
          let tempBlock = document.createElement("div");
          tempBlock.style.cssText = `
            width:200px; height:${100 * uniqueInfo.length}px; background-color:gray; position:absolute; 
            font-size:16px; color:black; text-align: center;
            left:209px; `;
  
          for (let i = 0; i < uniqueInfo.length; i++) {
            tempBlock.id = `${thisObj.id}`;
            if (creature.parentNode.parentNode.id === Elements.BottomAllCreaturesBlock ) {
              tempBlock.style.cssText += `top: ${creature.getBoundingClientRect().y - 450}px;`;
            } else if (creature.parentNode.parentNode.id === Elements.TopAllCreaturesBlock) {
              tempBlock.style.cssText += ` top: ${creature.getBoundingClientRect().y - 279}px;`;
            }
  
            let title = document.createElement("div");
            title.id = `tempBlock${thisObj.id}${i}`;
            title.style.cssText = `width:200px; height:24px; font-size:22px; color:white; text-align:center; margin-bottom:3px;
            left: ${title.getBoundingClientRect().x}px; 
            top: ${title.getBoundingClientRect().y}px;`;
  
            function getUnic() {
              //game.tavern.upgradeBlock1.upgradeCost(thisObj)
              switch (uniqueInfo[i]) {
                case Unics.Reborn: return "После первой смерсти воскресает с 1 ед. здоровья";
                case Unics.Taunt: return "Противники вынуждены атаковать это существо";
                case Unics.Battlecry: return "Бонусный эффект при разыгрывании из руки";
                case Unics.Deathrattle: return "Срабатывает в момент гибели";
                case Unics.Start_of_Combat: return "Бонусный эффект в начале фазы боя";
                case Unics.Divine_Shield: return "Когда существо в первый раз получает урон, он не засчитывается"
                case Unics.Blood_Gem: return "Заклинание, дающее вашему существу +1/+1";
                case Unics.Poison: return "Уничтожает существо, которому наносит урон";
                case "": break;
                default: break;
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
      creature.onmouseout = function () { deleteTempCreature(thisObj); deleteAllTempCreatures(); };
  
      creature.onselectstart = function () { return false; };
      creature.onmousedown = function (e) {
        deleteTempCreature(thisObj);
        deleteAllTempCreatures();
       
        creature.style.cssText += `z-index:10000;`;
        function moveAt(e) {
          
          deleteAllTempCreatures();
          function replaceCSSforBuyCreatures(creature){ creature.style.cssText += `left:0px; top:0px; position: relative;` }

          
          if (creature.style.visibility !== "hidden" &&
          creature.attributes.buy && game.battle !== true){   
              creature.onmouseup = function(e){
              creature.style.cssText += `z-index:auto;`;
              creature.style.marginLeft = 0;
              document.onmousemove = null;
              
              if(checkBottomCoordsXY(e.pageX, 884, 1049, e.pageY, 689, 859) 
              && game.tavern.playerCoins >= 3 && bottomPlayerCreatures.childNodes.length <= 2){
                creature.removeAttribute("buy");
                game.tavern.playerCoins -= 3;
                let blockForAdd = game.data.dataBase[thisObj.tier][thisObj.id];
                game.tavern.update(game.tavern.playerCoins, maxCoins);
                game.playerArray[blockForAdd.id] = blockForAdd;
                creature.setAttribute("handcard", "Ready");
                addBlockToPlayer(creature, thisObj);
                
              }
              else if(checkBottomCoordsXY(e.pageX, 884, 1049, e.pageY, 689, 859) &&
              creature.attributes.buy && bottomPlayerCreatures.childNodes.length <= 2 && game.tavern.playerCoins < 3){
                console.log("net deneg");
                genPopUpBlock(all, "Your coins are: " + game.tavern.playerCoins + " but You need 3 or more coins" );
                replaceCSSforBuyCreatures(creature);
              }
              else if(checkBottomCoordsXY(e.pageX, 884, 1049, e.pageY, 689, 859) && bottomPlayerCreatures.childNodes.length === 3){
                console.log("net mesta");  
                genPopUpBlock(all, `You have limits on the number of creatures in your hand (${bottomPlayerCreatures.childNodes.length}/3)`);
                replaceCSSforBuyCreatures(creature);
              }
              else {replaceCSSforBuyCreatures(creature)}
            }
          }
          creature.style.left = e.pageX - creature.offsetWidth / 2 + "px";
          creature.style.top = e.pageY - creature.offsetHeight / 2 + "px";
        }
       
        
        document.onmousemove = function (e) {
          if(game.battle === false){         
            let blockForAdd = game.data.dataBase[thisObj.tier][thisObj.id];
            // Проверяем, коснулось ли блока topAvatar
          if (checkTopCoordsXY(e.pageX, 900, 1045, e.pageY, 140, 210) && creature.attributes.sell) {
            // sell and delete creature 
            creature.onmouseup = function(){
              document.onmousemove = null;
              deleteBlock(creature, blockForAdd);
            }
          }
          else{replaceCreatureCSS(creature);}
  
            creature.style.position = "absolute";
            deleteTempCreature(blockForAdd);
            moveAt(e);
            addCreaturesToPlayerField(e, creature, blockForAdd);
          }
        };
        
  
        creature.onmouseup = function () {
          creature.style.cssText += `z-index:auto;`;
          document.onmousemove = null;
          creature.onmouseup = null;
         };
  
        creature.ondragstart = function () { return false; };
  
      };
      count++; 
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
      hpImage.src = `${ImageSrc}/battle/Health.png`;
      hpImage.style.cssText += `
      width:35px; height:50px; position:relative; bottom:60px; left:75px; z-index:auto;`;
      return hpImage;
    }
  
    createHpText() {
  
      let hpBlock = document.createElement("div");
      hpBlock.innerHTML += this.hp;
      hpBlock.id = "CreatureHP";
      hpBlock.style.cssText += `z-index:auto; width:50px; height: 30px; position:relative; color:black; font-weight:bold;text-shadow: white 1.5px 0 3px; `;
      
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
      atImage.src = `${ImageSrc}/battle/Attack.png`;
      atImage.style.cssText = `z-index:auto;
      width:50px; height:57.5px; position:relative; bottom:60px; left:-50px;`;
      return atImage;
    }
  
  }