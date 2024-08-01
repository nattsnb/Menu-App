import { EditableMenuEntry } from "./EditableMenuEntry.js";

export class RestaurantMenu {
  constructor(container) {
    this.dishAndPriceArray = [
      { name: "Lasagne", priceInEUR: 15 },
      { name: "Pizza", priceInEUR: 10 },
    ];
    this.container = container;
    this.displayEditableMenu();
  }
  displayEditableMenu() {
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
      new EditableMenuEntry(this.dishAndPriceArray, menuContainer, i);
    }
  }
}
