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
    this.listContainer.append(this.row);
  }
  createOrderIdDiv() {
    const title = document.createElement("div");
    title.innerText = "Order ID:";
    const orderID = document.createElement("div");
    orderID.classList.add("list-order-id")
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
    select.classList.add("list-select")
    const optionProgress = new Option("InProgress", "InProgress", false);
    select.options.add(optionProgress);
    const optionDelivery = new Option("Delivery", "Delivery", false);
    select.options.add(optionDelivery);
    const optionFinished = new Option("Finished", "Finished", false);
    select.options.add(optionFinished);
    if (this.ordersDataAraay[this.orderEntryNumber].status === "Finished") {
      console.log("finished");
      console.log(optionFinished);
      optionFinished.setAttribute("selected", true);
    } else if (
      this.ordersDataAraay[this.orderEntryNumber].status === "Delivery"
    ) {
      console.log("delivery");
      console.log(optionDelivery);
      optionDelivery.setAttribute("selected", true);
    } else if (
      this.ordersDataAraay[this.orderEntryNumber].status === "InProgress"
    ) {
      console.log("progress");
      console.log(optionProgress);
      optionProgress.setAttribute("selected", true);
    }
    select.addEventListener("change", () => {
      this.errorMessageParagraph.innerText = "";
      switch (select.value) {
        case "InProgress":
          console.log("In progress.");
          this.changeToProgress();
          break;
        case "Delivery":
          console.log("In delivery.");
          this.changeToDelivery();
          break;
        case "Finished":
          console.log("Finished.");
          this.changeToFinished();
          break;
      }
    });
    fragment.appendChild(select);
    container.appendChild(fragment);
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
    } else if (progressResponse.status === 200) {
      console.log("made it");
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
    } else if (deliveryResponse.status === 200) {
      console.log("made it");
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
    } else if (finishedResponse.status === 200) {
      console.log("made it");
    }
  };
  createErrorMessageParagraph() {
    this.errorMessageParagraph = document.createElement("div");
    this.row.append(this.errorMessageParagraph);
  }
}
