Items:
	Weight: 					true/false			if true removes all weight from items
	stack:						(any number) 		this is the max amount of bullets in a single slot
	Armor&rigs 					true/false			if true allows to have body armor and armored rigs at the same time
	money						(any number)		the max amount of money in a single stack
	itemrestrictions 			true/false			if false removes all item restrictions from secure containers

	
hideout:
	buildtime 					true/false			if true all construction is completed in 10 seconds (does not affect buildings already being built)
	fastcraft					true/false			if true all item crafting is completed in 10 seconds
	fastscavcase				true/false			if true scav case can be collected in 10 seconds
	fastbitcoin					true/false			if true bitcoin is completed in 10 seconds (need fastcraft to be true)

player:
	allquestavailable			true/false			if true all quests become available to start
	clothesallsides				true/false			if ture all clothes become available to any faction
	freeclothes					true/false			if true all clothes become free (currently not working)
	noscavtimer					true/false			if true scav gameplay has no time cooldown
	enableSkillMultiplier		true/false			if true enables custom skill multiplier
	skillmultiplier				(any number)		skill and weapon skill multiplier
	flealevel					true/false			if true flea market is unlocked at level 1
	fleapricemultiplier			(any number)		the price multiplier for items sold on the flea market
	insurancereturnchance		(1-100)				the chance to get insured items back
	infiniteStamina				true/false			if true player has infinite stamina
	
gameplay:
	all extracts				true/false			if true all extracts are available
	noexitrestrictions			true/false			if true extract restrictions are removed (example: no need to pay at car exit)
	bosschance					(1-100)				boss spawn chance
	enablelongerraids			true/false			if true enables custom raid timers
	raidtimer					(any number)		extends the raid duration
loot:
	betterloot					true/false			if true enables custom loot multipliers
	allowlootoverlay			true/false			if true items can spawn on top of each other
	globallootmodifier			(any number)		global loot modifier for all maps
	bigmap						(any number)		loot modifier for customs
	factory4_day				(any number)		loot modifier for factory at daytime
	factory4_night				(any number)		loot modifer for factory at nighttime
	interchange					(any number)		loot modifer for interchange
	laboratory					(any number)		loot modifier for the labs
	reservbase					(any number)		loot modifier for reserve
	shoreline					(any number)		loot modifier for shoreline
	woods						(any number)		loot modifier for the woods
	chanceforemptycontainers	(0-100)				the chance for a container to be empty
	chancetospawnnextitem		(0-100)				the chance to succesfully put an item in a container
	attemptstoplaceloot			(any number)		amount of tries to put an item inside a container