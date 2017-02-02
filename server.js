var express = require('express');
var fs = require('fs');
var rndFlickr = require('rnd-flickr');

var settings = JSON.parse(fs.readFileSync('settings.json'));
var app = express();

app.set('view engine', 'html');
app.set('views', 'client');
app.engine('html', require('hogan-express'));

app.get('/', function(req, res, next) {
  res.render('index', settings.public);
});

app.get('/:name.:ext', function(req, res, next) {
  res.sendFile(req.params.name + '.' + req.params.ext, { root: __dirname + '/client' }, function(err) {
    if (err) { res.status(err.status).end(); }
  });
});

app.get('/:width?/:height?/:tags?/:tag_mode?', function(req, res, next) {
  var options = {
    api_key: settings.private.flickr_api_key,
    cache_path: settings.private.cache_path,
    cache_expire: settings.private.cache_expire,
    content_type: 1
  };

  options.width = parseInt(req.params.width);
  if (options.width <= 0) {
    options.width = settings.private.default_width;
  } else if (options.width > settings.private.max_width) {
    options.width = settings.private.max_width;
  }

  options.height = parseInt(req.params.height);
  if (options.height <= 0) {
    options.height = settings.private.default_height;
  } else if (options.height > settings.private.max_height) {
    options.height = settings.private.max_height;
  }

  if (!req.params.tags) {
    options.tags = settings.private.default_tags;
  } else {
    options.tags = req.params.tags;
  }

  if (!req.params.tag_mode) {
    options.tag_mode = settings.private.default_tag_mode;
  } else {
    options.tag_mode = req.params.tag_mode;
  }

  rndFlickr(options, function(error, image, data){
    if (error) { image = fs.readFileSync(settings.private.default_image); }

    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': image.length
    });

    res.send(image);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});
