import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const shoppingItemsInDB = ref(db, "shopping-items");

const inputField = document.getElementById("input-field");
const addToCart = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

/* Clear input field after adding to cart */
const clearInputField = () => {
  inputField.value = "";
};

/* Delete item from the shopping list */
const deleteItem = (itemToDelete) => {
  let locationOfItemInDB = ref(db, `shopping-items/${itemToDelete}`);
  remove(locationOfItemInDB);
};

/* Add item from the shopping list */
const addNewItem = (newItem) => {
  let itemID = newItem[0];
  let itemVal = newItem[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemVal;

  newEl.addEventListener("dblclick", () => {
    deleteItem(itemID);
  });

  shoppingListEl.append(newEl);
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
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingList();

    for (let item in itemsArray) {
      let currentItem = itemsArray[item];

      /* let currentItemID = currentItem[0]; // key
      let currentItemValue = currentItem[1]; // value
      */

      addNewItem(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here... yet";
  }
});
