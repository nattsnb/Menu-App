import "../style.css";
import { OrdersStatusList } from "./OrdersStatusList.js";

const serverAddress = "http://localhost:3000/";
const bodyContainer = document.getElementById("body-container");
new OrdersStatusList(bodyContainer, serverAddress);
