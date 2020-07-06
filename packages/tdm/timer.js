tdm.game.time = 120;
tdm.game.active = false;

mp.events.add("server:timerStart", () => {
    tdm.game.active = true;
    tdm.game.timer = setInterval(() => {
        tdm.game.time--
        // console.log(`${tdm.game.time} [${Math.floor(tdm.game.time / 60)}:${tdm.game.time % 60}]`)
        if(tdm.game.time % 60 === 0){
            if(tdm.game.time === 0){
                mp.events.call('server:timerStop');
                mp.events.call('server:timerReset');
                mp.events.call('game:ending');
            } else {
                mp.players.broadcast(`!{9c42f5}[GAME] !{FFF}${tdm.game.time/60} minutes remaining.`);
            }
        }
    }, 1000);
    mp.players.call('client:freezePlayer', [false]);
});

mp.events.add("server:timerStop", () => {
    tdm.game.active = false;
    clearInterval(tdm.game.timer);
    mp.players.call('client:freezePlayer', [true]);
});

mp.events.add("server:timerReset", () => {
    tdm.game.time = 120;
});