export function formCheckEmpty(name) {
  let label = document.querySelector(`[for="${name.id}"]`);
  let labelSpan = document.querySelector(`[for="${name.id}"] span`) || null;

  if (name.value === "" || name.value === null) {
    if (labelSpan === null)
      label.innerHTML += ` <span>To pole musi zostać wypełnione</span>`;
    label.classList.add("form__label--visible");
  } else {
    if (labelSpan !== null) labelSpan.remove();
    return name.value;
  }
}

export function formCheckPrice(name) {
  const label = document.querySelector(`[for="${name.id}"]`);
  const labelSpan = document.querySelector(`[for="${name.id}"] span`) || null;

  if (!isFinite(name.value)) {
    if (labelSpan === null)
      label.innerHTML += ` <span>To pole musi być liczbą</span>`;
  } else {
    if (labelSpan !== null) labelSpan.remove();
    return name.value;
  }
}

export function showError(param) {
  const fields = document.querySelectorAll(`.${param}`);
  fields.forEach((field, i) => {
    field.addEventListener("click", function() {
      let label = document.querySelector(`[for="${this.id}"]`);
      label.classList.add("form__label--visible");
    });
  });
}
