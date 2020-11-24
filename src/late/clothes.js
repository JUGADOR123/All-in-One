exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../../settings.json");
    if (settings.player.ClothesAllSides == true) {
        base = fileIO.readParsed(db.user.cache.customization)
        for (let file in base.data) {
            let fileData = base.data[file]
            fileData._props.Side = ["Savage", "Bear", "Usec"];
            base.data[file] = fileData;
        }

        fileIO.write(db.user.cache.customization, base);
        logger.logSuccess("[Mod Aio] All factions now own all clothes ");
    }
    
    if (settings.player.freeClothes == true) {
        for (let trader in db.assort) {
            if ("customization" in db.assort[trader]) {
                let base = fileIO.readParsed(db.user.cache[`customization_${trader}`]);
                for (let file in base) {
                    let fileData = base[file]
                    fileData.requirements.loyaltyLevel = 1;
                    fileData.requirements.profileLevel = 1;
                    fileData.requirements.standing = 0;
                    fileData.requirements.skillRequirements = [];
                    fileData.requirements.questRequirements = [];
                    fileData.requirements.itemRequirements = [];
                    fileIO.write(db.user.cache[`customization_${trader}`], base);
                }
                
            }
        }
        logger.logSuccess("[Mod Aio] All clothes are now free ");
    }
    
}