function showWish(){

const wishes=[

"🎂 Have an amazing birthday!",

"🎉 May your smile never fade!",

"🎁 Wishing you success and happiness!",

"❤️ Stay blessed forever!",

"🥳 Enjoy every moment of your special day!"

];

const random=Math.floor(Math.random()*wishes.length);

document.getElementById("wish").innerHTML=wishes[random];

}