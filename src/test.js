const addWithGenerator = function(number){
    return function(secondNumber){
        return number + secondNumber;
    }
}

const addWithTwo = addWithGenerator(2);

//

Dog = function(){
    this.name = "waffle";
}

Dog.prototype.talk = function(){
    console.log(this.name);
}

Dog.prototype.size = {
    get: function(){
        return 15;
    }
}

Object.defineProperty(Dog.prototype, "size", Dog.prototype.size);

let foo = new Dog();
foo.talk();
console.log(foo.size);
foo.size = 12;
console.log(foo.size);