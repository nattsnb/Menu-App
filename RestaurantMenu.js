import { EditableMenuEntry } from "/menu/EditableMenuEntry.js";
import { NewEntryForm } from "/menu/NewEntryForm.js";

export class RestaurantMenu {
  constructor(container, productsServerAddress) {
    this.productsServerAddress = productsServerAddress;
    this.dishAndPriceArray = null;
    this.container = container;
  }
  fetchProductsDataAndDisplayEditableMenu = async () => {
    const fetchedData = await fetch(this.productsServerAddress);
    if (fetchedData.status === 200) {
      this.dishAndPriceArray = await fetchedData.json();
      this.displayEditableMenu();
    } else {
      this.container.innerText = "Server error.";
    }
  };
  displayEditableMenu() {
    const title = document.createElement("h1");
    title.innerText = "Edit Menu";
    this.container.append(title);
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
      new EditableMenuEntry(this.dishAndPriceArray, menuContainer, i);
    }
    const newEntryForm = new NewEntryForm(this.container);
  }
  fetchProductsDataAndDisplayOrderMenu = async () => {
    const fetchedData = await fetch(this.productsServerAddress);
    if (fetchedData.status === 200) {
      this.dishAndPriceArray = await fetchedData.json();
      this.displayOrderMenu();
    } else {
      this.container.innerText = "Server error.";
    }
  };
  displayOrderMenu() {
    const title = document.createElement("h1");
    title.innerText = "Menu";
    this.container.append(title);
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
    }
  }
}
