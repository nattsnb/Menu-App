export class RestaurantMenu {
  constructor(container) {
    this.dishAndPriceArray = [
      { name: "Lasagne", priceInEUR: 15 },
      { name: "Pizza", priceInEUR: 10 },
    ];

    this.container = container;
    this.displayMenu();
  }
  displayMenu() {
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
      const row = document.createElement("div");
      row.classList.add("menu-row");
      this.createDishNameP(row, i);
      this.createPriceWithCurrencyDiv(row, i);
      this.createButtonsInWrapper(row);
      menuContainer.append(row);
    }
  }
  createDishNameP(row, i) {
    const dishName = document.createElement("p");
    dishName.classList.add("dish-name");
    dishName.innerText = this.dishAndPriceArray[i].name;
    row.append(dishName);
  }

  createPriceWithCurrencyDiv(row, i) {
    const priceWithCurrency = document.createElement("div");
    priceWithCurrency.classList.add("price-with-currency");
    const price = document.createElement("p");
    price.classList.add("price");
    price.innerText = this.dishAndPriceArray[i].priceInEUR;
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
