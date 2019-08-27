firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
      window.location = "login.html"
  }
})

const vendorContainer = document.querySelector("#vendorContainer");
const productsArray = JSON.parse(sessionStorage.getItem("order")) || [];
let vendorGroups = []

const vendors = async () => {
  const api = await fetch(
    `https://quiet-escarpment-14753.herokuapp.com/api/vendors`
  );
  return api.json();
};

const products = async () => {
  const prodApi = await fetch('https://quiet-escarpment-14753.herokuapp.com/api/products')
  return prodApi.json()
}

const createVendor = vendorObj => {
  return `
    <div class="vendor container p-0" data-id="${vendorObj.id}">
      <div class="vendorInfo">
        <img class="vendorImg" src="${vendorObj.imageUrl}">
        <div class="vendorText">
          <span class="vendorName">${vendorObj.name}</span>
        </div>
      </div>
      <!-- expand data will be inserted here -->
    </div>`;
};

const buildProductsDiv = (products, vendorId) => {
  let vendorProducts = ["<div class='productsContainer hidden'>"]
  products.forEach(product => {
    if (product.vendorId == vendorId) {
      let div = `<div class='productDiv'>
                  <img class='productImg' src='${product.imageUrl}'>
                  <div class='productTextDiv'>
                    <span class='productName'>${product.name}</span>
                    <span class='productPrice'>$${product.price}</span>
                  </div>
                  <button class='addProductButton' data-product='${product.id}'>
                    <i class="far fa-plus-square" data-rotated="0"></i>
                  </button>
                </div>`
    
      vendorProducts.push(div)
    }
  })

  vendorProducts.push("</div>")
  return vendorProducts.join('')
}


(async () => {
  const vendorArray = await vendors();
  vendorArray.forEach(vendorObj => {
    vendorContainer.insertAdjacentHTML("beforeend", createVendor(vendorObj));
  });

  vendorGroups = document.querySelectorAll('.vendor') // this will be used in search function
  const productArray = await products();

  let vendorDivs = document.querySelectorAll('.vendor')
  vendorDivs.forEach(div => {
    
    // build products div (hidden) and add event listeners to expand div on click
    let vendorId = div.dataset.id
    let productsDiv = buildProductsDiv(productArray, vendorId)

    div.insertAdjacentHTML('beforeend', productsDiv)

    let topDiv = div.firstElementChild

    topDiv.addEventListener('click', () => {

      if (div.classList.contains('expanded')) {
        contractVendor(div)
      } else {
        expandVendor(div)
      }
    })

    div.lastElementChild.querySelectorAll('.addProductButton')
    .forEach(button => {
      button.addEventListener('click', function() {
        addProductToOrder(this)
        animateAddButton(this)
        animateCart()
      })
    })
  })

})();


// ADD ITEM -----------------------------
function addProductToOrder(button) {
  let productId = button.dataset.product

  productsArray.push(productId);
  sessionStorage.setItem("order", JSON.stringify(productsArray));
}

// transitions --------------------------
function animateAddButton(button) {
  let icon = button.firstElementChild
  icon.dataset.rotated = parseInt(icon.dataset.rotated) + 90
  icon.style.transform = `rotate(${icon.dataset.rotated}deg)`
  icon.style.color = "#b7e778"
  setTimeout(() => {
    icon.style.color = "#17223b"
  }, 500)
}

function animateCart() {
  let cartNum = document.getElementById('cartNum')
  if (cartNum.classList.contains('hidden')) {
    cartNum.classList.toggle('hidden')
  }
  cartNum.classList.toggle('scaled')
  setTimeout(() => {
    cartNum.innerHTML = JSON.parse(sessionStorage.getItem("order")).length
    cartNum.classList.toggle('scaled')
  }, 300)
}

function expandVendor(div) {
  let numChildren = div.lastElementChild.childElementCount
  let divHeight = 125 + numChildren * 100
  div.style.height = divHeight
  div.classList.toggle('expanded')
  setTimeout(() => {
    div.lastElementChild.classList.toggle('hidden')
  },500)
  div.firstElementChild.firstElementChild.style.borderRadius = "8px 0 0 0"
}

function contractVendor(div) {
  div.lastElementChild.classList.toggle('hidden')
  div.style.height = '125px'
  div.classList.toggle('expanded')
  div.firstElementChild.firstElementChild.style.borderRadius = "8px 0 0 8px"
}


// SEARCH ----------------------------------------

const searchInput = document.getElementById("searchInput")
const autofillResults = document.getElementById('autofillResults')
const searchButton = document.getElementById('searchButton')
const mainTitle = document.getElementById('mainTitle')
const mainIcon = document.getElementById('mainIcon')


const vendorNames = [];

(async () => {
    const vendorList = await vendors()
    vendorList.forEach(vendor => {
        vendorNames.push(vendor.name)
    })
})()


function findMatches(wordToMatch, vendorNames) {
    return vendorNames.filter(vendor => {
        const regex = new RegExp(wordToMatch, 'gi');
        return vendor.match(regex)
    })
}

function displayMatches() {
    const matchArray = findMatches(this.value, vendorNames)
    vendorGroups.forEach(group => {
      let nameSpan = group.querySelector('.vendorName')
      if (matchArray.includes(nameSpan.innerHTML)) {
        group.style.display = "flex"
      } else {
        group.style.display = "none"
      }
    })
}

searchInput.addEventListener('input', displayMatches)

searchInput.addEventListener('transitionend', () => {
  mainTitle.classList.toggle('hidden')
  mainIcon.classList.toggle('hidden')
})

searchButton.addEventListener('click', () => {

  if (searchInput.classList.contains('start')) {
    searchInput.style.width = '70vw'
    searchInput.classList.toggle('start')

  } else if (searchInput.value !== "") {
      let searchTerm = searchInput.value
      
  } else {
    searchInput.style.width = '0vw'
    searchInput.classList.toggle('start')
  }
})
