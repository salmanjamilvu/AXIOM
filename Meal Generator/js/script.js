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
    //Remove Previous selected meal info
    selectedMeal.innerHTML = '';
}

// Function to get details of selected meal
function getMeal(mealid) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        //Render in the UI
        displayMealDetails(meal);
    })
}

//Function to Render meal details in Ui
function displayMealDetails(meal) {
    //Clear Search Result
    meals.innerHTML = ''
    resultsHeandling.innerHTML = ''
    const ingredients = [];
    //Loop over ingredient attribute
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} :  ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    //Render data into Ui
    selectedMeal.innerHTML = `
        <div class='selected-meal-details'>
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="selected-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="selected-meal-inctructions">
                <p>${meal.strInctructions}</p>
                <h3>Ingredient</h3>
                <ul>
                    ${ingredients.map(ingredient => `
                        <li> ${ingredient} </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `
}

//Event Listeners
//1. Listen for form submit
submit.addEventListener('submit', searchMeal)

//2. Listen on click meals
meals.addEventListener('click', (e)=>{
    //find and return only if clicked on a meal-info div
    const mealInfo = e.path.find(item =>{ 
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    })
    //Check if mealInfo exist
    if (mealInfo) {
        // Get the data-mealid attribute
        const mealId = mealInfo.getAttribute('data-mealID');
        //Fetch details of meals
        getMeal(mealId)   
    }
})