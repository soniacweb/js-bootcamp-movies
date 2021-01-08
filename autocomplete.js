const createAutoComplete = ({ root, renderOption }) => {
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
  const input = root.querySelector('input')
  const dropdown = root.querySelector('.dropdown')
  const resultsWrapper = root.querySelector('.results')
  
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
      options.innerHTML = renderOption(movie)

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
  
}