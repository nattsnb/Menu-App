import "../style.css";
import { OrdersStatusList } from "./OrdersStatusList.js";

const ordersServerAddress = "http://localhost:3000/orders/";
const bodyContainer = document.getElementById("body-container");
new OrdersStatusList(bodyContainer, ordersServerAddress);
