# js-bootcamp-movies


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

<img src="./assets/Screenshot 2021-01-06 at 13.22.39.png" />

## setTimeout() function (the process is called 'debouncing an input- typically for performance reasons')

<img src="./assets/Screenshot 2021-01-07 at 14.06.12.png" />

The code excert below explained: the very first time this code runs, timoutId will be undefined, therefore the `if statement` won't run. 
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

Aim: creating a callback helper function into a debounce function.


