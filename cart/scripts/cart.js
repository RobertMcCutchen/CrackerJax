firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location = "login.html";
  }
});

// PAGE INIT -------------------------------------

const itemsContainer = document.querySelector("#itemsContainer");
const cartContainer = document.getElementById("cartContainer");
const checkoutButton = document.getElementById('checkoutButton');
const successDiv = document.getElementById('successDiv')
// const checkoutBar = document.getElementById('checkoutBar')
const noItemsSpan = document.getElementById('noItemsSpan')
const totalSpan = document.getElementById('totalSpan')
let allProducts
let productsArray


const products = async () => {
  const prodApi = await fetch(
    "https://quiet-escarpment-14753.herokuapp.com/api/products"
  );
  return prodApi.json();
};


const init = async () => {
  allProducts = await products()
  productsArray = currentProducts(allProducts);

  if (productsArray.length === 0) {
    noItemsSpan.classList.toggle('hidden')
  } else {
    buildProductsDiv(productsArray);
    checkoutButton.classList.toggle('hidden')
  }
};
init();



// convert session storage to array
const finalArray = () => {
  if (sessionStorage.getItem("order")) {
    try {
      return Array.from(
        JSON.parse(sessionStorage.getItem("order")),
        stringInt => parseInt(stringInt)
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    return [];
  }
};

// build product objects from session storage product ids
const currentProducts = products => {
  return finalArray().map(productId =>
    products.find(product => product.id === productId)
  );
};

// build divs and add buttons
const buildProductsDiv = products => {
  let totalPrice = 0
  let totalNum = 0
  itemsContainer.innerHTML = "";
  products.forEach(product => {
    let div = `<div class='productDiv'>
                  <div class='productTextDiv text-center ml-3'>
                    <span class='productName'>${product.name}</span>
                    <span class='productPrice'>$${product.price}</span>
                  </div>
                  <button class='removeProductButton' data-product='${product.id}'>
                  <i class="far fa-minus-square" data-rotated="0"></i>
                  </button>
                </div>`;

    itemsContainer.insertAdjacentHTML("beforeend", div);

    totalNum ++
    totalPrice += parseInt(product.price)
  });

  totalSpan.innerHTML = `${totalNum} items, $${totalPrice}.00`

  itemsContainer.querySelectorAll('.removeProductButton')
  .forEach(button => {
    button.addEventListener('click', function() {
      removeProductFromOrder(this)
    })
  })
};

const removeProductFromOrder = button => {
  let id = button.dataset.product
  let cart = JSON.parse(sessionStorage.getItem('order'))
  let index = cart.indexOf(id.toString())
  cart.splice(index,1)
  sessionStorage.setItem("order", JSON.stringify(cart));

  animateRemoveButton(button)

  setTimeout(() => {
    buildProductsDiv(currentProducts(allProducts))
    if (JSON.parse(sessionStorage.getItem('order')).length === 0) {
      noItemsSpan.classList.toggle('hidden')
    }
  }, 500)
}

function animateRemoveButton(button) {
  let icon = button.firstElementChild
  icon.classList.toggle('scaled')
}



// PAYMENT ------------------------------------------------------

const sendOrder = async () => {
  const email = sessionStorage.getItem("email");
  const productIds = finalArray();
  try {
    const response = await fetch(
      "https://quiet-escarpment-14753.herokuapp.com/orderByEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "productIds": productIds
        })
      }
    );
    return response.json();
  } catch (error) {
    console.log(error.json());
    return false;
  }
};


function buildSupportedPaymentMethodData() {
  // Example supported payment methods:
  return [
    {
      supportedMethods: "basic-card",
      data: {
        supportedNetworks: ["visa", "mastercard"],
        supportedTypes: ["debit", "credit"]
      }
    }
  ];
}


const buildShoppingCartDetails = async () => {
  const productsArray = currentProducts(allProducts);
  const total = productsArray
    .map(product => product.price)
    .reduce((total, num) => total + num);
  return {
    id: "Current Order",
    displayItems: productsArray.map(product => {
      return {
        label: `${product.name}`,
        amount: { currency: "USD", value: `${product.price}.00` }
      };
    }),
    total: {
      label: "Total",
      amount: { currency: "USD", value: total }
    }
  };
};


const checkout = async () => {
  const request = new PaymentRequest(
    buildSupportedPaymentMethodData(),
    await buildShoppingCartDetails()
  );
  request.canMakePayment().then(result => {
    if (result) {
      request.show().then(paymentResponse => {
        console.log(paymentResponse.details);
        // Here we would process the payment. For this demo, simulate immediate success:
        paymentResponse.complete("success").then(() => {
          const orderSuccess = sendOrder();
          if (orderSuccess) {
            successPage()
          }
        });
      });
    }
  });
}

checkoutButton.addEventListener("click", checkout);
checkoutButton.addEventListener("touchstart", checkout);


const successPage = () => {
  sessionStorage.removeItem('order')
  buildProductsDiv(currentProducts(allProducts))
  cartContainer.classList.toggle("hidden");
  checkoutButton.classList.toggle('hidden')
  successDiv.classList.toggle("hidden");
  setTimeout(() => {
    successDiv.firstElementChild.style.transform = "rotate(360deg)"
  },75)
}