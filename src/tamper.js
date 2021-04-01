exports.mod = () => {
    logger.logInfo("[All in One v2] Loading Tamper Settings");

    //setting variables
    const config = require("../config.js");

    //CacheBase-> Globals
    let globals = fileIO.readParsed(global.db.cacheBase.globals);
    // Gameplay.json
    let gameplay = fileIO.readParsed(global.db.user.configs.gameplay);
    let locationloot = global._database.gameplayConfig.locationloot;

    //Loot modifiers
    if (config.locationloot.CustomLoot === true) {

        //Overlap Loot
        if (config.locationloot.overlappingLoot === true) {
            gameplay.locationloot.allowLootOverlap = true;
        } else {
            gameplay.locationloot.allowLootOverlap = false;
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
        //Loot Containers
        locationloot.containers.ChanceForEmpty = config.locationloot.containers.ChanceForEmpty;
        locationloot.containers.ChanceToSpawnNextItem = config.locationloot.containers.ChanceToSpawnNextItem;
        locationloot.containers.AttemptsToPlaceLoot = config.locationloot.containers.AttemptsToPlaceLoot;
        locationloot.containers.Not_exist = config.locationloot.containers.RarityMultipliers.Not_exist;
        locationloot.containers.Common = config.locationloot.containers.RarityMultipliers.Common;
        locationloot.containers.Rare = config.locationloot.containers.RarityMultipliers.Rare;
        locationloot.containers.Superrare = config.locationloot.containers.RarityMultipliers.Superrare;
    } else {
        logger.logError("[All in One v2] CustomLoot setting is disabled, ignoring loot settings")
    }
    //Player Scav Timer
    if (config.ScavTimer != false) {
        globals.data.SavagePlayCooldown = config.ScavTimer;
        globals.data.SavagePlayCooldownNdaFree = config.ScavTimer;
    } else {
        //if timer is false
        globals.data.config.SavagePlayCooldown = 20;
        globals.data.config.SavagePlayCooldownNdaFree = 20;
    }
    //Infinite Stamina
    if (config.InfiniteStamina === true) {
        globals.data.config.Stamina.Capacity = 1000;
        globals.data.config.Stamina.SprintDrainRate = 0.1;
        globals.data.config.Stamina.BaseRestorationRate = 1000;
        globals.data.config.Stamina.JumpConsumption = 1;
        globals.data.config.Stamina.GrenadeHighThrow = 1;
        globals.data.config.Stamina.GrenadeLowThrow = 1;
        globals.data.config.Stamina.AimDrainRate = 0.1;
        globals.data.config.Stamina.OxygenCapacity = 1000;
        globals.data.config.Stamina.OxygenRestoration = 1000;
    } else {
        //If infinite stamina is false
        globals.data.config.Stamina.Capacity = 100;
        globals.data.config.Stamina.SprintDrainRate = 4;
        globals.data.config.Stamina.BaseRestorationRate = 5;
        globals.data.config.Stamina.JumpConsumption = 16;
        globals.data.config.Stamina.GrenadeHighThrow = 11;
        globals.data.config.Stamina.GrenadeLowThrow = 8;
        globals.data.config.Stamina.AimDrainRate = 1.3;
        globals.data.config.Stamina.OxygenCapacity = 300;
        globals.data.config.Stamina.OxygenRestoration = 4;
    }
    fileIO.write(global.db.user.configs.gameplay, gameplay);
    fileIO.write(global.db.cacheBase.globals, globals);
    logger.logSuccess("[All in One v2] Tamper Settings Successfully Applied")
}