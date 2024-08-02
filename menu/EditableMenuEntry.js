export class EditableMenuEntry {
  constructor(dishAndPriceArray, menuContainer, i) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.row = null;
    this.editForm = null;
    this.entryWrapper = null;
    this.dishNameInput = null;
    this.priceInput = null;
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
    this.entryWrapper = document.createElement("div");
    this.entryWrapper.classList.add("entry-wrapper");
    this.entryWrapper.append(this.editForm);
    this.errorMessageP = document.createElement("p");
    this.errorMessageP.classList.add("error-message-p");
    this.editForm.append(this.errorMessageP);
    this.createEditFormInputs(this.entryWrapper);
    this.createEditFormCurrencyP(this.entryWrapper);
    this.createSaveButtonEditForm(this.entryWrapper);
    this.createDeleteButtonEditForm();
    this.row.replaceWith(this.entryWrapper);
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
  createSaveButtonEditForm() {
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    this.editForm.append(saveButton);
  }
  createDeleteButtonEditForm() {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    this.entryWrapper.append(deleteButton);
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
      this.dishName.innerText = dataToPost.name;
      this.price.innerText = dataToPost.priceInEUR;
      this.entryWrapper.replaceWith(this.row);
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
      if (this.entryWrapper) {
        this.entryWrapper.remove();
      }
    } else {
      this.errorMessageP.innerText = "Server error.";
    }
  };
}
