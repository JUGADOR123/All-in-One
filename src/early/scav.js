exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../../settings.json");
    if (settings.player.noScavTimer == true) {
         base = fileIO.readParsed(global.db.cacheBase.globals)
        base.config.SavagePlayCooldown = 0;
        base.config.SavagePlayCooldownNdaFree = 0;
        base.config.SavagePlayCooldownDevelop = 0;
        fileIO.write(global.db.cacheBase.globals, base);
    }
    logger.logSuccess("[Mod Aio] Scav Timers have been removed");

}