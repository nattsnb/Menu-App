export class OrderMenuEntry {
  constructor(dishAndPriceArray, menuContainer, i) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.row = null;
    this.price = null;
    this.dishName = null;
    this.createMenuEntry();
  }
  createMenuEntry() {
    this.row = document.createElement("div");
    this.row.classList.add("menu-row");
    this.createDishNameParagraph();
    this.createPriceWithCurrencyDiv();
    this.menuContainer.append(this.row);
  }

  createDishNameParagraph() {
    this.dishName = document.createElement("p");
    this.dishName.classList.add("dish-name");
    this.dishName.innerText = this.dishAndPriceArray[this.i].name;
    this.row.append(this.dishName);
  }

  createPriceWithCurrencyDiv() {
    const priceWithCurrency = document.createElement("div");
    priceWithCurrency.classList.add("price-with-currency");
    this.price = document.createElement("p");
    this.price.classList.add("price");
    this.price.innerText = this.dishAndPriceArray[this.i].priceInEUR;
    const currency = document.createElement("p");
    currency.classList.add("currency");
    currency.innerText = "€";
    priceWithCurrency.append(this.price);
    priceWithCurrency.append(currency);
    this.row.append(priceWithCurrency);
  }
}
