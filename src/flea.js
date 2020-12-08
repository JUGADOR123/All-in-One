exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../settings.json");
    if (settings.player.fleaLevel == true) {
        let base = fileIO.readParsed(db.cacheBase.globals)
        base.config.RagFair.minUserLevel = 1;
        logger.logSuccess("[Mod Aio]Flea market requirements successfully removed ");
        fileIO.write(db.cacheBase.globals, base);
    } else {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.config.RagFair.minUserLevel = 10;
        fileIO.write(db.cacheBase.globals, base);
    }
}