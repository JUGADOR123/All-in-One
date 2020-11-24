exports.mod = () => {
    logger.logInfo("[MOD] All in One");
    let settings = require("../settings.json");

    //Item Related settings:
    for (let item in global._Database.items) {
        let data = global._Database.items[item];
        //Remove Weight
        if (settings.items.Weight == true) {
            data._props.Weight = 0;

        }
        //More Bullet Stacks
        if (data._name.includes("patron") && !data._name.includes("40x46")) {
            data._props.StackMaxSize = settings.items.Stack;
        }
        //Allow Armored rigs with armor (further investigation)
        if (settings.items["Armor&Rigs"] == true) {
            if (data._parent === "5448e5284bdc2dcb718b4567") {
                data._props.BlocksArmorVest = false;
            }
        }
        //Bigger Money Stacks
        if (data._id === "5449016a4bdc2d6f028b456f" || data._id === "5696686a4bdc2da3298b456a" || data._id === "569668774bdc2da2298b4568") {
            data._props.StackMaxSize = settings.items.Money;
        }
        //Removes item restrictions on inventory
        if (settings.items.ItemRestrictions == false) {
            if (data._parent == "5448bf274bdc2dfc2f8b456a") {
                data._props.Grids[0]._props.filters = [];
            }
        }
        //Allows to fully strip weapons midraid
        if (settings.items.inRaidModding == true && (data._parent === "550aa4bf4bdc2dd6348b456b" || data._parent === "550aa4cd4bdc2dd8348b456c" || data._parent === "550aa4dd4bdc2dc9348b4569" || data._parent === "55818acf4bdc2dde698b456b" || data._parent === "55818ac54bdc2d5b648b456e" || data._parent === "55818add4bdc2d5b648b456f" || data._parent === "55818ad54bdc2ddc698b4569" || data._parent === "55818ae44bdc2dde698b456c" || data._parent === "55818afb4bdc2dde698b456d" || data._parent === "55818b164bdc2ddc698b456c" || data._parent === "55818b084bdc2d5b648b4571" || data._parent === "55818af64bdc2d5b648b4570" || data._parent === "56ea9461d2720b67698b456f" || data._parent === "5a74651486f7744e73386dd1" || data._parent === "55818a594bdc2db9688b456a" || data._parent === "55818a6f4bdc2db9688b456b" || data._parent === "55818b224bdc2dde698b456f" || data._parent === "5448bc234bdc2d3c308b4569" || data._parent === "55818a104bdc2db9688b4569" || data._parent === "55818a684bdc2ddd698b456d" || data._parent === "555ef6e44bdc2de9068b457e" || data._parent === "55818a304bdc2db5418b457d")) {
            data._props.RaidModdable = true;
        }

        global._Database.items[item] = data;
    }
    //Hideout Related
    //Upgrading and building hideout timer
    for (let hbuild in global._Database.hideout_areas) {
        let hdata = global._Database.hideout_areas[hbuild];
        if (settings.hideout.buildTime == true) {
            for (let x in hdata.stages) {
                hdata.stages[x].constructionTime = 5
            }
        }
    }
    //Hideout crafting
    for (let hcraft in global._Database.hideout_production) {
        let cdata = global._Database.hideout_production[hcraft];
        if (settings.hideout.buildTime == true) {
            if (cdata.continious === false) {
                cdata.productionTime = 10;
            }
        }
    }
    ///ScavCase Timer
    for (let scav in global._Database.hideout_scavcase) {
        let scavdata = global._Database.hideout_scavcase[scav];
        if (settings.hideout.fastScavCase == true) {
            scavdata.productionTime = 15;
            
        }
    }

    logger.logSuccess("[Mod] All in One Configs Successfully Applied")
}