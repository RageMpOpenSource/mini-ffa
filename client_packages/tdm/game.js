mp.events.add('client:freezePlayer', (frozen) => {
    mp.players.local.freezePosition(frozen);
});