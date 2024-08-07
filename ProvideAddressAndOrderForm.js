export class ProvideAddressAndOrderForm {
  constructor(container) {
    this.container = container;
    this.createProvideAddressAndOrderForm();
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
}
