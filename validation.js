/* ===== Shared validation functions ===== */

function showError(input, message) {
  const field = input.closest(".field");
  let error = field.querySelector(".field-error");
  if (!error) {
    error = document.createElement("small");
    error.className = "field-error";
    error.setAttribute("role", "alert");
    field.appendChild(error);
  }
  error.textContent = message;
  input.classList.add("input-error");
  input.setAttribute("aria-invalid", "true");
}

function clearError(input) {
  const field = input.closest(".field");
  const error = field.querySelector(".field-error");
  if (error) error.textContent = "";
  input.classList.remove("input-error");
  input.removeAttribute("aria-invalid");
}

function isEmpty(value) {
  return value.trim() === "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateRequired(input, label) {
  if (isEmpty(input.value)) {
    showError(input, label + " is required.");
    return false;
  }
  clearError(input);
  return true;
}

function validateName(input) {
  const value = input.value.trim();
  if (value === "") {
    showError(input, "Full name is required.");
    return false;
  }
  if (value.length < 3) {
    showError(input, "Name must be at least 3 characters.");
    return false;
  }
  if (!/^[\p{L}\s'-]+$/u.test(value)) {
    showError(input, "Name can only contain letters and spaces.");
    return false;
  }
  clearError(input);
  return true;
}

function validateEmail(input) {
  const value = input.value.trim();
  if (value === "") {
    showError(input, "Email address is required.");
    return false;
  }
  if (!isValidEmail(value)) {
    showError(input, "Enter a valid email, e.g. name@example.com.");
    return false;
  }
  clearError(input);
  return true;
}

function validatePassword(input) {
  const value = input.value;
  if (value === "") {
    showError(input, "Password is required.");
    return false;
  }
  if (value.length < 8) {
    showError(input, "Password must be at least 8 characters.");
    return false;
  }
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    showError(input, "Password must contain at least one letter and one number.");
    return false;
  }
  clearError(input);
  return true;
}

function validateConfirmPassword(passwordInput, confirmInput) {
  if (confirmInput.value === "") {
    showError(confirmInput, "Please confirm your password.");
    return false;
  }
  if (confirmInput.value !== passwordInput.value) {
    showError(confirmInput, "Passwords do not match.");
    return false;
  }
  clearError(confirmInput);
  return true;
}

function validatePhone(input) {
  const value = input.value.trim();
  if (value === "") {
    showError(input, "Phone number is required.");
    return false;
  }
  if (!/^[0-9+\s\-]{9,15}$/.test(value)) {
    showError(input, "Enter a valid phone number (9 to 15 digits).");
    return false;
  }
  clearError(input);
  return true;
}

function validateYear(input) {
  const year = Number(input.value);
  if (input.value.trim() === "") {
    showError(input, "Year is required.");
    return false;
  }
  if (!Number.isInteger(year) || year < 1990 || year > 2027) {
    showError(input, "Enter a year between 1990 and 2027.");
    return false;
  }
  clearError(input);
  return true;
}

function validateSelect(select, label) {
  if (select.value === "") {
    showError(select, "Please choose " + label + ".");
    return false;
  }
  clearError(select);
  return true;
}

/* Remove a field's error as soon as the user starts typing again */
document.addEventListener("input", function (event) {
  if (event.target.classList.contains("input-error")) {
    clearError(event.target);
  }
});