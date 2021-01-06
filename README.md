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

<img src="./assets/Screenshot 2021-01-06 at 13.22.39.png" />