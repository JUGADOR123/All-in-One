exports.mod = () => {
    let settings = require("../settings.json");
    if (settings.player.enableskillMultiplier == true) {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.config.SkillProgressRate = settings.player.skillMultiplier;
        base.config.WeaponSkillProgressRate = settings.player.skillMultiplier;
        base.config.SkillMinEffectiveness = 10;
        base.configSkillFatiguePerPoint = 0;
        base.config.SkillFreshEffectiveness = 10;

        fileIO.write(db.cacheBase.globals, base);
        logger.logSuccess("[Mod Aio] Skill multiplier increased to " + settings.player.skillMultiplier);
    }
    else {
        let base = fileIO.readParsed(db.cacheBase.globals);
        base.config.SkillProgressRate = 0.6;
        base.config.WeaponSkillProgressRate = 1;
        base.SkillMinEffectiveness = 0.0001;
        base.SkillFreshEffectiveness = 1.3;
        base.SkillFatiguePerPoint = 0.5;
    }

}