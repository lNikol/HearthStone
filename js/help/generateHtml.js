"use strict";
function createDivineShield(creatureObj){
  let Divine_Shield = 
  createBlock("Block_Divine_Shield", "uniqueBlock",
  ` ${defaultCreatureWidth + 10}px; height: ${defaultCreatureHeight + 10}px; 
  bottom:${defaultBottom * 2 + 16}px; left:0; background-color:gold; `
  );
  Divine_Shield.onselectstart = function () { return false; };
  creatureObj.Creatureblock.append(Divine_Shield);
}


function createReborn(creatureobj){
  let uniqueBlockReborn = createBlock("Block_Reborn", "uniqueBlock",
  `width: ${defaultCreatureWidth + 10}px; height: ${defaultCreatureHeight + 10}px; 
  bottom:${defaultBottom * 2 + 16}px; left:-4px; background-color:rgb(31, 81, 255);`
  );
  uniqueBlockReborn.onselectstart = function () { return false; };
  creatureobj.Creatureblock.append(uniqueBlockReborn);
}


function createDeathImg(creatureobj){
  let deathImg = createImageBlock(`${ImageSrc}/battle/Death.png`, "deathImg", "uniqueImage", 
      `width:25px; height:25px; position:relative; z-index:auto;
      bottom: ${ defaultBottom + 12 }px; transform: scale(1.5); margin-left:40px;`);
      creatureobj.Creatureblock.append(deathImg)
}


function createPosionImg(creatureobj){
  let poisonImg = createImageBlock(`${ImageSrc}/battle/poison.png`, "poisonImg", "uniqueImage",
      `width:25px; height:32px; position:relative; z-index:auto;
      bottom: ${ defaultBottom + 19 }px; transform: scale(1.1); margin-left:40px;
      `);
      creatureobj.Creatureblock.append(poisonImg)
}


function lockButtons(){
  document.addEventListener("wheel", function(e){
    e.preventDefault();
}, {passive: false})

document.addEventListener("keydown", function(e){
    switch(e.keyCode){
        case 61: e.preventDefault(); break;
        case 173: e.preventDefault(); break;
    }
})
}


/**
 * @param {string} tempClass
 * @param {string} tempBlock
 */
 function checkClass(tempClass, tempBlock) {
  tempClass == "" ? "" : (tempBlock.className = `${tempClass}`);
}


/**
 * @param {string} src
 * @param {string} blockId
 * @param {string} blockClass
 * @param {string} style
 */
function createImageBlock(src, blockId, blockClass, style) {
  let imageBlock = document.createElement("img");
  blockId === "" ? '' : imageBlock.id = blockId;
  imageBlock.src = `${src}`;
  imageBlock.style.cssText = `${style}`;
  checkClass(blockClass, imageBlock);
  return imageBlock;
}


/**
 * @param {string} id
 * @param {string} blockClass
 * @param {string} style
 */
function createBlock(id, blockClass, style) {
  let block = document.createElement("div");
  id === ""? '' : block.id = id;
  checkClass(blockClass, block);
  block.style.cssText = `${style}`;
  return block;
}


function genTop(wrapper){
  let topBlock = createBlock(
    "topBlock",
    "",
    `width: 1920px; height: 463px; margin: 0; `
  );
  wrapper.append(topBlock);

  genTavern(topBlock);
  genTopField(topBlock);
}


function genMiddle(wrapper){
  let timeBlock = createBlock(
    "timeBlock",
    "",
    `width: 1180px; height: 23px; margin-left:21%;`
  );

  let timeText = createBlock(
    "timeText",
    "",
    `width: 140px; height: 11px; margin-left:90.5%; bottom:35px; padding-top:20.5px;
    position:relative; border-radius: 40%;
    color: white; font-size: 24px; text-align:center;`
  );

  timeBlock.append(timeText);
  wrapper.append(timeBlock);
}


function genBottom(wrapper){
  let bottomBlock = createBlock(
    "bottomBlock",
    "",
    `width: 1920px; height: 530px; margin:0;`
  );
  wrapper.append(bottomBlock);

  genBottomField(bottomBlock)

  let bottomInsideBlock = createBlock(
    "bottomInsideBlock",
    "",
    `width: 1920px; height:308px; display: inline-block;`
  );
  bottomBlock.append(bottomInsideBlock);
  genPlayer(bottomInsideBlock);

}

function checkPopUp(parent){
  let allpopUp = document.getElementsByClassName('popUp');
  for(let i = 0; i < allpopUp.length; i++) parent.removeChild(allpopUp[i]);
}

function genPopUpBlock(parent, text){
  let popUp = createBlock('', 'popUp', '')
  popUp.innerHTML = text;
  parent.append(popUp);
  setTimeout(() => { parent.removeChild(popUp) }, 1250)
    
}


function generateGameHTML() {
  let all = createBlock("all", "",
  `width: 1920px;
  height: 1016px;
  margin: auto auto;
  background-image: url('Images/tavern/backgroundHS.jpg');
  background-repeat: no-repeat;
  background-size: 1920px 1016px;
  background-position: center;
  `);
  document.body.append(all);

  genTop(all);
  genMiddle(all);
  genBottom(all);
  
}
    