export class ProductsAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }
  getProducts = async () => {
    const getResponse = await fetch(`${this.serverAddress}products/`);
    const data = await getResponse.json();
    return { data: data, responseStatus: getResponse.status };
  };

  patchProduct = async (dataToPost, id) => {
    const patchResponse = await fetch(`${this.serverAddress}products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await patchResponse.json();
    return { data: data, responseStatus: patchResponse.status };
  };

  deleteProduct = async (id) => {
    const deleteResponse = await fetch(`${this.serverAddress}products/${id}`, {
      method: "DELETE",
    });
    return { data: null, responseStatus: deleteResponse.status };
  };

  postNewProduct = async (dataToPost) => {
    const postResponse = await fetch(`${this.serverAddress}products/`, {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await postResponse.json();
    return { data: data, responseStatus: postResponse.status };
  };
  handleResponse(response, errorMessageP) {
    if (response.status === 400) {
      errorMessageP.innerText = "Error, provide valid data.";
    } else if (response.status === 404) {
      errorMessageP.innerText = "Server error.";
    }
  }
}
