# Pricing 

## Overview
- Program to calculate the price of drink and food orders based on specific requirements

## Implementation

### `double calculatePrice1(double basePrice, char type, char size, bool topping)` calculates price of basic drink orders

#### @params
- `double basePrice`: can be the base price of a coffee or milk tea
- `char type`: can be hot, cold, or blended (represented by a single character to save space)
- `char size`: can be small, medium, or large (represented by a single character to save space). Large size is only available for cold and blended drinks.
- `bool topping`: whether the drink has whipped cream topping or not

#### @return
- The price of `double` type

### `double calculatePrice2(char type, char size, bool topping, bool isMilkTea, bool almondMilk)` utilizes calculatePrice1 to calculate the price of drink order with coffee or milk tea, or both 

#### @params
- `char type`: can be hot, cold, or blended (represented by a single character to save space)
- `char size`: can be small, medium, or large (represented by a single character to save space). Large size is only available for cold and blended drinks.
- `bool topping`: whether the drink has whipped cream topping or not
- `bool isMilkTea`: determines whether the drink is coffee or milk tea to set the base price
- `bool almondMilk`: determines the type of milk added to the drink

#### @return
- The price of `double` type

### `double calculatePrice3(char type, char size, bool topping, bool isMilkTea, bool almondMilk, int saucePumps)` utilizes calculatePrice2 to calculate the price of an order of hot drink with additional sauce pumps

#### @params
- `char type`: can be hot, cold, or blended (represented by a single character to save space)
- `char size`: can be small, medium, or large (represented by a single character to save space)
- `bool topping`: whether the drink has whipped cream topping or not
- `bool isMilkTea`: determines whether the drink is coffee or milk tea to set the base price
- `bool almondMilk`: determines the type of milk added to the drink
- `int saucePumps`: number of additional sauce pumps added to the drink. If the drink is cold or blended, the sauce pump option is not available -> keep the price without the sauce price

#### @return
- The price of `double` type

### `double calculatePrice4(char breakfastItem, bool breakfastItemAdditional)` calculates price of food item

#### @params
- `char breakfastItem`: can be either a sandwich or bagel (represented by a single character to save space)
- `bool breakfastItemAdditional`: a breakfast item can have additional or not. The price of additionals depends on the type of breakfast item.

#### @return
- The price of `double` type

### `pair<double, map<string, double>> calculatePrice5(vector<Item> items)` calculates the price of a list of items

#### @params
- `vector<Item> items`: a list of items. Each item can be a food or drink

#### @return
- The final price after tax mapped to a `map` listing all distinct items in the order. Each entry in the `map` has the item name and its price. Note that the same item can be ordered more than once. Its price is added to the accumulated price, but the item itself appears only once inside the hash map.
