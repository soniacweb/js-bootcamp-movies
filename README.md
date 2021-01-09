# js-bootcamp-movies

## Technologies

- JavaScript & es6
- Movie API
- HTML5
- Bulma
- CSS3


## Plan 

//network hhtp request using third party library Axios
//step 1 define and set up a helper function to fetch the data
//will want to use async/await syntax when making the request


First request, and second request for further details: 
<img src="./assets/Screenshot 2021-01-05 at 16.02.00.png" />

API documentation: 

<img src="./assets/Screenshot 2021-01-05 at 16.03.09.png" />

## Autofill Design
<img src="./assets/Screenshot 2021-01-05 at 16.07.05.png" />

# Searching the API on Input Change

```
//select input element:
const input = document.querySelector('input')
//event listener for input as user types:
//take the value and take that value to pass into the fetchdata and use to search the database
input.addEventListener('input', (event) => {
fetchData(event.target.value)
```
Pass the searchTerm param for the `fethData` to accept:

`const fetchData = async (searchTerm) => {...`

As per the api documentation, adding a param of `s` with the `searchTerm` param to corroborate with the user input in the eventlistener:

`s: searchTerm`


# Delaying the Search put request to the api

I was making too many search requests to the api too often, and needed to change the current behaviour and delay this.

### current behaviour:

Everytime there is a keypress, the application is currently doing a search request top the api.

<img src="./assets/Screenshot 2021-01-06 at 13.32.07.png" />

## what to aim for 

Wanted to allow the user to press keys inside the input for thir search as many times as they'd like, and only after 1 second of pause, would the application send an api search request:

<img src="./assets/Screenshot 2021-01-06 at 13.32.58.png" />


## setTimeout() function (the process is called 'debouncing an input- typically for performance reasons')

<img src="./assets/Screenshot 2021-01-07 at 14.06.12.png" />

The code excerpt below explained: the very first time this code runs, timoutId will be undefined, therefore the `if statement` won't run. 
When the user starts inputting keypresses, it will store in the `timeoutid` and the variable will be a truthy, triggering the if statement which will clear the `setTimeout`. The timer `setTimeout`, will only be triggered to fetch data once there is a pause of one second in the user's input. 

```
let timeoutId;
const onInput = event => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
   timeoutId = setTimeout(() => {
    fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
}, 1000)
  }
```

# Understanding Debounce - refactoring setTimeout to make it reusable

<img src="./assets/Screenshot 2021-01-06 at 16.26.47.png" />

Aim: creating a callback helper function into a debounce function which will return a function too.

<img src="./assets/Screenshot 2021-01-07 at 14.13.33.png" />


Making a new function called `debounce`:

```
const debounce = (func) => {

}
```

Inside the function, i'll return a function itself- the wrapper that will implement a shield and guard how often `func` is invoked:

```
return () => {
  
}
```

Final code with logic - `...args` allows for multiple arguments to be passed in. the `.apply` method attached to the func calls the function as it normally would, and takes all the `args` - an array or arguments, and pass them in seperately: 
```
const debounce = (func) => {
let timeoutId;
return (...args) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
   }
  timeoutId = setTimeout(() => {
    func.apply(null, args) 
   }, 1000)
  }
 }
 ```

 The equivalent: 

 <img src="./assets/Screenshot 2021-01-07 at 18.39.13.png">

 I wanted to limit how often `onInput` gets invoked thanks to the `debounce` function.

 ### One possible way to refactor `onInput` as an argument for `debounce`

 ```
const onInput = debounce(event => {
  fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
  })
 ```

 # But we can just invoke when calling the function instead inside the eventlistener

 ```
const onInput = event => {
  fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
  }
  
//event listener for input 
input.addEventListener('input', debounce(onInput, 500))


 ```

 # Awaiting Async Functions

 Storing the data through an async function as we're awaiting the async operation. 
 I want ot iterate over the list of movies in the `onInput` function and turn each movie into a snippet of HTML div element that summarises each movie.

 I want to grab the `Poster and Title` from the api response. 

Current staus of code using the `for of` loop: 

 ```
const onInput = async event => {
  const movies = await fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
  console.log(movies)

  for (let movie of movies) {
    console.log(movie.Poster, movie.Title)
  }
}
 ```

## Rendering Movies

Created a div and h1 tag to store the information for each looped movie. 
Appended to the document.

```
for (let movie of movies) {
    console.log(movie.Poster, movie.Title)
    const div = document.createElement('div')
    div.innerHTML = `
    <img src="${movie.Poster}"/>
    <h1>${movie.Title}</h1>`

    document.querySelector('#target').appendChild(div)
  }
}
```

# Handling Errored Responses

There is a glitch with the api and it doesn't accomadate partial search terms. 

This snippet of code was used for handling this glitch in the `fetchData` function- I wanted it to return an empty array (nothing):

