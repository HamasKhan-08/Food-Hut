// Selecting elements from the DOM
const SearchBar = document.querySelector('.SearchBar');
const SearchBtn = document.querySelector('.SearchBtn');
const dishcontainer = document.querySelector('.dish-container');
const recipeInformation = document.querySelector('.recipe-closeBtn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');

// Function to fetch recipes based on the query
const fetchRecipes = async (query) => {
    // Display loading message while fetching recipes
    dishcontainer.innerHTML = "<h2>Fetching Dishes...</h2>";
    try {
        // Fetch data from the MealDB API based on the query
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        
        // Clear the dish container
        dishcontainer.innerHTML = "";
        
        // Loop through each meal in the response and display recipe information
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Cuisine</p>
                <p>Belongs To <span>${meal.strCategory}</span> Category</p>`;

            // Create "View Recipe" button for each meal
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Add click event listener to open recipe popup when button is clicked
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });
        
            // Append the recipe div to the dish container
            dishcontainer.appendChild(recipeDiv);
        });
    } catch (error) {
        // Display error message if no dishes are found
        dishcontainer.innerHTML = "<h2>No Dishes Found, Please Try Another Dish</h2>";
    }
};

// Function to fetch ingredients for a specific meal
const fetchIngredients = (meal) => {
    let ingredients = "";
    for (let i = 1; i < 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredients += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredients;
};

// Function to open recipe popup with meal details
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="DishName">${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul class="Ingredients">${fetchIngredients(meal)}</ul>
        <div class="Instructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    // Display the recipe details popup
    recipeDetailsContent.parentElement.style.display = "block";
};

// Event listener to close recipe popup when close button is clicked
recipeInformation.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

// Event listener to trigger recipe search when search button is clicked
SearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = SearchBar.value.trim();
    if (!searchInput) {
        // Display message if search input is empty
        dishcontainer.innerHTML = `<h2>Please Enter a Dish You Would Like or a Category...</h2>`;
        return;
    }
    // Fetch recipes based on the search input
    fetchRecipes(searchInput);
});
