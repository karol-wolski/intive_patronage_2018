export function saveAllToLocalStorage(array, element) {
  localStorage.setItem(array, JSON.stringify(element));
}

export function saveToLocalStorage(array, element) {
  let existingItem = JSON.parse(localStorage.getItem(array)) || [];
  existingItem.push(element);
  localStorage.setItem(array, JSON.stringify(existingItem));
}

export function getFromLocalStorage(array) {
  return JSON.parse(localStorage.getItem(array));
}

export function removeArrayFromLocalStorage(array) {
  localStorage.removeItem(array);
}

export function removeItemFromLocalStorageArray(array, element) {
  let existingItem = JSON.parse(localStorage.getItem(array));
  existingItem.splice(existingItem.findIndex(el => el.name === element), 1);
  saveAllToLocalStorage(array, existingItem);
  if (existingItem.length === 0) {
    removeArrayFromLocalStorage(array);
  }
}