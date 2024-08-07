export class OrderMenuEntry {
  constructor(dishAndPriceArray, menuContainer, i, orderData) {
    this.dishAndPriceArray = dishAndPriceArray;
    this.menuContainer = menuContainer;
    this.i = i;
    this.row = null;
    this.price = null;
    this.dishName = null;
    this.numberOfPlates = 0;
    this.orderData = orderData;
    this.createMenuEntry();
  }
  createMenuEntry() {
    this.row = document.createElement("div");
    this.row.classList.add("menu-row");
    this.createDishNameParagraph();
    this.createPriceWithCurrencyDiv();
    this.createNumberOfPlatesDiv();
    this.menuContainer.append(this.row);
  }

  createDishNameParagraph() {
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

  createNumberOfPlatesDiv = () => {
    const numberOfPlatesDiv = document.createElement("div");
    numberOfPlatesDiv.classList.add("number-of-plates-div");
    this.row.append(numberOfPlatesDiv);
    const plusIcon = this.returnIcon("fa-plus-circle", numberOfPlatesDiv);
    plusIcon.addEventListener("click", this.plusIconFunctionality);
    numberOfPlatesDiv.append(plusIcon);
    this.numberDiv = document.createElement("div");
    this.numberDiv.classList.add("number-div");
    this.numberDiv.innerHTML = this.numberOfPlates;
    numberOfPlatesDiv.append(this.numberDiv);
    const minusIcon = this.returnIcon("fa-minus-circle", numberOfPlatesDiv);
    minusIcon.addEventListener("click", this.minusIconFunctionality);
    numberOfPlatesDiv.append(minusIcon);
  };

  returnIcon(iconName, container) {
    const icon = document.createElement("span");
    icon.classList.add("fas");
    icon.classList.add(iconName);
    return icon;
  }

  plusIconFunctionality = () => {
    this.numberOfPlates = this.numberOfPlates + 1;
    this.numberDiv.innerHTML = this.numberOfPlates;
    let productOrder = {
      "quantity": this.numberOfPlates,
      "id": this.dishAndPriceArray[this.i].id
    }
    console.log(productOrder)
    if(this.numberOfPlates > 0){
      this.orderData.products.push(productOrder)
      console.log(this.orderData)
    }
  };

  minusIconFunctionality = () => {
    const beforeOrder = {
      "quantity": this.numberOfPlates,
      "id": this.dishAndPriceArray[this.i].id
    }
    console.log(beforeOrder)
    if (this.numberOfPlates > 0) {
      this.numberOfPlates = this.numberOfPlates - 1;
      this.numberDiv.innerHTML = this.numberOfPlates;
    }
    let productOrder = {
      "quantity": this.numberOfPlates,
      "id": this.dishAndPriceArray[this.i].id
    }
    console.log(productOrder)
    console.log(this.orderData.products)
    if(this.orderData.products.includes(beforeOrder)){
      console.log("is there")
    }
    this.orderData.products.push(productOrder)
    console.log(this.orderData)
  };
}
