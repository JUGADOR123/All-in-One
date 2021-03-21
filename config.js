//config.js
module.exports = {
    "noWeight": false,                      //true or false, if true items will have weight of 0
    "Stacksize":{
        "Stacks": false,                    //true or false,  if true set stack size on ammo and money
        "Ammo": 60,                         //default value is 60, Stacks must be true to work
        "money": 500000                     //default value is 500000,  Stacks must be true to work
    },
    "Restrictions": false,                  //true or false,  true = removes item restrictions for secure containers
    "ArmorRigs": false,                    //true or false, true = chest armor and armored rigs can be worn together
    "locationloot":{
        "CustomLoot": false,                //true or false, must be true for loot values to work
        //for anything in locationloot below to work CustomLoot must be true!!
        "overlappingLoot": false,           //true or false, true = loot able to spawn in same spot as other loot.
        "globalLootModifier": false,        //false or value,  most maps default value is 0.25
        "Custom": 10000,                    //default value is 10000,  increasing too much can effect FPS
        "Factory": 1000,                    //default value is 1000,  increasing too much can effect FPS
        "Interchange": 25000,               //default value is 25000, increasing too much can effect FPS
        "Labs": 10000,                      //default value is 10000,  increasing too much can effect FPS
        "Reserve": 30000,                   //default value is 30000,  increasing too much can effect FPS
        "Shoreline": 15000,                 //default value is 15000,  increasing too much can effect FPS
        "Woods": 5000,                      //default value is 5000,  increasing too much can effect FPS
        "containers": {
            "ChanceForEmpty": 10,           //default value is 10, chance for container to be empty
            "ChanceToSpawnNextItem": 40,    //default value is 40, chance to spawn next item in container    
            "AttemptsToPlaceLoot": 15,      //default value is 15, tries it takes to place item in container
            "RarityMultipliers": {
                "Not_exist": 0,             //default value is 0, items won't spawn, most Node items.
                "Common": 1,                //default value is 1, common spawn multiplier
                "Rare": 0.7,                //default value is 0.7, rare spawn multiplier
                "Superrare": 0.4            //default value is 0.4, superrare spawn multiplier
            }
        }
    },
    "CustomTimer": false,                   //false or value,  timer for your raid. 
    "NoExitRestrictions": false,            //true or false,  true = all extract restrictions will be removed
    "BossChance":false,                     //false or value,  value should be 1-100,  chance of boss spawn
    "ScavTimer":false,                      //false or value, cooldown timer for scav runs
    "FastUpgrade":false,                    //true or false, true = upgrade time of 5 seconds
    "FastProduction":false,                 //true or false, true = craft time of 5 seconds
    //"FastBitcoin":false,                    //true or false, true = production time of 5 seconds
    "FastScavCase":false,                   //true or false, true = scavcase return time of 5 seconds
    "InfiniteStamina":false,                //true or false, true = infinite stamina, will effect some skills progress
    "AllClothes":false                      //true or false, true = all clothing unlocked
}