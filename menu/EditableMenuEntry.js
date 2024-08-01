export class EditableMenuEntry {
  constructor(dishAndPriceArray, menuContainer, i) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.row = null;
    this.createMenuEntry();
    this.editForm = null;
    this.dishNameInput = null;
    this.priceInput = null;
  }
  createMenuEntry() {
    this.row = document.createElement("div");
    this.row.classList.add("menu-row");
    this.createDishNameP();
    this.createPriceWithCurrencyDiv();
    this.createButtonsInWrapper();
    this.menuContainer.append(this.row);
  }

  createDishNameP() {
    const dishName = document.createElement("p");
    dishName.classList.add("dish-name");
    dishName.innerText = this.dishAndPriceArray[this.i].name;
    this.row.append(dishName);
  }

  createPriceWithCurrencyDiv() {
    const priceWithCurrency = document.createElement("div");
    priceWithCurrency.classList.add("price-with-currency");
    const price = document.createElement("p");
    price.classList.add("price");
    price.innerText = this.dishAndPriceArray[this.i].priceInEUR;
    const currency = document.createElement("p");
    currency.classList.add("currency");
    currency.innerText = "€";
    priceWithCurrency.append(price);
    priceWithCurrency.append(currency);
    this.row.append(priceWithCurrency);
  }
  createButtonsInWrapper() {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", this.editButtonFunctionality);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    buttonWrapper.append(editButton);
    buttonWrapper.append(deleteButton);
    this.row.append(buttonWrapper);
  }
  editButtonFunctionality = () => {
    this.editForm = document.createElement("form");
    this.editForm.classList.add("edit-form");
    const entryWrapper = document.createElement("div");
    entryWrapper.classList.add("entry-wrapper");
    this.errorMessageP = document.createElement("p");
    this.errorMessageP.classList.add("error-message-p");
    this.editForm.append(entryWrapper);
    this.editForm.append(this.errorMessageP);
    this.createEditFormInputs(entryWrapper);
    this.createEditFormCurrencyP(entryWrapper);
    this.createEditFormButtonsInWrapper(entryWrapper);
    this.row.replaceWith(this.editForm);
    this.initializeSavingEditedMenuEntry();
  };
  createEditFormInputs() {
    this.dishNameInput = document.createElement("input");
    this.dishNameInput.value = this.dishAndPriceArray[this.i].name;
    this.dishNameInput.placeholder = "Dish name";
    this.dishNameInput.classList.add("dish-input-form");
    this.priceInput = document.createElement("input");
    this.priceInput.value = this.dishAndPriceArray[this.i].priceInEUR;
    this.priceInput.classList.add("price-input-form");
    this.priceInput.placeholder = "0.0";
    this.editForm.append(this.dishNameInput);
    this.editForm.append(this.priceInput);
  }
  createEditFormCurrencyP() {
    const currencyP = document.createElement("p");
    currencyP.innerText = "€";
    currencyP.classList.add("currency-p-form");
    this.editForm.append(currencyP);
  }
  createEditFormButtonsInWrapper() {
    const buttonWrapperForm = document.createElement("div");
    buttonWrapperForm.classList.add("button-wrapper-form");
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    buttonWrapperForm.append(saveButton);
    buttonWrapperForm.append(deleteButton);
    this.editForm.append(buttonWrapperForm);
  }
  initializeSavingEditedMenuEntry() {
    this.editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.postEditedMenuEntry();
    });
  }
  postEditedMenuEntry = async () => {
    const dataToPost = {
      name: this.dishNameInput.value,
      priceInEUR: Number(this.priceInput.value),
    };
    const editResponse = await fetch(
      `http://localhost:3000/products/${this.dishAndPriceArray[this.i].id}`,
      {
        method: "PATCH",
        body: JSON.stringify(dataToPost),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (editResponse.status === 400) {
      this.errorMessageP.innerText = "Error, provide valid data.";
    } else if (editResponse.status === 404) {
      this.errorMessageP.innerText = "Server error.";
    } else if (editResponse.status === 200) {
      this.editForm.replaceWith(this.row);
    }
  };
}
