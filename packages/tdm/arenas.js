const fs = require('fs').promises;
const arenaDir = './packages/tdm/data/arenas/';

module.exports.load = async function(){
    tdm.levels = [];
    try {
        const fileNames = await fs.readdir(arenaDir, {encoding: 'utf8'});

        if(fileNames.length != 0){
            for(let i = 0; i < fileNames.length; i++){
                const arenaData = await fs.readFile(arenaDir + fileNames[i], {encoding: 'utf8'});
                tdm.levels.push(JSON.parse(arenaData));
            }
            console.log(`${tdm.levels.length} arenas loaded`)
        } else {
            throw Error(`You have no arena files located in your arenas folder [${arenaDir}].`);
        }
    } catch(e) { console.log(e)}
}