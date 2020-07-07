let origin = 0;
let leaderboard = mp.browsers.new('package://tdm/leaderboard/index.html');
leaderboard.active = false;

// F5
mp.keys.bind(0x74, true, async function() {
    leaderboard.active = !leaderboard.active;
    if((Date.now() - origin) > 5000){   //  5 second check
        origin = Date.now();
        leaderboard.execute(`document.getElementById('player-table').innerHTML = ''`);
        let data = await mp.events.callRemoteProc('server:requestPlayers');

        data.forEach(item => {
            leaderboard.execute(`document.getElementById('player-table').innerHTML += ' <tr><td>${item.name}</td><td>${item.kills}</td></tr>'`);
        });
    }
});