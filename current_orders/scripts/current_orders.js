firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = "login.html"
    }
})

let orderContainer = document.getElementById('orderContainer')
let orderTotal = document.getElementById('orderTotal')

const email = sessionStorage.getItem("email");
const ordersURL = `https://quiet-escarpment-14753.herokuapp.com/api/${email}/orders`;

(async () => {
    let pendingOrders = await retrieveOrders(ordersURL)
    displayOrders(pendingOrders)
})();

async function retrieveOrders (ordersURL) {
    try {
        let response = await fetch(ordersURL)
        let json = await response.json()
        let pendingOrders = (Object.values(json))
        return pendingOrders
    } catch(err) {
        return "No orders to display"
    }

}

const noOrdersSpan = document.getElementById('noOrdersSpan')

function displayOrders(pendingOrders) {

    if (pendingOrders.length === 0) {
        
        noOrdersSpan.classList.toggle('hidden')

    } else {

        let ordersToDisplay = pendingOrders.map(pendingOrder => {
            let total = 0
            let items = pendingOrder.items
            return `<div class="order">
                        <div class="orderTitle">
                            <span>Order#:${pendingOrder.id}</span>
                        </div>
                        <div class="itemContainer">
                        ${items.map(item => {
                            total += parseInt(item.product.price)
                            return `
                                <div class="item">
                                    <span class="productName">${item.product.name}</span>
                                    <span class="productPrice">${item.product.price}.00</span>
                                </div>`
                        }).join('')}
                        </div>
                        <div class="totalPrice">
                            <span>Total: $${total}.00</span>
                        </div>
                    </div>`
        })
        orderContainer.innerHTML = ordersToDisplay.join('')
    }
}

// sign-out
const signOutUser = () => {
    firebase.auth().signOut()
    .then(function() {
        window.location = "login.html"
      }).catch(function(error) {
          console.error(error)
      });
}

const signOutButton = document.getElementById('signOutButton')
signOutButton.addEventListener('click', signOutUser)