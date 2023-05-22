#include <assert.h>
#include <cmath>
#include <iomanip>
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

const unordered_map<char, string> drinkSizes =
    {{'S', "SMALL "},
     {'M', "MEDIUM "},
     {'L', "LARGE "},
     {'X', "EXTRA LARGE"}};
const unordered_map<char, string> drinkTypes =
    {{'H', "HOT "},
     {'C', "COLD "},
     {'B', "BLENDED "}};
const unordered_map<char, string> foodTypes =
    {{'S', "SANDWICH"},
     {'B', "BAGEL"}};
const unordered_map<char, string> foodAdditionals =
    {{'E', "EGG "},
     {'T', "TURKEY "},
     {'B', "BUTTER "},
     {'C', "CREAM CHEESE "}};
const char SMALL = 'S';
const char MEDIUM = 'M';
const char LARGE = 'L';
const char EXTRA_LARGE = 'X';
const char HOT = 'H';
const char COLD = 'C';
const char BLENDED = 'B';
const char SANDWICH = 'S';
const char EGG = 'E';
const char TURKEY = 'T';
const char BAGEL = 'B';
const char BUTTER = 'B';
const char CREAM_CHEESE = 'C';
const char DRINK = 'D';
const char FOOD = 'F';
const string COFFEE = "COFFEE";
const string MILK_TEA = "MILK TEA";
const string WHIPPED_CREAM = " WHIPPED CREAM";
const string ALMOND_MILK = " ALMOND MILK";
const string WHOLE_MILK = " WHOLE MILK";
const string SAUCE_PUMP = " SAUCE PUMP";
const double COFFEE_BASE_PRICE = 2.0;
const double MILK_TEA_BASE_PRICE = 2.25;
const double BREAKFAST_ITEM_BASE_PRICE = 3.0;
const double M_SIZE_ADJUSTMENTS = 0.5;
const double L_SIZE_ADJUSTMENTS = 1.0;
const double XL_SIZE_ADJUSTMENTS = 1.5;
const double B_TYPE_ADJUSTMENTS = 1.0;
const double TOPPING_ADJUSTMENTS = 0.5;
const double ALMOND_MILK_ADJUSTMENTS = 0.5;
const double EXTRA_SAUCE_PUMPS_ADJUSTMENTS = 0.5;
const double SANDWICH_ADJUSTMENTS = 1.0;
const double BAGEL_ADJUSTMENTS = 0.5;
const double TAX_RATE = 7.25; // percent

struct Item
{
  char itemType;
  char drinkSize;
  char drinkType;
  bool drinkTopping;
  bool isMilkTea;
  bool almondMilk;
  int saucePumps;
  bool foodAdditional;
  char foodAdditionalType;
  char foodType;
};

double calculatePrice1(double basePrice, char type, char size, bool topping)
{
  double price = basePrice;

  // Size adjustments
  if (size == MEDIUM)
    price += M_SIZE_ADJUSTMENTS;
  else if (size == LARGE)
    if (type == COLD || type == BLENDED)
      price += L_SIZE_ADJUSTMENTS;

  // Type adjustments
  if (type == BLENDED)
    price += B_TYPE_ADJUSTMENTS;

  // Topping adjustments
  if (topping)
    price += TOPPING_ADJUSTMENTS;

  return price;
}

double calculatePrice2(char type, char size, bool topping, bool isMilkTea,
                       bool almondMilk)
{
  // Base price adjustments
  double price = isMilkTea ? MILK_TEA_BASE_PRICE : COFFEE_BASE_PRICE;

  // Basic price
  price = calculatePrice1(price, type, size, topping);

  // Size adjustments
  if (size == EXTRA_LARGE)
    price += XL_SIZE_ADJUSTMENTS;

  // Milk option adjustments
  if (almondMilk)
    price += ALMOND_MILK_ADJUSTMENTS;

  return price;
}

