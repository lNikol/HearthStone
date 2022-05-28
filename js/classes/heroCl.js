/**
 * @param {string} element
 * @param {string} id 
 * @param {string} src
 * @param {number} hp
 * @param {number} tavern
 */

class Hero {
    constructor(element, id, hp, src, tavern, width = 168, height = 170){ 
        this.height = height;
        this.width = width;
        this.model = id;
        this.id = heroCount;
        this.hp = hp;
        this.firstHP = this.hp;
        this.tavern = tavern;
        this.img = this.createImage(src);
        this.block = this.createHeroBlock(element);       
        heroCount++;
    }

    createImage(src) {
        let HeroImg = new Image(this.width, this.height)
        HeroImg.src = src;
        HeroImg.className = "HeroImg";
        return HeroImg;
    }
      


    createHpText() {
        let HerohpTextBlock = document.createElement("div");
        HerohpTextBlock.innerHTML = this.hp;
        HerohpTextBlock.className = "HeroHPText";
        HerohpTextBlock.id = this.model;
        return HerohpTextBlock
    }
      
    createHeroBlock(element){
          let addHeroIn = document.getElementById(element);
          let HeroBlock = document.createElement("div");
          HeroBlock.id = this.model; 
          HeroBlock.style.cssText = `width: ${this.width} px; height: ${this.height}px; `;
          HeroBlock.setAttribute("insidehero", JSON.stringify(this));
          let HpBlock = document.createElement("div"); HpBlock.id = "HpBlock"; 
          HpBlock.style.color = "darkgreen";
          let hpText = this.createHpText();
          HpBlock.append(hpText); HeroBlock.append(this.img, HpBlock);
          addHeroIn.append(HeroBlock);
          if(this.model === "enemyHeroBlock") HpBlock.childNodes[0].style.cssText+=`font-size:${defaultTextSize + 1}px; left:${leftPX + 58}px; bottom: ${38}px; `
          return HeroBlock;
    }
    updateHP(hp){
      this.hp = hp;
      this.block.childNodes[1].childNodes[0].innerHTML = this.hp;
      if (this.hp !== this.firstHP && this.hp >= 10 && this.hp <= 99) this.block.childNodes[1].childNodes[0].style.cssText += `font-size: ${totalTextSize + 2}px; left:${leftPX + 59}px; color:orange;`
      else if(this.hp <= 10 && this.hp !== 0) this.block.childNodes[1].childNodes[0].style.cssText += `font-size:${defaultTextSize + 1}px; left:${leftPX + 59}px; bottom: ${40}px; color:red;`;
    }
}