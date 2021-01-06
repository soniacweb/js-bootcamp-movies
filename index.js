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
  console.log(response.data)
}




//select input
const input = document.querySelector('input')

let timeoutId;
const onInput = event => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  setTimeout(() => {
  timeoutId = fetchData(event.target.value) //identifying the value in input, take the value and take that value to pass into the fetchdata and use to search the database
}, 1000)
  }
  
//event listener for input 
input.addEventListener('input', onInput)


// fetchData()



