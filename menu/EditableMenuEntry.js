export class EditableMenuEntry {
  constructor(dishAndPriceArray, menuContainer, i) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.row = null
    this.createMenuEntry();
  }
  createMenuEntry() {
    const row = document.createElement("div");
    row.classList.add("menu-row");
    this.row = row
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
  editButtonFunctionality=()=>{
    const editForm = document.createElement("form");
    editForm.classList.add("edit-form")
    const dishInput = document.createElement("input");
    dishInput.value = this.dishAndPriceArray[this.i].name
    dishInput.classList.add("dish-input-form")
    const priceInput = document.createElement("input");
    priceInput.value = this.dishAndPriceArray[this.i].priceInEUR;
    priceInput.classList.add("price-input-form")
    const currencyP = document.createElement("p")
    currencyP.innerText = "€"
    currencyP.classList.add("currency-p-form")
    const buttonWrapperForm = document.createElement("div")
    buttonWrapperForm.classList.add("button-wrapper-form")
    const saveButton = document.createElement("button")
    saveButton.innerText = "Save"
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    buttonWrapperForm.append(saveButton)
    buttonWrapperForm.append(deleteButton)
    editForm.append(dishInput)
    editForm.append(priceInput)
    editForm.append(currencyP)
    editForm.append(buttonWrapperForm)
    this.row.replaceWith(editForm)
  }
}
