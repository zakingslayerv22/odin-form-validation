import "./index.css";

class ValidateForm {
  constructor() {
    this.form = document.querySelector("form");

    if (this.form) this.initialize();
  }

  initialize() {
    this.validateEmail();
  }

  validateEmail() {
    const emailInput = document.querySelector("#email");

    const emailRegExp = /^[a-zA-Z0-9]{4}@thecompany\.com$/;

    emailInput.addEventListener("focusout", () => {
      const isEmpty = emailInput.value.length === 0;
      const isValid = emailRegExp.test(emailInput.value);

      if (isEmpty) {
        emailInput.setCustomValidity("Email field cannot be empty");
      } else if (!isValid) {
        emailInput.setCustomValidity(
          "Email must have 4 letters/numbers before @thecompany.com",
        );
      } else {
        emailInput.setCustomValidity("");
      }

      emailInput.reportValidity();
    });
  }
}

new ValidateForm();
