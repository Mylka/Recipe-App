import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';




/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

 const state = {}; 

/**
 * Search Controller
 */


 const controlSearch = async () => {
    //1. get the query from the view
    const query = searchView.getInput();
    // console.log(query);

    if(query){
    //2. New search object and add to state
        state.search = new Search(query);

    //3. Prepare UI for the result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            //4. Search for recipes
                 await state.search.getResults();
        
             //5. Render results on UI
                 clearLoader();
                 searchView.renderResults(state.search.result);
        }catch{
            alert("Something went wrong...");
            clearLoader();
        }
    }
 }

    elements.searchButton.addEventListener('submit', e =>{
     e.preventDefault();
     controlSearch();
 });

    elements.searchResPages.addEventListener('click', e=>{
        const btn = e.target.closest('.btn-inline');
        if(btn){
            const goToPage = parseInt(btn.dataset.goto, 10);
            searchView.clearResults();
            searchView.renderResults(state.search.result, goToPage);
            
            console.log(goToPage);
           
        }
        
    });

/**
 * Recipe Controller
 */


const controlRecipe = async () => {
    //Get id frm the url
    const id = window.location.hash.replace('#','');
    console.log(id);

    if(id){
        
    //prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

<<<<<<< HEAD
    //Highlight selected search item

    if(state.search) searchView.highlightSelected(id);

=======
>>>>>>> parent of 2bdeeeb... highlight selected recipe
    //create new recipe object
        state.recipe = new Recipe(id)

        try{
            
            //get recipe data and parse ingredients
                 await state.recipe.getRecipe();
                 console.log(state.recipe.getRecipe())
                 state.recipe.parseIngredients();
        
            //Call calctime and calcserving
                state.recipe.calcTime();
                state.recipe.calcServings();
        
            // render the recipe
                clearLoader();
                recipeView.renderRecipe(state.recipe)
        }
        catch(error){
          console.log(err)
        }
    }

};

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

//Handling recipe buttons clicks

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        //Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        //Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
});



























