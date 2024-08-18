export class OrderEntry {
  constructor(
    ordersDataArray,
    listContainer,
    i,
    localProductDatabase,
    productServerAddress,
    theList
  ) {
    this.ordersDataAraay = ordersDataArray;
    this.listContainer = listContainer;
    this.orderEntryNumber = i;
    this.localProductDatabase = localProductDatabase;
    this.productServerAddress = productServerAddress;
    this.theList = theList;
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

  createOrderInfoDiv() {
    const titleContent = document.createElement("div");
    titleContent.innerText = "Order content:";
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("list-products-div");
    this.insertProductInfo(
      productsDiv,
      this.ordersDataAraay[this.orderEntryNumber].products,
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
  }

  insertProductInfo(container, orderProducts) {
    for (let i = 0; i < orderProducts.length; i++) {
      const productWrapper = document.createElement("div");
      productWrapper.classList.add("list-products-wrapper");
      const listParagraphName = document.createElement("p");
      listParagraphName.innerText = this.findNameOfProductInDatabase(
        orderProducts[i].id,
      );
      listParagraphName.classList.add("list-paragraph-name", "list-paragraph");
      productWrapper.append(listParagraphName);
      const listParagraphX = document.createElement("p");
      listParagraphX.innerText = "x";
      listParagraphX.classList.add("list-paragraph-x", "list-paragraph");
      productWrapper.append(listParagraphX);
      const listParagraphQuantity = document.createElement("p");
      listParagraphQuantity.innerText = orderProducts[i].quantity;
      listParagraphQuantity.classList.add(
        "list-paragraph-quantity",
        "list-paragraph",
      );
      productWrapper.append(listParagraphQuantity);
      container.append(productWrapper);
    }
  }
  findNameOfProductInDatabase = (id, container) => {
    const productIndex = this.localProductDatabase.findIndex(
      function (product) {
        return product.id === id;
      },
    );
    if (productIndex !== -1) {
      return this.localProductDatabase[productIndex].name;
    } else {
      const newEntryToDatabase = (this.askServerForDeletedProduct(id, container)).result;
      this.localProductDatabase.push(newEntryToDatabase);
    }
  };
  askServerForDeletedProduct = async (id, container) => {
    const fetchedDeletedProductData = await fetch(
      `${this.productServerAddress}${id}/`,
    );
    if (fetchedDeletedProductData.status === 200) {
      const deletedProductResponse = await fetchedDeletedProductData.json();
      return deletedProductResponse.name
    } else {
      container.innerText = "Server error.";
    }
  };
}
