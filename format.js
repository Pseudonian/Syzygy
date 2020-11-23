/*function format(input){
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
}*/