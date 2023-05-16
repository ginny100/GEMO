export enum ITEM_TYPES {
    DRINK = "DRINK",
    FOOD = "FOOD"
};

export enum DRINK {
    COFFEE = "COFFEE",
    MILK_TEA = "MILK TEA"
};

export enum DRINK_BASE_PRICE {
    COFFEE = 2.0,
    MILK_TEA = 2.25
};

export enum DRINK_SIZES {
    S = "SMALL",
    M = "MEDIUM",
    L = "LARGE",
    XL = "EXTRA LARGE"
};

export enum DRINK_TYPES {
    HOT = "HOT",
    COLD = "COLD",
    BLENDED = "BLENDED"
};

export enum DRINK_TOPPINGS {
    NONE = "NONE",
    WHIPPED_CREAM = "WHIPPED CREAM",
    SAUCE_PUMP = "SAUCE PUMP"
};

export enum MILK_OPTIONS {
    ALMOND_MILK = "ALMOND MILK",
    WHOLE_MILK = "WHOLE MILK"
};

export enum FOOD {
    SANDWICH = "SANDWICH",
    BAGEL = "BAGEL"
};

export enum FOOD_ADDITIONALS {
    NONE = "NONE",
    EGG = "EGG",
    TURKEY = "TURKEY",
    BUTTER = "BUTTER",
    CREAM_CHEESE = "CREAM CHEESE"
};

export enum ADJUSTMENTS {
    M_SIZE = 0.5,
    L_SIZE = 1.0,
    XL_SIZE = 1.5,
    BLENDED_TYPE = 1.0,
    TOPPING = 0.5,
    ALMOND_MILK = 0.5,
    EXTRA_SAUCE_PUMPS = 0.5,
    SANDWICH = 1.0,
    BAGEL = 0.5
}

const FOOD_BASE_PRICE: number = 3.0;
const TAX_RATE: number = 7.25;

interface Item {
    itemType: ITEM_TYPES;
};

class Drink implements Item {
    itemType: ITEM_TYPES.DRINK;
    drinkSize: DRINK_SIZES;
    drinkType: DRINK_TYPES;
    drinkTopping: DRINK_TOPPINGS;
    drinkName: DRINK;
    milkOption: MILK_OPTIONS;
    saucePumps: number;

    constructor(drinkSize: DRINK_SIZES, drinkType: DRINK_TYPES, drinkTopping: DRINK_TOPPINGS, drinkName: DRINK, milkOption: MILK_OPTIONS,  saucePumps: number) {
        this.drinkSize = drinkSize;
        this.drinkType = drinkType;
        this.drinkTopping = drinkTopping;
        this.drinkName = drinkName;
        this.milkOption = milkOption;
        this.saucePumps = saucePumps;
    }
}

class Food implements Item {
    itemType: ITEM_TYPES.FOOD;
    foodName: FOOD;
    foodAdditional: FOOD_ADDITIONALS;

    constructor(foodName: FOOD, foodAdditional: FOOD_ADDITIONALS) {
        this.foodName = foodName;
        this.foodAdditional = foodAdditional;
    }
}

type Bill = [number, Map<string, number>];

export function calculatePrice1(basePrice: number, type: DRINK_TYPES, size: DRINK_SIZES, topping: DRINK_TOPPINGS): number {
    let price: number = basePrice;

    // Size adjustments
    if (size === DRINK_SIZES.M)
        price += ADJUSTMENTS.M_SIZE;
    else if (size === DRINK_SIZES.L)
        if (type === DRINK_TYPES.COLD || type === DRINK_TYPES.BLENDED)
            price += ADJUSTMENTS.L_SIZE;
        else
            throw new Error("Size L is not available for hot drink");

    // Type adjustments
    if (type === DRINK_TYPES.BLENDED)
        price += ADJUSTMENTS.BLENDED_TYPE;

    // Topping adjustments
    if (topping === DRINK_TOPPINGS.WHIPPED_CREAM)
        price += ADJUSTMENTS.TOPPING;

    return price;
}

export function calculatePrice2(type: DRINK_TYPES, size: DRINK_SIZES, topping: DRINK_TOPPINGS, drink: DRINK, milk: MILK_OPTIONS): number {
    // Base price adjustments
    let price: number = drink === DRINK.MILK_TEA ? DRINK_BASE_PRICE.MILK_TEA : DRINK_BASE_PRICE.COFFEE;

    // Basic price
    price = calculatePrice1(price, type, size, topping);

    // Size adjustments
    if (size === DRINK_SIZES.XL)
        price += ADJUSTMENTS.XL_SIZE;
    
    // Milk option adjustments
    if (milk === MILK_OPTIONS.ALMOND_MILK)
        price += ADJUSTMENTS.ALMOND_MILK;

  return price;
}

