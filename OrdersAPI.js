export class OrdersAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }

  getOrders = async () => {
    const getResponse = await fetch(`${this.serverAddress}orders/`);
    const ordersArray = await getResponse.json();
    return { data: ordersArray, responseStatus: getResponse.status };
  };

  patchOrder = async (dataToPost, id) => {
    const patchResponse = await fetch(`${this.serverAddress}orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const editedOrderData = await patchResponse.json();
    return { data: editedOrderData, responseStatus: patchResponse.status };
  };

  postNewOrder = async (dataToPost) => {
    const postResponse = await fetch(`${this.serverAddress}orders/`, {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postedOrderData = await postResponse.json();
    return { data: postedOrderData, responseStatus: postResponse.status };
  };

  handleResponse(response, errorMessageP) {
    if (response === 400) {
      errorMessageP.innerText = "Error, provide data.";
    } else if (response === 404) {
      errorMessageP.innerText = "Error, server doesn't exist.";
    } else if (response === 500) {
      errorMessageP.innerText = "Error, internal server issue";
    }
  }
}
