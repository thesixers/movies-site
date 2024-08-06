let form = document.querySelector("form");
// let t = document.querySelectorAll('.t');
let button = document.querySelector(".gx-form-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let firstName = form.firstname.value;
  let lastName = form.lastname.value;
  let middleName = form.middlename.value;
  let dob = form.dob.value;
  let gender = form.gender.value;

  button.innerHTML =
    '<img src="/images/Animation - 1722866223961.gif" class="preloader" alt="">';

  try {
    let response = await fetch("/genesix/profileUpdate", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, middleName, dob, gender }),
      headers: { "Content-Type": "application/json" },
    });

    let data = await response.json();

    if (data.error) {
      setTimeout(() => {
        button.innerHTML = data.error;
      }, 2000);
      button.innerHTML = "Submit";
    } else {
      location.assign("/genesix");
    }
  } catch (err) {
    console.error("this error occured:" + err);
  }
});
