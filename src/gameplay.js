exports.mod = () => {
    let settings = require("../settings.json");
    base = fileIO.readParsed(db.user.configs.gameplay);
    base.trading.ragfairMultiplier = settings.player.fleapricemultiplier;
    base.trading.insureReturnChance = settings.player.insureReturnChance;
    base.locationloot.containers.ChanceForEmpty = settings.loot.chanceforemptycontainers;
    base.locationloot.containers.ChanceToSpawnNextItem = settings.loot.chancetospawnnextitem;
    base.locationloot.containers.AttemptsToPlaceLoot = settings.AttemptsToPlaceLoot;
    base.locationloot.allowLootOverlay = settings.loot.allowlootoverlay;
    fileIO.write(db.user.configs.gameplay, base);

    logger.logSuccess("[Mod Aio] Flea market multiplier updated to: "+settings.player.fleapricemultiplier);
    logger.logSuccess("[Mod Aio] Insurance return chance has been updated to: " + settings.player.insureReturnChance);
    logger.logSuccess("[Mod Aio] Loot Settings successfully updated")

}