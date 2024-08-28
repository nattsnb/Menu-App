export class API {
    constructor() {

    }
    handleResponse(response) {
        if (response === 400) {
            return "Error, provide data.";
        } else if (response === 404) {
            return "Error, server doesn't exist.";
        } else if (response === 500) {
            return "Error, internal server issue";
        }
    }
}