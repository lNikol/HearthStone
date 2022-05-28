function genTopField(wrapper){
    let topFieldBlock = createBlock(
        "topFieldBlock",
        "topFieldBlock",
        `width:1120px; height: 159px; margin-left:21%;`
      );
      
      
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
      
      wrapper.append(topFieldBlock);
}