let game = new Game();
lockButtons();
//document.onmousemove = function (e){ console.log(e.target.previousSibling.className)}

let buttons = {17: false, 61: false, 173:false} // keyCode 17(control), 61(+), 173(-)
document.addEventListener('keydown', function(event){
    buttons[event.keyCode] = true;    
});

document.addEventListener('keyup', function(event){
for(event.keyCode in buttons) buttons[event.keyCode] = false;
})
