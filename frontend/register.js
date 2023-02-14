// import axios from "axios";

let nameElement = document.getElementById("name");
let usernameElement = document.getElementById("username");
let passwordElement = document.getElementById("password");
let loginButtonElement = document.getElementById("signup-button");

passwordElement.addEventListener("blur", () => {
  let password = passwordElement.value;
  if (password.length < 6) {
    document.getElementById("message").style.display = "block";
  } else {
    document.getElementById("message").style.display = "none";
  }
});

let formElement = document.getElementById("login-form");
formElement.addEventListener("focusout", () => {
  // console.log("focusout");
  let name = nameElement.value;
  let username = usernameElement.value;
  let password = passwordElement.value;

  if (
    isValidname(name) &&
    isValidUsername(username) &&
    isValidPassword(password)
  ) {
    loginButtonElement.disabled = false;
    loginButtonElement.classList.remove("disabled");
  } else {
    loginButtonElement.disabled = true;
    loginButtonElement.classList.add("disabled");
  }
});

let isValidname = (name) => name.length > 0;
let isValidUsername = (username) => username.length > 0;
let isValidPassword = (password) => password.length >= 6;

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    name: formElement.elements.name.value,
    username: formElement.elements.username.value,
    password: formElement.elements.password.value,
  };
  const response = fetch("http://127.0.0.1:5001/register", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.message === "Created user") location.href = "./login.html";
      else
        alert(
          "User already exists with that username/email, kindly use a different username/email"
        );
    });
});
