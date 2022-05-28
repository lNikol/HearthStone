function genBottomField(wrapper){
let bottomFieldBlock = createBlock(
    "bottomFieldBlock",
    "",
    `width:1120px; height: 159px;margin-left:20%;`
  );
  wrapper.append(bottomFieldBlock);

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
  
}