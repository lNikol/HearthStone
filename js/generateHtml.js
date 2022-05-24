"use strict";
//переписать все px в % 
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
  let all = createBlock("all", "all",
  `width: 1920px;
  height: 1016px;
  margin: auto auto;
  background-image: url('Images/tavern/backgroundHS.jpg');
  background-repeat: no-repeat;
  background-size: 1920px 1016px;
  background-position: center;
  `);
  document.body.append(all);
 
  //generate top blocks
  let topBlock = createBlock(
    "topBlock",
    "topBlock",
    `width: 1920px; height: 463px; margin: 0; `
  );
  
  all.append(topBlock);

  let topInsideBlock = createBlock(
    "topInsideBlock",
    "topInsideBlock",
    `width: 1920px; height:304px;  `
  );

  topBlock.append(topInsideBlock);

  let upgradeBlock = createBlock(
    "upgradeBlock",
    "upgradeBlock",
    `
    width: 125px;
    height: 125px;
    float: left;
    margin-left: 38%;
    margin-top: 6%;
    position: relative;
    background-image: url('${ImageSrc}/tavern/upgrade.png');
    background-repeat: no-repeat;
    background-size:110px;
    `
  );

  let upgradeText = createBlock(
    "upgradeText",
    "upgradeText",
    `width: 20px; height: 20px; font-size: 26px; margin-left:45.25px; text-align:center; font-weight:bold;
    color:White ; margin-top:7px; text-shadow: 1px 0 1px #000, 
    0 1px 1px #000, 
    -1px 0 1px #000, 
    0 -1px 1px #000;
    `)
    upgradeBlock.append(upgradeText)
    topInsideBlock.append(upgradeBlock);

  let topAvatar = createBlock(
    "topAvatar",
    "topAvatar",
    `width: 168px;
    height: 170px;
    margin-top: 5.42%;
    margin-left: 1%;
    float: left;
    border-top-right-radius: 80%;
    border-top-left-radius: 80%;`
  );
  
  let topBorderAvatar = new Image(168, 170);
  topBorderAvatar.className = "borderAvatar"
  topBorderAvatar.style.cssText += `left: -23.7%; top: 25.5%;`
  topBorderAvatar.src = `${ImageSrc}/hero/hero-frame.png`
  topInsideBlock.append(topBorderAvatar);
  topInsideBlock.append(topAvatar);


  let refreshBlock = createBlock(
    "refreshBlock",
    "refreshBlock",
    `
    width: 125px; height: 125px; float:left; margin-top: 6%; margin-left:40px;
    background-image: url('${ImageSrc}/tavern/refresh.png');
    background-repeat: no-repeat;
    background-size:110px;`
  );
  
  let refreshText = createBlock(
    "refreshText",
    "refreshText",
    `
    width: 25px; height: 25px; font-size: 26px; margin-left:40px; text-align:center; font-weight:bold;
    color:White ; margin-top:5px;text-shadow: 1px 0 1px #000, 
    0 1px 1px #000, 
    -1px 0 1px #000, 
    0 -1px 1px #000;`)
    refreshBlock.append(refreshText)
    topInsideBlock.append(refreshBlock);

  let freezeBlock = createBlock(
    "freezeBlock",
    "freezeBlock",
    `
    width: 125px; height: 135px; float:left; margin-top: 5%; margin-left:-10px;
    background-image: url('${ImageSrc}/tavern/freeze.png');
    background-repeat: no-repeat;
    background-size:110px;`
  );

  let freezeText = createBlock(
    "freezeText",
    "freezeText",
    `width: 20px; height: 20px; font-size: 26px; margin-left:45px; text-align:center; font-weight:bold;
    color:White ; margin-top:16px;text-shadow: 1px 0 1px #000, 
    0 1px 1px #000, 
    -1px 0 1px #000, 
    0 -1px 1px #000;
    `
  )
 
  freezeBlock.append(freezeText);
  topInsideBlock.append(freezeBlock);

  let topFieldBlock = createBlock(
    "topFieldBlock",
    "topFieldBlock",
    `width:1120px; height: 159px; margin-left:20%;`
  );
  
  topBlock.append(topFieldBlock);
  
  let topAllCreaturesBlock = createBlock(
    "topAllCreaturesBlock",
    "topAllCreaturesBlock",
    `
    width: 1120px; height:100%; 
    display: inline-block;
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
    `width: 1180px; height: 23px; margin-left:21%;`
  );

  all.append(timeBlock);

  let timeText = createBlock(
    "timeText",
    "timeText",
    `width: 140px; height: 11px; margin-left:90.5%; bottom:35px; padding-top:20.5px;
    position:relative; border-radius: 40%;
    color: white; font-size: 24px; text-align:center;`
  );

  timeBlock.append(timeText);

  //generate bottom blocks
  let bottomBlock = createBlock(
    "bottomBlock",
    "bottomBlock",
    `width: 1920px; height: 530px; margin:0;`
  );


  all.append(bottomBlock);

  let bottomFieldBlock = createBlock(
    "bottomFieldBlock",
    "bottomFieldBlock",
    `width:1120px; height: 159px;margin-left:20%;`
  );

  bottomBlock.append(bottomFieldBlock);

  let bottomAllCreaturesBlock = createBlock(
    "bottomAllCreaturesBlock",
    "bottomAllCreaturesBlock",
    `width:1120px; height:100%; display: inline-block;`
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
    `width: 1920px; height:308px; display: inline-block;`
  );

  bottomBlock.append(bottomInsideBlock);

  
  let bottomAvatar = createBlock(
    "bottomAvatar",
    "bottomAvatar",
    `
    width: 168px; height: 170px;
    margin-top:1.85%;
    margin-left: 45.68%; float:left;
    border-top-right-radius: 80%; border-top-left-radius: 80%;`
  );

  let bottomBorderAvatar = new Image(168, 170);
  bottomBorderAvatar.className = "borderAvatar"
  bottomBorderAvatar.src = `${ImageSrc}/hero/hero-frame.png`
  bottomInsideBlock.append(bottomBorderAvatar);

  let bottomPlayerCreatures = createBlock(
    "bottomPlayerCreatures",
    "bottomPlayerCreatures",
    `   width: 400px;
    height: 150px;
    float: right;
    margin-right: 18.5%;
    margin-top: -10.5%;`
  )

  bottomInsideBlock.append(bottomAvatar);
  
  
  let bottomCoinsText = createBlock(
    "bottomCoinsText",
    "bottomCoinsText",
    `width:50px; height:27px; float:left; border-radius:40%; color:white;
    text-align:center; font-size:22px; margin-right:23.7px;`
    )
    
    let bottomCoins = createBlock(
      "bottomCoins",
      "bottomCoins",
      `width: 400px; height: 30px;
      margin-left:64.1%; float:left; margin-top:3.28%;`
      );
      
      
      
      bottomCoins.append(bottomCoinsText)
      let maxAmountOfCoins = 10;
      for(let i = 0 ; i< maxAmountOfCoins; i++){
        let coinBlock = createImageBlock(
          `${ImageSrc}/tavern/coin.png`,
          `coinBlock${i}`,
          "coinBlock",
          ``
          )
          bottomCoins.append(coinBlock)
        }
        bottomInsideBlock.append(bottomCoins);
        bottomInsideBlock.append(bottomPlayerCreatures);
      }
      