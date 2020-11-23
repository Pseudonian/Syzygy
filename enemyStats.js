class Enemy { //This generates the list of enemies to be spawned later via the enemyArray var
    constructor(name, lore, damage, strength, health, defense, resistance, cchance, cdamage, exp, coin){
        this.name = name;
        this.lore = lore;
        this.damage = damage;
        this.strength = strength;
        this.health = health;
        this.defense = defense;
        this.resistance = resistance;
        this.cchance = cchance;
        this.cdamage = cdamage;
        this.exp = exp;
        this.coin = coin;
    }
}
let enemyArray = []
let enemyName = ['Lethality the Game','#0: Ant Egg','#1: Ant Larvae','#2: Ant Spawn','#3: Ant Worker', '#4: Ant Soldier', '#5: ANT GENERAL {MiniBoss}',
                 '#6: Bee Spawn', '#7: Pollinated Flower', '#8: Honey of Vitality', '#9: Honey of Potency', '#10: BEEHIVE {MiniBoss}',
                 '#11: Spire Treasure I', '#12: Bee Warrior', '#13: Bee Berserker', '#14: Bee Elemental', '#15: BEE OMNISCIENT {MiniBoss}',
                 '#16: A Parasite', '#17: A Group of Parasites', '#18: A shit ton of them Parasites', '#19: Oh god there are too many', '#20: PARASITE MAN {Miniboss}',
                 '#21: Spire Treasure II', '#22: A small mouse', '#23: A larger rat', '#24: The big rodent', '#25: A PILE OF GARBAGE {Boss}']
let enemyLore = ['You better run.', 'Try to crack it!', 'It can barely move...','It wants your gold!','Here to avenge the colony','a','a','a','a','a','a']
let enemyDamage = [499, 0, 1, 1.2, 1.5, 3, 5,
                   3, 5, 3, 10, 20,
                   0, 11, 16, 15, 35,
                   21, 26, 32, 40, 52,
                   0, 36, 45, 55, 65, 75]
let enemyStrength = [499, 0, 0, 0.2, 0.5, 1, 5,
                     2, 2, 2, 10, 10, 
                     0, 5, 10, 7, 15,
                     9, 12, 15, 20, 30,
                     0, 19, 23, 27, 40]
let enemyHealth = [999999, 10, 12, 15, 20, 30, 50, 
                   30, 50, 150, 75, 150, 
                   400, 125, 100, 150, 200,
                   150, 200, 275, 350, 400,
                   800, 400, 500, 600, 700]
let enemyDefense = [0, 5, 2, 1, 0, 0, 5, 
                    2, 2, 10, 3, 5, 
                    40, 8, 4, 12, 25,
                    10, 20, 28, 34, 40,
                    60, 27, 33, 40, 45]
let enemyResistance = [0, 0, 0, 0, 0, 0, 0, 
                       0, 0, 0, 0, 0, 
                       0, 0, 0, 1, 0,
                       0, 0, 0, 0, 0,
                       0, 0, 0, 0, 0]
let enemyCChance = [40, 0, 0, 1, 2, 3, 0, 
                    5, 5, 0, 15, 10, 
                    5, 20, 25, 10, 20,
                    33, 33, 33, 33, 33,
                    26, 26, 26, 26, 3]
let enemyCDamage = [200, 0, 0, 10, 10, 10, 
                    0, 10, 10, 0, 30, 25, 
                    100, 30, 40, 25, 50,
                    40, 50, 60, 70, 100,
                    50, 60, 70, 80, 1400]
let enemyExpReward = [1000, 2, 3, 4, 5, 6, 15, 
                      8, 10, 13, 16, 30, 
                      50, 22, 25, 29, 45,
                      33, 37, 42, 47, 65,
                      100, 51, 56, 61, 66, 90]
let enemyCoinReward = [0, 10, 11, 12, 14, 16, 30, 
                       19, 24, 29, 33, 60, 
                       150, 41, 45, 49, 80,
                       53, 58, 63, 69, 110,
                       250, 75, 82, 90, 99, 150]