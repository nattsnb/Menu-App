export class ProductsAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }
  getProductsJson = async () => {
    const getResponse = await fetch(`${this.serverAddress}products/`)
    return await getResponse.json();
  };

  patchProduct = (dataToPost, id) => {
    return fetch(`${this.serverAddress}products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  deleteProduct = (id) => {
    return fetch(`${this.serverAddress}products/${id}`, {
      method: "DELETE",
    });
  };

  postNewProduct = async (dataToPost) => {
    const postResponse = await fetch(`${this.serverAddress}products/`, {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  handleResponse(response, errorMessageP) {
    if (response.status === 400) {
      errorMessageP.innerText = "Error, provide valid data.";
    } else if (response.status === 404) {
      errorMessageP.innerText = "Server error.";
    }
  }
}
