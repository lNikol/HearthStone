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
        this.HeroHpImg = this.createHpImage();
        this.block = this.createHeroBlock(element);       
        this.createHpText(); heroCount++;
    }
    setHero(){
      return this;
    }
    createImage(src) {
        let HeroImg = document.createElement("img");
        HeroImg.src = src;
        HeroImg.className = "HeroImg";
        HeroImg.style.cssText = ``;
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
        let HerohpBlock = document.createElement("div");
        HerohpBlock.innerHTML += this.hp;
        HerohpBlock.className = "HeroHP";
        this.block.append(HerohpBlock);
      }
      
      createHeroBlock(element){
          let addHeroIn = document.getElementById(element);
          let HeroBlock = document.createElement("div");
          HeroBlock.id = this.model; // изменить from db
          HeroBlock.style.cssText = `width: ${this.width} px; height: ${this.height}px; `;
          HeroBlock.append(this.img, this.HeroHpImg);
          HeroBlock.setAttribute("insidehero", JSON.stringify(this.setHero()));
          addHeroIn.append(HeroBlock);

          return HeroBlock;
      }
}