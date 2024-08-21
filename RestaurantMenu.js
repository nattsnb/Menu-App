import { EditableMenuEntry } from "/menu/EditableMenuEntry.js";
import { NewEntryForm } from "/menu/NewEntryForm.js";
import { ProductsAPI } from "./ProductsAPI.js";
import { OrderMenuEntry } from "./OrderMenuEntry.js";
import { ProvideAddressAndOrderForm } from "./ProvideAddressAndOrderForm.js";

export class RestaurantMenu {
  constructor(container, serverAddress) {
    this.serverAddress = serverAddress;
    this.dishAndPriceArray = null;
    this.container = container;
    this.dataToPlaceOrder = {
      products: [],
    };
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
  }
  fetchProductsDataAndDisplayOrderMenu = async () => {
    const fetchedData = await fetch(this.productsServerAddress);
    if (fetchedData.status === 200) {
      this.dishAndPriceArray = await fetchedData.json();
      this.displayOrderMenu(this.dataToPlaceOrder);
    } else {
      this.container.innerText = "Server error.";
    }
  };
  displayOrderMenu(orderData) {
    const title = document.createElement("h1");
    title.innerText = "Menu";
    this.container.append(title);
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
      new OrderMenuEntry(this.dishAndPriceArray, menuContainer, i, orderData);
    }
    const provideAddressAndOrderForm = new ProvideAddressAndOrderForm(
      this.container,
      this.dataToPlaceOrder,
    );
  }
}
