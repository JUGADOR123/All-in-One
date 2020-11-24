exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../../settings.json");
    if (settings.player.skillMultiplier > 1) {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.config.SkillProgressRate = settings.player.skillMultiplier;
        base.config.WeaponSkillProgressRate = settings.player.skillMultiplier;
        fileIO.write(db.cacheBase.globals, base);
        logger.logSuccess("[Mod Aio] Skill multiplier increased to "+settings.player.skillMultiplier);
    }
    if (settings.player.skillFatigue == false) {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.SkillMinEffectiveness = 2;
        base.SkillFatiguePerPoint = 0;
        base.SkillFreshEffectiveness = 10;
        fileIO.write(db.cacheBase.globals, base);
        logger.logSuccess("[Mod Aio] Successfullu removed skill fatigue");
    }
    

}