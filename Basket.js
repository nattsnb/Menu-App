export class Basket {
  constructor(menu, container) {
    this.menu = menu;
    this.container = container;
    this.sum = 0;
    this.displayBasket();
  }
  getSum() {
    const order = this.menu.dataToPlaceOrder.products;
    this.sum = 0;
    for (const element of order) {
      const dishTimesPrice =
        Number(element.priceInEUR) * Number(element.quantity);
      this.sum = this.sum + dishTimesPrice;
    }
    return this.sum;
  }
  displayBasket() {
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("id", "basket-wrapper");
    this.container.append(this.wrapper);
    this.wrapper.innerText = `Basket: ${this.sum}  €`;
  }
  refreshBasket() {
    const sum = this.getSum();
    this.wrapper.innerText = `Basket: ${this.sum}  €`;
  }
}
