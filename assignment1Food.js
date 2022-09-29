const Order = require('./assignment1Order');

const OrderState = Object.freeze({
  WELCOMING: Symbol('welcoming'),
  TOPPINGS: Symbol('toppings'),
  GROUP: Symbol('group'),
  DRINKS: Symbol('drinks'),
  SIZE: Symbol('size'),
});

module.exports = class PastaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sToppings = '';
    this.sSize = '';
    this.sDrinks = '';
    this.sItem = '';
    this.cost = 0;
    this.tax = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push("Welcome to Adam's Restaurant.");
        aReturn.push(
          'What food would you like?\n 1.Pasta - $ 10 \n 2.Noodles - $12'
        );
        break;
      case OrderState.SIZE:
        this.sItem = sInput;
        if (
          this.sItem == 'Pasta' ||
          this.sItem == 'p' ||
          this.sItem == 'P' ||
          this.sItem == '1'
        ) {
          this.cost = this.cost + 10;
          this.sItem = 'Pasta';
        } else if (
          this.sItem == 'Noodles' ||
          this.sItem == 'n' ||
          this.sItem == 'N' ||
          this.sItem == '2'
        ) {
          this.cost = this.cost + 12;
          this.sItem = 'Noodles';
        } else {
          this.stateCur = OrderState.WELCOMING;
        }
        this.stateCur = OrderState.GROUP;
        aReturn.push(
          'What would you like to add \n 1. Chicken - $3\n 2. Mushroom - $2 \n 3. Both - $4\n Best When you mix it together :)?'
        );
        break;
      case OrderState.GROUP:
        this.stateCur = OrderState.TOPPINGS;
        this.sToppings = sInput;
        if (
          this.sToppings == 'Chicken' ||
          this.sToppings == 'c' ||
          this.sToppings == 'C' ||
          this.sToppings == '1'
        ) {
          this.sToppings = 'Chicken';
          this.cost = this.cost + 3;
        } else if (
          this.sToppings == 'Mushroom' ||
          this.sToppings == 'M' ||
          this.sToppings == 'm' ||
          this.sToppings == '2'
        ) {
          this.sToppings = 'Mushroom';
          this.cost = this.cost + 2;
        } else if (
          this.sToppings == 'Both' ||
          this.sToppings == 'b' ||
          this.sToppings == 'B' ||
          this.sToppings == '3'
        ) {
          this.sToppings = 'Both';
          this.cost = this.cost + 4;
        }
        aReturn.push(
          'Which size would you like to \n1.Small\n 2.Medium - $2 \n 3.Large - $4'
        );
        break;
      case OrderState.TOPPINGS:
        this.sSize = sInput;
        if (
          this.sSize == 'Small' ||
          this.sSize == 'small' ||
          this.sSize == 's' ||
          this.sSize == '1' ||
          this.sSize == 'S'
        ) {
          this.cost = this.cost + 0;
          this.sSize = 'Small';
        } else if (
          this.sSize == 'Medium' ||
          this.sSize == 'medium' ||
          this.sSize == 'M' ||
          this.sSize == '2' ||
          this.sSize == 'm'
        ) {
          this.cost = this.cost + 2;
          this.sSize = 'Medium';
        } else if (
          this.sSize == 'Large' ||
          this.sSize == 'large' ||
          this.sSize == 'L' ||
          this.sSize == '3' ||
          this.sSize == 'l'
        ) {
          this.cost = this.cost + 4;
          this.sSize = 'Large';
        } else {
          this.stateCur = OrderState.SIZE;
        }
        this.stateCur = OrderState.DRINKS;
        aReturn.push(
          'Would you like drinks with that? \n 1. Coke - $2\n2. Nestea $3'
        );
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        if (sInput.toLowerCase() != 'no') {
          this.sDrinks = sInput;
        }

        if (
          this.sDrinks == 'Coke' ||
          this.sDrinks == '1' ||
          this.sDrinks == 'c' ||
          this.sDrinks == 'C' ||
          this.sDrinks == 'coke'
        ) {
          this.cost = this.cost + 2;
          this.sDrinks = 'Coke';
        } else if (
          this.sDrinks == 'Nestea' ||
          this.sDrinks == '2' ||
          this.sDrinks == 'n' ||
          this.sDrinks == 'N' ||
          this.sDrinks == 'nestea'
        ) {
          this.cost = this.cost + 3;
          this.sDrinks = 'Nestea';
        }

        aReturn.push('Thank you for your order of');
        aReturn.push(`${this.sSize} size ${this.sItem} with ${this.sToppings}`);
        if (this.sDrinks) {
          aReturn.push(this.sDrinks);
        }
        let d = new Date();
        aReturn.push(`Receipt`);
        aReturn.push(`Price $ ${this.cost}`);
        this.tax = this.cost * 0.13;
        aReturn.push(`Tax $ ${this.tax}`);
        this.cost = this.tax + this.cost;
        aReturn.push(`Total Price $ ${this.cost}`);
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Your order will be ready at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
