exports.mod = () => {
    let settings = require("../settings.json");
    if (settings.gameplay.enablelongerraids==true) {
        let file = fileIO.readParsed(db.user.cache.locations)
        for (let map in file) {
            file[map].base.exit_access_time = settings.gameplay.raidTimer;
        }
        fileIO.write(db.user.cache.locations, file);
        logger.logSuccess("[Mod Aio] Raids have been extended");
    }
}