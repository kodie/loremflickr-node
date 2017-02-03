# loremflickr-node

A website that provides placeholder images for every case, web or print, on almost any subject, in any size. This is basically a clone of [LoremFlickr.com](http://loremflickr.com) except it runs on [Node.js](http://nodejs.org) and uses the [rnd-flickr](https://github.com/kodie/rnd-flickr) module.

## Installation
1. Clone repository
1. `npm i`
1. `cp settings-example.json settings.json`
1. Edit `settings.json` to your liking (You'll also need to set your Flickr api key in there)
1. `npm start`

## Settings
Settings can be set either by the `settings.json` file or by environmental variables (or both!). When using environmental variables you will need to use the `loremflickr_` prefix. For example: `export loremflickr_cache_expire=3600000`. Environmental variables take priority over `settings.json`.

## To-Do
* Look into scalability.
* Add license, author, and image name to images.
* Add various filter options (grayscale, pixelated, red, blue, green).
* Possibly add daily image RSS feed.

## License
MIT. See the License file for more info.
