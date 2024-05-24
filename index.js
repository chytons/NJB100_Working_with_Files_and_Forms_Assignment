function validateForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form inputs
  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const otherNames = document.querySelector("#otherNames").value.trim();
  const email = document.querySelector("#email").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const gender = document.querySelector("#gender").value.trim();

  // Validation
  const errors = [];
  if (!firstName || !lastName) {
    errors.push("First name and last name are required.");
  }
  if (firstName.length < 1 || lastName.length < 1) {
    errors.push("The name cannot be less than 1 character.");
  }
  if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
    errors.push("The name cannot contain numbers.");
  }
  if (!email.includes("@") || !email.includes(".")) {
    errors.push("Email must be valid with '@' and '.'.");
  }
  if (phone.length !== 11) {
    errors.push("Phone number must be 11 characters long.");
  }
  if (!gender) {
    errors.push("Gender is required.");
  }

  // Display errors or submit form
  if (errors.length > 0) {
    const errorList = document.createElement("ul");
    errorList.setAttribute("class", "error");
    errors.forEach((error) => {
      const listItem = document.createElement("li");
      listItem.textContent = error;
      errorList.appendChild(listItem);
    });
    document.querySelector("#registrationForm").appendChild(errorList);
  } else {
    // Submit form data to JSON file
    const formData = {
      firstName: firstName,
      lastName: lastName,
      otherNames: otherNames,
      email: email,
      phone: phone,
      gender: gender,
    };
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Form submitted successfully!");
        document.querySelector("#registrationForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred, please try again later.");
      });
  }
}
