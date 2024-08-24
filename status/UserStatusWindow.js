import { OrdersAPI } from "../OrdersAPI.js";
import { ProductsAPI } from "../ProductsAPI.js";

export class UserStatusWindow {
  constructor(id, container, serverAddress) {
    this.id = id;
    this.container = container;
    this.serverAddress = serverAddress;
    this.createProductsAPI();
    this.createOrdersAPIAndGetOrderData();
  }

  createOrdersAPIAndGetOrderData = async () => {
    this.ordersAPI = new OrdersAPI(this.serverAddress);
    this.orderData = (await this.ordersAPI.getSpecificOrder(this.id)).data;
    console.log(this.orderData);
  };

  createProductsAPI = async () => {
    this.productsAPI = new ProductsAPI(this.serverAddress);
  };
}
