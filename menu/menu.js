import "../style.css";
import { RestaurantMenu } from "../RestaurantMenu.js";

const productsServerAddress = "http://localhost:3000/products";
const bodyContainer = document.getElementById("body-container");
const restaurantMenu = new RestaurantMenu(bodyContainer, productsServerAddress);
restaurantMenu.fetchProductsDataAndDisplayEditableMenu()
