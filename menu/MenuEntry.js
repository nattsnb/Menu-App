export class MenuEntry {
  constructor(dishAndPriceArray, menuContainer, i) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.createMenuEntry();
  }
  createMenuEntry() {
    const row = document.createElement("div");
    row.classList.add("menu-row");
    this.createDishNameP(row);
    this.createPriceWithCurrencyDiv(row);
    this.createButtonsInWrapper(row);
    this.menuContainer.append(row);
  }

  createDishNameP(row) {
    const dishName = document.createElement("p");
    dishName.classList.add("dish-name");
    dishName.innerText = this.dishAndPriceArray[this.i].name;
    row.append(dishName);
  }

  createPriceWithCurrencyDiv(row) {
    const priceWithCurrency = document.createElement("div");
    priceWithCurrency.classList.add("price-with-currency");
    const price = document.createElement("p");
    price.classList.add("price");
    price.innerText = this.dishAndPriceArray[this.i].priceInEUR;
    const currency = document.createElement("p");
    currency.classList.add("currency");
    currency.innerText = "€";
    priceWithCurrency.append(price);
    priceWithCurrency.append(currency);
    row.append(priceWithCurrency);
  }
  createButtonsInWrapper(row) {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", this.editButtonFunctionality);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    buttonWrapper.append(editButton);
    buttonWrapper.append(deleteButton);
    row.append(buttonWrapper);
  }
}
