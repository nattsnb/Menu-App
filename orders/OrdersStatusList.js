import { OrderEntry } from "./OrderEntry.js";
import { OrdersAPI } from "../OrdersAPI.js";
import { ProductsAPI } from "../ProductsAPI.js";

export class OrdersStatusList {
  constructor(container, serverAddress) {
    this.container = container;
    this.serverAddress = serverAddress;
    this.ordersArray = [];
    this.createOrdersAndProductsAPIAndDisplayOrdersStatusList();
  }

  createOrdersAndProductsAPIAndDisplayOrdersStatusList = async () => {
    this.ordersAPI = new OrdersAPI(this.serverAddress);
    this.productsAPI = new ProductsAPI(this.serverAddress);
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
    const listContainer = document.createElement("div");
    listContainer.setAttribute("id", "list-container");
    this.container.append(listContainer);
    for (let i = 0; i < this.ordersArray.length; i++) {
      new OrderEntry(
        this.ordersArray,
        listContainer,
        i,
        this.localProductDatabase,
        `${this.serverAddress}products/`,
        this,
        this.productsAPI,
      );
    }
  };

  sortOrdersArray = () => {
    this.ordersArray
      .sort((a, b) => {
        if (a.status === "Finished") {
          return -1;
        }
        if (a.status === "Delivery" && b.status === "InProgress") {
          return -1;
        }
        return 1;
      })
      .reverse();
  };
}
