import { OrdersAPI } from "../OrdersAPI.js";
import { ProductsAPI } from "../ProductsAPI.js";

export class UserStatusWindow {
  constructor(id, container, serverAddress) {
    this.id = id;
    this.container = container;
    this.serverAddress = serverAddress;
    this.refreshInterval = 10000;
    this.createProductsAPI();
    this.createOrdersAPIGetOrderDataAndDisplayStatusWindow();
  }

  createOrdersAPIGetOrderDataAndDisplayStatusWindow = async () => {
    this.ordersAPI = new OrdersAPI(this.serverAddress);
    this.orderData = (await this.ordersAPI.getSpecificOrder(this.id)).data;
    this.displayStatusWindow()
  };

  createProductsAPI = async () => {
    this.productsAPI = new ProductsAPI(this.serverAddress);
  };

  displayStatusWindow(){
      const statusWindow = document.createElement("div");
      statusWindow.setAttribute("id", "customer-status-window");
      this.container.append(statusWindow)
      const statusOrderNumberDiv = document.createElement("div");
      statusWindow.append(statusOrderNumberDiv);
      statusOrderNumberDiv.setAttribute("id", "status-order-number");
      statusOrderNumberDiv.innerText = `Order number: ${this.id}"`
      this.statusProgressDiv = document.createElement("div");
      statusWindow.append(this.statusProgressDiv);
      this.statusProgressDiv.setAttribute("id", "status-progress");
      this.statusProgressDiv.innerText = `Order status: ${this.orderData.status}"`
      const statusOrderInfoDiv = document.createElement("div");
      statusWindow.append(statusOrderInfoDiv);
      statusOrderInfoDiv.setAttribute("id", "status-order-info");
      this.displayOrderInfo(statusOrderInfoDiv)
  }

  displayOrderInfo(container){
      const titleContent = document.createElement("div");
      titleContent.innerText = "Order content:";
      const productsDiv = document.createElement("div");
      productsDiv.classList.add("list-products-div");
      const titleAddress = document.createElement("div");
      titleAddress.innerText = "Delivery address:";
      const addressDiv = document.createElement("div");
      addressDiv.classList.add("list-address-div");
      addressDiv.innerText = this.orderData.address;
      container.append(titleContent);
      container.append(productsDiv);
      container.append(titleAddress);
      container.append(addressDiv);
  }

  refreshStatusOrder = async() =>{

}
}
