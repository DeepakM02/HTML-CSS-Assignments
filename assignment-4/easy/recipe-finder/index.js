
const MIN_COUNT = 1;
const MAX_COUNT = 10;


document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("select-cusine");

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select a recipe...";
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    CUSINES.meals.forEach((cusine) => {
        const option = document.createElement('option');
        option.textContent = cusine.strArea;
        option.value = cusine.strArea;
        select.appendChild(option);
    });

    const input = document.getElementById("recipe-count");
    const errorMsg = document.getElementById("errorMsg");
    const submitBtn = document.getElementById("start-quiz");

    input.addEventListener("input", function () {
        const value = input.value.trim();
        if (!value) {
            showError("This field is required!")
        } else if (value < MIN_COUNT || value > MAX_COUNT) {
            showError(`Number must be between ${MIN_COUNT} and ${MAX_COUNT}!`)
        } else {
            clearError();
        }
    })

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.add("show");
        input.classList.add("invalid");
        submitBtn.disabled = true;
    }

    function clearError() {
        errorMsg.textContent = '';
        errorMsg.classList.remove("show");
        input.classList.remove("invalid");
        submitBtn.disabled = false;
    }
});

const state = {
    recipeCount: 1,
    selectedCusine: '',
    recipeDetails: null,
    listOfCusine: null,
    listOfRecipes: null,
}

// fetch recipe and render receipes with image and title
async function handleClickSearch () {
    
    // get it from cache or call the API
    // set it and get it from cache
    const data = await fetchRecipesByCusine();
    state.listOfRecipes = data;

    renderRecipes(data);
}

async function fetchRecipesByCusine(cusine) {
    return RECIPES.meals;
}

function transformData(data) {
    
}


function renderRecipes(recipes) {
    const recipesWrapper = document.getElementById("recipes-wrapper");

    if(!recipes || !recipes.length) {
        recipesWrapper.innerHTML = "<p class='empty-state'>No recipes found!</p>"
        return;
    }

    recipes.forEach(recipe => {
        const divElement = document.createElement("div");
        divElement.className = "recipe";
        divElement.innerHTML =
            `<div class="recipe-image-wrapper">
                <img class="recipe-poster" src=${recipe.strMealThumb} alt=${recipe.recipe}/>
            </div>
            <div class="recipe-footer">
                <h4 class="recipe-title">${recipe.strMeal}</h4>  
            </div>`
        recipesWrapper.appendChild(divElement)
    })
}