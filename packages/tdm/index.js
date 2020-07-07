/**
 * - Maybe create a 'Game' class and load the info into this class, could also create 'Team' classes too
 * - Bad JSON files inside arenas/teams will cause errors, handle these
 * - Award coins at the end of each round
 */

global.tdm = {};

mp.events.delayInitialization = true;

tdm.db = require('./simpledb.js');
tdm.games = require('./games.js');
require('./timer.js');
tdm.arenas = require('./arenas.js');
require('./leaderboard.js');
require('./chat.js');

(async () => {
    console.time('Server loaded')
    await tdm.arenas.load();
    await tdm.games.setup();
    mp.events.delayInitialization = false;    //  Players cannot join until this is false
    console.timeEnd('Server loaded')
})();

mp.events.addCommand('rejoin', (player) => {
    player.kickSilent();
});

mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`XP: ${player.stats.xp} | Kills: ${player.data.gameKills}(Total: ${player.stats.kills}) | Deaths: ${player.data.gameDeaths}(Total: ${player.stats.deaths}) | KDR ${(player.stats.kills / player.stats.deaths).toFixed(2)}`)
});