export class ProductsAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }
  getProducts = async () => {
    const getResponse = await fetch(`${this.serverAddress}products/`);
    const productsArray = await getResponse.json();
    return { data: productsArray, responseStatus: getResponse.status };
  };

  patchProduct = async (dataToPost, id) => {
    const patchResponse = await fetch(`${this.serverAddress}products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const editedProductData = await patchResponse.json();
    return { data: editedProductData, responseStatus: patchResponse.status };
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
    const postedProductData = await postResponse.json();
    return { data: postedProductData, responseStatus: postResponse.status };
  };

  getDeletedProduct = async (id) => {
    const getResponse = await fetch(`${this.serverAddress}products/${id}`);
    const productData = await getResponse.json();
    return { data: productData, responseStatus: getResponse.status };
  };

  handleResponse(response, errorMessageP) {
    if (response === 400) {
      errorMessageP.innerText = "Error, provide valid data.";
    } else if (response === 404) {
      errorMessageP.innerText = "Server error.";
    }
  }
}
