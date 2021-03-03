exports.mod = () => {
    logger.logInfo("[Mod] All in One v2");
    //Load Settings
    let config = require("../config.json");
    //Load default values file
    let defaults = require("../defaults.json");
    //Items
    let itemsFile = fileIO.readParsed(global.db.user.cache.items);
    let mapfile = fileIO.readParsed(global.db.user.cache.locations);
    //Hideout Shit
    let hareas = fileIO.readParsed(global.db.user.cache.hideout_areas);
    let hprod = fileIO.readParsed(global.db.user.cache.hideout_production);
    let scavcase = fileIO.readParsed(global.db.user.cache.hideout_scavcase);
    //Clothing shit
    //customization = fileIO.readParsed(global.db.user.cache.customization);
    //Main Loop
    for (let k in itemsFile.data) {
        //Remove Nodes
        if (itemsFile.data[k]._type != "Node") {
        //No Weight
            if (config.items.noWeight === true) {
                itemsFile.data[k]._props.Weight = 0;
            }
        //Money Stacks
            if (config.items.moneyStack != false) {
                if (itemsFile.data[k]._props.Name === "Dollars" || itemsFile.data[k]._props.Name === "Рубли" || itemsFile.data[k]._props.Name === "Euros") {
                    itemsFile.data[k]._props.stackMaxSize = config.items.moneyStack;
                }
            }
        //Bullet Stack
            if (config.items.bulletStack != false) {
                if (itemsFile.data[k]._name.includes("patron")) {
                    itemsFile.data[k]._props.stackMaxSize = config.items.bulletStack;
                }
            }
        //Gamma Restrictions
            if (config.items.removeGammaRestrictions == true) {
                if (itemsFile.data[k]._parent === "5448e53e4bdc2d60728b4567" || itemsFile.data[k]._parent === "5448bf274bdc2dfc2f8b456a") {
                    itemsFile.data[k]._props.Grids[0]._props.filters = [];
                }
            }
        //Armor and Armored Rigs
            if (config.items["armor&ArmoredRigs"] === true) {
                if (itemsFile.data[k]._props.BlocksArmorVest === true) {
                    itemsFile.data[k]._props.BlocksArmorVest = false;
                }
            }
        }
    }    
    //Global loot modifier
    if (config.Map.globalLootModifier != false) {
        for (let map in mapfile) {
            mapfile[map].base.GlobalLootChanceModifier = config.Map.globalLootModifier;
        }
    }
    //Match Related Stuff
    if (config.Match.CustomTimer != false) {
        for (let map in mapfile) {
            //Custom map timer
            mapfile[map].base.exit_access_time = config.Match.CustomTimer;
            mapfile[map].base.escape_time_limit = config.Match.CustomTimer; 

            //No exit Restrictions
            if (config.Match.NoExitRestrictions === true) {
                mapfile[map].base.exit_count = 10;
                mapfile[map].base.MinDistToExitPoint = 0;
                for (let exit in mapfile[map].base.exits) {
                    mapfile[map].base.exits[exit].Chance = 100;
                    mapfile[map].base.exits[exit].PassageRequirement = "None";
                    mapfile[map].base.exits[exit].ExfiltrationType = "Individual";
                    mapfile[map].base.exits[exit].Id = "";
                    mapfile[map].base.exits[exit].Count = 0;
                    mapfile[map].base.exits[exit].RequirementTip = "";
                }
            }
        }
    }
    //BossChance
    if (config.Match.BossChance != false) {
        for (let map in mapfile) {
            for (let boss in mapfile[map].base.BossLocationSpawn) {
                mapfile[map].base.BossLocationSpawn[boss].BossChance = config.Match.BossChance;
            }
        }
    }
        //Hideout Shit
    //Upgrading timer
    if (config.Hideout.FastUpgrade === true) {
        for (let area in hareas.data) {
            for (let stage in hareas.data[area].stages) {
                hareas.data[area].stages[stage].constructionTime = 5;
            }
        }
    }
    //Crafting timer
    if (config.Hideout.FastProduction === true) {
        for (let area in hprod.data) {
            if (!hprod.data[area]._id === "5d5c205bd582a50d042a3c0e") {
                hprod.data[area].productionTime = 5;
            }
            //Fast Bitcoin
            if (config.Hideout.FastBitcoin === true) {
                hprod.data[area].productionTime = 5;
            }
        }
    }
    //Fast Scav Case
    if (config.Hideout.FastScavCase === true) {
        for (let price in scavcase.data) {
            scavcase.data[price].productionTime = 5;
        }
    }
    fileIO.write(global.db.user.cache.locations, mapfile);
    fileIO.write(global.db.user.cache.items, itemsFile);
    fileIO.write(global.db.user.cache.hideout_areas, hareas);
    fileIO.write(global.db.user.cache.hideout_production, hprod);
    fileIO.write(global.db.user.cache.hideout_scavcase, scavcase);
    //fileIO.write(global.db.user.cache.customization, customization);
}