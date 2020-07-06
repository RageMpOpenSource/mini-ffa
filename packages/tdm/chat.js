mp.events.add('playerChat', (player, msg) => {
    mp.players.broadcast(`!{42a1f5}${player.name}[${player.id}] !{FFF}: ${msg}`);
});