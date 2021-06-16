const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch Exchange Rate & Update the DOM

function calculate() {
	//Get the Currency for currency 1 and 2
	const currencyOneCode = currencyOne.value;
	const currencyTwoCode = currencyTwo.value; 
	
	fetch(`https://v6.exchangerate-api.com/v6/dd7dd42f0a229ab08e68d782/pair/${currencyOneCode}/${currencyTwoCode}`)
	.then(res => res.json())
	.then(data => {
		const conversionRate = data.conversion_rate;
		rate.innerText = `1 ${currencyOne.value} = ${conversionRate.toFixed(2)} ${currencyTwo.value}`;
		const amount2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyTwoCode }).format((amountOne.value * conversionRate).toFixed(2));
		amountTwo.value = amount2;
	});

}

//EventListener
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
	const temp = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = temp;
	calculate();
})

calculate();