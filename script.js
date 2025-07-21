document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelector("select[required]");
  const otherDiv = document.querySelector(".flex.other");
  if (select && otherDiv) {
    select.addEventListener("change", function () {
      if (select.value === "Other(Please Specify...)") {
        otherDiv.style.display = "flex";
      } else {
        otherDiv.style.display = "none";
      }
    });
    otherDiv.style.display =
      select.value === "Other(Please Specify...)" ? "flex" : "none";
  }
  const form = document.querySelector("form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    let hasError = false;
    let firstInvalid = null;
    //Checking whether or not Full Name has errors
    if (
      handleFullNameError((el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    //Checking whether or not Address has errors
    if (
      handleAddressError((el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    //Checking whether or not Phone has errors
    if (
      handlePhoneError((el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    //Checking whether or not Hear About Us has errors
    if (
      hearAboutUsHandle((el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;

    if (
      emailHandle((el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    if (hasError) {
      e.preventDefault();
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  function handleFullNameError(onFirstInvalid) {
    const fullNameSection = form.querySelector(".full-name-section");
    const fullNameInputs = fullNameSection.querySelectorAll(
      ".name-row input[required]"
    );
    let empty = false;
    fullNameInputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("input-error");
        if (onFirstInvalid) onFirstInvalid(input);
        empty = true;
      } else {
        input.classList.remove("input-error");
      }
    });
    const errorPlaceholder = fullNameSection.querySelector(
      ".full-name-error-placeholder"
    );
    errorPlaceholder.innerHTML = "";
    if (empty) {
      const msg = document.createElement("div");
      msg.className = "input-error-message small-error";
      msg.textContent = "This field is required.";
      errorPlaceholder.appendChild(msg);
      fullNameSection.classList.add("section-error-bg");
      return true;
    } else {
      fullNameSection.classList.remove("section-error-bg");
      return false;
    }
  }

  function handleAddressError(onFirstInvalid) {
    const addressSection = form.querySelector(".address-section");
    const addressInputs = addressSection.querySelectorAll(".address-required");
    let empty = false;
    addressInputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("input-error");
        if (onFirstInvalid) onFirstInvalid(input);
        empty = true;
      } else {
        input.classList.remove("input-error");
      }
    });
    const errorPlaceholder = addressSection.querySelector(
      ".address-error-placeholder"
    );
    errorPlaceholder.innerHTML = "";
    if (empty) {
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

  function handlePhoneError(onFirstInvalid) {
    const phoneSection = document.querySelector(".phone-section");
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

  function hearAboutUsHandle(onFirstInvalid) {
    const hearAboutSection = document.querySelector(".hear-about-section");
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
  function emailHandle(onFirstInvalid) {
    const emailSection = document.querySelector(".email-section");
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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
});
