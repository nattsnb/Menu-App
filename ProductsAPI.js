export class ProductsAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }
  getProducts = () => {
    return fetch(`${this.serverAddress}products/`);
  };

  getDeletedProduct = (id) => {
    return fetch(`${this.serverAddress}products/${id}`);
  };

  patchProduct = (dataToPost, id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  deleteProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
  };

  postNewProduct = (dataToPost) => {
    return fetch("http://localhost:3000/products/", {
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
