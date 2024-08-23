export class ProvideAddressAndOrderForm {
  constructor(container, orderData, menu) {
    this.container = container;
    this.orderData = orderData;
    this.menu = menu;
    this.createProvideAddressAndOrderForm();
    this.initializeProvideAddressAndOrderForm();
  }

  createProvideAddressAndOrderForm() {
    const headline = document.createElement("h2");
    headline.innerText = "Provide address to order:";
    this.provideAddressAndOrderForm = document.createElement("form");
    this.provideAddressAndOrderForm.setAttribute("id", "provide-address-form");
    this.createAddressInputs();
    this.container.append(headline);
    this.container.append(this.provideAddressAndOrderForm);
    this.errorMessage = document.createElement("div");
    this.provideAddressAndOrderForm.append(this.errorMessage);
    const sendButton = document.createElement("button");
    sendButton.innerText = "Place the Order";
    sendButton.classList.add("new-order-send-button");
    this.provideAddressAndOrderForm.append(sendButton);
  }

  createAddressInputs() {
    this.streetInput = document.createElement("input");
    this.streetInput.placeholder = "Street";
    this.streetInput.classList.add("street-input");
    this.provideAddressAndOrderForm.append(this.streetInput);
    this.townInput = document.createElement("input");
    this.townInput.placeholder = "Town";
    this.townInput.classList.add("town-input");
    this.provideAddressAndOrderForm.append(this.townInput);
    this.townPostCodeInput = document.createElement("input");
    this.townPostCodeInput.placeholder = "Post Code";
    this.townPostCodeInput.classList.add("post-code-input");
    this.provideAddressAndOrderForm.append(this.townPostCodeInput);
  }

  initializeProvideAddressAndOrderForm() {
    this.provideAddressAndOrderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (
        (this.streetInput.value &&
          this.townInput.value &&
          this.townPostCodeInput.value) !== ""
      ) {
        this.sendTheOrder();
      } else {
        this.errorMessage.innerText = "Provide address, please";
      }
    });
  }

  sendTheOrder = async () => {
    if (this.menu.basket.sum !== 0) {
      const orderDataAndAddress = this.orderData;
      orderDataAndAddress.address = `${this.streetInput.value}, ${this.townInput.value}, ${this.townPostCodeInput.value}`;
      const postResponse =
        await this.menu.ordersAPI.postNewOrder(orderDataAndAddress);
      if (postResponse.responseStatus === 201) {
        this.orderNumber = postResponse.data.id;
        this.errorMessage.innerText = `Order placed. Order number ${this.orderNumber}`;
        this.displayOrderConfirmation();
      } else {
        this.menu.ordersAPI.handleResponse(
          postResponse.responseStatus,
          this.errorMessage,
        );
      }
    } else {
      this.errorMessage.innerText = "Please, provide order.";
    }
  };

  displayOrderConfirmation() {
    const message = `Your order is placed. Order number ${this.orderNumber}. Click ok to track your order.`;
    if (confirm(message) === true) {
      window.location.href = `http://localhost:3000/status?id=${this.orderNumber}/`;
    } else {
    }
  }
}
