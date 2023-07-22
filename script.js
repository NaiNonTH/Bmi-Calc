// Dark Theme Toggling

const html = document.querySelector("html")
function setDarkTheme(){
	html.classList.add("dark");
}
function removeDarkTheme(){
	html.classList.remove("dark");
}
function findLocalTheme(){
	const localDarkMode = localStorage.getItem("darkmode");
	if (window.matchMedia("(prefers-color-scheme: dark)").matches && localDarkMode !== "false"){
		setDarkTheme();
	}
	else {
		removeDarkTheme();
	}
}
findLocalTheme();
function darkMode(){
	if (html.classList.contains("dark")){
		removeDarkTheme();
		localStorage.setItem("darkmode", "false");
	}
	else {
		setDarkTheme();
		localStorage.setItem("darkmode", "true");
	}
}
function resetTheme(){
	localStorage.removeItem("darkmode");
	findLocalTheme();
}

// Copyright Year

const dmy = new Date();
const year = dmy.getFullYear();
const copy = document.getElementById("copyrightyear");

copy.innerText = year + " ";

// BMI Calculator Function

function bmiCalc(){
	const weightInput = document.getElementById("weightInput");
	const heightInput = document.getElementById("heightInput");
	let weight = weightInput.value;
	let height = heightInput.value;
	let weightUnit = "kg"
	let heightUnit = "cm"
	if (document.getElementById("weightUnit").value === "pound"){
		weight /= 2.2;
		weightUnit = "lb"
	}
	if (document.getElementById("heightUnit").value === "foot"){
		height *= 30.5;
		heightUnit = "ft"
	}
	function discrimination(){
		height /= 100;
		const bmi = weight / Math.pow(height, 2);
		const box = document.createElement("article");
		const boxFir = document.createElement("h2");
		const boxSec = document.createElement("p");
		let result;
		
		if (bmi < 18.5) {
			result = "You're Underweight";
			box.className = "result low";
		}
		else if (bmi >= 18.5 && bmi < 25) {
			result = "You're Normal :)";
			box.className = "result normal";
		}
		else if (bmi >= 25 && bmi < 30) {
			result = "You're Overweight";
			box.className = "result high";
		}
		else if (bmi >= 30) {
			result = "You're OBESED!!!";
			box.className = "result fat";
		}
		console.log("Calculated BMI: " + bmi)
		error.style.display = null;
		console.log("Weight Input: " + weight + weightUnit);
		console.log("Height Input: " + height + heightUnit);
		
		function createResult(){
			resultNode = document.createTextNode(result);
			bmiFullBefore = document.createTextNode("Your BMI: ");
			bmiFullAfter = document.createTextNode(bmi.toFixed(3));

			boxFir.appendChild(resultNode);
			boxSec.appendChild(bmiFullBefore);
			boxSec.appendChild(bmiFullAfter);

			boxSec.setAttribute("title", bmi);

			box.appendChild(boxFir);
			box.appendChild(boxSec);

			document.querySelector("section").appendChild(box);
			document.querySelector(".result").classList.add("slideFadeIn");

			setTimeout(() => {
				document.querySelector(".result").classList.remove("slideFadeIn");
			}, 700)
		}
		if (document.querySelector(".result")){
			document.querySelector(".result").remove();
		}
		createResult();
	}

	const error = document.getElementById("error");
	
	function errDisplay(errorMessage){
		error.style.display = "block";
		error.innerText = errorMessage;
	}

	if (weight === "" || height === "") {
		errDisplay("Please enter your valid weight and height.");
	}
	else if (weightInput.value.indexOf(",") >= 0 || heightInput.value.indexOf(",") >= 0) {
		errDisplay("Please use a dot (.) instead of a comma (,).");
	}
	else if (heightInput.value.indexOf("'") >= 0 || heightInput.value.indexOf("`") >= 0){
		errDisplay("Your height must be in decimal only.");
	}
	else if (isNaN(weight) || isNaN(height)){
		errDisplay("Please enter only numbers, not characters nor symbols.");
	}
	else if (weight <= 0 || height <= 0){
		errDisplay("Your weight and height must be more than 0.");
	}
	else {
		discrimination();
	}
}