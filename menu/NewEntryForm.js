import { EditableMenuEntry } from "./EditableMenuEntry.js";

export class NewEntryForm {
  constructor(container) {
    this.container = container;
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
    const dataToSend = {
      name: this.dishNameInput.value,
      priceInEUR: Number(this.priceInEURInput.value),
    };
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
}
