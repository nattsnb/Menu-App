import { EditableMenuEntry } from "/menu/EditableMenuEntry.js";
import { NewEntryForm } from "/menu/NewEntryForm.js";
import { ProductsAPI } from "./ProductsAPI.js";

export class RestaurantMenu {
  constructor(container, serverAddress) {
    this.serverAddress = serverAddress;
    this.dishAndPriceArray = null;
    this.container = container;
    this.createProductsAPIAndDisplayEditableMenu();
  }

  createProductsAPIAndDisplayEditableMenu = async () => {
    this.productsAPI = new ProductsAPI(this.serverAddress);
    const productsResponse = await this.productsAPI.getProducts();
    this.dishAndPriceArray = await productsResponse.json();
    this.displayEditableMenu();
  };

  displayEditableMenu = () => {
    const title = document.createElement("h1");
    title.innerText = "Edit Menu";
    this.container.append(title);
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
      new EditableMenuEntry(this.dishAndPriceArray, menuContainer, i, this);
    }
    const newEntryForm = new NewEntryForm(this.container, this);
  };
}
