 const coinUpgradeDescriptions = {
    damage: 'Gain +2% of your base damage per level.', 
    damage: 'Gain +2% of your base strength per level.', 
    damage: 'Gain +2% of your base health per level.', 
    damage: 'Gain +2% of your base defense per level.', 
    damage: 'Gain +2% of your base resistance per level.', 
    damage: 'Gain +2% of your base critical chance per level.', 
    damage: 'Gain +2% of your base critical damage per level.', 
    damage: 'Gain +1% more EXP from any source per level.', 
    damage: 'Gain +1% more Coin from any source per level.', 
 }

function buyCoinUpgrade(type){
    if(player.coin >= Math.pow(player.coinUpgrades[type],2) * upgradeBaseCosts[type]){
        player.coin -= Math.pow(player.coinUpgrades[type],2) * upgradeBaseCosts[type];
        player.coinUpgrades[type] += 1;
        document.getElementById('playerCoin').textContent = format(player.coin);
        initPlayerStats(type);
    }
}