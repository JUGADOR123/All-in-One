exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../../settings.json");
    if (settings.player.maxStamina < 100) {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.config.Stamina.Capacity = settings.player.maxStamina;
        base.config.Stamina.BaseRestorationRate = 6;

        fileIO.write(db.cacheBase.globals, base);
    } else {
        let base = fileIO.readParsed(db.cacheBase.globals)
        base.config.Stamina.Capacity = 1000;
        base.config.Stamina.BaseRestorationRate = 1000;
        fileIO.write(db.cacheBase.globals, base);
    }
    logger.logSuccess("[Mod Aio] ");

}
