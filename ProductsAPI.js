export class ProductsAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }
  getProducts = () => {
    return fetch(`${this.serverAddress}products/`);
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


}
