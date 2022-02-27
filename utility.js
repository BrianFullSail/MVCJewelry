//Student name: Brian Alvarado

class Utility {
    constructor() {
    }

    static totalCost = (jArray)=>{
        let cost = 0;
        for(let j in jArray){
            cost += jArray[j].price;
        }
        //round to 2 decimal and add commas
        return cost.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

}