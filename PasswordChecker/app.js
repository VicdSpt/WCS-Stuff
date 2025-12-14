let myPassword = document.getElementById("password");
let powerStrength = document.getElementById("power");

myPassword.oninput = function () {
  let powerPoint = 0;
  let value = myPassword.value;

  let widthPower = ["1%", "25%", "50%", "75%", "100%"];
  let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];

  if (value.length >= 6) {
    let testPower = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
    testPower.forEach((item) => {
      if (item.test(value)) {
        powerPoint += 1;
      }
      
    });
  }

  powerStrength.style.width = widthPower[powerPoint];
  powerStrength.style.backgroundColor = colorPower[powerPoint];
};
