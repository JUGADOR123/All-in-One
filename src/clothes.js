exports.mod = () => {
    let settings = require("../settings.json");
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
        for (let base in db.assort) {
            if (base === "5ac3b934156ae10c4430e83c" || base === "579dc571d53a0658a154fbec") {
                trader = fileIO.readParsed(db.assort[base].suits);
                for (let suit in trader) {
                    trader[suit].requirements = {
                        "loyaltyLevel": 0,
                        "profileLevel": 1,
                        "standing": 0,
                        "skillRequirements": [],
                        "questRequirements": [],
                        "itemRequirements": []
                    }
                }
                fileIO.write(db.assort[base].suits, trader);
            }
        } 
        logger.logSuccess("[Mod Aio] All clothes are now free ");
    }
}