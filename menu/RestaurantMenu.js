import { EditableMenuEntry } from "./EditableMenuEntry.js";
import {NewEntryForm} from "./NewEntryForm.js";

export class RestaurantMenu {
  constructor(container, productsServerAddress) {
    this.productsServerAddress = productsServerAddress;
    this.dishAndPriceArray = null;
    this.container = container;
    this.fetchProductsData();
  }
  fetchProductsData = async () => {
    const fetchedData = await fetch(this.productsServerAddress);
    if (fetchedData.status === 200) {
      this.dishAndPriceArray = await fetchedData.json();
      this.displayEditableMenu();
    } else {
      this.container.innerText = "Server error.";
    }
  };
  displayEditableMenu() {
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
      new EditableMenuEntry(this.dishAndPriceArray, menuContainer, i);
    }
    const newEntryForm = new NewEntryForm(this.container);
  }
}
