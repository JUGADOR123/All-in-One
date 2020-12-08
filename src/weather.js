exports.mod = () => {
    let settings = require("../settings.json");

    if (settings.weather.changeTimeAcceleration == true) 
    {
        let weathers = fileIO.readParsed(db.user.cache.weather)
        
        for (let weather in weathers.data)
        {
            weathers.data[weather].acceleration = settings.weather.acceleration;
        }

        fileIO.write(db.user.cache.weather, weathers);
        logger.logSuccess("[Mod Aio] Time acceleration has been altered");
    }
}