export class NewEntryForm {
    constructor(container) {
        this.container = container
        this.createNewEntryForm()
    }
    createNewEntryForm() {
        const headline = document.createElement("h3");
        headline.innerText = "New menu entry:";
        this.newEntryForm = document.createElement("form");
        this.newEntryForm.setAttribute("id", "new-menu-entry-form");
        this.dishNameInput = document.createElement("input");
        this.dishNameInput.placeholder = "Title";
        this.priceInEURInput = document.createElement("input");
        this.priceInEURInput.placeholder = "Content";
        const sendButton = document.createElement("button");
        sendButton.innerText = "Send";
        this.errorMessage = document.createElement("p");
        this.newEntryForm.append(headline);
        this.newEntryForm.append(this.dishNameInput);
        this.newEntryForm.append(this.priceInEURInput);
        this.newEntryForm.append(sendButton);
        this.newEntryForm.append(this.errorMessage);
        this.container.append(this.newEntryForm);
    }
}