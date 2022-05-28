"use strict";
function generateFirstHTML(){
    let firstPage = createBlock('firstPage', '', `width: 400px; height:400px; margin: auto auto; margin-top:10%;`)
      
    let input = document.createElement('input');
    input.id = 'input';
    input.style.cssText = `width: 200px; height:100px; margin:auto auto;`;
  
    let button = document.createElement('button');
    button.style.cssText = `width:125px; height: 50px; margin-left:10px;`;
    button.textContent = 'Write Your name';
    button.onclick = () => {
        if(input.value === '') {checkPopUp(firstPage); genPopUpBlock(firstPage, 'Write Your name')}
        else{        
        game.playerName = `${input.value}`, input.value;
        localStorage.setItem (`${input.value}`, input.value); 
        document.body.removeChild(firstPage);
        createHeroChooseHTML();
        }
    };
    firstPage.append(input);
    firstPage.append(button);
    document.body.append(firstPage);
}



function createHeroChooseHTML(){

    let content = createBlock('content', '',
    `
    width: 90%;
    min-height:600px; 
    margin: auto auto;
    padding-top:20%;
    `);
  
    let allBlocks = createBlock('allBlocks', '',
    `
    width: 90%;
    height: 100%;
    display: flex;
    margin: auto auto;
    `);
    for(let i = 0; i < 4; i++){
      let blockForChoose = createBlock('', 'blockForChoose', 
      ` width: 100%; height: 100%;
      `)
      let tempData = game.data.dataBase
      let heroForChoose = createImageBlock(`${ImageSrc}/Heroes/${tempData[tempData.length-1][i]}/${origImage}.png`, '',
      'width:75%; min-height: 75%; height:200px; margin: auto auto;')
      heroForChoose.className = "heroForChoose"; 
  
      heroForChoose.onclick = () => {
        let playerInfo = [localStorage.getItem(game.playerName), heroForChoose.src]
        localStorage.setItem((localStorage.getItem(game.playerName) + " info"), JSON.stringify(playerInfo))
        document.body.removeChild(content);
        game.createGameHTML(); 
        game.data.genDB();

        let heroSrc = JSON.parse(localStorage.getItem(game.playerName + " info"))[1].match(chooseSrc);
        heroSrc[0] = heroSrc[0].replace("Images/Heroes/", '');
        heroSrc[0] = heroSrc[0].replace("/1.png", '');
        
        game.enemyHero = new Hero("topAvatar", "enemyHeroBlock", 40, `${ImageSrc}/tavern/Bob.png`, game.tavern.enemyLevel);
        game.playerHero = new Hero("bottomAvatar", "playerHeroBlock", 40,`${ImageSrc}/Heroes/${heroSrc}/${origImage}.png`, game.tavern.playerLevel);
        game.data.addInDB(0, game.enemyHero, game.enemyHero.id);
        game.data.addInDB(0, game.playerHero, game.playerHero.id);
        game.updateVisibilityForHp();
      }
  
      blockForChoose.append(heroForChoose);
      allBlocks.append(blockForChoose);
      content.append(allBlocks)
    }
    
    document.body.append(content);
  
  }