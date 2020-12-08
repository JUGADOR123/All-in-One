exports.mod = () => {
    let settings = require("../settings.json");
    if (settings.gameplay.bossChance > 0) {
        let file = fileIO.readParsed(db.user.cache.locations)
        for (let map in file) {
            if (file[map].base.BossLocationSpawn.length > 0) {
                file[map].base.BossLocationSpawn[0].BossChance = settings.gameplay.bossChance
            }
        }
        fileIO.write(db.user.cache.locations, file);
        logger.logSuccess("[Mod Aio] Boss spawn chance updated to " + settings.gameplay.bossChance + "%");
    }
}