const calculateButton = document.getElementById("btnCalcul");
const birthdayDate = document.getElementById("birthday");
const getAgeResult = document.getElementById("result");

function calculateAge() {
  const birthdayValue = birthdayDate.value;
  if (birthdayValue === "") {
    alert("Please Enter your Birthday");
  } else {
    const age = getAge(birthdayValue);
    getAgeResult.innerText = `You are ${age} ${
      age > 1 ? "years" : "years"
    } old 🔥`;
  }
}

function getAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);
  let age = currentDate.getFullYear() - birthdayDate.getFullYear();
  let month = currentDate.getMonth() - birthdayDate.getMonth();

  if(
    month < 0 || (month === 0 && currentDate.getDate() < birthdayDate.getDate())
  ) {
    age--;
  }
  return age
}

calculateButton.addEventListener("click", calculateAge)
