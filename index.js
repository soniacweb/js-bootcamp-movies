// console.log('Hi there!');

//network hhtp request using third party library Axios
//step 1 define and set up a helper function to fetch the data
//will want to use async/await syntax when making the request

const fetchData = async (searchTerm) => {
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

//select input
const input = document.querySelector('input')

const onInput = async event => {
  const movies = await fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
  console.log(movies)

  for (let movie of movies) {
    console.log(movie.Poster, movie.Title)
    const div = document.createElement('div')
    div.innerHTML = `
    <img src="${movie.Poster}"/>
    <h1>${movie.Title}</h1>`

    document.querySelector('#target').appendChild(div)
  }
}
  
//event listener for input 
input.addEventListener('input', debounce(onInput, 500))


// fetchData()



