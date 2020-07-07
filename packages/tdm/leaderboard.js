mp.events.addProc('server:requestPlayers', () => {
    let members = [];
    return new Promise((resolve) => {
        for(var i = 0; i < mp.players.length; i++){
            members.push({'name': mp.players[i].name, 'kills': mp.players[i].data.gameKills});
        }

        members.sort((a, b) => b.kills - a.kills);
        resolve(members);
    });
})