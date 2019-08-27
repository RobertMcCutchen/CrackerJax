//modal switching
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

const displayRegisterButton = document.getElementById("displayRegisterButton");
const displayLoginButton = document.getElementById("displayLoginButton");

displayRegisterButton.addEventListener("click", updateModalVis);
displayLoginButton.addEventListener("click", updateModalVis);

function updateModalVis() {
  loginModal.classList.toggle("hidden");
  registerModal.classList.toggle("hidden");
}

// password criteria checker --------------------------------
const regNameInput = document.getElementById("regNameInput");
const regEmailInput = document.getElementById("regEmailInput");
const regPasswordInput = document.getElementById("regPasswordInput");
const regPasswordConfirmInput = document.getElementById(
  "regPasswordConfirmInput"
);
const regErrorSpan = document.getElementById("regErrorMessage");
const registerButton = document.getElementById("registerButton");

regPasswordConfirmInput.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    registerButton.click();
  }
});

regPasswordInput.addEventListener("input", () => {
  if (regPasswordInput.value.length < 7) {
    regPasswordDetailsSpan.style.color = "#c83660";
    registerButton.setAttribute("disabled", true);
  } else {
    regPasswordDetailsSpan.style.color = "#27ae60";
    regPasswordConfirmInput.addEventListener("input", () => {
      if (
        regPasswordConfirmInput.value === regPasswordInput.value &&
        regPasswordInput.value.length >= 7
      ) {
        regPasswordErrorSpan.innerHTML = "Passwords match!";
        regPasswordErrorSpan.style.color = "#2ecc71";

        registerButton.removeAttribute("disabled");
      } else if (
        regPasswordConfirmInput.value !== regPasswordInput.value &&
        regPasswordConfirmInput.value !== ""
      ) {
        regPasswordErrorSpan.innerHTML = "Passwords are different!";
        regPasswordErrorSpan.style.color = "#c83660";

        registerButton.setAttribute("disabled", true);
      }
    });

    regPasswordInput.addEventListener("input", () => {
      if (
        regPasswordConfirmInput.value === regPasswordInput.value &&
        regPasswordInput.value.length >= 7
      ) {
        regPasswordErrorSpan.innerHTML = "Passwords match!";
        regPasswordErrorSpan.style.color = "#2ecc71";

        registerButton.removeAttribute("disabled");
      } else if (
        regPasswordConfirmInput.value !== regPasswordInput.value &&
        regPasswordConfirmInput.value !== ""
      ) {
        regPasswordErrorSpan.innerHTML = "Passwords are different!";
        regPasswordErrorSpan.style.color = "#c83660";

        registerButton.setAttribute("disabled", true);
      }
    });
  }
});

// register -----------------------------
const regFBErrorSpan = document.getElementById("regFirebaseErrorSpan");
registerButton.addEventListener("click", registerUser);


function registerUser() {
  const name = regNameInput.value;
  const email = regEmailInput.value;
  const password = regPasswordInput.value;

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch(error => {
    regFBErrorSpan.innerHTML = error.message
  })
  .then(() => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      regFBErrorSpan.innerHTML = error.message
    })
    .then(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          loginEmailField.value = "";
          loginPasswordField.value = "";

          sessionStorage.setItem("email", email);

          user.updateProfile({
            displayName: name
          })
          .then(() => {
            addUserToDatabase(email)
          })
        }
      })
    })
  })
}

function addUserToDatabase(email) {
    fetch('https://quiet-escarpment-14753.herokuapp.com/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": email
        }),
    })
    .then(() => {
        window.location = "index.html"
    })
    .catch(error => {
      console.error(error); // this needs to be verified
    });
}

// login
const loginEmailField = document.getElementById("loginEmailInput");
const loginPasswordField = document.getElementById("loginPasswordInput");
const loginErrorSpan = document.getElementById("errorMessage");
const loginFBErrorSpan = document.getElementById("loginFirebaseErrorSpan");
const loginButton = document.getElementById("loginButton");

loginPasswordField.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    loginButton.click();
  }
});

function loginUser() {
  let email = loginEmailField.value;
  let password = loginPasswordField.value;

  if (email === "") {
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      loginFBErrorSpan.innerHTML = error.message;
    })
    .then(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          loginEmailField.value = "";
          loginPasswordField.value = "";
          sessionStorage.setItem("email", email);
          window.location = "index.html";
        }
      });
    });
}

loginButton.addEventListener("click", event => loginUser(event));
