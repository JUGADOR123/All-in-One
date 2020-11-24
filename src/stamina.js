exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../settings.json");
    if (settings.player.infiniteStamina == true) {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.config.Stamina.Capacity =5000;
        base.config.Stamina.SprintDrainRate = 0;
        base.config.Stamina.BaseRestorationRate = 1000;
        base.config.Stamina.JumpConsumption = 5;
        base.config.Stamina.GrenadeHighThrow = 0;
        base.config.Stamina.GrenadeLowThrow = 0;
        base.config.Stamina.AimDrainRate = 0;
        base.config.Stamina.OxygenCapacity = 5000;
        base.config.Stamina.OxygenRestoration = 1000;
        fileIO.write(db.cacheBase.globals, base);
        logger.logSuccess("[Mod Aio] Infinite Stamina Successfully Applied");
    } else {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.config.Stamina.Capacity = 100;
        base.config.Stamina.SprintDrainRate = 4;
        base.config.Stamina.BaseRestorationRate = 6;
        base.config.Stamina.JumpConsumption = 13;
        base.config.Stamina.GrenadeHighThrow = 10;
        base.config.Stamina.GrenadeLowThrow = 8;
        base.config.Stamina.AimDrainRate = 0.7;
        base.config.Stamina.OxygenCapacity = 300;
        base.config.Stamina.OxygenRestoration = 4;
        fileIO.write(db.cacheBase.globals, base); 
    }
    
}
