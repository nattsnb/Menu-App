import { OrderEntry } from "./OrderEntry.js";

export class OrdersStatusList {
  constructor(container, productsServerAddress) {
    this.container = container;
    this.productsServerAddress = productsServerAddress;
    this.ordersArray = null;
    this.fetchOrdersAndDisplayOrdersStatusList();
  }
  fetchOrdersAndDisplayOrdersStatusList = async () => {
    const fetchedData = await fetch(this.productsServerAddress);
    if (fetchedData.status === 200) {
      this.ordersArray = await fetchedData.json();
      console.log(this.ordersArray)
      this.displayOrdersStatusList();
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
      new OrderEntry(this.ordersArray, listContainer, i);
    }
  }
}
