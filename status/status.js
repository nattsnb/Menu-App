
console.log("script is working");
let url = new URL(window.location);

let urlParams = new URLSearchParams(url.search)

const paramId = urlParams.get("id")

console.log(paramId)
