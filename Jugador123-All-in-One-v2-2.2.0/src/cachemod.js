exports.mod = () => {
    logger.logInfo("[Mod] All in One v2");
    //Load Settings
    const config = require("../config.js");

    //Load Globals
    let base = db.base ? db.base : db.cacheBase;  //reads either base or cacheBase as base, AE/JET compatibility
	let globals = fileIO.readParsed(base.globals); //reads servers globals.json to memory
	let globalsCopy = internal.path.resolve(__dirname, "globals.json"); //makes copy of globals.json and saves to mod src
    //Rebirth compatibility
    if (server.version == "0.12.4-1012-Dev"){ 
        globalsPath = globals.config
    }
    else globalsPath = globals.data.config;

    //Player Scav Timer
    if (config.ScavTimer != false) {
        globalsPath.SavagePlayCooldown = config.ScavTimer;
        globalsPath.SavagePlayCooldownNdaFree = config.ScavTimer;
    } else {
        //if timer is false
        globalsPath.SavagePlayCooldown = 20;
        globalsPath.SavagePlayCooldownNdaFree = 20;
    }
    //Infinite Stamina
    if (config.InfiniteStamina === true) {
        globalsPath.Stamina.Capacity = 1000;
        globalsPath.Stamina.SprintDrainRate = 0.1;
        globalsPath.Stamina.BaseRestorationRate = 1000;
        globalsPath.Stamina.JumpConsumption = 1;
        globalsPath.Stamina.GrenadeHighThrow = 1;
        globalsPath.Stamina.GrenadeLowThrow = 1;
        globalsPath.Stamina.AimDrainRate = 0.1;
        globalsPath.Stamina.OxygenCapacity = 1000;
        globalsPath.Stamina.OxygenRestoration = 1000;
    } else {
        //If infinite stamina is false
        globalsPath.Stamina.Capacity = 100;
        globalsPath.Stamina.SprintDrainRate = 4;
        globalsPath.Stamina.BaseRestorationRate = 5;
        globalsPath.Stamina.JumpConsumption = 16;
        globalsPath.Stamina.GrenadeHighThrow = 11;
        globalsPath.Stamina.GrenadeLowThrow = 8;
        globalsPath.Stamina.AimDrainRate = 1.3;
        globalsPath.Stamina.OxygenCapacity = 300;
        globalsPath.Stamina.OxygenRestoration = 4;
    }

    //Load Gameplay
    let gameplay = fileIO.readParsed(global.db.user.configs.gameplay); //read gameplay.json into memory
    let gameplayCopy = internal.path.resolve(__dirname, "gameplay.json") //makes copy of gameplay.json and saves to mod src
    //let locationloot = global._database.gameplayConfig.locationloot; //noted out due to improper path
    //Loot modifiers
    if (config.locationloot.CustomLoot === true) {

        //Overlap Loot
        if (config.locationloot.overlappingLoot === true) {
            gameplay.locationloot.allowLootOverlap = true;
        } else {
            gameplay.locationloot.allowLootOverlap = false;
        }
        //Per map loot
        gameplay.locationloot.bigmap = config.locationloot.Custom;
        gameplay.locationloot.factory4_day = config.locationloot.Factory;
        gameplay.locationloot.factory4_night = config.locationloot.Factory;
        gameplay.locationloot.interchange = config.locationloot.Interchange;
        gameplay.locationloot.laboratory = config.locationloot.Labs;
        gameplay.locationloot.rezervbase = config.locationloot.Reserve;
        gameplay.locationloot.shoreline = config.locationloot.Shoreline;
        gameplay.locationloot.woods = config.locationloot.Woods;
        //Loot Containers
        gameplay.locationloot.containers.ChanceForEmpty = config.locationloot.containers.ChanceForEmpty;
        gameplay.locationloot.containers.ChanceToSpawnNextItem = config.locationloot.containers.ChanceToSpawnNextItem;
        gameplay.locationloot.containers.AttemptsToPlaceLoot = config.locationloot.containers.AttemptsToPlaceLoot;
        gameplay.locationloot.containers.Not_exist = config.locationloot.containers.RarityMultipliers.Not_exist;
        gameplay.locationloot.containers.Common = config.locationloot.containers.RarityMultipliers.Common;
        gameplay.locationloot.containers.Rare = config.locationloot.containers.RarityMultipliers.Rare;
        gameplay.locationloot.containers.Superrare = config.locationloot.containers.RarityMultipliers.Superrare;
    } else {
        logger.logError("[All in One v2] CustomLoot setting is disabled, ignoring loot settings")
    }

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
            } else {
                logger.logError("[All in One v2] Stack setting is disabled, Ignoring custom stacks")
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
        }
    }
    //No exit Restrictions
    if (config.NoExitRestrictions === true) {
        for (let map in mapfile) {
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
    base.globals = globalsCopy; //changes the db's filepath to the modified copy, rather than original
    global.db.user.configs.gameplay = gameplayCopy; //changes the db's filepath to the modified copy, rather than original
	fileIO.write(globalsCopy, globals); //writes changes to globals copy 
    fileIO.write(gameplayCopy, gameplay); //writes changes to gameplay copy 
    fileIO.write("user/cache/db.json", db); //writes to the db the changes to filepath, pointing to the copies instead of originals
    fileIO.write(`user/cache/locations.json`, mapfile);
    fileIO.write(`user/cache/items.json`, itemsFile);
    fileIO.write(`user/cache/hideout_areas.json`, hareas);
    fileIO.write(`user/cache/hideout_production.json`, hprod);
    fileIO.write(`user/cache/hideout_scavcase.json`, scavcase);
    logger.logSuccess("[Mod] All in One v2 Successfully Applied")
}