double calculatePrice3(char type, char size, bool topping, bool isMilkTea,
                       bool almondMilk, int saucePumps)
{
  double price = calculatePrice2(type, size, topping, isMilkTea, almondMilk);

  // Chocolate sauce can only be added to hot drinks,
  // The first 2 pumps are free
  if (type != HOT || saucePumps <= 2)
    return price;

  // Maximum of 6 pumps
  if (saucePumps > 6)
    saucePumps = 6;

  // The first 2 pumps are free
  price += (saucePumps - 2) * EXTRA_SAUCE_PUMPS_ADJUSTMENTS;

  return price;
}

double calculatePrice4(char breakfastItem, bool breakfastItemAdditional)
{
  double breakfastItemPrice = BREAKFAST_ITEM_BASE_PRICE;

  if (breakfastItemAdditional)
  {
    if (breakfastItem == SANDWICH)
      breakfastItemPrice += SANDWICH_ADJUSTMENTS;
    else if (breakfastItem == BAGEL)
      breakfastItemPrice += BAGEL_ADJUSTMENTS;
  }

  return breakfastItemPrice;
}

pair<double, map<string, double>> calculatePrice5(vector<Item> items)
{
  pair<double, map<string, double>> bill;
  double totalPrice = 0.0;
  map<string, double> breakdown;

  for (auto &item : items)
  {
    // cout << "new item: " << item.itemType << ". " << item.drinkSize << endl;
    string itemName = "";
    double itemPrice = 0.0;

    // Drink
    if (item.itemType == DRINK)
    {
      // Calc item price
      itemPrice +=
          calculatePrice3(item.drinkType, item.drinkSize, item.drinkTopping,
                          item.isMilkTea, item.almondMilk, item.saucePumps);

      // Drink size
      if (item.drinkSize == SMALL)
        itemName += drinkSizes.at(SMALL);
      else if (item.drinkSize == MEDIUM)
        itemName += drinkSizes.at(MEDIUM);
      else if (item.drinkSize == LARGE)
        itemName += drinkSizes.at(LARGE);
      else
        itemName += drinkSizes.at(EXTRA_LARGE);

      // Drink type
      if (item.drinkType == HOT)
        itemName += drinkTypes.at(HOT);
      else if (item.drinkType == COLD)
        itemName += drinkTypes.at(COLD);
      else
        itemName += drinkTypes.at(BLENDED);

      // Drink name
      if (item.isMilkTea)
        itemName += MILK_TEA;
      else
        itemName += COFFEE;

      // Drink topping
      if (item.drinkTopping)
        itemName += WHIPPED_CREAM;

      // Drink milk
      if (item.almondMilk)
        itemName += ALMOND_MILK;
      else
        itemName += WHOLE_MILK;

      // Drink sauce pumps
      if (item.saucePumps != 0)
      {
        itemName += ' ' + to_string(item.saucePumps);
        if (item.saucePumps == 1)
          itemName += SAUCE_PUMP;
        else
          itemName += SAUCE_PUMP + 'S';
      }
    }
    // Food
    else if (item.itemType == FOOD)
    {
      // Calc item price
      itemPrice += calculatePrice4(item.foodType, item.foodAdditional);

      // Food additional
      if (item.foodAdditional)
      {
        if (item.foodAdditionalType == EGG)
          itemName += foodAdditionals.at(EGG);
        else if (item.foodAdditionalType == TURKEY)
          itemName += foodAdditionals.at(TURKEY);
        else if (item.foodAdditionalType == BUTTER)
          itemName += foodAdditionals.at(BUTTER);
        else
          itemName += foodAdditionals.at(CREAM_CHEESE);
      }

      // Food type
      if (item.foodType == SANDWICH)
        itemName += foodTypes.at(SANDWICH);
      else
        itemName += foodTypes.at(BAGEL);
    }

    // Update bill and total price with current item price
    breakdown[itemName] = itemPrice;
    totalPrice += itemPrice;
  }

  totalPrice += totalPrice * TAX_RATE / 100;

  bill.first = totalPrice;
  bill.second = breakdown;

  return bill;
}

