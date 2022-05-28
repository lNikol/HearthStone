
"use strict";

const ImageSrc = "Images";
const cardImage = 0;
const origImage = 1;
const goldenCardImage = 2;

//genFirstPage.js && generateHtml.js
const chooseSrc = /[A-z]+\/[A-z]+\/[A-z]+\/1.png/gm;




//generateHTML.js
const defaultCreatureWidth = 110;
const defaultCreatureHeight = 145;

// creature.js
const defaultTextSize = 26;
const defaultBottom = 130;
const percent = 15;
const totalTextSize = defaultTextSize - (defaultTextSize / 100) * percent;
const totalBottom = defaultBottom - (defaultTextSize - totalTextSize);
const leftPX = 80;

// creature.js && database.js

let count = 0; // block creature counter
let globalcount = 0;
let topCount = 0;
let bottomCount = 0;
let playerCoins = 0;
let heroCount = 0;
let turn = 3; // 3 - 0 turn
let maxCoins = (turn >= 10) ? 10: turn;
const timeForTimeout = 1300 + turn * 0.01;

const CreatureTypes = {
    All : "All",
    Beast : "Beast",
    Devil : "Devil",
    Dragon : "Dragon",
    Elemental : "Elemental",
    Mech : "Mech",
    Murloc : "Murloc",
    Pirate : "Pirate",
    Quilboar : "Quilboar",
    Nothing : "Nothing",
};

const Unics = {
    Battlecry : "Battlecry",
    Blood_Gem : "Blood Gem",
    Deathrattle : "Deathrattle",
    Divine_Shield : "Divine Shield",
    Poison : "Poison",
    Reborn : "Reborn",
    Start_of_Combat : "Start of Combat",
    Taunt : "Taunt",
};

const Elements = {
    BottomCreatureBlock : "bottomCreatureBlock",
    TopCreatureBlock : "topCreatureBlock",
    TopAllCreaturesBlock: "topAllCreaturesBlock",
}