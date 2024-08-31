import { OrderEntry } from "./OrderEntry.js";
import { ordersAPI, productsAPI } from "../API/index.js";

export class OrdersStatusList {
  constructor(container) {
    this.container = container;
    this.ordersArray = [];
    this.createOrdersAndProductsAPIAndDisplayOrdersStatusList();
  }

  createOrdersAndProductsAPIAndDisplayOrdersStatusList = async () => {
    this.ordersAPI = ordersAPI;
    this.productsAPI = productsAPI;
    const fetchedOrdersData = await this.ordersAPI.getOrders();
    if (fetchedOrdersData.responseStatus === 200) {
      this.ordersArray = fetchedOrdersData.data;
      this.sortOrdersArray();
    } else {
      this.ordersAPI.handleResponse(fetchedOrdersData, this.container);
    }
    const fetchedProductsData = await this.productsAPI.getProducts();
    if (fetchedProductsData.responseStatus === 200) {
      this.localProductDatabase = fetchedProductsData.data;
      this.displayOrdersStatusList();
    } else {
      this.productsAPI.handleResponse(fetchedProductsData, this.container);
    }
  };

  displayOrdersStatusList = () => {
    const title = document.createElement("h1");
    title.innerText = "Orders";
    this.container.append(title);
    this.listContainer = document.createElement("div");
    this.listContainer.setAttribute("id", "list-container");
    this.container.append(this.listContainer);
    this.createOrderEntries();
  };

  createOrderEntries = () => {
    for (let i = 0; i < this.ordersArray.length; i++) {
      new OrderEntry(
        this.ordersArray,
        this.listContainer,
        i,
        this.localProductDatabase,
        this,
        this.productsAPI,
      );
    }
  };
  refreshTheList = async () => {
    const fetchedOrdersData = await this.ordersAPI.getOrders();
    if (fetchedOrdersData.responseStatus === 200) {
      this.ordersArray = fetchedOrdersData.data;
      this.sortOrdersArray();
    } else {
      this.container.innerText =
        this.ordersAPI.handleResponse(fetchedOrdersData);
    }
    this.listContainer.remove();
    this.listContainer = document.createElement("div");
    this.listContainer.setAttribute("id", "list-container");
    this.container.append(this.listContainer);
    this.createOrderEntries();
  };

  sortOrdersArray = () => {
    this.ordersArray.sort((leftElement, rightElement) => {
      if (leftElement.status === "Finished") {
        return 1;
      }
      if (
        leftElement.status === "Delivery" &&
        rightElement.status === "InProgress"
      ) {
        return 1;
      }
      return -1;
    });
  };
}
