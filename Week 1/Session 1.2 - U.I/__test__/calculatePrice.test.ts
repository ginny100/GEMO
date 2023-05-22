import { describe, it, expect, afterAll } from '@jest/globals';
import * as calculatePrice from '../src/utils/calculatePrice';

// Test suite 1
describe('Test suite 1: calculatePrice1', () => {
  it('Test case 1: small hot coffee without topping (base price only)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.NONE);
    expect(price).toBe(2);
  });

  it('Test case 2: medium cold coffee with whipped cream topping (all price adjustments)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM);
    expect(price).toBe(3);
  });

  it('Test case 3: large blended coffee without topping (all price adjustments, except L size not available)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.L, calculatePrice.DRINK_TOPPINGS.NONE);
    expect(price).toBe(4);
  });

  it('Test case 4: medium hot coffee without topping (size adjustment only)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.NONE);
    expect(price).toBe(2.5);
  });

  it('Test case 5: small cold coffee with whipped cream topping (whipped cream topping only)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM);
    expect(price).toBe(2.5);
  });

  it('Test case 6: medium blended coffee with whipped cream topping (all price adjustments, except L size not available)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM);
    expect(price).toBe(4);
  });

  it('Test case 7: large hot coffee without topping (size adjustment only)', () => {
    expect(() => {
      calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.L, calculatePrice.DRINK_TOPPINGS.NONE);
    }).toThrow("Size L is not available for hot drink");
  });

  it('Test case 8: medium cold coffee without topping (size adjustment only)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.NONE);
    expect(price).toBe(2.5);
  });

  it('Test case 9: small blended coffee without topping (all price adjustments, except L size not available)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.NONE);
    expect(price).toBe(3);
  });

  it('Test case 10: small hot coffee with whipped cream topping (whipped cream topping only)', () => {
    const price = calculatePrice.calculatePrice1(2, calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM);
    expect(price).toBe(2.5);
  });
});

// Test suite 2
describe('Test suite 2: calculatePrice2', () => {
  it('Test case 1: small hot coffee without topping, whole milk (base price only)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.DRINK.COFFEE, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(2);
  });

  it('Test case 2: medium cold coffee with whipped cream topping, whole milk (all price adjustments except milk options)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.DRINK.COFFEE, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(3);
  });

  it('Test case 3: large blended coffee without topping, whole milk (all price adjustments, except L size not available)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.L, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.DRINK.COFFEE, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(4);
  });

  it('Test case 4: medium hot milk tea without topping, whole milk (size and drink option adjustments)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(2.75);
  });

  it('Test case 5: small cold milk tea with whipped cream topping, almond milk (whipped cream topping and milk options adjustments)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    expect(price).toBe(3.25);
  });

  it('Test case 6: medium blended milk tea with whipped cream topping, whole milk (all price adjustments except L size not available and additional milk option)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(4.25);
  });

  it('Test case 7: large hot milk tea without topping, almond milk (size and milk options adjustments)', () => {
    expect(() => {
      calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.L, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    }).toThrow("Size L is not available for hot drink");
  });

  it('Test case 8: medium cold milk tea without topping, almond milk (size and milk options adjustments)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    expect(price).toBe(3.25);
  });

  it('Test case 9: small blended milk tea without topping, whole milk (all price adjustments, except L size not available and additional milk option)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(3.25);
  });

  it('Test case 10: small hot milk tea with whipped cream topping, almond milk (whipped cream topping and milk options adjustments)', () => {
    const price = calculatePrice.calculatePrice2(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    expect(price).toBe(3.25);
  });
});

