const crypto = require('crypto');
const fs = require('fs');

if (!fs.existsSync('./Database')) {
    console.log(`No Database folder found, creating a brand new folder.`);
    fs.mkdirSync('./Database');
}

const playerStats = {
    xp: 0,
    money: 0,
    admin: 0,
    kills: 0,
    deaths: 0
}

mp.events.add('playerReady', (player) => {
    let user = `${player.rgscId}#${player.serial}`;
    let hash = crypto.createHash('md5').update(user).digest('hex');

    if (fs.existsSync(`./Database/${hash}.json`)) {
        console.log(`Loading ${player.name}'s account`);
        loadPlayerData(hash, player);
    } else {
        fs.writeFile(`./Database/${hash}.json`, JSON.stringify(playerStats), (err) => {
            if(err) return console.log(`Error creating file`);
            console.log(`Creating ${player.name}'s account`);
            loadPlayerData(hash, player);
        })
    }
});

function loadPlayerData(hash, player){
    fs.readFile(`./Database/${hash}.json`, "utf8", (err, data) => {
        if(err) return console.log(`Error reading player file: ${err}`);

        let stats = JSON.parse(data);
        player.stats = stats;
    });
}

module.exports.savePlayerData = function savePlayerData(player){
    let user = `${player.rgscId}#${player.serial}`;
    let hash = crypto.createHash('md5').update(user).digest('hex');

    fs.writeFile(`./Database/${hash}.json`, JSON.stringify(player.stats), (err) => {
        if(err) return console.log(`Error saving data for ${player.name}: ${err}`);
        console.log(`${player.name}'s data successfully saved.`);
    });
}