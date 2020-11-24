exports.mod = () => {
    logger.logInfo("[MOD] All in one Module");
    let settings = require("../../settings.json");

    for (let item in global._database.items) {
        let data = global._database.items[item];
        //Remove Weight
        if (settings.items.Weight == true) {
            data._props.Weight = 0;
            global._database.items[item] = data;

        }
        if (data._name.includes("patron") && !data._name.includes("40x46")) {
            data._props.StackMaxSize = settings.items.Stack;
            global._database.items[item] = data;
        }
        //Allow Armored rigs with armor
        if (settings.items["Armor&Rigs"] == true) {
            if (data._parent === "5448e5284bdc2dcb718b4567") {
                data._props.BlocksArmorVest = false;
                global._database.items[item] = data;
            }
        }
        //Bigger Money Stacks
        if (data._id === "5449016a4bdc2d6f028b456f" || data._id === "5696686a4bdc2da3298b456a" || data._id === "569668774bdc2da2298b4568") {
            data._props.StackMaxSize = settings.items.Money;
            global._database.items[item] = data;
        }
        //Removes item restrictions on inventory
        if (settings.items.ItemRestrictions == false) {
            if (data._parent == "5448bf274bdc2dfc2f8b456a") {
                data._props.Grids[0]._props.filters = [];
                global._database.items[item] = data;
            }
        }
        
    }
    if (settings.items.Weight == true) {
        logger.logSuccess("[Mod Aio] Weight has been removed");
    }
    logger.logSuccess("[Mod Aio] Bullet stacking updated to: " + settings.items.Stack);
    if (settings.items["Armor&Rigs"] == true) {
        logger.logSuccess("[Mod Aio] Now possible to use Armored rigs with Body armor");
    }
    logger.logSuccess("[Mod Aio] Money stacking updated to: " + settings.items.Money);
    if (settings.items.ItemRestrictions == false) {
        logger.logSuccess("[Mod Aio] Secure Container restrictions have been removed")
    }
}