// Test suite 3
describe('Test suite 3: calculatePrice3', () => {
  it('Test case 1: small hot coffee with no topping at all, whole milk (base price only)', () => {
    const price = calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.SAUCE_PUMP.NONE, 0, calculatePrice.DRINK.COFFEE, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(2);
  });

  it('Test case 2: medium cold coffee with whipped cream, no sauce, whole milk (all price adjustments except sauce)', () => {
    const price = calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.SAUCE_PUMP.NONE, 0, calculatePrice.DRINK.COFFEE, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(3);
  });

  it('Test case 3: large blended coffee with no topping at all, whole milk (all price adjustments, except L size not available and sauce)', () => {
    const price = calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.L, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.SAUCE_PUMP.NONE, 0, calculatePrice.DRINK.COFFEE, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(4);
  });

  it('Test case 4: medium hot milk tea with no topping at all, whole milk (size and milk options adjustments, no sauce)', () => {
    const price = calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.SAUCE_PUMP.NONE, 0, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(2.75);
  });

  it('Test case 5: small cold milk tea with whipped cream, no sauce, almond milk (whipped cream topping and milk options adjustments, no sauce)', () => {
    const price = calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.SAUCE_PUMP.NONE, 0, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    expect(price).toBe(3.25);
  });

  it('Test case 6: medium blended milk tea with whipped cream, no sauce, whole milk (all price adjustments except L size not available and additional milk option, no sauce)', () => {
    const price = calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.SAUCE_PUMP.NONE, 0, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    expect(price).toBe(4.25);
  });

  it('Test case 7: large hot milk tea without whipped cream, 4 sauce pumps, almond milk (size, milk options, and sauce adjustments)', () => {
    expect(() => {
      calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.L, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.SAUCE_PUMP.CHOCOLATE, 4,  calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    }).toThrow("Size L is not available for hot drink");
  });

  it('Test case 8: medium cold milk tea without whipped cream, 2 sauce pumps, almond milk (size, milk options, and sauce adjustments)', () => {
    expect(() => {
      calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.COLD, calculatePrice.DRINK_SIZES.M, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.SAUCE_PUMP.CHOCOLATE, 2,  calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    }).toThrow("Sauce pumps are only available for hot drink");
  });

  it('Test case 9: small blended milk tea without whipped cream, 6 sauce pumps, whole milk (all price adjustments, except L size not available and additional milk option, maximum sauce pumps)', () => {
    expect(() => {
      calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.BLENDED, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.NONE, calculatePrice.SAUCE_PUMP.CHOCOLATE, 6,  calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.WHOLE_MILK);
    }).toThrow("Sauce pumps are only available for hot drink");
  });

  it('Test case 10: small hot milk tea with whipped cream, 1 sauce pump, almond milk ()', () => {
    const price = calculatePrice.calculatePrice3(calculatePrice.DRINK_TYPES.HOT, calculatePrice.DRINK_SIZES.S, calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM, calculatePrice.SAUCE_PUMP.CHOCOLATE, 1, calculatePrice.DRINK.MILK_TEA, calculatePrice.MILK_OPTIONS.ALMOND_MILK);
    expect(price).toBe(3.25);
  });
});

// Test suite 4
describe('Test suite 4: calculatePrice4', () => {
  it('Test case 1: Plain sandwich', () => {
    const price = calculatePrice.calculatePrice4(calculatePrice.FOOD.SANDWICH, calculatePrice.FOOD_ADDITIONALS.NONE);
    expect(price).toBe(3);
  });

  it('Test case 2: Egg sandwich', () => {
    const price = calculatePrice.calculatePrice4(calculatePrice.FOOD.SANDWICH, calculatePrice.FOOD_ADDITIONALS.EGG);
    expect(price).toBe(4);
  });

  it('Test case 3: Turkey sandwich', () => {
    const price = calculatePrice.calculatePrice4(calculatePrice.FOOD.SANDWICH, calculatePrice.FOOD_ADDITIONALS.TURKEY);
    expect(price).toBe(4);
  });

  it('Test case 4: Plain bagel', () => {
    const price = calculatePrice.calculatePrice4(calculatePrice.FOOD.BAGEL, calculatePrice.FOOD_ADDITIONALS.NONE);
    expect(price).toBe(3);
  });

  it('Test case 3: Butter bagel', () => {
    const price = calculatePrice.calculatePrice4(calculatePrice.FOOD.BAGEL, calculatePrice.FOOD_ADDITIONALS.BUTTER);
    expect(price).toBe(3.5);
  });

  it('Test case 4: Cream cheese bagel', () => {
    const price = calculatePrice.calculatePrice4(calculatePrice.FOOD.BAGEL, calculatePrice.FOOD_ADDITIONALS.CREAM_CHEESE);
    expect(price).toBe(3.5);
  });
});

