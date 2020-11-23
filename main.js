const intervalHold = [];
const interval = new Proxy(setInterval, {
    apply(handler, _, c) {
        const set = handler(...c);
        intervalHold.push(set);
    }
});

function format(input){
    type = player.formatVersion
    accuracy = player.showAccuracy
    var power = Math.floor(Math.log(Math.abs(input)) / Math.log(10))
    var matissa = input / Math.pow(10, power)
    if(matissa >= 10){matissa /= 10; power++}
    if (Math.abs(input) < 1e-9){return "0"}
    if(power < 9){ // standard formatting for numbers -1B-1 to 1B-1 excluding 0
        let formattedValue = (input).toFixed(accuracy)
        return formattedValue.replace(/(\d)(?=(\d{3})+$)/g, "$1,")
    }
    switch(type){ //If number you are formatting exceeds 1 billion it will instead use custom formatting
        case "standard":
            let standardSuffix = ['B','T','Qa','Qi','Sx','Sp','Oc','Nn','Dc','UDc'];
            let usedSuffix = standardSuffix[Math.floor(power/3) - 3];
            return (matissa * Math.pow(10, (power % 3))).toFixed(accuracy) + usedSuffix;
        case "scientific":
            let formattedMatissa = matissa.toFixed(accuracy);
            return (formattedMatissa + "e" + power);
    }
}

var player = {}

function initPlayer(){
    player = {
        level: 1,
        prestige: 0,
        renown: 0,
        coin: 0,
        obtainium: 0,
        exp: 0,
        activeInventory: {
            weaponMain: initStarterItem(),
            weaponOffhand: initNullItem(),
            armorHelmet: initNullItem(),
            armorChestplate: initNullItem(),
            armorLeggings: initNullItem(),
            armorBoots: initNullItem(),
            talisman1: initNullItem(),
            talisman2: initNullItem(),
            talisman3: initNullItem(),
            talisman4: initNullItem(),
            talisman5: initNullItem(),
            talisman6: initNullItem(),
            gem: initNullItem()
        },
        idleInventory: new Array(25),
        damageBase: 2,
        strengthBase: 0,
        healthBase: 100,
        defenseBase: 0,
        resistanceBase: 0,
        cchanceBase: 5,
        cdamageBase: 20,

        formatVersion: "standard",
        showAccuracy: 2,

        coinUpgrades: {
            damage: 0,
            strength: 0,
            health: 0,
            defense: 0,
            resistance: 0,
            cchance: 0,
            cdamage: 0,
            exp: 0,
            coin: 0
        }
        
    }
    for(var i = 0; i < player.idleInventory.length; i++){
        player.idleInventory[i] = initStarterItem()
    }
}

function initPlayerStats(statType){
    let statToAdd = 0;
    statToAdd += player[statType+'Base']
        for (var el in player.activeInventory){
            if(el !== undefined){
                statToAdd += player.activeInventory[el][statType]
            }
        }

    statToAdd *= (1 + 1/50 * player.coinUpgrades[statType]);
    
    finalPlayerStats[statType] = statToAdd
    document.getElementById(statType+'EffectivePlayer').textContent = format(finalPlayerStats[statType])
}

var MAXENEMY = 26
function initEnemyStats(index){
    index = index || 26
    let actualIndex = index
    finalEnemyStats = {
        name: enemyArray[actualIndex].name,
        damage: enemyArray[actualIndex].damage,
        strength: enemyArray[actualIndex].strength,
        health: enemyArray[actualIndex].health,
        defense: enemyArray[actualIndex].defense,
        resistance: enemyArray[actualIndex].resistance,
        cchance: enemyArray[actualIndex].cchance,
        cdamage: enemyArray[actualIndex].cdamage,
        exp: enemyArray[actualIndex].exp,
        coin: enemyArray[actualIndex].coin
    }
    updateStatDisplay('enemy');
    document.getElementById('enemyName').textContent = finalEnemyStats.name + "'s Stats"
    enemyNumber += 1
    if(enemyNumber > MAXENEMY){
        enemyNumber = 1;
    }
}

