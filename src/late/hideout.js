exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../../settings.json");
    if (settings.hideout.buildTime === true) {
        base = fileIO.readParsed(db.user.cache.hideout_areas)
        for (let file in base.data) {
            let filedata = base.data[file];
            for (let stage in filedata.stages) {
                filedata.stages[stage].constructionTime = 5;
            }
        }
        fileIO.write(db.user.cache.hideout_areas, base);
        logger.logSuccess("[Mod Aio] Build timers have been reduced ");
    }
    if (settings.hideout.fastCraft == true) {
        base = fileIO.readParsed(db.user.cache.hideout_production)
        for (let file in base.data) {
            let fileData = base.data[file];
            if (fileData.areaType != 20 && settings.hideout.fastBitcoin == false) {
                fileData.productionTime = 5;
            } else {
                fileData.productionTime = 5;     
            }
        }
        fileIO.write(db.user.cache.hideout_production, base);
        logger.logSuccess("[Mod Aio] Craft timers have been reduced ");
    }
    if (settings.hideout.fastScavCase == true) {
        base = fileIO.readParsed(db.user.cache.hideout_scavcase)
        for (let file in base.data) {
            let filedata = base.data[file];
            filedata.productionTime = 5;
        }
        fileIO.write(db.user.cache.hideout_scavcase, base);
        logger.logSuccess("[Mod Aio] Scav Case timer has been reduced ");
    }
}