int main()
{
  /* Test 1:
   * double calculatePrice1(double basePrice, char type, char size, bool topping);
   */
  {
    // Test case 1: hot, small, without topping
    // (base price only)
    assert(calculatePrice1(2, HOT, SMALL, false) == 2);

    // Test case 2: cold, medium, with topping
    // (all price adjustments)
    assert(calculatePrice1(2, COLD, MEDIUM, true) == 3);

    // Test case 3: blended, large, without topping
    // (all price adjustments, except L size not available)
    assert(calculatePrice1(2, BLENDED, LARGE, false) == 4);

    // Test case 4: hot, medium, without topping
    // (size adjustment only)
    assert(calculatePrice1(2, HOT, MEDIUM, false) == 2.5);

    // Test case 5: cold, small, with topping
    // (whipped cream topping only)
    assert(calculatePrice1(2, COLD, SMALL, true) == 2.5);

    // Test case 6: blended, medium, with topping
    // (all price adjustments, except L size not available)
    assert(calculatePrice1(2, BLENDED, MEDIUM, true) == 4);

    // Test case 7: hot, large, without topping
    // (size adjustment only)
    // Invalid request -> keep base price
    assert(calculatePrice1(2, HOT, LARGE, false) == 2);

    // Test case 8: cold, medium, without topping
    // (size adjustment only)
    assert(calculatePrice1(2, COLD, MEDIUM, false) == 2.5);

    // Test case 9: blended, small, without topping
    // (all price adjustments, except L size not available)
    assert(calculatePrice1(2, BLENDED, SMALL, false) == 3);

    // Test case 10: hot, small, with topping
    // (whipped cream topping only)
    assert(calculatePrice1(2, HOT, SMALL, true) == 2.5);
  }

  /* Test 2:
   * double calculatePrice2(char type, char size, bool topping, bool isMilkTea, bool almondMilk);
   */
  {
    // Test case 1: hot, small, without topping, not milk tea
    // (base price only)
    assert(calculatePrice2(HOT, SMALL, false, false, false) == 2);

    // Test case 2: cold, medium, with topping, not milk tea
    // (all price adjustments except milk options)
    assert(calculatePrice2(COLD, MEDIUM, true, false, false) == 3);

    // Test case 3: blended, large, without topping, not milk tea
    // (all price adjustments, except L size not available)
    assert(calculatePrice2(BLENDED, LARGE, false, false, false) == 4);

    // Test case 4: hot, medium, without topping, milk tea with whole milk
    // (size and milk options adjustments)
    assert(calculatePrice2(HOT, MEDIUM, false, true, false) == 2.75);

    // Test case 5: cold, small, with topping, milk tea with almond milk
    // (whipped cream topping and milk options adjustments)
    assert(calculatePrice2(COLD, SMALL, true, true, true) == 3.25);

    // Test case 6: blended, medium, with topping, milk tea with whole milk
    // (all price adjustments except L size not available and additional milk option)
    assert(calculatePrice2(BLENDED, MEDIUM, true, true, false) == 4.25);

    // Test case 7: hot, large, without topping, milk tea with almond milk
    // (size and milk options adjustments)
    // Invalid request -> keep base price
    assert(calculatePrice2(HOT, LARGE, false, true, true) == 2.75);

    // Test case 8: cold, medium, without topping, milk tea with whole milk and almond
    // (size and milk options adjustments)
    assert(calculatePrice2(COLD, MEDIUM, false, true, true) == 3.25);

    // Test case 9: blended, small, without topping, milk tea with whole milk
    // (all price adjustments, except L size not available and additional milk option)
    assert(calculatePrice2(BLENDED, SMALL, false, true, false) == 3.25);

    // Test case 10: hot, small, with topping, milk tea with almond milk
    // (whipped cream topping and milk options adjustments)
    assert(calculatePrice2(HOT, SMALL, true, true, true) == 3.25);
  }

  /* Test 3:
   * double calculatePrice3(char type, char size, bool topping, bool isMilkTea, bool almondMilk, int saucePumps);
   */
  {
    // Test case 1: hot, small, without topping, not milk tea, no sauce
    // (base price only)
    assert(calculatePrice3(HOT, SMALL, false, false, false, 0) == 2);

    // Test case 2: cold, medium, with topping, not milk tea, no sauce
    // (all price adjustments except sauce)
    assert(calculatePrice3(COLD, MEDIUM, true, false, false, 0) == 3);

    // Test case 3: blended, large, without topping, not milk tea, no sauce
    // (all price adjustments, except L size not available and sauce)
    assert(calculatePrice3(BLENDED, LARGE, false, false, false, 0) == 4);

    // Test case 4: hot, medium, without topping, milk tea with whole milk, no sauce
    // (size and milk options adjustments, no sauce)
    assert(calculatePrice3(HOT, MEDIUM, false, true, false, 0) == 2.75);

    // Test case 5: cold, small, with topping, milk tea with almond milk, no sauce
    // (whipped cream topping and milk options adjustments, no sauce)
    assert(calculatePrice3(COLD, SMALL, true, true, true, 0) == 3.25);

    // Test case 6: blended, medium, with topping, milk tea with whole milk, no sauce
    // (all price adjustments except L size not available and additional milk option, no sauce)
    assert(calculatePrice3(BLENDED, MEDIUM, true, true, false, 0) == 4.25);

    // Test case 7: hot, large, without topping, milk tea with almond milk, 4 sauce pumps
    // (size, milk options, and sauce adjustments)
    assert(calculatePrice3(HOT, LARGE, false, true, true, 4) == 3.75);

    // Test case 8: cold, medium, without topping, milk tea with whole milk and almond, 2 sauce pumps
    // (size, milk options, and sauce adjustments)
    assert(calculatePrice3(COLD, MEDIUM, false, true, true, 2) == 3.25);

    // Test case 9: blended, small, without topping, milk tea with whole milk, 6
    // sauce pumps
    // (all price adjustments, except L size not available and additional milk option, maximum sauce pumps)
    assert(calculatePrice3(BLENDED, SMALL, false, true, false, 6) == 3.25);

    // Test case 10: hot, small, with topping, milk tea with almond milk, 1 sauce pump
    // (whipped cream topping, milk options, and sauce adjustments)
    assert(calculatePrice3(HOT, SMALL, true, true, true, 1) == 3.25);
  }

  /* Test 4:
   * double calculatePrice4(char breakfastItem, bool breakfastItemAdditional);
   */
  {
    // Test case 1: Calculate price for sandwich with egg
    assert(calculatePrice4(SANDWICH, true) == 4);

    // Test case 2: Calculate price for sandwich without turkey
    assert(calculatePrice4(SANDWICH, false) == 3);

    // Test case 3: Calculate price for bagel with butter
    assert(calculatePrice4(BAGEL, true) == 3.5);

    // Test case 4: Calculate price for bagel without cream cheese
    assert(calculatePrice4(BAGEL, false) == 3);
  }

  /* Test 5:
   * pair<double, map<string, double>> calculatePrice5(vector<Item> items)
   */
  {
    // Test case 1: empty item list
    vector<Item> items1 = {};
    pair<double, map<string, double>> result1 = calculatePrice5(items1);
    assert(result1.first == 0);
    assert(result1.second.empty());

    // Test case 2: single item without additional options
    Item d1;
    d1.itemType = DRINK;
    d1.drinkSize = SMALL;
    d1.drinkType = HOT;
    d1.drinkTopping = false;
    d1.isMilkTea = false;
    d1.almondMilk = false;
    d1.saucePumps = 0;
    vector<Item> items2 = {d1};
    pair<double, map<string, double>> result2 = calculatePrice5(items2);
    {
      // auto tmp = result2.second;
      // for(auto it = tmp.begin(); it != tmp.end(); it++){
      //   cout << it->first << " => " << it->second << endl;
      // }
    }
    assert(result2.second.size() == 1);
    assert(result2.second["SMALL HOT COFFEE WHOLE MILK"] == 2);

    assert(result2.first == 2.14500); // including tax

    // Test case 3: multiple items with additional options
    Item d2;
    d2.itemType = DRINK;
    d2.drinkSize = MEDIUM;
    d2.drinkType = COLD;
    d2.drinkTopping = true;
    d2.isMilkTea = true;
    d2.almondMilk = true;
    d2.saucePumps = 0;

    Item d3;
    d3.itemType = DRINK;
    d3.drinkSize = LARGE;
    d3.drinkType = BLENDED;
    d3.drinkTopping = false;
    d3.isMilkTea = false;
    d3.almondMilk = false;
    d3.saucePumps = 0;

    Item f1;
    f1.itemType = FOOD;
    f1.foodAdditional = true;
    f1.foodAdditionalType = EGG;
    f1.foodType = SANDWICH;

    Item f2;
    f2.itemType = FOOD;
    f2.foodAdditional = false;
    f2.foodType = BAGEL;

    vector<Item> items3 = {d2, d3, f1, f2};
    pair<double, map<string, double>> result3 = calculatePrice5(items3);
    // cout << "result3 created"
    //      << "\n";
    // cout << result3.first;
    // {
    //   auto tmp = result3.second;
    //   for (auto it = tmp.begin(); it != tmp.end(); it++)
    //   {
    //     cout << it->first << " => " << it->second << endl;
    //   }
    // }
    assert(result3.second.size() == 4);
    assert(result3.second["MEDIUM COLD MILK TEA WHIPPED CREAM ALMOND MILK"] == 3.75);
    assert(result3.second["LARGE BLENDED COFFEE WHOLE MILK"] == 4);
    assert(result3.second["EGG SANDWICH"] == 4);
    assert(result3.second["BAGEL"] == 3);
    assert(result3.first == 15.819375); // including tax

    // Test case 4: multiple items with same options
    vector<Item> items4 = {{'D', SMALL, HOT, false, false, 0},
                           {'D', SMALL, COLD, false, false, 0},
                           {'D', SMALL, BLENDED, false, false, 0}};
    pair<double, map<string, double>> result4 = calculatePrice5(items4);
    assert(result4.second.size() == 3);
    assert(result4.second["SMALL HOT COFFEE WHOLE MILK"] == 2);
    assert(result4.second["SMALL COLD COFFEE WHOLE MILK"] == 2);
    assert(result4.second["SMALL BLENDED COFFEE WHOLE MILK"] == 3);
    assert(result4.first == 7.5075); // including tax

    // Test case 5:
    vector<Item> items5 = {
        {'D', MEDIUM, COLD, true, true, true},
        {'D', LARGE, HOT, false, false, false, 6},
        {'F', '#', '#', false, false, false, 0, true, TURKEY, SANDWICH},
        {'F', '#', '#', false, false, false, 0, true, BUTTER, BAGEL},
    };
    pair<double, map<string, double>> result5 = calculatePrice5(items5);
    assert(result5.second.size() == 4);
    assert(result5.second["MEDIUM COLD MILK TEA WHIPPED CREAM ALMOND MILK"] ==
           3.75);
    assert(result5.second["LARGE HOT COFFEE WHOLE MILK 6 SAUCE PUMPS"] ==
           4.0); // large is not avaiable for HOT so the price is 4
    assert(result5.second["TURKEY SANDWICH"] == 4.0);
    assert(result5.second["BUTTER BAGEL"] == 3.5);
    assert(result5.first == 16.355625);

    cout << "SUCCEEDED!";
  }

  return 0;
}