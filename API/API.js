export class API {
  constructor() {}
  handleResponse(response) {
    if (response === 400) {
      return "Error, provide data.";
    }
    if (response === 404) {
      return "Error, server doesn't exist.";
    }
    if (response === 500) {
      return "Error, internal server issue";
    }
  }
}
