// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/chickenSaag.json',
  'assets/recipes/mapoTofu.json',
  'assets/recipes/smokedSalmon.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}
let expanded = false;

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes().catch(fetchSuccess => {
    // if they didn't successfully load, quit the function
    if (!fetchSuccess) {
      console.log('Recipe fetch unsuccessful');
      return;
    }
  });
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO
    for (let i = 0; i < recipes.length; i++) {
      const recipeURL = recipes[i];
      const recipeName = recipeURL.substring(
        recipeURL.lastIndexOf('/') + 1,
        recipeURL.lastIndexOf('.')
      );
      fetch(recipeURL)
        .then(response => response.json())
        .then(data => {
          recipeData[recipeName] = data
        })
        .then(() => {if (Object.keys(recipeData).length == recipes.length) resolve(true)})
        .catch(() => {
          console.log(`ERR: Fetching recipe for ${recipeName} unsuccessful.`);
          reject(false);
        });
    }
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
  const main = document.querySelector('body main');
  let ctr = 0;
  for (const key in recipeData) {
    if (ctr++ == 3) break;
    const element = document.createElement('recipe-card');
    element.data = recipeData[key];
    element.setAttribute('id', `${key}-recipe-card`);
    main.append(element);
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
  const expandButton = document.querySelector('#button-wrapper button');
  expandButton.addEventListener('click', () => {
    let newText;
    if (expanded) {
      newText = 'Show more';
      hideExtraRecipes();
    } else {
      newText = 'Show less';
      showExtraRecipes();
    }
    expandButton.textContent = newText;
    expanded = !expanded;
  })
  /* const main = document.querySelector('body main');
  let ctr = 0;
  for (const key in recipeData) {
    if (ctr++ < 3) continue;
    const element = document.createElement('recipe-card');
    element.data = recipeData[key];
    main.append(element);
  } */
}

const hideExtraRecipes = () => {
  const main = document.querySelector('body main');
  let ctr = 0;
  const recipeCards = document.querySelectorAll('body main recipe-card');
  for (const key in recipeData) {
    if (ctr++ < 3) continue;
    const element = document.getElementById(`${key}-recipe-card`);
    element.remove();
  }
}

const showExtraRecipes = () => {
  const main = document.querySelector('body main');
  let ctr = 0;
  for (const key in recipeData) {
    if (ctr++ < 3) continue;
    const element = document.createElement('recipe-card');
    element.data = recipeData[key];
    element.setAttribute('id', `${key}-recipe-card`);
    main.append(element);
  }
}