function startGame(){
    initPlayer()
    let statArray = ['damage','strength','health','defense','resistance','cchance','cdamage']
    for(var i = 0; i < statArray.length; i++){
        initPlayerStats(statArray[i])
    }
    for(var i = 0; i <= 26; i++){
        enemyArray.push(new Enemy(enemyName[i],enemyLore[i],enemyDamage[i],enemyStrength[i],enemyHealth[i],enemyDefense[i],enemyResistance[i],enemyCChance[i],enemyCDamage[i],enemyExpReward[i],enemyCoinReward[i]))
    }

    document.getElementById('playerEXP').textContent = format(player.exp)
    document.getElementById('playerCoin').textContent = format(player.coin)
}

function updateStatDisplay(index){
    if (index === 'player'){
        for(var el in finalPlayerStats){
            if(el !== 'name'){
            document.getElementById(el+'EffectivePlayer').textContent = format(finalPlayerStats[el])
            }
        }
    }
    if (index === 'enemy'){
        for(var el in finalEnemyStats){
            if(el !== 'name'){
            document.getElementById(el+'EffectiveEnemy').textContent = format(finalEnemyStats[el])
            }
        }
    }

}

function rewardPlayer(){
    let expGain = finalEnemyStats.exp;
    let coinGain = finalEnemyStats.coin;

    player.exp += expGain;
    player.coin += coinGain;

    playerLevelCheck();
    document.getElementById('playerEXP').textContent = format(player.exp);
    document.getElementById('playerCoin').textContent = format(player.coin);
}

function revivePlayer(levelUp){
    levelUp = levelUp || false
    currentHealth = finalPlayerStats.health
    let statArray = ['damage','strength','health','defense','resistance','cchance','cdamage'];
    for(var i = 0; i < statArray.length; i++){
        initPlayerStats(statArray[i])
    }
    if(levelUp){
        finalPlayerStats.health = currentHealth
    }
    if(!levelUp){
    enemyNumber = 1;
    initEnemyStats(enemyNumber);
    }
}

function turn(dt){
    let damageGiven = calculatePlayerDamage(dt)
    let damageTaken = calculateEnemyDamage(dt)

    damageGiven *= 1 / (1 + finalEnemyStats.defense / 25)
    damageTaken *= 1 / (1 + finalPlayerStats.defense / 100)

    finalPlayerStats.health -= damageTaken;
    finalEnemyStats.health -= damageGiven;

    if(finalPlayerStats.health > 0){
        updateStatDisplay('player')
    }
    else{
        revivePlayer();
    }

    if(finalEnemyStats.health > 0){
        updateStatDisplay('enemy')
    }
    else{
        rewardPlayer()
        initEnemyStats(enemyNumber)
    }
}

function calculatePlayerDamage(dt){
    let damage = 0;
    damage += (finalPlayerStats.damage + finalPlayerStats.strength) * (1 + finalPlayerStats.strength / 50) * dt

    let RNGesus = Math.random();
    if(RNGesus < finalPlayerStats.cchance/100) {
        damage *= (1 + finalPlayerStats.cdamage/100)
    }

    return damage
}
function calculateEnemyDamage(dt){
    let damage = 0;
    damage += (finalEnemyStats.damage + finalEnemyStats.strength / 2) * (1 + finalPlayerStats.strength / 100) * dt

    let RNGesus = Math.random();
    if(RNGesus < finalEnemyStats.cchance / 100){
        damage *= (1 + finalEnemyStats.cdamage / 100)
    }

    return damage
}

function playerLevelCheck(){
    let levelsGained = 0;
    while(player.exp >= 20 * Math.pow(player.level,0.5)){
        player.exp -= 20 * Math.pow(player.level,0.5);
        player.level += 1;
        levelsGained += 1
    }

    player.damageBase += 1 * levelsGained;
    player.strengthBase += 0.3 * levelsGained;
    player.healthBase += 8 * levelsGained;
    player.defenseBase += 0.08;

    revivePlayer(true);
}

var tickTime = Date.now()
function gameUpdate(){
    let updatedTime = Date.now();
    let dt = (updatedTime - tickTime)/1000;
    tickTime = updatedTime;

    turn(dt);
}

function constantIntervals(){
    interval(gameUpdate, 5000)
}

setTimeout(function() {
    startGame(),
    initEnemyStats(),
    constantIntervals()
}, 0);