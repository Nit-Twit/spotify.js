
# Spotify.JS

A lightweight library for interacting with the Spotify API


## Demo
```js
const {SpotifyClient} = require("spotifydotjs")

const client = new SpotifyClient(<ACCESS TOKEN>, <REFRESH TOKEN>, <CLIENT ID>, <CLIENT SECRET>)

client.me().then(console.log).catch(console.error)
```
## Contributing

Contributions are always welcome!


## Authors

- [@Nit-Twit](https://www.github.com/Nit-Twit)


## Acknowledgements

 - [Spotify Web API](https://developer.spotify.com/documentation/web-api)

