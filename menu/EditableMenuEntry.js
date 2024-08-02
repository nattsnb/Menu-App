export class EditableMenuEntry {
  constructor(dishAndPriceArray, menuContainer, i) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.row = null;
    this.editForm = null;
    this.editEntryWrapper = null;
    this.dishNameEditInput = null;
    this.priceInEUREditInput = null;
    this.price = null;
    this.dishName = null;
    this.createMenuEntry();
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
    this.dishName = document.createElement("p");
    this.dishName.classList.add("dish-name");
    this.dishName.innerText = this.dishAndPriceArray[this.i].name;
    this.row.append(this.dishName);
  }

  createPriceWithCurrencyDiv() {
    const priceWithCurrency = document.createElement("div");
    priceWithCurrency.classList.add("price-with-currency");
    this.price = document.createElement("p");
    this.price.classList.add("price");
    this.price.innerText = this.dishAndPriceArray[this.i].priceInEUR;
    const currency = document.createElement("p");
    currency.classList.add("currency");
    currency.innerText = "€";
    priceWithCurrency.append(this.price);
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
    deleteButton.addEventListener("click", this.deleteButtonFunctionality);
    buttonWrapper.append(editButton);
    buttonWrapper.append(deleteButton);
    this.row.append(buttonWrapper);
  }
  editButtonFunctionality = () => {
    this.editForm = document.createElement("form");
    this.editForm.classList.add("edit-form");
    this.editEntryWrapper = document.createElement("div");
    this.editEntryWrapper.classList.add("edit-entry-wrapper");
    this.editEntryWrapper.append(this.editForm);
    this.errorMessageP = document.createElement("p");
    this.errorMessageP.classList.add("error-message-p");
    this.editForm.append(this.errorMessageP);
    this.createEditFormInputs(this.editEntryWrapper);
    this.createEditFormCurrencyP(this.editEntryWrapper);
    this.createSaveButtonEditForm(this.editEntryWrapper);
    this.createDeleteButtonEditForm();
    this.row.replaceWith(this.editEntryWrapper);
    this.initializeSavingEditedMenuEntry();
  };
  createEditFormInputs() {
    this.dishNameEditInput = document.createElement("input");
    this.dishNameEditInput.value = this.dishAndPriceArray[this.i].name;
    this.dishNameEditInput.placeholder = "Dish name";
    this.dishNameEditInput.classList.add("dish-name-edit-input");
    this.priceInEUREditInput = document.createElement("input");
    this.priceInEUREditInput.value = this.dishAndPriceArray[this.i].priceInEUR;
    this.priceInEUREditInput.classList.add("price-in-EUR-edit-input");
    this.priceInEUREditInput.placeholder = "0.0";
    this.editForm.append(this.dishNameEditInput);
    this.editForm.append(this.priceInEUREditInput);
  }
  createEditFormCurrencyP() {
    const currencyP = document.createElement("p");
    currencyP.innerText = "€";
    currencyP.classList.add("currency-p-form");
    this.editForm.append(currencyP);
  }
  createSaveButtonEditForm() {
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.classList.add("save-button");
    this.editForm.append(saveButton);
  }
  createDeleteButtonEditForm() {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    this.editEntryWrapper.append(deleteButton);
    deleteButton.addEventListener("click", this.deleteButtonFunctionality);
  }
  initializeSavingEditedMenuEntry() {
    this.editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.postEditedMenuEntry();
    });
  }
  postEditedMenuEntry = async () => {
    const dataToPost = {
      name: this.dishNameEditInput.value,
      priceInEUR: Number(this.priceInEUREditInput.value),
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
      this.dishName.innerText = dataToPost.name;
      this.price.innerText = dataToPost.priceInEUR;
      this.editEntryWrapper.replaceWith(this.row);
    }
  };
  deleteButtonFunctionality = async () => {
    const deleteResponse = await fetch(
      `http://localhost:3000/products/${this.dishAndPriceArray[this.i].id}`,
      {
        method: "DELETE",
      },
    );
    if (deleteResponse.status === 200) {
      this.row.remove();
      if (this.editEntryWrapper) {
        this.editEntryWrapper.remove();
      }
    } else {
      this.errorMessageP.innerText = "Server error.";
    }
  };
}
