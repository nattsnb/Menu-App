import { MenuEntry } from "./MenuEntry.js";

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
      new MenuEntry(this.dishAndPriceArray, menuContainer, i);
    }
  }
}
