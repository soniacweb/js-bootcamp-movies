//debounce function to guard how often func is invoked
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
     }
    timeoutId = setTimeout(() => {
      func.apply(null, args) 
     }, delay)
    }
   }