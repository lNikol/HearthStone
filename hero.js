/**
 * @param {string} element
 * @param {string} id // will be fixed
 * @param {string} src
 * @param {number} hp
 * @param {number} tavern
 */

class Hero {
    constructor(element, id, hp, src, tavern, width = 150, height = 150){ // from bd: id,hp, Image, unic(навык), tavern
        this.height = height;
        this.width = width;
        this.model = id;
        this.id = heroCount;
        this.hp = hp;
        this.tavern = tavern;
        this.img = this.createImage(src);
        this.block = this.createHeroBlock(element);       
        heroCount++;
    }

    createImage(src) {
        let HeroImg = document.createElement("img");
        HeroImg.src = src;
        HeroImg.className = "HeroImg";
        return HeroImg;
    }
      
    createHpImage() {
        let hpImage = new Image();
        hpImage.src = `${ImageSrc}/Health.png`;
        hpImage.style.cssText = `
        width:35px; height:50px; position:relative; bottom:40px; left:130px;`;
        return hpImage;
    }

    createHpText() {
        let HerohpTextBlock = document.createElement("div");
        HerohpTextBlock.innerHTML = this.hp;
        HerohpTextBlock.className = "HeroHP";
        return HerohpTextBlock
    }
      
    createHeroBlock(element){
          let addHeroIn = document.getElementById(element);
          let HeroBlock = document.createElement("div");
          HeroBlock.id = this.model; // изменить from db
          HeroBlock.style.cssText = `width: ${this.width} px; height: ${this.height}px; `;
          HeroBlock.setAttribute("insidehero", JSON.stringify(this));
          
          let HpBlock = document.createElement("div"); HpBlock.id = "HpBlock"; 
          HpBlock.style.color = "darkgreen";
          let hpImage = this.createHpImage();
          let hpText = this.createHpText();

          HpBlock.append(hpImage, hpText); HeroBlock.append(this.img, HpBlock);
          addHeroIn.append(HeroBlock);
          return HeroBlock;
    }
    updateHP(hp){
      this.hp = hp;
      this.block.childNodes[1].childNodes[1].innerHTML = this.hp;
      if (this.hp >= 10 && this.hp <= 99) this.block.childNodes[1].childNodes[1].style.cssText += `font-size: ${totalTextSize}px; left:${leftPX + 57}px;`
      else this.block.childNodes[1].childNodes[1].style.cssText += `font-size:${defaultTextSize + 1}px; left:${leftPX + 62}px; bottom: ${76 + 2}px; `;
      this.block.childNodes[1].childNodes[1].style.color = "orange";
    }
}