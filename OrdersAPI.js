import { API } from "./API.js";

export class OrdersAPI extends API {
  constructor(serverAddress) {
    super();
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
}
