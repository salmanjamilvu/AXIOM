//DOM Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultsHeandling = document.getElementById('results-heandling');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

//Function to search the meal using the API
function searchMeal(e) {
    //Prevent form submission and redirect 
    e.preventDefault();
    //Get the value fro search input field
    const searchText = search.value;
    //check if search input field is empty
    if (searchText.trim()) {
        //Search data from API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data =>{
            //Update result handling
            resultsHeandling.innerHTML = `<h2>Seaqrch results for ${searchText}</h2>`;
            //check if any meal returned from api 
            if (data.meals === null) {
                resultsHeandling.innerHTML = `<h2>No results found for ${searchText}</h2>`;
            }else{
                meals.innerHTML = data.meals.map( meal => `
                    <div class='meal'>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                ` ).join('')
            }
        })   
        //Clear the search text
        search.value = '';
    } else {
        alert('Please enter search keyword')
    }
}


//Event Listeners
//1. Listen for form submit
submit.addEventListener('submit', searchMeal)