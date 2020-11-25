exports.mod = () => {
    let settings = require("../settings.json");
    base = fileIO.readParsed(db.user.cache.items);
    for (let item in base.data) {
        
        if (base.data[item]._type != "Node") {
            //Removes weight
            if (settings.items.noWeight == true) {
                base.data[item]._props.Weight = 0;
            }
            //Armor and armored rigs
            if (settings.items["Armor&Rigs"] == true) {
                if (base.data[item]._props.BlocksArmorVest == true) {
                    base.data[item]._props.BlocksArmorVest = false;
                }
            }
            //Money Stacks
            if (base.data[item]._props.Name === "Dollars" || base.data[item]._props.Name === "Рубли" || base.data[item]._props.Name === "Euros") {
                base.data[item]._props.StackMaxSize = settings.items.Money;
            }
            //Bullet Stacks
            if (base.data[item]._name.includes("patron") && !base.data[item]._name.includes("40x46")) {
                base.data[item]._props.StackMaxSize = settings.items.Stack;
            }
            //Remove Item Restrictions
            if (settings.items.noItemRestrictions == true) {
                if (base.data[item]._parent === "5448e53e4bdc2d60728b4567" || base.data[item]._parent === "5448bf274bdc2dfc2f8b456a") {
                    base.data[item]._props.Grids[0]._props.filters = [];
                }
            }


        }


    }
    fileIO.write(db.user.cache.items, base);
    logger.logSuccess("[Mod Aio] Item related Settings successfully applied")
    
}