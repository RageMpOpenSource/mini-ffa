tdm.game = {};

module.exports.setup = function(){
    tdm.game.arena = tdm.levels[Math.floor(Math.random() * tdm.levels.length)];
    mp.players.broadcast(`!{9c42f5}[GAME] !{FFF}Loading Arena: ${tdm.game.arena.name}`);
    console.log(`Beginning new game on ${tdm.game.arena.name}`);

    mp.players.forEach((user) => {
        user.stats.kills += user.data.gameKills;
        user.stats.kills += user.data.gameDeaths;
        user.data.gameKills = 0;
        user.data.gameDeaths = 0;
        user.removeAllWeapons();
        mp.events.call('spawnPlayer', user);
    })

    mp.players.broadcast('!{9c42f5}[GAME] !{FFF}New Game will begin in 10 seconds');

    startCountdown = setInterval(() => {
        mp.events.call("server:timerStart");
        mp.players.broadcast('!{9c42f5}[GAME] !{FFF}FIGHT!');
        clearInterval(startCountdown);
    }, 10000)
}

/**
 *  game:ending
 *      - Move players to a 'podium' and show 1st, 2nd, 3rd players
 *      - Allow players to use /shop which they can look at items to buy
 *      - Kick out of shop when there is 5 seconds remaining
 */
mp.events.add('game:ending', () => {
    console.log('Round ended, new game setup in 5 seconds.');
    mp.players.broadcast(`!{9c42f5}[GAME] !{FFF}Round Over, preparing next arena.`)
    mp.players.forEach(user => tdm.db.savePlayerData(user));
    setTimeout(() => {
        tdm.games.setup();
    }, 5000);
})

mp.events.add('playerJoin', (player) => {
    mp.events.call('spawnPlayer', player);
    if(!tdm.game.active) player.call('client:freezePlayer', [true]);
    player.data.gameKills = 0;
    player.data.gameDeaths = 0;
});

mp.events.add("spawnPlayer", (player) => {
    let respawn = tdm.game.arena.spawnPoints[Math.floor(Math.random() * tdm.game.arena.spawnPoints.length)];
    for(const weapon of tdm.game.arena.weapons){
        player.giveWeapon(mp.joaat(weapon), 9999);
    }
    player.spawn(new mp.Vector3(respawn.x, respawn.y, respawn.z));
})

mp.events.add('playerDeath', (player, reason, killer) => {
    if(player != killer && killer != undefined){
        killer.data.gameKills += 1;
        mp.players.broadcast(`${player.name} has been killed by ${killer.name}.`);
    }
    player.data.gameDeaths += 1;
    
    player.respawnTimer = setTimeout(function(){
       mp.events.call('spawnPlayer', player);
    }, 5000);
});

mp.events.add('playerQuit', (player) => {
    if(player.respawnTimer) clearTimeout(player.respawnTimer);
    tdm.db.savePlayerData(player);
});