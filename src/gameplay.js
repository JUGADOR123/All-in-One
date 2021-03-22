exports.mod = () => {
    logger.logInfo("[Mod] All in One v2");
    //Load Settings
    const config = require("../config.js");
    //Gameplay.json
    let locationloot = global._database.gameplayConfig.locationloot;
    let gameplay = fileIO.readParsed(global.db.user.configs.gameplay);
    //const gameplay = require("../../../configs/gameplay.json")
    //Loot Overlap
    if (config.locationloot.CustomLoot === true) {
        //Overlap Loot
        if (config.locationloot.overlappingLoot === true) {
            gameplay.locationloot.allowLootOverlap = true;
        } 
        //Per map loot
        gameplay.locationloot.bigmap = config.locationloot.Custom;
        gameplay.locationloot.factory4_day = config.locationloot.Factory;
        gameplay.locationloot.factory4_night = config.locationloot.Factory;
        gameplay.locationloot.interchange = config.locationloot.Interchange;
        gameplay.locationloot.laboratory = config.locationloot.Labs;
        gameplay.locationloot.rezervbase = config.locationloot.Reserve;
        gameplay.locationloot.shoreline = config.locationloot.Shoreline;
        gameplay.locationloot.woods = config.locationloot.Woods;
        //Container Loot and if disabled, turns them back to defaults
        locationloot.containers.ChanceForEmpty = config.locationloot.containers.ChanceForEmpty;
        locationloot.containers.ChanceToSpawnNextItem = config.locationloot.containers.ChanceToSpawnNextItem;
        locationloot.containers.AttemptsToPlaceLoot = config.locationloot.containers.AttemptsToPlaceLoot;
        locationloot.containers.Not_exist = config.locationloot.containers.RarityMultipliers.Not_exist;
        locationloot.containers.Common = config.locationloot.containers.RarityMultipliers.Common;
        locationloot.containers.Rare = config.locationloot.containers.RarityMultipliers.Rare;
        locationloot.containers.Superrare = config.locationloot.containers.RarityMultipliers.Superrare;
    } else {
        logger.logError("[All in One] CustomLoot setting is disabled, ignoring loot settings")
    }
    fileIO.write(global.db.user.configs.gameplay, gameplay);
}