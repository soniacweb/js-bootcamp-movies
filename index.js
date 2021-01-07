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

const root = document.querySelector('.autocomplete')
root.innerHTML = `
<label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`

//select input
const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const onInput = async event => {
  const movies = await fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
  console.log(movies)

  dropdown.classList.add('is-active') 

  for (let movie of movies) {
    console.log(movie.Poster, movie.Title)
    const options = document.createElement('a')
    options.classList.add('dropdown-item')
    options.innerHTML = `
    <img src="${movie.Poster}" />
    ${movie.Title}
    `

    resultsWrapper.appendChild(options)
  }
}
  
//event listener for input 
input.addEventListener('input', debounce(onInput, 500))


// fetchData()



