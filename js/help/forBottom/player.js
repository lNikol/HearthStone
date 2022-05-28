function genPlayer(wrapper){
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
  wrapper.append(bottomBorderAvatar);

  let bottomPlayerCreatures = createBlock(
    "bottomPlayerCreatures",
    "bottomPlayerCreatures",
    `   width: 400px;
    height: 150px;
    float: right;
    margin-right: 18.5%;
    margin-top: -10.5%;`
  )

  wrapper.append(bottomAvatar);

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
        wrapper.append(bottomCoins);
        wrapper.append(bottomPlayerCreatures);
}