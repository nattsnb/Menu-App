export class ProvideAddressAndOrderForm {
  constructor(container, orderData) {
    this.container = container;
    this.orderData = orderData;
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
      this.sendTheOrder();
    });
  }

  sendTheOrder = async () => {
    const orderDataAndAddress = this.orderData;
    orderDataAndAddress.address = `${this.streetInput.value}, ${this.townInput.value}, ${this.townPostCodeInput.value}`;
    console.log(orderDataAndAddress);
    const postResponse = await fetch("http://localhost:3000/orders/", {
      method: "POST",
      body: JSON.stringify(this.orderData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newOrderData = await postResponse.json();
    console.log(newOrderData);
    if (postResponse.status === 400) {
      this.errorMessage.innerText = "Error, provide data.";
    } else if (postResponse.status === 404) {
      this.errorMessage.innerText = "Error, server doesn't exist.";
    } else if (postResponse.status === 201) {
      console.log("Data Sent");
    }
  };
}
