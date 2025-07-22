export function handleFullNameError(form, onFirstInvalid) {
  const fullNameSection = form.querySelector(".full-name-section");
  const fullNameInputs = fullNameSection.querySelectorAll(
    ".name-row input[required]"
  );
  let hasError = false;
  let firstEmpty = null;
  fullNameInputs.forEach((input) => {
    if (!input.value.trim()) {
      hasError = true;
      input.classList.add("input-error");
      if (!firstEmpty) firstEmpty = input;
    } else {
      input.classList.remove("input-error");
    }
  });
  if (onFirstInvalid && firstEmpty) onFirstInvalid(firstEmpty);
  const errorPlaceholder = fullNameSection.querySelector(
    ".full-name-error-placeholder"
  );
  errorPlaceholder.innerHTML = "";
  if (hasError) {
    const msg = document.createElement("div");
    msg.className = "input-error-message small-error";
    msg.textContent = "This field is required.";
    errorPlaceholder.appendChild(msg);
    fullNameSection.classList.add("section-error-bg");
    return hasError;
  } else {
    fullNameSection.classList.remove("section-error-bg");
    return hasError;
  }
}

export function handleAddressError(form, onFirstInvalid) {
  const addressSection = form.querySelector(".address-section");
  const addressInputs = addressSection.querySelectorAll(".address-required");
  let hasError = false;
  let firstEmpty = null;
  addressInputs.forEach((input) => {
    if (!input.value.trim()) {
      hasError = true;
      input.classList.add("input-error");
      if (!firstEmpty) firstEmpty = input;
    } else {
      input.classList.remove("input-error");
    }
  });
  if (onFirstInvalid && firstEmpty) onFirstInvalid(firstEmpty);
  const errorPlaceholder = addressSection.querySelector(
    ".address-error-placeholder"
  );
  errorPlaceholder.innerHTML = "";
  if (hasError) {
    const msg = document.createElement("div");
    msg.className = "input-error-message small-error";
    msg.textContent = "This field is required.";
    errorPlaceholder.appendChild(msg);
    addressSection.classList.add("section-error-bg");
    return true;
  } else {
    addressSection.classList.remove("section-error-bg");
    return false;
  }
}

export function handlePhoneError(form, onFirstInvalid) {
  const phoneSection = form.querySelector(".phone-section");
  const phoneInput = phoneSection.querySelector(".phone-input");
  const phoneErrorPlaceholder = phoneSection.querySelector(
    ".phone-error-placeholder"
  );
  phoneErrorPlaceholder.innerHTML = "";

  const value = phoneInput.value.trim();
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (!value) {
    phoneInput.classList.add("input-error");
    phoneSection.classList.add("section-error-bg");
    const msg = document.createElement("div");
    msg.className = "input-error-message small-error";
    msg.textContent = "This field is required.";
    phoneErrorPlaceholder.appendChild(msg);
    if (onFirstInvalid) onFirstInvalid(phoneInput);
    return true;
  } else if (!phonePattern.test(value)) {
    phoneInput.classList.add("input-error");
    phoneSection.classList.add("section-error-bg");
    const msg = document.createElement("div");
    msg.className = "input-error-message small-error";
    msg.textContent = "Invalid phone number format. Use (123) 456-7890.";
    phoneErrorPlaceholder.appendChild(msg);
    if (onFirstInvalid) onFirstInvalid(phoneInput);
    return true;
  } else {
    phoneInput.classList.remove("input-error");
    phoneSection.classList.remove("section-error-bg");
    return false;
  }
}

export function hearAboutUsHandle(form, onFirstInvalid) {
  const hearAboutSection = form.querySelector(".hear-about-section");
  const select = hearAboutSection.querySelector("select");
  const hearAboutErrorPlaceholder = hearAboutSection.querySelector(
    ".hear-about-error-placeholder"
  );
  hearAboutErrorPlaceholder.innerHTML = "";

  let error = false;
  select.classList.remove("input-error");
  hearAboutSection.classList.remove("section-error-bg");
  hearAboutErrorPlaceholder.innerHTML = "";
  // Validation of selection input
  if (!select.value) {
    select.classList.add("input-error");
    hearAboutSection.classList.add("section-error-bg");
    const msg = document.createElement("div");
    msg.className = "input-error-message small-error";
    msg.textContent = "This field is required.";
    hearAboutErrorPlaceholder.appendChild(msg);
    if (onFirstInvalid) onFirstInvalid(select);
    error = true;
  }
  // Validation of Other input, if chosen
  const otherDiv = document.querySelector(".flex.other");
  const otherInput = otherDiv
    ? otherDiv.querySelector('input[type="text"]')
    : null;
  if (select.value === "Other(Please Specify...)" && otherInput) {
    otherDiv.classList.remove("section-error-bg");
    otherInput.classList.remove("input-error");
    const otherErrorPlaceholder = otherDiv.querySelector(
      ".other-error-placeholder"
    );
    otherErrorPlaceholder.innerHTML = "";
    if (!otherInput.value.trim()) {
      otherDiv.classList.add("section-error-bg");
      otherInput.classList.add("input-error");
      const msg = document.createElement("div");
      msg.className = "input-error-message small-error";
      msg.textContent = "This field is required.";
      otherErrorPlaceholder.appendChild(msg);
      if (onFirstInvalid) onFirstInvalid(otherInput);
      error = true;
    }
  } else if (otherInput) {
    otherDiv.classList.remove("section-error-bg");
    otherInput.classList.remove("input-error");
    const otherErrorPlaceholder = otherDiv.querySelector(
      ".other-error-placeholder"
    );
    if (otherErrorPlaceholder) otherErrorPlaceholder.innerHTML = "";
  }
  return error;
}

export function emailHandle(form, onFirstInvalid) {
  const emailSection = form.querySelector(".email-section");
  const emailInput = emailSection.querySelector('input[type="email"]');
  const emailErrorPlaceholder = emailSection.querySelector(
    ".email-error-placeholder"
  );

  emailErrorPlaceholder.innerHTML = "";
  emailInput.classList.remove("input-error");
  emailSection.classList.remove("section-error-bg");

  const value = emailInput.value.trim();

  if (!value) {
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(value)) {
    emailInput.classList.add("input-error");
    emailSection.classList.add("section-error-bg");

    const msg = document.createElement("div");
    msg.className = "input-error-message small-error";
    msg.textContent = "Please enter a valid email address";
    emailErrorPlaceholder.appendChild(msg);

    if (onFirstInvalid) onFirstInvalid(emailInput);
    return true;
  }

  return false;
}
