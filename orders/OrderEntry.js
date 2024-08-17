export class OrderEntry {
  constructor(ordersDataArray, listContainer, i) {
    this.ordersDataAraay  = ordersDataArray;
    this.listContainer = listContainer;
    this.orderEntryNumber = i;
    this.row = null;
    this.createListEntry()
  }
  createListEntry() {
    this.row = document.createElement("div");
    this.row.classList.add("list-row");
    this.createOrderIdDiv()
    this.listContainer.append(this.row)
  }
  createOrderIdDiv(){
    const title = document.createElement("div");
    title.innerText = "Order ID:"
    const orderID = document.createElement("div");
    orderID.innerText = this.ordersDataAraay[this.orderEntryNumber].id;
    this.row.append(title);
    this.row.append(orderID)
  }
}
