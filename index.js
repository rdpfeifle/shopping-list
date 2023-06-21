import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingItemsInDB = ref(database, "shopping-items");

const inputField = document.getElementById("input-field");
const addToCart = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

const clearInputField = () => {
  inputField.value = "";

  /* 
// create new li
    const newLi = document.createElement("li");

// assign the content to whatever is in the inputVal
    newLi.innerHTML = inputVal;

// append the new <li> to the shoppingList
    shoppingListEl.appendChild(newLi); 
*/
};

const addNewItem = (item) => {
  shoppingListEl.innerHTML += `<li>${item}</li>`;
};

addToCart.addEventListener("click", () => {
  let inputVal = inputField.value;

  // reference, inputVal
  push(shoppingItemsInDB, inputVal);

  clearInputField();

  addNewItem(inputVal);
});
