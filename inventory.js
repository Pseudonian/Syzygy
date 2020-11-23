class Inventory{
    constructor(name, lore, slot, level, damage, strength, health, defense, resistance, cchance, cdamage, bonus1, bonus2, bonus3, bonus4, bonus5){ //Data acquired from somewhere else
        this.name = name
        this.lore = lore
        this.slot = slot
        this.level = level
        this.damage = damage
        this.strength = strength
        this.health = health
        this.defense = defense
        this.resistance = resistance
        this.cchance = cchance
        this.cdamage = cdamage
        this.bonus1 = bonus1
        this.bonus2 = bonus2
        this.bonus3 = bonus3
        this.bonus4 = bonus4
        this.bonus5 = bonus5
    }
}

var names = ["The Nullifier", "Rookie Sword"]
var lores = ["405 ERROR: You're attacking... with an error?", "Everyone has to start somewhere."]
var damages = [999, 2]
var strengths = [999, 1]
var healths = [999, 0]
var defenses = [99, 1]
var resistances = [99, 0]
var cchances = [20, 0]
var cdamages = [100, 5]

function initStarterItem(){
var sampleItem = new Inventory(names[1],lores[1],1,0,damages[1],strengths[1],healths[1],defenses[1],resistances[1],cchances[1],cdamages[1],"EXP Bliss 1","Damage Up 1","Mana Haze 1","EMPTY","EMPTY")
return sampleItem
}

function initNullItem(){
var sampleItem = new Inventory("Null!","404",1,0,0,0,0,0,0,0,0,'None','None','None','None','None')
return sampleItem
}