```
if (response.data.Error) {
    return []
  }
```

# Working with Bulma via JavaScript and creating a reusable autocomplete widget

Creating the html via javaScript:

```
const root = document.querySelector('autocomplete')
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input class='input' />
<div class="dropdown">
<div class="dropdown-menu">
  <div class="dropdown-content results">
    <a href="" class="dropdown-item">Movie #1</a>
    <a href="" class="dropdown-item">Movie #2</a>
    <a href="" class="dropdown-item">Movie #3</a>
  </div>
 </div>
</div>
`
```

Creating the dropdown feature:

```
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')
```

Adding the `is-active` class to the `.dropdown` AFTER I've fetched the data sucessfully in the `onInput` function:

`dropdown.classList.add('.is-active') `

## Adding Bulma class and the search results to the `resultswrapper` in the dropdown:

`options.classList.add('dropdown-item')`
`resultsWrapper.appendChild(options)`

# Handling Broken Images

After fetching data and rendering it in the dropdown, I wanted to clear out the previous search results with the folliwing line after every sucessful search:

`resultsWrapper.innerHTML = ''`

I noticed some of the API responses for `Posters` were `N/A`. I included a simple check for `N/A`- if true, don't render broken image, using a ternary expression to do so:

`const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster`

# Automatically Closing the Dropdown using JavaScript adding and removing Bulma classes

Feature to close the dropdown if the user doesn't want to see the dropdown options by clicking anywhere outside of the dropdown.

Any element contained inside of `root` that would mean the user has clicked any of the elements inside the dropdown- i'd therefore want the dropdown remainging open. If any elements outside of `root` were clicked, I would want the dropdown closed and therefore would need to remove the class `is-active` provided by Bulma.

Adding a global event listener to the document:

```

document.addEventListener('click', e => {
  console.log(e.target)
  if (!root.contains(e.target))
  dropdown.classList.remove('is-active') 
})

```

# Handling Empty Responses

Any empty responses, I would want the dropdown closed.

Therefore straight after fetching the data, if empty response, return early.
```
if (!movies.length) {
    dropdown.classList.remove('is-active') 
    return
  }
```

# Handling Movie Selection


## Adding and eventListener for the following: 
### Update the text with the exact title the user clicks on - `input.value = movie.Title`
### rendering the movie the user clicks on and making it larger - removing `is-active` classList

```
options.addEventListener('click', () => {
      dropdown.classList.remove('is-active') 
      input.value = movie.Title
    })
```

## Adding in additional features. Once a user clicks on a movie they have searched for, I want to provide further information about the movie- Needto make a follow up request for the additional information.

- Defining a helper function: onMovieSelect

- create another async function for this additional request using film id.

```
const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '8b6de0c4',
      i: movie.imdbID
    }
  })
  console.log(response.data)
}

```
# Rendering an Expanded Summary

Created another helper function called `movieTemplate` which will return a multiline string of Bulma styled HTML.

# Making the Autocomplete Reusable

Reusable code will be inside autocomplete.js, and centralise all the requests in index.js.

<img src="./assets/Screenshot 2021-01-08 at 21.34.05.png" />

# Displaying Multiple Autocompletes

Aim:

<img src="./assets/Screenshot 2021-01-08 at 21.47.58.png" />


# Extracting Selection Logic

Refactor all the logic to make sure it's reusable for when a user clicks on an option.

<img src="./assets/Screenshot 2021-01-08 at 22.59.47.png" />

# Refreshed HTML Structure

For two different columns for two different autocompletes. 

I created `autoCompleteConfig` to store all the reusable logic for the autocomplete widget.


```
const autoCompleteConfig = {
  renderOption(movie) {
    const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster
    return `
    <img src="${imgSRC}" />
    ${movie.Title} (${movie.Year})
    `
  },
  onOptionSelect(movie) {
    onMovieSelect(movie)
  },
  inputValue(movie) {
    return movie.Title
  }, 
  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '8b6de0c4',
        s: searchTerm
      }
    })
    if (response.data.Error) {
      return []
    }
    return response.data.Search
  }
}

```

I then wanted to make a copy of all the properties from `createAutoCompleteConfig` in `createAutoComplete`

```
createAutoComplete({
  ...autoCompleteConfig, 
  root: document.querySelector('#left-autocomplete'),
})
```

# When to Compare?

- Storing movie data in two seperate movie veriables and comparing them.

- added a third param in `onMovieSelect` called `side`
- added the following logic to compare and update the responses

```
if (side === 'left') {
    leftMovie = response.data
  } else {
    rightMovie = response.data
  }
```

Run Help function to compare the data: 
```
if (leftMovie && rightMovie) {
    runComparison()
  }
```

Defining the helper function with comparison logic:

1. adding a data-value property
2. Extracting Statistic Values

Updating the `movieDetail` object:
