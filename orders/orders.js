import "../style.css";
import { OrdersStatusList } from "./OrdersStatusList.js"

const productsServerAddress = "http://localhost:3000/products";
const bodyContainer = document.getElementById("body-container");
new OrdersStatusList()
