exports.mod = () => {
    let settings = require("../settings.json");
    if (settings.gameplay.allExtracts == true) {
        let file = fileIO.readParsed(db.user.cache.locations)
        for (let map in file) {
            for (let exit in file[map].base.exits) {
                file[map].base.exits[exit].Chance = 100;
            }
        }
        fileIO.write(db.user.cache.locations, file);
        logger.logSuccess("[Mod Aio] All extracts have been opened");
    }
}