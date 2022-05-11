let game = new Game();
lockButtons();


let buttons = {17: false, 61: false, 173:false} // keyCode 17(control), 61(+), 173(-)
document.addEventListener('keydown', function(event){
    buttons[event.keyCode] = true;    
});

document.addEventListener('keyup', function(event){
for(event.keyCode in buttons) buttons[event.keyCode] = false;
})

// Если нажата кнопка
// timer2 = timer
// (один раз должно быть + не должен присваиваться к таймеру2 таймер1 каждую секунду)
// if(timer-timer2=tier*20) // 20 - seconds