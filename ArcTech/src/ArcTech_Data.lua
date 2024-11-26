-- ArcTech_Data.lua
local ArcTech = ArcTech

ArcTech.house_owner = "@Scribe Rob"
ArcTech.guild_id = 381665

ArcTech.houses = {
	main = { label = "|cffff00Main - Kthendral Deep Mines|r", owner = ArcTech.house_owner, id = 113 },
	pvp = { label = "|cffff00PvP - Elinhir Arena|r", owner =ArcTech.house_owner, id = 66 },
	auction = { label = "|cffff00Auction - Theatre of the Ancestors|r", owner = ArcTech.house_owner, id = 119 },
}

ArcTech.Status_Colours = {
    standard = '|cc7cdbf',
    active = '|c568203',
    disabled = '|cff0000'
}

ArcTech.QR = { data = "https://discord.gg/hj2eWtra66", size = 240 }

ArcTech.Events = {
    CommencementDate = "\n              Events for week:\n                   02-03-26\n",
    monday = {},
    tuesday = {
        host = 'Scribe Rob',
        datetime = '1772568000',
        title = 'Golden Pursuit Hour',
        description = 'An hour dedicated to smashing out your favourite Golden Pursuits. Whether you need clears, collectibles, or just want efficient progression, we’ll move fast, stay organised, and make sure everyone gets value.'
    },
    wednesday = {},
    thursday = {
        host = 'Scribe Rob',
        datetime = '1772740800',
        title = 'Dwarven Ebon Wolf Mount Hunt (I)',
        description = 'The legendary Dwarven Ebon Wolf awaits. We will be tracking leads, farming fragments, and pushing progression toward unlocking one of ESO’s most iconic mounts. Come prepared for focused farming and steady advancement.'
    },
    friday = {},
    saturday = {},
    sunday = {},
}
