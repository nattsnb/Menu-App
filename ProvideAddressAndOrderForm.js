export class ProvideAddressAndOrderForm {
  constructor(container) {
    this.container = container;
    this.createProvideAddressAndOrderForm();
    this.initializeProvideAddressAndOrderForm();;
  }

  createProvideAddressAndOrderForm() {
    const headline = document.createElement("h2");
    headline.innerText = "Provide address to order:";
    this.provideAddressAndOrderForm = document.createElement("form");
    this.provideAddressAndOrderForm.setAttribute("id", "provide-address-form");
    this.createAddressInputs();
    this.container.append(headline);
    this.container.append(this.provideAddressAndOrderForm);
  }

  createAddressInputs() {
    const streetInput = document.createElement("input");
    streetInput.placeholder = "Street";
    streetInput.classList.add("street-input");
    this.provideAddressAndOrderForm.append(streetInput);
    const townInput = document.createElement("input");
    townInput.placeholder = "Town";
    townInput.classList.add("town-input");
    this.provideAddressAndOrderForm.append(townInput);
    const townPostCodeInput = document.createElement("input");
    townPostCodeInput.placeholder = "Post Code";
    townPostCodeInput.classList.add("post-code-input");
    this.provideAddressAndOrderForm.append(townPostCodeInput);
  }
  initializeProvideAddressAndOrderForm() {
    this.provideAddressAndOrderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.sendTheOrder();
    });
  }
  sendTheOrder = async () => {
    this.addToOrder(dataToSend)
    console.log(dataToSend)
    const postResponse = await fetch("http://localhost:3000/products/", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newEntryData = await postResponse.json();
    if (postResponse.status === 400) {
      this.errorMessage.innerText = "Error, provide data.";
    } else if (postResponse.status === 409) {
      this.errorMessage.innerText =
          "Error, article with this title already exists.";
    } else if (postResponse.status === 404) {
      this.errorMessage.innerText = "Error, server doesn't exist.";
    } else if (postResponse.status === 201) {
      location.reload();
    }
  };
  addToOrder(data){

  }
}
