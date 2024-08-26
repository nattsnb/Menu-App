import "../style.css";
import { RestaurantMenu } from "../RestaurantMenu.js";

const serverAddress = "http://localhost:3000/";
const bodyContainer = document.getElementById("body-container");
const restaurantMenu = new RestaurantMenu(bodyContainer, serverAddress);
restaurantMenu.createProductsAPIAndDisplayEditableMenu();