export function calculatePrice3(type: DRINK_TYPES, size: DRINK_SIZES, topping: DRINK_TOPPINGS, drink: DRINK, milk: MILK_OPTIONS, saucePumps: number): number {
    let price: number = calculatePrice2(type, size, topping, drink, milk);

    // Chocolate sauce can only be added to hot drinks
    // The first 2 pumps are free
    if (type !== DRINK_TYPES.HOT && topping === DRINK_TOPPINGS.SAUCE_PUMP)
        throw new Error("Sauce pumps are only available for hot drink");
    
    // Maximum of 6 pumps
    if (saucePumps > 6)
        throw new Error("At most 6 pumps can be added to your drink");
    
    // The first 2 pumps are free
    price += (saucePumps - 2) * ADJUSTMENTS.EXTRA_SAUCE_PUMPS;

    return price;
}

export function calculatePrice4(breakfastItem: FOOD, breakfastItemAdditional: FOOD_ADDITIONALS): number {
    let price: number = FOOD_BASE_PRICE;

    if (breakfastItem === FOOD.SANDWICH) {
        if (breakfastItemAdditional === FOOD_ADDITIONALS.BUTTER ||
            breakfastItemAdditional === FOOD_ADDITIONALS.CREAM_CHEESE)
                throw new Error(`${breakfastItemAdditional} is only available for ${FOOD.BAGEL}.`);
        price += ADJUSTMENTS.SANDWICH;
    }
    else if (breakfastItem === FOOD.BAGEL) {
        if (breakfastItemAdditional === FOOD_ADDITIONALS.EGG ||
            breakfastItemAdditional === FOOD_ADDITIONALS.TURKEY)
                throw new Error(`${breakfastItemAdditional} is only available for ${FOOD.SANDWICH}.`);
        price += ADJUSTMENTS.BAGEL;
    }

    return price;
}

export function calculatePrice5(items: Item[]): Bill {
    let bill: Bill;
    let totalPrice: number = 0.0;
    let breakdown: Map<string, number>;

    for (const item of items) {
        let itemName: string = "";
        let itemPrice: number = 0.0;

        // Drink
        if (item.itemType === ITEM_TYPES.DRINK) {
            let drink: Drink = item as unknown as Drink;

            // Calc item price
            itemPrice += calculatePrice3(drink.drinkType, drink.drinkSize, drink.drinkTopping, drink.drinkName, drink.milkOption, drink.saucePumps);
            
            // Update item name
            if (drink.drinkSize === DRINK_SIZES.S)
                itemName += DRINK_SIZES.S + " ";
            else if (drink.drinkSize === DRINK_SIZES.M)
                itemName += DRINK_SIZES.M + " ";
            else if (drink.drinkSize === DRINK_SIZES.L)
                itemName += DRINK_SIZES.L + " ";
            else
                itemName += DRINK_SIZES.XL + " ";
            
            // Drink type
            if (drink.drinkType === DRINK_TYPES.HOT)
                itemName += DRINK_TYPES.HOT + " ";
            else if (drink.drinkType === DRINK_TYPES.COLD)
                itemName += DRINK_TYPES.COLD + " ";
            else
                itemName += DRINK_TYPES.BLENDED + " ";
            
            // Drink name
            if (drink.drinkName === DRINK.COFFEE)
                itemName += DRINK.COFFEE + " ";
            else
                itemName += DRINK.MILK_TEA + " ";
            
            // Drink topping
            if (drink.drinkTopping === DRINK_TOPPINGS.WHIPPED_CREAM) {
                itemName += DRINK_TOPPINGS.WHIPPED_CREAM + " ";
            } else if (drink.drinkTopping === DRINK_TOPPINGS.SAUCE_PUMP) {
                itemName += drink.saucePumps + " " + DRINK_TOPPINGS.SAUCE_PUMP;
                if (drink.saucePumps > 1)
                    itemName += "S";
                itemName += " ";
            }

            // Milk option
            if (drink.milkOption === MILK_OPTIONS.ALMOND_MILK)
                itemName += MILK_OPTIONS.ALMOND_MILK;
            else
                itemName += MILK_OPTIONS.WHOLE_MILK;
        }
        // Food
        else if (item.itemType === ITEM_TYPES.FOOD) {
            let food: Food = item as unknown as Food;

            // Calc item price
            itemPrice += calculatePrice4(food.foodName, food.foodAdditional);

            // Food additional
            if (food.foodAdditional) {
                if (food.foodAdditional === FOOD_ADDITIONALS.EGG)
                    itemName += FOOD_ADDITIONALS.EGG;
                else if (food.foodAdditional === FOOD_ADDITIONALS.TURKEY)
                    itemName += FOOD_ADDITIONALS.TURKEY;
                else if (food.foodAdditional === FOOD_ADDITIONALS.BUTTER)
                    itemName += FOOD_ADDITIONALS.BUTTER;
                else
                    itemName += FOOD_ADDITIONALS.CREAM_CHEESE;
            }

            // Food type
            if (food.foodName === FOOD.SANDWICH)
                itemName += FOOD.SANDWICH;
            else
                itemName += FOOD.BAGEL;
        }

        // Update bill and total price with current item price
        breakdown[itemName] = itemPrice;
        totalPrice += itemPrice;
    }

    totalPrice += totalPrice * TAX_RATE / 100;

    bill = [totalPrice, breakdown];
    return bill;
}