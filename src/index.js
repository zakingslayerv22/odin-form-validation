import "./index.css";

class ValidateForm {
  constructor() {
    this.form = document.querySelector("form");
    this.emptyFieldMessage = "This field cannot be empty.";
    this.emailInput = document.querySelector("#email");
    this.countrySelectField = document.querySelector("#country");
    this.zipcodeInputField = document.querySelector("#zipcode");

    // For each country, defines the pattern that the postal code has to follow
    this.constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };

    this.currentConstraint = new RegExp(
      this.constraints[this.countrySelectField.value][0],
    );

    this.password = document.querySelector("#password-1");
    this.confirmPassword = document.querySelector("#confirm-password");

    if (this.form) this.initialize();
  }

  initialize() {
    this.validateEmail();
    this.validateCountry();
    this.validateZipCode();
    this.initializePasswordValidation();
    this.validateOnSubmit();
  }

  checkForEmptyInput(...inputFields) {
    let allNotEmpty = true;

    inputFields.forEach((inputField) => {
      const isNotEmpty = inputField.value.length !== 0;
      if (!isNotEmpty) {
        inputField.setCustomValidity(this.emptyFieldMessage);
        allNotEmpty = false;
      } else {
        inputField.setCustomValidity("");
      }

      inputField.reportValidity();
    });

    return allNotEmpty;
  }

  checkForEmailPattern() {
    const emailRegExp = /^[a-zA-Z0-9]{4}@thecompany\.com$/;

    const isValid = emailRegExp.test(this.emailInput.value);

    return isValid;
  }

  validateEmail() {
    this.emailInput.addEventListener("focusout", () => {
      if (!this.checkForEmptyInput(this.emailInput)) {
        this.emailInput.setCustomValidity("Email field cannot be empty.");
      } else if (!this.checkForEmailPattern()) {
        this.emailInput.setCustomValidity(
          "Email must have 4 letters/numbers before @thecompany.com",
        );
      } else {
        this.emailInput.setCustomValidity("");
      }

      this.emailInput.reportValidity();
    });
  }

  validateCountryAndZipCondition() {
    const matchesPattern = this.currentConstraint.test(
      this.zipcodeInputField.value,
    );

    if (matchesPattern) {
      this.zipcodeInputField.setCustomValidity("");
    } else {
      this.zipcodeInputField.setCustomValidity(
        `${this.constraints[this.countrySelectField.value][1]}`,
      );
    }

    return matchesPattern;
  }

  validateCountry() {
    this.countrySelectField.addEventListener("change", (event) => {
      this.currentConstraint = new RegExp(
        this.constraints[event.target.value][0],
      );
      this.validateCountryAndZipCondition();
    });
  }

  validateZipCode() {
    this.zipcodeInputField.addEventListener("focusout", () => {
      if (!this.validateCountryAndZipCondition()) {
        this.zipcodeInputField.reportValidity();
      }
    });
  }

  validatePasswordField() {
    const constraint = [
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
      "Password must be between 8-14 characters. It must contain one lowercase, one uppercase, one number, and one special character.",
    ];

    const passwordRegExp = new RegExp(constraint[0]);
    const matchesPattern = passwordRegExp.test(this.password.value);

    if (this.password.value.length === 0) {
      this.password.setCustomValidity("Password field cannot be empty");
    } else if (!matchesPattern) {
      this.password.setCustomValidity(constraint[1]);
    } else {
      this.password.setCustomValidity("");
    }

    this.password.reportValidity();

    return matchesPattern;
  }

  validateConfirmPasswordField() {
    const matchesPasswordInput =
      this.password.value === this.confirmPassword.value;

    if (this.password.value.length && !this.confirmPassword.value.length) {
      this.confirmPassword.setCustomValidity(
        "Confirm Password field cannot be empty.",
      );
    } else if (!matchesPasswordInput) {
      this.confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
      this.confirmPassword.setCustomValidity("");
    }

    this.confirmPassword.reportValidity();

    return matchesPasswordInput;
  }

  initializePasswordValidation() {
    this.password.addEventListener("focusout", () => {
      this.validatePasswordField();
      this.validateConfirmPasswordField();
    });

    this.confirmPassword.addEventListener("focusout", () => {
      this.validateConfirmPasswordField();
    });
  }

  validateOnSubmit() {
    const submitButton = document.querySelector("#submit-button");
    const submitSuccessMessage = document.querySelector(".success-message");
    submitSuccessMessage.textContent = "";

    submitButton.addEventListener("click", (event) => {
      if (
        !this.checkForEmptyInput(
          this.emailInput,
          this.zipcodeInputField,
          this.password,
          this.confirmPassword,
        )
      ) {
        event.preventDefault();
      } else if (
        !this.checkForEmailPattern ||
        !this.validateCountryAndZipCondition() ||
        !this.validatePasswordField() ||
        !this.validateConfirmPasswordField()
      ) {
        event.preventDefault();
      } else {
        submitSuccessMessage.classList.add("success");
        submitSuccessMessage.textContent =
          "Hmmm...looks good. Now, we submitted this!";
      }
    });
  }
}

new ValidateForm();
