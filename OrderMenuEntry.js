export class OrderMenuEntry {
  constructor(dishAndPriceArray, menuContainer, i) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.row = null;
    this.price = null;
    this.dishName = null;
    this.createMenuEntry();
    this.number = null;
  }
  createMenuEntry() {
    this.row = document.createElement("div");
    this.row.classList.add("menu-row");
    this.createDishNameParagraph();
    this.createPriceWithCurrencyDiv();
    this.createNumberOfPlatesDiv();
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

  createNumberOfPlatesDiv() {
    const numberOfPlatesDiv = document.createElement("div");
    numberOfPlatesDiv.classList.add("number-of-plates-div");
    this.row.append(numberOfPlatesDiv);
    this.addIcon("fa-plus-circle", numberOfPlatesDiv);
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("number-div");
    this.number = 0;
    numberDiv.innerHTML = this.number;
    numberOfPlatesDiv.append(numberDiv);
    this.addIcon("fa-minus-circle", numberOfPlatesDiv);
  }

  addIcon(iconName, container) {
    const icon = document.createElement("span");
    icon.classList.add("fas");
    icon.classList.add(iconName);
    container.append(icon);
  }
}
