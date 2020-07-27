// listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
	// hide results
	document.getElementById('results').style.display = 'none';

	// show loader
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults, 1000);
	e.preventDefault();
});

// clear input on reload
document.addEventListener('DOMContentLoaded', clearInputs);

// calculate results
function calculateResults() {
	// UI vars
	// input
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	// output
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// monthly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

		// show results
		document.getElementById('results').style.display = 'block';

		// hide loader
		document.getElementById('loading').style.display = 'none';
	} else {
		showError('Please check your numbers');
	}
}

// show error
function showError(error) {
	// hide results
	document.getElementById('results').style.display = 'none';

	// hide loader
	document.getElementById('loading').style.display = 'none';
	// create a div
	const errorDiv = document.createElement('div');

	// get parent elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// add a class
	errorDiv.className = 'alert alert-danger';

	// create text node
	errorDiv.appendChild(document.createTextNode(error));

	// insert error above heading
	card.insertBefore(errorDiv, heading);

	// clear error after 3 seconds
	setTimeout(clearError, 3000);
}

function clearError() {
	document.querySelector('.alert').remove();
}

// clear inputs
function clearInputs() {
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	amount.value = '';
	interest.value = '';
	years.value = '';
}
