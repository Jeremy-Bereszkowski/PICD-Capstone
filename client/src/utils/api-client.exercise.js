// 🐨 you're going to need the key to use for storing the user's token in
// localStorage.
// 💰 const localStorageKey = '__bookshelf_token__'
function client(endpoint, customConfig = {}) {
  // 🐨 get the user's token from localStorage
  // 💰 window.localStorage.getItem(localStorageKey)

  // 🐨 create a default headers object here with the 'content-type' set to 'applicaiton/json'
  // 🐨 if there's a token, then add an Authorization header to `Bearer ${token}`
  // 💰 feel free to peek at the final if you need some help understanding the goals here.

  const config = {
    // 🐨 if customConfig.body, then let's default the method to 'POST' instead of a 'GET'
    method: 'GET',
    ...customConfig,
    // 🐨 combine the headers you defined above with any headers that may be coming from the customConfig
  }
  // 🐨 if customConfig.body, then set the body to JSON.stringify(customConfig.body)
  // 💰 this is a helpful feature of our custom client so people don't have to
  // stringify their request bodies themselves.

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async r => {
      const data = await r.json()
      if (r.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

// 🐨 export the localStorageKey because our auth-client needs it.
export {client}
