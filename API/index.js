import { OrdersAPI } from "./OrdersAPI.js";
import { ProductsAPI } from "./ProductsAPI.js";

const serverAddress = "http://localhost:3000/";
const ordersAPI = new OrdersAPI(serverAddress);
const productsAPI = new ProductsAPI(serverAddress);
export { ordersAPI, productsAPI };
