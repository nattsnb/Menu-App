export class OrderEntry {
  constructor(ordersDataArray, listContainer, i) {
    this.ordersDataAraay = ordersDataArray;
    this.listContainer = listContainer;
    this.orderEntryNumber = i;
    this.row = null;
    this.createListEntry();
  }
  createListEntry() {
    this.row = document.createElement("div");
    this.row.classList.add("list-row");
    this.createOrderIdDiv();
    this.createStatusDiv();
    this.createErrorMessageParagraph();
    this.createOrderInfoDiv();
    this.listContainer.append(this.row);
  }
  createOrderIdDiv() {
    const title = document.createElement("div");
    title.innerText = "Order ID:";
    const orderID = document.createElement("div");
    orderID.classList.add("list-order-id");
    orderID.innerText = this.ordersDataAraay[this.orderEntryNumber].id;
    this.row.append(title);
    this.row.append(orderID);
  }
  createStatusDiv() {
    const title = document.createElement("div");
    title.innerText = "Status:";
    const dropdownDiv = document.createElement("div");
    this.createDropdownWithClickChangeListeners(dropdownDiv);
    this.row.append(title);
    this.row.append(dropdownDiv);
  }
  createDropdownWithClickChangeListeners(container) {
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
  }
  setSelectedAttributeInOrderToOrderStatus() {
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
  }
  changeToProgress = async () => {
    const data = {
      address: this.ordersDataAraay[this.orderEntryNumber].address,
      id: this.ordersDataAraay[this.orderEntryNumber].id,
      products: this.ordersDataAraay[this.orderEntryNumber].products,
      status: "InProgress",
    };
    const progressResponse = await fetch(
      `http://localhost:3000/orders/${data.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (progressResponse.status === 400) {
      this.errorMessageParagraph.innerText = "Error, provide valid data.";
    } else if (progressResponse.status === 404) {
      this.errorMessageParagraph.innerText = "Server error.";
    }
  };
  changeToDelivery = async () => {
    const data = {
      address: this.ordersDataAraay[this.orderEntryNumber].address,
      id: this.ordersDataAraay[this.orderEntryNumber].id,
      products: this.ordersDataAraay[this.orderEntryNumber].products,
      status: "Delivery",
    };
    const deliveryResponse = await fetch(
      `http://localhost:3000/orders/${data.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (deliveryResponse.status === 400) {
      this.errorMessageParagraph.innerText = "Error, provide valid data.";
    } else if (deliveryResponse.status === 404) {
      this.errorMessageParagraph.innerText = "Server error.";
    }
  };
  changeToFinished = async () => {
    const data = {
      address: this.ordersDataAraay[this.orderEntryNumber].address,
      id: this.ordersDataAraay[this.orderEntryNumber].id,
      products: this.ordersDataAraay[this.orderEntryNumber].products,
      status: "Finished",
    };
    const finishedResponse = await fetch(
      `http://localhost:3000/orders/${data.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (finishedResponse.status === 400) {
      this.errorMessageParagraph.innerText = "Error, provide valid data.";
    } else if (finishedResponse.status === 404) {
      this.errorMessageParagraph.innerText = "Server error.";
    }
  };
  createErrorMessageParagraph() {
    this.errorMessageParagraph = document.createElement("div");
    this.row.append(this.errorMessageParagraph);
  }

  createOrderInfoDiv(){
    const orderProducts = this.ordersDataAraay[this.orderEntryNumber].products
    const title = document.createElement("div");
    title.innerText = "Order content:";
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("list-products-div");
    for(let i = 0; i < orderProducts.length; i++){
      const paragraph = document.createElement("p")
      paragraph.innerText =  `${orderProducts[i].name}x${orderProducts[i].quantity}`
      productsDiv.append(paragraph)
    }
    const addressDiv = document.createElement("div");
    addressDiv.classList.add("list-address-div");
    this.row.append(title);
    this.row.append(productsDiv);
    this.row.append(addressDiv);
  }
}
