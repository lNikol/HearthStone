function genTavern(wrapper){
  let topInsideBlock = createBlock(
    "topInsideBlock",
    "topInsideBlock",
    `width: 1920px; height:304px;  `
  );

  wrapper.append(topInsideBlock);

  let upgradeBlock = createBlock(
    "upgradeBlock",
    "",
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
    "",
    `width: 20px; height: 20px; font-size: 26px; margin-left:45px; text-align:center; font-weight:bold;
    color:white; margin-top:7px; 
    text-shadow: 1px 0 1px #000, 0 1px 1px #000, 
    -1px 0 1px #000, 0 -1px 1px #000;
    `)
    upgradeBlock.append(upgradeText)
    topInsideBlock.append(upgradeBlock);

  let topAvatar = createBlock(
    "topAvatar",
    "",
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
    "",
    `
    width: 125px; height: 125px; float:left; margin-top: 6%; margin-left:40px;
    background-image: url('${ImageSrc}/tavern/refresh.png');
    background-repeat: no-repeat;
    background-size:110px;`
  );
  
  let refreshText = createBlock(
    "refreshText",
    "",
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
    "",
    `
    width: 125px; height: 135px; float:left; margin-top: 5%; margin-left:-10px;
    background-image: url('${ImageSrc}/tavern/freeze.png');
    background-repeat: no-repeat;
    background-size:110px;`
  );

  let freezeText = createBlock(
    "freezeText",
    "",
    `width: 20px; height: 20px; font-size: 26px; margin-left:45px; text-align:center; font-weight:bold;
    color:White ; margin-top:16px;text-shadow: 1px 0 1px #000, 
    0 1px 1px #000, 
    -1px 0 1px #000, 
    0 -1px 1px #000;
    `
  )
 
  freezeBlock.append(freezeText);
  topInsideBlock.append(freezeBlock);

      
        
}