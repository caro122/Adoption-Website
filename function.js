function Time(){
    const d = document.getElementById("now");
    const now = new Date();
    document.getElementById("now").innerHTML = now;
}

Time();
setInterval(Time, 1000);


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".findpet").addEventListener("submit", function (event) {
        let errors = [];

        if (!document.querySelector('input[name="Cat"]:checked') && !document.querySelector('input[name="Dog"]:checked')) {
            errors.push("Please select either Cat or Dog.");
        }

        if (!document.getElementById("breed").value.trim() && !document.getElementById("dnm").checked) {
            errors.push("Enter a breed or select 'Doesn't matter'.");
        }

        if (document.getElementById("age").value === "less") {
            errors.push("Select a preferred age.");
        }

        if (!document.querySelector('input[name="Gender"]:checked')) {
            errors.push("Select a gender.");
        }

        if (!document.querySelector('input[name="otherdog"]:checked') &&
            !document.querySelector('input[name="othercat"]:checked') &&
            !document.querySelector('input[name="child"]:checked') &&
            !document.querySelector('input[name="none"]:checked')) {
            errors.push("Select at least one 'gets along with' option.");
        }


        if (errors.length > 0) {
            alert(errors.join("\n"));
            event.preventDefault();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("petaway");

    form.addEventListener("submit", function (event) {
        let errors = [];
        
        // Check if pet type is selected
        if (!document.querySelector('input[name="Cat"]:checked') && 
            !document.querySelector('input[name="Dog"]:checked')) {
            errors.push("Please select either 'Cat' or 'Dog'.");
        }

        // Check if breed is entered or mixed breed is selected
        const breedInput = document.getElementById("breed");
        const mixedBreed = document.getElementById("dnm");
        if (!breedInput.value.trim() && !mixedBreed.checked) {
            errors.push("Enter a breed or select 'Mixed breed'.");
        }

        // Check if age is selected
        const ageSelect = document.getElementById("age");
        if (ageSelect.value === "less") {
            errors.push("Please select an age group.");
        }

        // Check if gender is selected
        if (!document.querySelector('input[name="Gender"]:checked')) {
            errors.push("Please select a gender.");
        }

        // Check if 'Gets along with' at least one option is selected
        if (!document.querySelector('input[name="otherdog"]:checked') &&
            !document.querySelector('input[name="othercat"]:checked') &&
            !document.querySelector('input[name="child"]:checked') &&
            !document.querySelector('input[name="none"]:checked')) {
            errors.push("Select at least one option under 'Gets along with'.");
        }

        // Check if first name is entered
        const firstName = document.getElementById("fname");
        if (!firstName.value.trim()) {
            errors.push("Please enter your first name.");
        }

        // Check if last name is entered
        const lastName = document.getElementById("lname");
        if (!lastName.value.trim()) {
            errors.push("Please enter your last name.");
        }

        const further = document.getElementById("compliment");
        if(!further.value.trim()){
            errors.push("Please enter further informations.");
        }

        // Check if email is entered and in a valid format
        const email = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation pattern
        if (!email.value.trim()) {
            errors.push("Please enter your email.");
        } else if (!emailPattern.test(email.value)) {
            errors.push("Please enter a valid email address.");
        }

        // If errors exist, display them and prevent form submission
        if (errors.length > 0) {
            alert(errors.join("\n"));
            event.preventDefault(); // Prevent form submission
        }
    });
});
