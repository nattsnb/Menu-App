import { EditableMenuEntry } from "/menu/EditableMenuEntry.js";
import { NewEntryForm } from "/menu/NewEntryForm.js";
import { OrderMenuEntry } from "./OrderMenuEntry.js";
import { ProvideAddressAndOrderForm } from "./ProvideAddressAndOrderForm.js";
import { Basket } from "./Basket.js";
import { ordersAPI, productsAPI } from "./API/";

export class RestaurantMenu {
  constructor(container) {
    this.dishAndPriceArray = null;
    this.container = container;
    this.ordersArray = null;
    this.dataToPlaceOrder = { products: [], address: "" };
  }

  createProductsAPIAndDisplayEditableMenu = async () => {
    this.productsAPI = productsAPI;
    this.dishAndPriceArray = (await this.productsAPI.getProducts()).data;
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
  createProductsAndOrdersAPIAndDisplayOrderMenu = async () => {
    this.productsAPI = productsAPI;
    this.dishAndPriceArray = (await this.productsAPI.getProducts()).data;
    this.ordersAPI = ordersAPI;
    this.ordersArray = (await this.ordersAPI.getOrders()).data;
    this.displayOrderMenu(this.dataToPlaceOrder);
  };
  displayOrderMenu(orderData) {
    const title = document.createElement("h1");
    title.innerText = "Menu";
    this.container.append(title);
    this.basket = new Basket(this, this.container);
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    this.container.append(menuContainer);
    for (let i = 0; i < this.dishAndPriceArray.length; i++) {
      new OrderMenuEntry(
        this.dishAndPriceArray,
        menuContainer,
        i,
        orderData,
        this.basket,
      );
    }
    const provideAddressAndOrderForm = new ProvideAddressAndOrderForm(
      this.container,
      this.dataToPlaceOrder,
      this,
    );
  }
}
