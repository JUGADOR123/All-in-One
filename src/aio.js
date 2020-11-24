exports.mod = () => {
    logger.logInfo("[Mod] All in One Enhanced")
    let settings = require("../settings.json");

    //Item Related settings:
    logger.logInfo("Aio: Item Related settings loading: ")
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
        //Allow Armored rigs with armor
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
        /*
        if (settings.items.inRaidModding == true && (data._parent === "550aa4bf4bdc2dd6348b456b" || data._parent === "550aa4cd4bdc2dd8348b456c" || data._parent === "550aa4dd4bdc2dc9348b4569" || data._parent === "55818acf4bdc2dde698b456b" || data._parent === "55818ac54bdc2d5b648b456e" || data._parent === "55818add4bdc2d5b648b456f" || data._parent === "55818ad54bdc2ddc698b4569" || data._parent === "55818ae44bdc2dde698b456c" || data._parent === "55818afb4bdc2dde698b456d" || data._parent === "55818b164bdc2ddc698b456c" || data._parent === "55818b084bdc2d5b648b4571" || data._parent === "55818af64bdc2d5b648b4570" || data._parent === "56ea9461d2720b67698b456f" || data._parent === "5a74651486f7744e73386dd1" || data._parent === "55818a594bdc2db9688b456a" || data._parent === "55818a6f4bdc2db9688b456b" || data._parent === "55818b224bdc2dde698b456f" || data._parent === "5448bc234bdc2d3c308b4569" || data._parent === "55818a104bdc2db9688b4569" || data._parent === "55818a684bdc2ddd698b456d" || data._parent === "555ef6e44bdc2de9068b457e" || data._parent === "55818a304bdc2db5418b457d")) {
            data._props.RaidModdable = true;
        }
        */

        global._Database.items[item] = data;
    }
    logger.logInfo("Aio: Hideout Related settings loading: ")
    //Hideout build timers
    if (settings.hideout.buildTime === true) {
        base = json.parse(json.read(db.user.cache.hideout_areas))
        for (let file in base.data) {
            let filedata = base.data[file];
            for (let stage in filedata.stages) {
                filedata.stages[stage].constructionTime = 10;
            }
        }
        json.write(db.user.cache.hideout_areas, base);
    }
    //Hideout Fast Craft
    if (settings.hideout.fastCraft == true) {
        base = json.parse(json.read(db.user.cache.hideout_production))
        for (let file in base.data) {
            let fileData = base.data[file];
            if (fileData.areaType != 20 && settings.hideout.fastBitcoin==false) {
                fileData.productionTime = 10;
            } else {
                fileData.productionTime = 10; 
            }
               
            
        }
        json.write(db.user.cache.hideout_production, base);
    }
    //Hideout Fast Scav Case 
    if (settings.hideout.fastScavCase == true) {
        base = json.parse(json.read(db.user.cache.hideout_scavcase))
        for (let file in base.data) {
            let filedata = base.data[file];
            filedata.productionTime = 10;
        }
        json.write(db.user.cache.hideout_scavcase, base);
    }
    logger.logInfo("Aio: Player Related settings loading: ")
    //All Quests 
    if (settings.player.allQuestAvailable == true) {
        base = json.parse(json.read(db.user.cache.quests))
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
        json.write(db.user.cache.quests, base);
    }
    //All clothes
    if (settings.player.ClothesAllSides == true) {
        base = json.parse(json.read(db.user.cache.customization))
        for (let file in base.data) {
            let fileData = base.data[file]
            fileData._props.Side = ["Savage", "Bear", "Usec"];
            base.data[file] = fileData;
        }

        json.write(db.user.cache.customization, base);
    }
    //Clothes are Free (not working)
    if (settings.player.freeClothes == true) {
        for (let trader in db.assort) {
            if ("customization" in db.assort[trader]) {
                let base = json.parse(json.read(db.user.cache[`customization_${trader}`]));
                for (let file in base) {
                    let fileData = base[file]
                    fileData.requirements.loyaltyLevel = 1;
                    fileData.requirements.profileLevel = 1;
                    fileData.requirements.standing = 0;
                    fileData.requirements.skillRequirements = [];
                    fileData.requirements.questRequirements = [];
                    fileData.requirements.itemRequirements = [];
                }
                json.write(db.user.cache[`customization_${trader}`], base);
            }
        }
    }
    logger.logInfo("Aio: Gameplay related Settings loading...")
    //Scav timer (cannot test)
    if (settings.player.noScavTimer == true) {
        let base = json.parse(json.read(db.cacheBase.globals))
        base.data.config.SavagePlayCooldown = 1;
        json.write(db.cacheBase.globals, base);
    }
    //Weapon and Skill experience multiplier (somewhat working? need further testing)
    if (settings.player.skillMultiplier > 1) {
        let base = json.parse(json.read(db.cacheBase.globals))
        base.data.config.SkillProgressRate = settings.player.skillMultiplier;
        base.data.config.WeaponSkillProgressRate = settings.player.skillMultiplier;
        json.write(db.cacheBase.globals, base);
    }
    //Minium Flea level 
    if (settings.player.fleaLevel == true) {
        let base = json.parse(json.read(db.cacheBase.globals))
        base.data.config.RagFair.minUserLevel = 1;
        json.write(db.cacheBase.globals, base);
    }
    //Enable and disable skill fatigue (not working)
    if (settings.player.skillFatigue == false) {
        let base = json.parse(json.read(db.cacheBase.globals))
        base.data.SkillMinEffectiveness = 2;
        base.data.SkillFatiguePerPoint = 0;
        base.data.SkillFreshEffectiveness = 10;
        json.write(db.cacheBase.globals, base);
    }
    //Max Stamina
    if (settings.player.maxStamina < 100) {
        let base = json.parse(json.read(db.cacheBase.globals))
        base.data.config.Stamina.Capacity = settings.player.maxStamina;
        json.write(db.cacheBase.globals, base);
    } else {
        let base = json.parse(json.read(db.cacheBase.globals))
        base.data.config.Stamina.Capacity = 800;
        base.data.config.Stamina.BaseRestorationRate = 500;
        json.write(db.cacheBase.globals, base);
    }
    //Loot Modifier (doesnt seem to be working)
    if (settings.gameplay.globalLootModifier > 0) {
        let base = json.parse(json.read(db.cacheBase.globals))
        base.data.GlobalLootChanceModifier = settings.gameplay.globalLootModifier;
        json.write(db.cacheBase.globals, base);
    }
    //All extracts
    if (settings.gameplay.allExtracts == true) {
        let base = json.readParsed(db.user.cache.locations)
        for (let map in base) {
            for (let exit in base[map].exits) {
                base[map].exits[exit].Chance = 100;
            }
        }
        json.write(db.user.cache.locations, base);
    }
    //No extract restrictions
    if (settings.gameplay.noExitRestrictions == true) {
        let base = json.readParsed(db.user.cache.locations)
        for (let map in base) {
            for (let exit in base[map].exits) {
                base[map].exits[exit].ExfiltrationType = "Individual"
                base[map].exits[exit].PassageRequirement = "None"
                base[map].exits[exit].RequirementTip = ""
                base[map].exits[exit].Count = 0
            }
        }
        json.write(db.user.cache.locations, base);
    }
    //Boss spawn chance (working? need further testing)
    if (settings.gameplay.bossChance >= 1) {
        let base = json.readParsed(db.user.cache.locations)
        for (let map in base) {
            base[map].BossLocationSpawn.BossChance = settings.gameplay.bossChance
        }
        json.write(db.user.cache.locations, base);
    }
    //Longer raids
    if (settings.gameplay.raidTimer >= 60) {
        let base = json.readParsed(db.user.cache.locations)
        for (let map in base) {
            base[map].exit_access_time = settings.gameplay.raidTimer
            base[map].escape_time_limit = settings.gameplay.raidTimer
        }
        json.write(db.user.cache.locations, base);
    }

    logger.logSuccess("[Mod] All in One Configs Successfully Applied")
}
