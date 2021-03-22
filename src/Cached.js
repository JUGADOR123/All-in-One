exports.mod = () => {
    logger.logInfo("[Mod] All in One v2");
    //Load Settings
    const config = require("../config.js");
    //Load cacheBase/Globals
    let globals = fileIO.readParsed(global.db.cacheBase.globals);
    //Load Cache Stuff
    //Items
    let itemsFile = fileIO.readParsed(`user/cache/items.json`);
    let mapfile = fileIO.readParsed(`user/cache/locations.json`);

    //Hideout Shit
    let hareas = fileIO.readParsed(`user/cache/hideout_areas.json`);
    let hprod = fileIO.readParsed(`user/cache/hideout_production.json`);
    let scavcase = fileIO.readParsed(`user/cache/hideout_scavcase.json`);
    //Main Loop
    for (let k in itemsFile.data) {
        //Remove Nodes
        if (itemsFile.data[k]._type != "Node") {
            //No Weight
            if (config.noWeight === true) {
                itemsFile.data[k]._props.Weight = 0;
            }
            //Stack Sizes
            //Money Stack size
            if (config.Stacksize.Stacks === true) {
                if (itemsFile.data[k]._props.Name === "Dollars" || itemsFile.data[k]._props.Name === "Рубли" || itemsFile.data[k]._props.Name === "Euros") {
                    itemsFile.data[k]._props.stackMaxSize = config.Stacksize.money;
                }
                //ammo stack size
                if (itemsFile.data[k]._name.includes("patron")) {
                    itemsFile.data[k]._props.stackMaxSize = config.Stacksize.Ammo;
                }
            }

            //Gamma Restrictions
            if (config.removeGammaRestrictions === true) {
                if (itemsFile.data[k]._parent === "5448e53e4bdc2d60728b4567" || itemsFile.data[k]._parent === "5448bf274bdc2dfc2f8b456a") {
                    itemsFile.data[k]._props.Grids[0]._props.filters = [];
                }
            }
            //Armor and Armored Rigs
            if (config.ArmorRigs === true) {
                if (itemsFile.data[k]._props.BlocksArmorVest === true) {
                    itemsFile.data[k]._props.BlocksArmorVest = false;
                }
            }
        }
    }

    //Match Related Stuff
    if (config.CustomTimer != false) {
        for (let map in mapfile) {
            //Custom map timer
            mapfile[map].base.exit_access_time = config.CustomTimer;
            mapfile[map].base.escape_time_limit = config.CustomTimer;
            //No exit Restrictions
            if (config.NoExitRestrictions === true) {
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
    //Global loot modifier
    if (config.locationloot.globalLootModifier != false) {
        for (let map in mapfile) {
            mapfile[map].base.GlobalLootChanceModifier = config.locationloot.globalLootModifier;
        }
    }
    //BossChance
    if (config.BossChance != false) {
        for (let map in mapfile) {
            for (let boss in mapfile[map].base.BossLocationSpawn) {
                mapfile[map].base.BossLocationSpawn[boss].BossChance = config.BossChance;
            }
        }
    }
    //Scav Timer
    if (config.ScavTimer != false) {
        globals.data.config.SavagePlayCooldown = config.ScavTimer;
        globals.data.config.SavagePlayCooldownNdaFree = config.ScavTimer;
    }
    //Hideout Shit
    //Upgrading timer
    if (config.FastUpgrade === true) {
        for (let area in hareas.data) {
            for (let stage in hareas.data[area].stages) {
                hareas.data[area].stages[stage].constructionTime = 5;
            }
        }
    }
    //Crafting timer
    //All production
    if (config.FastProduction === true && config.FastBitcoin === true) {
        for (let area in hprod.data) {
            hprod.data[area].productionTime = 5;
        }
    }
    //Only Crafting
    if (config.FastProduction === true && config.FastBitcoin === false) {
        for (let area in hprod.data) {
            if (hprod.data._id != "5d5c205bd582a50d042a3c0e") {
                hprod.data[area].productionTime = 5;
            }
        }
    }
    //Only Bitcoin
    if (config.FastProduction === false && config.FastBitcoin === true) {
        for (let area in hprod.data) {
            if (hprod.data._id === "5d5c205bd582a50d042a3c0e") {
                hprod.data[area].productionTime = 5;
            }
        }
    }
    //Fast Scav Case
    if (config.FastScavCase === true) {
        for (let price in scavcase.data) {
            scavcase.data[price].productionTime = 5;
        }
    }
    //Infinite Stamina
    if (config.InfiniteStamina === true) {
        globals.data.config.Stamina.Capacity = 1000;
        globals.data.config.Stamina.SprintDrainRate = 0.1;
        globals.data.config.Stamina.BaseRestorationRate = 1000;
        globals.data.config.Stamina.JumpConsumption = 1;
        globals.data.config.Stamina.GrenadeHighThrow = 1;
        globals.data.config.Stamina.GrenadeLowThrow = 1;
        globals.data.config.Stamina.AimDrainRate = 0.1;
        globals.data.config.Stamina.OxygenCapacity = 1000;
        globals.data.config.Stamina.OxygenRestoration = 1000;
    }
    //All clothing unlocked and free
    const traders = ["5ac3b934156ae10c4430e83c.json", "579dc571d53a0658a154fbec.json"]
    if (config.AllClothes === true) {
        for (let trader in traders) {
            let shop = fileIO.readParsed("user/cache/assort_" + traders[trader])
            for (let suit in shop.data.suits) {
                //logger.logInfo(shop.data.suits[suit]._id)
                shop.data.suits[suit].requirements = {
                    "loyaltyLevel": 0,
                    "profileLevel": 1,
                    "standing": 0,
                    "skillRequirements": [],
                    "questRequirements": [],
                    "itemRequirements": []
                }
            }
            fileIO.write('user/cache/assort_' + traders[trader], shop)
        }
    }

    fileIO.write(`user/cache/db.json`, db);
    fileIO.write(`user/cache/locations.json`, mapfile);
    fileIO.write(`user/cache/items.json`, itemsFile);
    fileIO.write(`user/cache/hideout_areas.json`, hareas);
    fileIO.write(`user/cache/hideout_production.json`, hprod);
    fileIO.write(`user/cache/hideout_scavcase.json`, scavcase);
    logger.logSuccess("[Mod] All in One v2 Successfully Applied")
}