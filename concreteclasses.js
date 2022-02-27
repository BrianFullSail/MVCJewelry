//Student name: Brian Alvarado
class Jewelry{
   constructor(color, owner) {
       this.color = color;
       this.owner = owner;
   }
}

class Ring extends Jewelry{
    constructor(color, owner) {
        super(color, owner);
        this.type = "ring";
        this.price = 899.99;
    }
}

class Necklace extends Jewelry{
    constructor(color, owner) {
        super(color, owner);
        this.type = "necklace";
        this.price = 1299.99;

    }
}

class Bracelet extends Jewelry{
    constructor(color, owner) {
        super(color, owner);
        this.type = "bracelet";
        this.price = 1099.99;
    }
}