export class OrdersAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }

  getOrders = () => {
    return fetch(`${this.serverAddress}orders/`);
  };

  patchOrder = (dataToPost, id) => {
    return fetch(`http://localhost:3000/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  postNewOrder = (dataToPost) => {
    return fetch("http://localhost:3000/orders/", {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  handleResponse(response, errorMessageP) {
    if (response.status === 400) {
      errorMessageP.innerText = "Error, provide data.";
    } else if (response.status === 404) {
      errorMessageP.innerText = "Error, server doesn't exist.";
    } else if (response.status === 500) {
      errorMessageP.innerText = "Error, internal server issue";
    }
  }
}
