import { OrderEntry } from "./OrderEntry.js";

export class OrdersStatusList {
  constructor(container, ordersServerAddress, productsServerAddress) {
    this.container = container;
    this.ordersServerAddress = ordersServerAddress;
    this.productsServerAddress = productsServerAddress;
    this.ordersArray = null;
    this.fetchOrdersAndDisplayOrdersStatusList();
  }
  fetchOrdersAndDisplayOrdersStatusList = async () => {
    const fetchedOrdersData = await fetch(this.ordersServerAddress);
    if (fetchedOrdersData.status === 200) {
      this.ordersArray = await fetchedOrdersData.json();
      this.sortOrderArray();
      await this.fetchProductsDatabase();
    } else {
      this.container.innerText = "Server error.";
    }
  };
  displayOrdersStatusList() {
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
        this.productsServerAddress,
      );
    }
  }
  fetchProductsDatabase = async () => {
    const fetchedProductsData = await fetch(this.productsServerAddress);
    if (fetchedProductsData.status === 200) {
      this.localProductDatabase = await fetchedProductsData.json();
      this.displayOrdersStatusList();
    } else {
      this.container.innerText = "Server error.";
    }
  };

  sortOrderArray() {
    this.ordersArray.sort((a, b) => {
      if (a.status === "InProgress" && b.status === "InDelivery") {
        return -1;
      } else if (a.status === "InDelivery" && b.status === "Finished") {
        return -1;
      } else if (a.status === "InProgress" && b.status === "Finished") {
        return -1;
      } else if (a.status === "Finished" && b.status === "InDelivery") {
        return 1;
      } else if (a.status === "Finished" && b.status === "InProgress") {
        return 1;
      } else if (a.status === "InDelivery" && b.status === "InProgress") {
        return 1;
      }
    });
  }
}
