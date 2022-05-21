"use strict";
// переделать счетчики блоков на более лучшее, чтобы можно было 
// спокойоно добавить блок куда угодно,без привязки к конкретному значению


class Creature2 {
    constructor(tier, attack, hp, type, id, unique, width = 100, height = 130) {
      this.unique = unique;
      this.hp = hp;
      this.tier = tier;
      this.id = id;
      this.attack = attack;
      this.height = height;
      this.width = width;
      this.type = type;
    }
}
  

class DataBaseHS{
    constructor(){
        this.dataBase = [
            [], //heroes
            [], // tier 1
            [], // tier 2
            [], // tier 3
            [], // tier 4
            [], // tier 5
            [], // tier 6
        ];
    }
    addInDB(tier, monster){ // create personal id for every tier, after that get creature by local id
        if(this.dataBase[tier][monster.id]){ this.dataBase[tier][monster.id] = monster; }
        else{this.dataBase[tier].push(monster);}
    }
    
    getDB(){ return this; }
    setDB(){this.dataBase = this.dataBase}
    genDB(){
        
    let arrayOfAttack = [[2,1,2,1,1,2,1,2,2,3,1,1,2,3,2,2,1,1], [23,14,21,16], ];
    let arrayOfHP = [[2,1,2,3,1,2,2,1,1,1,2,4,3,1,2,2,2,3], [22,11,25,38], ];
    let arrayOfType = [
        [
        CreatureTypes.Nothing, CreatureTypes.Beast, CreatureTypes.Pirate,
        CreatureTypes.Dragon, CreatureTypes.Devil, CreatureTypes.Devil, 
        CreatureTypes.Mech, CreatureTypes.Murloc, CreatureTypes.Mech,
        CreatureTypes.Quilboar, CreatureTypes.Dragon, CreatureTypes.Elemental,
        CreatureTypes.Murloc, CreatureTypes.Pirate, CreatureTypes.Beast,
        CreatureTypes.Elemental, CreatureTypes.Quilboar, CreatureTypes.Nothing,
        ],
        [
        CreatureTypes.Beast, CreatureTypes.Pirate, 
        CreatureTypes.Elemental,CreatureTypes.Quilboar
        ],
        
    ];
    let arrayOfUnique = [
        [
            [Unics.Taunt, Unics.Reborn],
            [Unics.Battlecry],
            [Unics.Battlecry], //,["Tavern cost-1"] inside
            [""],
            [Unics.Deathrattle],
            [Unics.Deathrattle],
            [Unics.Reborn],
            [Unics.Battlecry],
            [Unics.Divine_Shield],
            [Unics.Battlecry, Unics.Blood_Gem],
            [Unics.Start_of_Combat],
            [Unics.Battlecry],
            [Unics.Battlecry],
            [Unics.Deathrattle],
            [""],
            [""],
            [""],
            [""]
        ],
        [Unics.Deathrattle, Unics.Battlecry, Unics.Divine_Shield, ""],

    ];    
    //visible, attack, hp, type, unique
    function createCreature(data, tierOfArray){
            for(let i = 0; i < arrayOfAttack[tierOfArray-1].length; i++){
            let a = new Creature(tierOfArray, arrayOfAttack[tierOfArray-1][i], arrayOfHP[tierOfArray-1][i], arrayOfType[tierOfArray-1][i], globalcount, arrayOfUnique[tierOfArray-1][i]);
            data.addInDB(a.tier, a);
            globalcount++;
            a.removeCreatureBlock();
        }
    }
    createCreature(this, 1); globalcount = 0;
    createCreature(this, 2); globalcount = 0;
    


}
}
// создание двумерного массива, внутри которого Виды всех существ
// Изменить систему id на новое ( чтобы у каждого были свои картинки но не по id)
// например beast_1 (такое название будет у папки и такое же название для Id или альтернативы)