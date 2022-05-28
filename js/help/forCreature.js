"use strict";

function createUniqueBlock(creatureObject){
  for (let i = 0; i < creatureObject.unique.length; i++){
    switch(creatureObject.unique[i]){
    case Unics.Divine_Shield: createDivineShield(creatureObject); break;
    case Unics.Reborn: createReborn(creatureObject); break;
    case Unics.Deathrattle: createDeathImg(creatureObject); break;
    case Unics.Poison: createPosionImg(creatureObject); break;
    }
  }
}


function DivineVisibility(shield, obj){
  if (shield !== undefined && 
    (shield.id === "Block_Divine_Shield" || shield.id === "Block_Reborn") 
    && obj.Creatureblock !== undefined) shield.style.visibility = "visible";
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
  let blockForDelete = game.data.dataBase[creatureObject.tier][creatureObject.id];
  blockForDelete.element = Elements.TopCreatureBlock; 
  
  checkCreatureClass(creatureObject);
  game.tavern.playerCoins++;
  game.tavern.update_2(game.tavern.playerCoins);
  game.tavern.update(game.tavern.playerCoins, maxCoins);

  block.removeAttribute("sell");
  block.setAttribute("buy", "only for buy");
  block.style.cssText += `position:relative; margin-left:0px; top:0px; left:0px;`;

  block.parentNode.removeChild(block);
  delete game.playerArray[blockForDelete.id];
  updateAttribute(block, blockForDelete);
}


function updateAttribute(block, object){
  block.removeAttribute("insidecreature");
  block.setAttribute("insideCreature", JSON.stringify(object));
}


function addBlockToPlayer(block, creatureObject){
    let blockForDelete = game.data.dataBase[creatureObject.tier][creatureObject.id];
    block.style.cssText = `position:relative; left:0; top:0; float: left; margin-left:15px;`;
    blockForDelete.element = "bottomPlayerCreatures"; 
    bottomPlayerCreatures.append(block)
    updateAttribute(block, blockForDelete);
}


function deleteTempCreature(creatureObject){
  let tempBlock = document.getElementById(`tempCreature${creatureObject.id}`);
  if (tempBlock == undefined) return; else all.removeChild(tempBlock);
}


function replaceCreatureCSS(creature){
  creature.onmouseup = function() {
  document.onmousemove = null; 
  creature.style.cssText += `z-index:auto; left:0px; top:0px; float:left; position: relative;`;}
}


/**
 * @param {number} id 
 */
function setCSS_addInBlock(block, id, tempCreatureObject){
  block.style.cssText += "relative; left:0; top:0; margin-left: 0;";
  if (bottomAllCreaturesBlock.childNodes[id].childNodes[0] === undefined && game.battle === false) { 
    block.removeAttribute("handcard");
    block.setAttribute("sell", "only for sell");
    tempCreatureObject.element = Elements.BottomCreatureBlock; 
    bottomAllCreaturesBlock.childNodes[id].appendChild(block);
    updateAttribute(block, tempCreatureObject);
    checkCreatureClass(tempCreatureObject);
  }  
}


function checkElemental(creature){
  // battleCry (0 coins for refresh)
  if(creature.id === 11 && creature.visible === true 
    && creature.BCamount === 1){game.tavern.refreshBlock1.updateCost(1); creature.BCamount--;}
  else {creature.BCamount = 1;}
}


function checkPirate(creature){
  // battleCry (-1 coin for upgrade tavern)
  if(creature.id === 2 && creature.visible === true 
    && game.tavern.level !== 6 && creature.BCamount === 1){ game.tavern.upgradeBlock1.updateCost(1); creature.BCamount--; }
  else {creature.BCamount = 1;}
}


function checkCreatureClass(creature){
  switch(creature.type){
    case CreatureTypes.All: break;
    case CreatureTypes.Beast: break;
    case CreatureTypes.Devil: break;
    case CreatureTypes.Dragon: break;    
    case CreatureTypes.Elemental: checkElemental(creature);break;
    case CreatureTypes.Mech: break;
    case CreatureTypes.Murloc: break;
    case CreatureTypes.Pirate: checkPirate(creature); break;
    case CreatureTypes.Quilboar: break;
    case CreatureTypes.Nothing: break;
  }
}


// adding creatures to the player's table
function addCreaturesToPlayerField(e, block, tempCreatureObject){
  if (game.battle === false && checkBottomCoordsXY(e.pageX, 406, 1355, e.pageY, 508, 653) &&
  (block.attributes.handcard || block.attributes.sell)) {
    
    block.onmouseup = function(){
      block.style.cssText = `z-index:auto; position:relative; left:0; top:0; float: left; `;
      document.onmousemove = null;

      if(checkBottomCoordsXY(e.pageX, 406, 555, e.pageY, 508, 653)) setCSS_addInBlock(block, 0, tempCreatureObject);
      else if(checkBottomCoordsXY(e.pageX, 556, 695, e.pageY, 508, 653)) setCSS_addInBlock(block, 1, tempCreatureObject);
      else if(checkBottomCoordsXY(e.pageX, 696, 835, e.pageY, 508, 653)) setCSS_addInBlock(block, 2, tempCreatureObject);
      else if(checkBottomCoordsXY(e.pageX, 836, 975, e.pageY, 508, 653)) setCSS_addInBlock(block, 3, tempCreatureObject);
      else if(checkBottomCoordsXY(e.pageX, 976, 1115, e.pageY, 508, 653)) setCSS_addInBlock(block, 4, tempCreatureObject);
      else if(checkBottomCoordsXY(e.pageX, 1116, 1255, e.pageY, 508, 653)) setCSS_addInBlock(block, 5, tempCreatureObject);
      else if(checkBottomCoordsXY(e.pageX, 1256, 1365, e.pageY, 508, 653)) setCSS_addInBlock(block, 6, tempCreatureObject);
      else {block.style.cssText += `left:0px; top:0px; position: relative; margin-left:0;`}
    }
  }
}
