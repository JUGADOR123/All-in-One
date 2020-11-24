exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../../settings.json");
    if (settings.player.allQuestAvailable == true) {
        base = fileIO.readParsed(db.user.cache.quests);
        for (let file in base.data) {
            let fileData = base.data[file]
            fileData.conditions.AvailableForStart = [
                {
                    "_parent": "Level",
                    "_props": {
                        "compareMethod": ">=",
                        "value": "1",
                        "index": 0,
                        "parentId": "",
                        "id": "Jugador-QuestID"
                    }
                }
            ]
        }
        fileIO.write(db.user.cache.quests, base);
    }
    logger.logSuccess("[Mod Aio] All quests have been Added");

}