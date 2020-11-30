exports.mod = () => {
    let settings = require("../settings.json");
    if (settings.gameplay.enablelongerraids==true) {
        let base = fileIO.readParsed(db.user.cache.locations)
        for (let map in base) {
            base[map].base.exit_access_time = settings.gameplay.raidTimer
            base[map].base.escape_time_limit = settings.gameplay.raidTimer
        }
        fileIO.write(db.user.cache.locations, base);
    }
    logger.logSuccess("[Mod Aio] Raids have been extended");

}