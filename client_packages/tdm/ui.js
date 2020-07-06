let uiEnabled = true;
let time = 300;
let kills = 0, deaths = 0;

mp.events.addDataHandler("gameKills", (entity, value, oldValue) => {
    if(entity === mp.players.local) kills = value;
    
});

mp.events.addDataHandler("gameDeaths", (entity, value, oldValue) => {
    if(entity === mp.players.local) deaths = value;
});

mp.events.add('render', () => {
    if(uiEnabled){
        mp.game.graphics.drawText(`Kills: ${kills}\nDeaths: ${deaths}`, [0.85, 0.05], { 
            font: 4, 
            color: [255, 255, 255, 255], 
            scale: [0.8, 0.8], 
            outline: true,
            centre: true
        });
    }
});