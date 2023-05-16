import { describe, it, expect } from '@jest/globals';
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
