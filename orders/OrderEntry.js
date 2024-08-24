import { populateOrderDetails } from "./populateOrderDetails.js";

export class OrderEntry {
  constructor(
    ordersDataArray,
    listContainer,
    i,
    localProductDatabase,
    productServerAddress,
    list,
    productsApi,
  ) {
    this.ordersDataAraay = ordersDataArray;
    this.listContainer = listContainer;
    this.orderEntryNumber = i;
    this.localProductDatabase = localProductDatabase;
    this.list = list;
    this.productsApi = productsApi;
    this.row = null;
    this.createListEntry();
  }
  createListEntry = () => {
    this.row = document.createElement("div");
    this.row.classList.add("list-row");
    this.createOrderIdDiv();
    this.createStatusDiv();
    this.createErrorMessageParagraph();
    this.createOrderInfoDiv();
    this.listContainer.append(this.row);
  };
  createOrderIdDiv = () => {
    const title = document.createElement("div");
    title.innerText = "Order ID:";
    const orderID = document.createElement("div");
    orderID.classList.add("list-order-id");
    orderID.innerText = this.ordersDataAraay[this.orderEntryNumber].id;
    this.row.append(title);
    this.row.append(orderID);
  };
  createStatusDiv = () => {
    const title = document.createElement("div");
    title.innerText = "Status:";
    const dropdownDiv = document.createElement("div");
    this.createDropdownWithClickChangeListeners(dropdownDiv);
    this.row.append(title);
    this.row.append(dropdownDiv);
  };
  createDropdownWithClickChangeListeners = (container) => {
    const fragment = document.createDocumentFragment();
    const select = document.createElement("select");
    select.classList.add("list-select");
    this.optionProgress = new Option("InProgress", "InProgress", false);
    select.options.add(this.optionProgress);
    this.optionDelivery = new Option("Delivery", "Delivery", false);
    select.options.add(this.optionDelivery);
    this.optionFinished = new Option("Finished", "Finished", false);
    select.options.add(this.optionFinished);
    this.setSelectedAttributeInOrderToOrderStatus();
    select.addEventListener("change", () => {
      this.errorMessageParagraph.innerText = "";
      switch (select.value) {
        case "InProgress":
          this.changeToProgress();
          break;
        case "Delivery":
          this.changeToDelivery();
          break;
        case "Finished":
          this.changeToFinished();
          break;
      }
    });
    fragment.appendChild(select);
    container.appendChild(fragment);
  };
  setSelectedAttributeInOrderToOrderStatus = () => {
    if (this.ordersDataAraay[this.orderEntryNumber].status === "Finished") {
      this.optionFinished.setAttribute("selected", true);
    } else if (
      this.ordersDataAraay[this.orderEntryNumber].status === "Delivery"
    ) {
      this.optionDelivery.setAttribute("selected", true);
    } else if (
      this.ordersDataAraay[this.orderEntryNumber].status === "InProgress"
    ) {
      this.optionProgress.setAttribute("selected", true);
    }
  };
  changeToProgress = async () => {
    const data = {
      address: this.ordersDataAraay[this.orderEntryNumber].address,
      id: this.ordersDataAraay[this.orderEntryNumber].id,
      products: this.ordersDataAraay[this.orderEntryNumber].products,
      status: "InProgress",
    };
    const progressResponse = await this.list.ordersAPI.patchOrder(
      data,
      data.id,
    );
    if (progressResponse.status === 200) {
      location.reload();
    }
    this.list.ordersAPI.handleResponse(
      progressResponse,
      this.errorMessageParagraph,
    );
  };
  changeToDelivery = async () => {
    const data = {
      address: this.ordersDataAraay[this.orderEntryNumber].address,
      id: this.ordersDataAraay[this.orderEntryNumber].id,
      products: this.ordersDataAraay[this.orderEntryNumber].products,
      status: "Delivery",
    };
    const deliveryResponse = await this.list.ordersAPI.patchOrder(
      data,
      data.id,
    );
    if (deliveryResponse.status === 200) {
      location.reload();
    }
    this.list.ordersAPI.handleResponse(
      deliveryResponse,
      this.errorMessageParagraph,
    );
  };
  changeToFinished = async () => {
    const data = {
      address: this.ordersDataAraay[this.orderEntryNumber].address,
      id: this.ordersDataAraay[this.orderEntryNumber].id,
      products: this.ordersDataAraay[this.orderEntryNumber].products,
      status: "Finished",
    };
    const finishedResponse = await this.list.ordersAPI.patchOrder(
      data,
      data.id,
    );
    if (finishedResponse.status === 200) {
      location.reload();
    }
    this.list.ordersAPI.handleResponse(
      finishedResponse,
      this.errorMessageParagraph,
    );
  };
  createErrorMessageParagraph = () => {
    this.errorMessageParagraph = document.createElement("div");
    this.row.append(this.errorMessageParagraph);
  };

  createOrderInfoDiv = () => {
    const titleContent = document.createElement("div");
    titleContent.innerText = "Order content:";
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("list-products-div");
    populateOrderDetails(
      productsDiv,
      this.ordersDataAraay[this.orderEntryNumber].products,
      this.localProductDatabase,
      this.productsApi,
      this.errorMessageParagraph,
    );
    const titleAddress = document.createElement("div");
    titleAddress.innerText = "Delivery address:";
    const addressDiv = document.createElement("div");
    addressDiv.classList.add("list-address-div");
    addressDiv.innerText = this.ordersDataAraay[this.orderEntryNumber].address;
    this.row.append(titleContent);
    this.row.append(productsDiv);
    this.row.append(titleAddress);
    this.row.append(addressDiv);
  };
}
