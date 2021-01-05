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
  // const movies = response.data
  console.log(response.data)
  // for (let movie in movies.Search[0]) {
  //   console.log(movie)
  // }
}

//select input
const input = document.querySelector('input')
//event listener for input
//take the value and take that value to pass into the fetchdata and use to search the database
input.addEventListener('input', (event) => {
fetchData(event.target.value)
})