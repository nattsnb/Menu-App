export class OrderEntry {
  constructor(ordersDataArray, listContainer, i) {
    this.ordersDataAraay = ordersDataArray;
    this.listContainer = listContainer;
    this.orderEntryNumber = i;
    this.row = null;
    this.createListEntry();
  }
  createListEntry() {
    this.row = document.createElement("div");
    this.row.classList.add("list-row");
    this.createOrderIdDiv();
    this.createStatusDiv();
    this.listContainer.append(this.row);
  }
  createOrderIdDiv() {
    const title = document.createElement("div");
    title.innerText = "Order ID:";
    const orderID = document.createElement("div");
    orderID.innerText = this.ordersDataAraay[this.orderEntryNumber].id;
    this.row.append(title);
    this.row.append(orderID);
  }
  createStatusDiv() {
    const title = document.createElement("div");
    title.innerText = "Status:";
    const dropdownDiv = document.createElement("div");
    this.createDropdownWithClickChangeListeners(dropdownDiv);
    this.row.append(title);
    this.row.append(dropdownDiv);
  }
  createDropdownWithClickChangeListeners(container) {
    const fragment = document.createDocumentFragment();
    const select = document.createElement("select");
    select.options.add(new Option("In progress", "progress", true, true));
    select.options.add(new Option("In delivery", "delivery"));
    select.options.add(new Option("Finished", "finished"));
    select.addEventListener("click", () => {
      select.addEventListener("change", () => {
        switch (select.value) {
          case "progress":
            console.log("In progress.");
            break;
          case "delivery":
            console.log("In delivery.");
            break;
          case "finished":
            console.log("Finished.");
            break;
        }
      });
    });
    fragment.appendChild(select);
    container.appendChild(fragment);
  }
}
