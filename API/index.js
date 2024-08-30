import {OrdersAPI} from "./OrdersAPI.js";
import {ProductsAPI} from "./ProductsAPI.js";

const serverAddress = "http://localhost:3000/";
const orderAPI = new OrdersAPI(serverAddress)
const productsAPI = new ProductsAPI(serverAddress)
export {orderAPI, productsAPI}
