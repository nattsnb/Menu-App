import { UserStatusWindow } from "./UserStatusWindow.js";

let url = new URL(window.location);
let urlParams = new URLSearchParams(url.search);
const paramId = urlParams.get("id");
const serverAddress = "http://localhost:3000/";
const bodyContainer = document.getElementById("body-container");
const userStatusWindow = new UserStatusWindow(
  paramId,
  bodyContainer,
  serverAddress,
);
