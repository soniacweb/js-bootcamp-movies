const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  root.innerHTML = `
  <label><b>Search</b></label>
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
    const items = await fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
    // console.log(items)
    if (!items.length) {
      dropdown.classList.remove('is-active') 
      return
    }
  
    resultsWrapper.innerHTML = ''
    dropdown.classList.add('is-active') 
  
    for (let item of items) {
      console.log(item.Poster, item.Title)
      const options = document.createElement('a')
      const imgSRC = item.Poster === 'N/A' ? '' : item.Poster
  
      options.classList.add('dropdown-item')
      options.innerHTML = renderOption(item)

      options.addEventListener('click', () => {
        dropdown.classList.remove('is-active') 
        input.value = inputValue(item)
        onOptionSelect(item)
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