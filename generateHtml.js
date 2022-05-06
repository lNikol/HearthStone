"use strict";
//переписать все px в % 
function lockButtons(){
//   document.addEventListener("wheel", function(e){
//     e.preventDefault();
// }, {passive: false})

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
  imageBlock.id = `${blockId}`;
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
  block.id = id;
  checkClass(blockClass, block);
  block.style.cssText = `${style}`;
  return block;
}

function generateGameHTML() {
  let all = document.createElement("div");
  all.id = "all";
  all.style.cssText = `
  width: 1000px;
  height: 730px;
  margin: auto auto;
  margin-top: 100px;`;
  document.body.append(all);
 
  //generate top blocks
  let topBlock = createBlock(
    "topBlock",
    "topBlock",
    `width: 1000px; height: 350px; background-color: green; margin: 0;`
  );
  
  all.append(topBlock);

  let topInsideBlock = createBlock(
    "topInsideBlock",
    "topInsideBlock",
    `width: 1000px; height:200px; background-color: blue; `
  );

  topBlock.append(topInsideBlock);

  let upgradeBlock = createBlock(
    "upgradeBlock",
    "upgradeBlock",
    `
    width: 75px; height: 75px; background-color: lime; float:left;
    margin-left:350px; margin-top:20px;
    `
  );

  let upgradeText = createBlock(
    "upgradeText",
    "upgradeText",
    `width: 25px; height: 25px; font-size: 20px; background-color: yellow; margin-left:25px; text-align:center;`)
    upgradeBlock.append(upgradeText)
    topInsideBlock.append(upgradeBlock);

  let topAvatar = createBlock(
    "topAvatar",
    "topAvatar",
    `
    width: 150px; height: 150px; background-color:orange; float:left; 
    margin-top:5px; margin-left: 1%; 
    border-left-width:220px; border-top-right-radius: 80%; border-top-left-radius: 80%;`
  );

  topInsideBlock.append(topAvatar);

  let refreshBlock = createBlock(
    "refreshBlock",
    "refreshBlock",
    `
    width: 75px; height: 75px; background-color: lime; float:left; 
    margin-left:10px; margin-top:20px;`
  );
  
  let refreshText = createBlock(
    "refreshText",
    "refreshText",
    `width: 25px; height: 25px; font-size: 20px; background-color: yellow; margin-left:25px; 
    text-align:center;`)
    refreshBlock.append(refreshText)
    topInsideBlock.append(refreshBlock);

  let freezeBlock = createBlock(
    "freezeBlock",
    "freezeBlock",
    `
    width: 50px; height: 50px; background-color: aqua; float:left; 
    margin-left:10px; margin-top:30px;`
  );

  let freezeText = createBlock(
    "freezeText",
    "freezeText",
    `width: 25px; height: 25px; font-size: 20px; background-color: gold; text-align:center; margin-left: 12.5px;`
  )
 
  freezeBlock.append(freezeText);
  topInsideBlock.append(freezeBlock);

  let topFieldBlock = createBlock(
    "topFieldBlock",
    "topFieldBlock",
    `width:1000px; height: 150px; background-color: red;`
  );
  
  topBlock.append(topFieldBlock);
  
  let topAllCreaturesBlock = createBlock(
    "topAllCreaturesBlock",
    "topAllCreaturesBlock",
    `
    width:900px; height:100%; margin-left: 5%; 
    margin-right:5%; background-color:brown; display: inline-block;
    `
  );
  
  topFieldBlock.append(topAllCreaturesBlock); // here I"ll add creatures

  let maxAmountOfTopBoxes = 7;
  
  for (let i = 0; i < maxAmountOfTopBoxes; i++) {
    let topCreatureBlock = createBlock(
      `topCreatureBlock${i}`,
      "topCreatureBlock",
      ``
    );

    topAllCreaturesBlock.append(topCreatureBlock);
  }

  //generate middle blocks
  let timeBlock = createBlock(
    "timeBlock",
    "timeBlock",
    `width: 1000px; height: 25px; background-color: gray;`
  );

  all.append(timeBlock);

  let timeText = createBlock(
    "timeText",
    "timeText",
    `width: 40px; height: 25px; background-color: green; margin-left:96%; 
    color: white; font-size: 20px; text-align:center;`
  );

  timeBlock.append(timeText);

  //generate bottom blocks
  let bottomBlock = createBlock(
    "bottomBlock",
    "bottomBlock",
    `width: 1000px; height: 350px; background-color: green; margin:0;`
  );


  all.append(bottomBlock);

  let bottomFieldBlock = createBlock(
    "bottomFieldBlock",
    "bottomFieldBlock",
    `width:1000px; height: 150px; background-color: red;`
  );

  bottomBlock.append(bottomFieldBlock);

  let bottomAllCreaturesBlock = createBlock(
    "bottomAllCreaturesBlock",
    "bottomAllCreaturesBlock",
    `width:900px; height:100%; margin-left: 5%; margin-right:5%; background-color:brown; display: inline-block;`
  );

  bottomFieldBlock.append(bottomAllCreaturesBlock); // here I'll add creatures


  let maxAmountOfButtomBoxes = 7;
  
  for (let i = 0; i < maxAmountOfButtomBoxes; i++) {
    let bottomCreatureBlock = createBlock(
      `bottomCreatureBlock${i}`,
      "bottomCreatureBlock", ``
    );
  
    bottomAllCreaturesBlock.append(bottomCreatureBlock);
  }

  let bottomInsideBlock = createBlock(
    "bottomInsideBlock",
    "bottomInsideBlock",
    `width: 1000px; height: 200px; background-color:blue; display: inline-block;`
  );

  bottomBlock.append(bottomInsideBlock);

  let bottomAvatar = createBlock(
    "bottomAvatar",
    "bottomAvatar",
    `width: 150px; height: 150px; margin-top:5px; margin-left: 42.5%; background-color:orange; float:left; border-top-right-radius: 80%; border-top-left-radius: 80%;`
  );

  let bottomPlayerCreatures = createBlock(
    "bottomPlayerCreatures",
    "bottomPlayerCreatures",
    `width: 360px; height:150px;
    float:right; margin-right:10px; margin-top:15px;`
  )

  bottomInsideBlock.append(bottomPlayerCreatures);

  bottomInsideBlock.append(bottomAvatar);

  let bottomCoins = createBlock(
    "bottomCoins",
    "bottomCoins",
    `width: 370px; height: 30px; background-color: yellow; 
    margin-left:63%; float:left; margin-top:5px;`
  );
  let bottomCoinsText = createBlock(
    "bottomCoinsText",
    "bottomCoinsText",
    `width:50px; height:27px; background-color:gold; float:left; border-radius:40%;
    text-align:center; font-size:20px; padding-top:3px;`
  )

  bottomCoins.append(bottomCoinsText)
  let maxAmountOfCoins = 10;
  for(let i = 0 ; i< maxAmountOfCoins; i++){
    let coinBlock = createImageBlock(
      `${ImageSrc}/coin.png`,
      `coinBlock${i}`,
      "coinBlock",
      ``
    )
    bottomCoins.append(coinBlock)
  }
  bottomInsideBlock.append(bottomCoins);
}
