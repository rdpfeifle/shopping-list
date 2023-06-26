import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingItemsInDB = ref(database, "shopping-items");

const inputField = document.getElementById("input-field");
const addToCart = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

const clearInputField = () => {
  inputField.value = "";
};

const addNewItem = (item) => {
  shoppingListEl.innerHTML += `<li>${item}</li>`;
};

const clearShoppingList = () => {
  shoppingListEl.innerHTML = "";
};

addToCart.addEventListener("click", () => {
  let inputVal = inputField.value;

  // reference, inputVal
  push(shoppingItemsInDB, inputVal);

  clearInputField();
});

onValue(shoppingItemsInDB, (snapshot) => {
  let itemsArray = Object.values(snapshot.val());

  clearShoppingList();

  for (let item in itemsArray) {
    addNewItem(itemsArray[item]);
  }
});
