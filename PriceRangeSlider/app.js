const priceValue = document.querySelector(".slider .price-slider");
const rangeInputValue = document.querySelectorAll(".range-input input");

let priceDifference = 500;

const priceInputValue = document.querySelectorAll(".price-input input");
for (let i = 0; i < priceInputValue.length; i++) {
  priceInputValue[i].addEventListener("input", (e) => {
    let minPrice = parseInt(priceInputValue[0].value);
    let maxPrice = parseInt(priceInputValue[1].value);
    let priceDifference = maxPrice - minPrice;

    if (minPrice < 0) {
      alert("minimum price must be abobe 0");
      priceInputValue[0].value = 0;
      minPrice = 0;
    }

    if (maxPrice > 10000) {
      alert("maximum price cannot be abobe 10000");
      priceInputValue[1].value = 10000;
      maxPrice = 10000;
    }

    if (minPrice > maxPrice - priceDifference) {
      priceInputValue[0].value = maxPrice - priceDifference;
      minPrice = maxPrice - priceDifference;

      if (minPrice < 0) {
        priceInputValue[0].value = 0;
        minPrice = 0;
      }
    }

    if (diff >= priceDifference && maxPrice <= rangeInputValue[1].value) {
      if (e.target.className === "min-input") {
        rangeInputValue[0].value = minPrice;
        let valueOne = rangeInputValue[0].max;
        rangeValue.style.left = `${(minPrice / valueOne) * 100}%`;
      } else {
        rangeInputValue[1].value = maxPrice;
        let valueTwo = rangeInputValue[1].max;
        rangeValue.style.right = `${100 - (maxPrice / valueTwo) * 100}%`;
      }
    }
  });

  for (let i = 0; i < rangeInputValue.length; i++){
    rangeInputValue[i].addEventListener("input", e => {
        let minValue = parseInt(rangeInputValue[0].value);
        let maxValue = parseInt(rangeInputValue[1].value);

        let diff = maxValue - minValue

        if (diff < priceDifference){
            if(e.target.className === "min-range"){
                rangeInputValue[0].value = maxValue - priceDifference;
            } else {
                rangeInputValue[1].value = minValue - priceDifference;
            }
        } else {
            priceInputValue[0].value = minValue;
            priceInputValue[1].value = maxValue;
            priceValue.style.left = `${minValue / rangeInputValue[0].max * 100}%`
            priceValue.style.right = `${100 - (maxValue / rangeInputValue[1].max) * 100}%`
        }
    })
  }
}
