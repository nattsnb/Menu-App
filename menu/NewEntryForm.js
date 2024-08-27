import { EditableMenuEntry } from "./EditableMenuEntry.js";

export class NewEntryForm {
  constructor(container, menu) {
    this.container = container;
    this.menu = menu;
    this.createNewEntryForm();
    this.initializeNewArticleForm();
  }
  createNewEntryForm = () => {
    const headline = document.createElement("h2");
    headline.innerText = "New Menu entry:";
    this.newEntryForm = document.createElement("form");
    this.newEntryForm.setAttribute("id", "new-entry-form");
    this.createNewEntryInputs();
    const currency = document.createElement("p");
    currency.innerText = "€";
    const sendButton = document.createElement("button");
    sendButton.innerText = "Send";
    sendButton.classList.add("new-entry-send-button");
    this.errorMessage = document.createElement("p");
    this.newEntryForm.append(this.dishNameInput);
    this.newEntryForm.append(this.priceInEURInput);
    this.newEntryForm.append(currency);
    this.newEntryForm.append(sendButton);
    this.newEntryForm.append(this.errorMessage);
    this.container.append(headline);
    this.container.append(this.newEntryForm);
  };
  createNewEntryInputs = () => {
    this.dishNameInput = document.createElement("input");
    this.dishNameInput.placeholder = "Dish name";
    this.dishNameInput.classList.add("new-dish-name-input");
    this.priceInEURInput = document.createElement("input");
    this.priceInEURInput.placeholder = "0.0";
    this.priceInEURInput.classList.add("new-price-input");
  };
  initializeNewArticleForm = () => {
    this.newEntryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.postNewEntry();
    });
  };
  postNewEntry = async () => {
    const dataToPost = {
      name: this.dishNameInput.value,
      priceInEUR: Number(this.priceInEURInput.value),
    };
    const postResponse = (
      await this.menu.productsAPI.postNewProduct(dataToPost)
    ).responseStatus;
    if (postResponse === 201) {
      location.reload();
    } else {
      this.errorMessage.innerText =
        this.menu.productsAPI.handleResponse(postResponse);
    }
  };
}
