exports.mod = () => {
    let settings = require("../settings.json");
    if (settings.gameplay.noExitRestrictions == true) {
        let file = fileIO.readParsed(db.user.cache.locations)
        for (let map in file) {
            for (let exit in file[map].base.exits) {
                file[map].base.exits[exit].ExfiltrationType = "Individual"
                file[map].base.exits[exit].PassageRequirement = "None"
                file[map].base.exits[exit].RequirementTip = ""
                file[map].base.exits[exit].Count = 0
            }
        }
        fileIO.write(db.user.cache.locations, file);
        logger.logSuccess("[Mod Aio] Restrictions have been removed");
    }
}