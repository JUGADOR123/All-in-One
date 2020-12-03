exports.mod = () => {
    let settings = require("../settings.json");
    if (settings.gameplay.noExitRestrictions == true) {
        let base = fileIO.readParsed(db.user.cache.locations)
        for (let map in base) {
            for (let exit in base[map].base.exits) {
                base[map].base.exits[exit].ExfiltrationType = "Individual"
                base[map].base.exits[exit].PassageRequirement = "None"
                base[map].base.exits[exit].RequirementTip = ""
                base[map].base.exits[exit].Count = 0
            }
        }
        fileIO.write(db.user.cache.locations, base);
    }
    logger.logSuccess("[Mod Aio] Restrictions have been removed");

}