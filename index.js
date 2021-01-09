// console.log('Hi there!');

//network http request using third party library Axios
//step 1 define and set up a helper function to fetch the data
//will want to use async/await syntax when making the request

 
//pass in config object

const autoCompleteConfig = {
  renderOption(movie) {
    const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster
    return `
    <img src="${imgSRC}" />
    ${movie.Title} (${movie.Year})
    `
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


createAutoComplete({
  ...autoCompleteConfig, 
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left')
  }
})

createAutoComplete({
  ...autoCompleteConfig, 
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#right-summary', 'right'))
  }
})

// fetchData()
let rightMovie;
let leftMovie;
const onMovieSelect = async (movie, summary, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '8b6de0c4',
      i: movie.imdbID
    }
  })
  console.log(response.data)
  summary.innerHTML = movieTemplate(response.data)
  if (side === 'left') {
    leftMovie = response.data
  } else {
    rightMovie = response.data
  }

  if (leftMovie && rightMovie) {
    runComparison()
  }
}

//we can iterate through our two different movies
const runComparison = () => {
  const leftSideStats = document.querySelectorAll('#left-summary .notification')
  const rightSideStats = document.querySelectorAll('#right-summary .notification')

  leftSideStats.forEach((leftStat, i) => {
    const rightStat = rightSideStats[i]
    console.log(leftStat, rightStat)

    const leftValue = parseInt(lleftStat.dataset.value)
    const rightValue = parseInt(lrightStat.dataset.value)

    if (leftValue > rightValue) {
    leftStat.classList.remove('is-primary') 
    leftStat.classList.add('is-warning') 
  } else {
    rightStat.classList.remove('is-primary')
    rightStat.classList.add('is-warning')
  }

  })
}

const movieTemplate = (movieDetail) => {
  const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
  const metaScore = parseInt(movieDetail.Metascore)
  const imdbRating = parseFloat(movieDetail.imdbRating)
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))

  let count = 0
  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word)
    if (isNaN(value)) {
      return prev
    } else {
      return prev + value
    }
  }, 0)
  console.log(awards)

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
  <article data-value=${awards} class="notification is-primary">
  <p class="title">${movieDetail.Awards}<p>
  <p class="subtitle">Awards<p>
  </article>

  <article data-value=${dollars} class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}<p>
  <p class="subtitle">Box Office<p>
  </article>

  <article data-value=${metaScore} class="notification is-primary">
  <p class="title">${movieDetail.Metascore}<p>
  <p class="subtitle">Metascore<p>
  </article>

  <article data-value=${imdbRating} class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}<p>
  <p class="subtitle">IMDB Rating<p>
  </article>

  <article data-value=${imdbVotes} class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}<p>
  <p class="subtitle">IMDB Votes<p>
  </article>
`
}