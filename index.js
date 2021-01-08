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
  // console.log(movies)
  if (!movies.length) {
    dropdown.classList.remove('is-active') 
    return
  }

  resultsWrapper.innerHTML = ''
  dropdown.classList.add('is-active') 

  for (let movie of movies) {
    console.log(movie.Poster, movie.Title)
    const options = document.createElement('a')
    const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster

    options.classList.add('dropdown-item')
    options.innerHTML = `
    <img src="${imgSRC}" />
    ${movie.Title}
    `
    options.addEventListener('click', () => {
      dropdown.classList.remove('is-active') 
      input.value = movie.Title
      onMovieSelect(movie)
    })


    resultsWrapper.appendChild(options)
  }
}
  
//event listener for input 
input.addEventListener('input', debounce(onInput, 500))
document.addEventListener('click', e => {
  // console.log(e.target)
  if (!root.contains(e.target))
  dropdown.classList.remove('is-active') 
})

// fetchData()

const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '8b6de0c4',
      i: movie.imdbID
    }
  })
  console.log(response.data)
  document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) => {
return `
  <article class="media">
   <figure class="media-left">
     <p class="image">
      <img src="${movieDetail.Poster}" />
     </p>
   </figure>
    <div class="media-content">
     <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Released}</p>
        <p>${movieDetail.Runtime}</p>

        <p>${movieDetail.Plot}</p>
        <p>${movieDetail.Director}</p>

     </div>
   </div>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}<p>
  <p class="subtitle">Awards<p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}<p>
  <p class="subtitle">Box Office<p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}<p>
  <p class="subtitle">Metascore<p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}<p>
  <p class="subtitle">IMDB Rating<p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}<p>
  <p class="subtitle">IMDB Votes<p>
  </article>
`
}