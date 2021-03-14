exports.mod = () => {
    logger.logInfo("[Mod] All in One v2");
    //Load Settings
    let config = require("../config.json");
    //Load default values file
    let defaults = require("../defaults.json");
    //Load cacheBase/Globals
    let globals = fileIO.readParsed(global.db.cacheBase.globals);
    //Load Cache Stuff
    //Items
    //let itemsFile = fileIO.readParsed(global.db.user.cache.items);
    let mapfile = fileIO.readParsed(global.db.user.cache.locations);
    //Gameplay.json
    let locationloot = global._database.gameplayConfig.locationloot;
    let gameplay = fileIO.readParsed(global.db.user.configs.gameplay);
    //const gameplay = require("../../../configs/gameplay.json")
    //Hideout Shit
    //let hareas = fileIO.readParsed(global.db.user.cache.hideout_areas);
   // let hprod = fileIO.readParsed(global.db.user.cache.hideout_production);
    //let scavcase = fileIO.readParsed(global.db.user.cache.hideout_scavcase);
    //Clothing shit
    //customization = fileIO.readParsed(global.db.user.cache.customization);
    //Main Loop
    /*for (let k in itemsFile.data) {
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
    }*/
    //Loot Overlap
    if (config.Map.CustomLoot === true) {
        //Overlap Loot
        if (config.Map.overlappingLoot === true) {
            gameplay.locationloot.allowLootOverlap = true;
        } else {
            gameplay.locationloot.allowLootOverlap = false;
        }
        //Global loot modifier
        if (config.Map.globalLootModifier != false) {
            for (let map in mapfile) {
                mapfile[map].base.GlobalLootChanceModifier = config.Map.globalLootModifier;
            }
        }
        //Per map loot
        if (config.Map.Custom != false) {
            gameplay.locationloot.bigmap = config.Map.Custom;
        }
        if (config.Map.Factory != false) {
            gameplay.locationloot.factory4_day = config.Map.Factory;
            gameplay.locationloot.factory4_night = config.Map.Factory;
        }
        if (config.Map.Interchange != false) {
            gameplay.locationloot.interchange = config.Map.Interchange;
        }
        if (config.Map.Labs != false) {
            gameplay.locationloot.laboratory = config.Map.Labs;
        }
        if (config.Map.Reserve != false) {
            gameplay.locationloot.rezervbase = config.Map.Reserve;
        }
        if (config.Map.Shoreline != false) {
            gameplay.locationloot.shoreline = config.Map.Shoreline;
        }
        if (config.Map.Woods != false) {
            gameplay.locationloot.woods = config.Map.Woods;
        }
    } else {
        //If Custom loot is false, return default values
        gameplay.locationloot = defaults.Maps.bigmap;
        gameplay.locationloot = defaults.Maps.factory4_day;
        gameplay.locationloot = defaults.Maps.factory4_night;
        gameplay.locationloot = defaults.Maps.interchange;
        gameplay.locationloot = defaults.Maps.laboratory;
        gameplay.locationloot = defaults.Maps.rezervbase;
        gameplay.locationloot = defaults.Maps.shoreline;
        gameplay.locationloot = defaults.Maps.woods;
    }
    //Container Loot and if disabled, turns them back to defaults
    if (config.Map.containers.ChanceForEmpty != false) {
        locationloot.containers.ChanceForEmpty = config.Map.containers.ChanceForEmpty;
    } else {
        locationloot.containers.ChanceForEmpty = defaults.containers.ChanceForEmpty;
    }
    if (config.Map.containers.ChanceToSpawnNextItem != false) {
        locationloot.containers.ChanceToSpawnNextItem = config.Map.containers.ChanceToSpawnNextItem;

    } else {
        locationloot.containers.ChanceToSpawnNextItem = defaults.containers.ChanceToSpawnNextItem;
    }
    if (config.Map.containers.AttemptsToPlaceLoot != false) {
        locationloot.containers.AttemptsToPlaceLoot = config.Map.containers.AttemptsToPlaceLoot;

    } else {
        locationloot.containers.AttemptsToPlaceLoot = defaults.containers.AttemptsToPlaceLoot;
    }
    if (config.Map.containers.RarityMultipliers.Not_exist != false) {
        locationloot.containers.Not_exist = config.Map.containers.RarityMultipliers.Not_exist;

    } else {
        locationloot.containers.Not_exist = defaults.containers.RarityMultipliers.Not_exist;
    }
    if (config.Map.containers.RarityMultipliers.Common != false) {
        locationloot.containers.Common = config.Map.containers.RarityMultipliers.Common;

    } else {
        locationloot.containers.Common = defaults.containers.RarityMultipliers.Common;
    }
    if (config.Map.containers.RarityMultipliers.Rare != false) {
        locationloot.containers.Rare = config.Map.containers.RarityMultipliers.Rare;

    } else {
        locationloot.containers.Rare = defaults.containers.RarityMultipliers.Rare;
    }
    if (config.Map.containers.RarityMultipliers.Superrare != false) {
        locationloot.containers.Superrare = config.Map.containers.RarityMultipliers.Superrare;

    } else {
        locationloot.containers.Superrare = defaults.containers.RarityMultipliers.Superrare;
    }
    //Match Related Stuff
    /*if (config.Match.CustomTimer != false) {
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
    }*/
    //Scav Timer
    if (config.Match.ScavTimer != false) {
        globals.data.config.SavagePlayCooldown = config.Match.ScavTimer;
        globals.data.config.SavagePlayCooldownNdaFree = config.Match.ScavTimer;
    } else {
        globals.data.SavagePlayCooldown = 60;
        globals.data.SavagePlayCooldownNdaFree = 60;
    }
    //Hideout Shit
    //Upgrading timer
    /*if (config.Hideout.FastUpgrade === true) {
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
    }*/
    //Infinite Stamina
    if (config.Player.InfiniteStamina === true) {
        globals.data.config.Stamina.Capacity = 1000;
        globals.data.config.Stamina.SprintDrainRate = 0.1;
        globals.data.config.Stamina.BaseRestorationRate = 1000;
        globals.data.config.Stamina.JumpConsumption = 1;
        globals.data.config.Stamina.GrenadeHighThrow = 1;
        globals.data.config.Stamina.GrenadeLowThrow = 1;
        globals.data.config.Stamina.AimDrainRate = 0.1;
        globals.data.config.Stamina.OxygenCapacity = 1000;
        globals.data.config.Stamina.OxygenRestoration = 1000;
    } else {
        //Return Defaults
        globals.data.config.Stamina.Capacity = 100;
        globals.data.config.Stamina.SprintDrainRate = 4;
        globals.data.config.Stamina.BaseRestorationRate = 5;
        globals.data.config.Stamina.JumpConsumption = 16;
        globals.data.config.Stamina.GrenadeHighThrow = 11;
        globals.data.config.Stamina.GrenadeLowThrow = 8;
        globals.data.config.Stamina.AimDrainRate = 1.3;
        globals.data.config.Stamina.OxygenCapacity = 300;
        globals.data.config.Stamina.OxygenRestoration = 4;
    }
    //All Clothes  not sure what you want to do here,  as its all in one loop.   so i leave this one to you. 
    if (config.Player.AllClothes === true) {
        for (let base in global.db.assort) {
            if (base === "5ac3b934156ae10c4430e83c" || base === "579dc571d53a0658a154fbec") {
                trader = fileIO.readParsed(global.db.assort[base].suits);
                for (let suit in trader) {
                    trader[suit].requirements = {
                        "loyaltyLevel": 0,
                        "profileLevel": 1,
                        "standing": 0,
                        "skillRequirements": [],
                        "questRequirements": [],
                        "itemRequirements": []
                    }
                    fileIO.write(global.db.assort[base].suits, trader);
                }
            }
        }
    }
    fileIO.write(global.db.cacheBase.globals, globals);
    fileIO.write(global.db.user.cache.locations, mapfile);
    //fileIO.write(global.db.user.cache.items, itemsFile);
    //fileIO.write(global.db.user.configs.gameplay, gameplay);
    //fileIO.write(global.db.user.cache.hideout_areas, hareas);
    //fileIO.write(global.db.user.cache.hideout_production, hprod);
    //fileIO.write(global.db.user.cache.hideout_scavcase, scavcase);
    //fileIO.write(global.db.user.cache.customization, customization);

    logger.logSuccess("[Mod] All in One v2 Successfully Applied")
}