// Test suite 5
describe('Test suite 5: calculatePrice5', () => {
  it('Test case 1: Empty item list', () => {
    const bill: calculatePrice.Bill = calculatePrice.calculatePrice5([]);
    expect(bill[0]).toBe(0);
    expect(bill[1]).toStrictEqual(new Map<string, number>());
  });

  it('Test case 2: One drink item without additional options', () => {
    const drink: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.S,
      calculatePrice.DRINK_TYPES.HOT,
      calculatePrice.DRINK_TOPPINGS.NONE,
      calculatePrice.SAUCE_PUMP.NONE,
      0,
      calculatePrice.DRINK.COFFEE,
      calculatePrice.MILK_OPTIONS.WHOLE_MILK
    );

    const bill: calculatePrice.Bill = calculatePrice.calculatePrice5([drink]);
    expect(bill[0]).toBe(2.14500);
    expect(bill[1].size).toBe(1);
    expect(bill[1].get("SMALL HOT COFFEE WHOLE MILK")).toBe(2);
  });

  it('Test case 3: Two drink items and two food items with additional options', () => {
    const drink1: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.M,
      calculatePrice.DRINK_TYPES.COLD,
      calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM,
      calculatePrice.SAUCE_PUMP.NONE,
      0,
      calculatePrice.DRINK.MILK_TEA,
      calculatePrice.MILK_OPTIONS.ALMOND_MILK
    );

    const drink2: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.L,
      calculatePrice.DRINK_TYPES.BLENDED,
      calculatePrice.DRINK_TOPPINGS.NONE,
      calculatePrice.SAUCE_PUMP.NONE,
      0,
      calculatePrice.DRINK.COFFEE,
      calculatePrice.MILK_OPTIONS.WHOLE_MILK
    );

    const food1: calculatePrice.Food = new calculatePrice.Food(
      calculatePrice.FOOD.SANDWICH,
      calculatePrice.FOOD_ADDITIONALS.EGG
    );

    const food2: calculatePrice.Food = new calculatePrice.Food(
      calculatePrice.FOOD.BAGEL,
      calculatePrice.FOOD_ADDITIONALS.NONE
    );

    const bill: calculatePrice.Bill = calculatePrice.calculatePrice5([drink1, drink2, food1, food2]);
    expect(bill[0]).toBe(15.819375);
    expect(bill[1].size).toBe(4);
    expect(bill[1].get("MEDIUM COLD MILK TEA WHIPPED CREAM ALMOND MILK")).toBe(3.75);
    expect(bill[1].get("LARGE BLENDED COFFEE WHOLE MILK")).toBe(4);
    expect(bill[1].get("EGG SANDWICH")).toBe(4);
    expect(bill[1].get("BAGEL")).toBe(3);
  });

  it('Test case 4: Three drink items with same options', () => {
    const drink1: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.S,
      calculatePrice.DRINK_TYPES.HOT,
      calculatePrice.DRINK_TOPPINGS.NONE,
      calculatePrice.SAUCE_PUMP.NONE,
      0,
      calculatePrice.DRINK.COFFEE,
      calculatePrice.MILK_OPTIONS.WHOLE_MILK
    );

    const drink2: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.S,
      calculatePrice.DRINK_TYPES.COLD,
      calculatePrice.DRINK_TOPPINGS.NONE,
      calculatePrice.SAUCE_PUMP.NONE,
      0,
      calculatePrice.DRINK.COFFEE,
      calculatePrice.MILK_OPTIONS.WHOLE_MILK
    );

    const drink3: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.S,
      calculatePrice.DRINK_TYPES.BLENDED,
      calculatePrice.DRINK_TOPPINGS.NONE,
      calculatePrice.SAUCE_PUMP.NONE,
      0,
      calculatePrice.DRINK.COFFEE,
      calculatePrice.MILK_OPTIONS.WHOLE_MILK
    );

    const bill: calculatePrice.Bill = calculatePrice.calculatePrice5([drink1, drink2, drink3]);
    expect(bill[0]).toBe(7.5075);
    expect(bill[1].size).toBe(3);
    expect(bill[1].get("SMALL HOT COFFEE WHOLE MILK")).toBe(2);
    expect(bill[1].get("SMALL COLD COFFEE WHOLE MILK")).toBe(2);
    expect(bill[1].get("SMALL BLENDED COFFEE WHOLE MILK")).toBe(3);
  });

  it('Test case 5: Two drink items and two food items with different options', () => {
    const drink1: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.M,
      calculatePrice.DRINK_TYPES.COLD,
      calculatePrice.DRINK_TOPPINGS.WHIPPED_CREAM,
      calculatePrice.SAUCE_PUMP.NONE,
      0,
      calculatePrice.DRINK.MILK_TEA,
      calculatePrice.MILK_OPTIONS.ALMOND_MILK
    );

    const drink2: calculatePrice.Drink = new calculatePrice.Drink(
      calculatePrice.DRINK_SIZES.S,
      calculatePrice.DRINK_TYPES.HOT,
      calculatePrice.DRINK_TOPPINGS.NONE,
      calculatePrice.SAUCE_PUMP.CHOCOLATE,
      6,
      calculatePrice.DRINK.COFFEE,
      calculatePrice.MILK_OPTIONS.WHOLE_MILK
    );

    const food1: calculatePrice.Food = new calculatePrice.Food(
      calculatePrice.FOOD.SANDWICH,
      calculatePrice.FOOD_ADDITIONALS.TURKEY
    );

    const food2: calculatePrice.Food = new calculatePrice.Food(
      calculatePrice.FOOD.BAGEL,
      calculatePrice.FOOD_ADDITIONALS.BUTTER
    );

    const bill: calculatePrice.Bill = calculatePrice.calculatePrice5([drink1, drink2, food1, food2]);
    expect(bill[0]).toBe(16.355625);
    expect(bill[1].size).toBe(4);
    expect(bill[1].get("MEDIUM COLD MILK TEA WHIPPED CREAM ALMOND MILK")).toBe(3.75);
    expect(bill[1].get("SMALL HOT COFFEE 6 CHOCOLATE PUMPS WHOLE MILK")).toBe(4);
    expect(bill[1].get("TURKEY SANDWICH")).toBe(4);
    expect(bill[1].get("BUTTER BAGEL")).toBe(3.5);
  });
});
