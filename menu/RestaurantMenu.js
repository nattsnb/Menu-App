export class RestaurantMenu{
    constructor(container) {
        this.dishAndPrice = {
            Lasagne: 15,
            Pizza: 10,
        }
        this.container = container
        this.displayMenu()
    }
    displayMenu(){
        const menuContainer = document.createElement("div");
        menuContainer.setAttribute("id", "menu-container")
        this.container.append(menuContainer)
        console.log(Object.keys(this.dishAndPrice).length)
        for  (let i = 0; i<Object.keys(this.dishAndPrice).length; i++) {
            const row = document.createElement("div");
            row.classList.add("menu-row");
            const dishName = document.createElement("p");
            dishName.classList.add("dish-name");
            dishName.innerText = Object.keys(this.dishAndPrice)[i]
            row.append(dishName)
            menuContainer.append(row)

        }
    }
}