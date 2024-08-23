console.log("script is working");

const myKeysValues = window.location.search
console.log(myKeysValues)

const urlParams = new URLSearchParams(myKeysValues)

const paramId = URLSearchParams.get("id")

console.log(paramId)
