class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }
}

const hero1 = new Hero('Varg', 1);



module.exports ={
    hero1
}


