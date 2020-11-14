const path = require('path');
var fs = require('fs');

const getFile = (filename) => path.resolve(__dirname, filename);

const getConfig = (filename) => 
  JSON.parse(fs.readFileSync(getFile('configs/' + filename)));

const getImage = (filename) => getFile('images/' + filename)

const images = {
  lost: getImage('lost.png'),
  defeat: getImage('defeat.png')
}

const configs = {
  raise: getConfig('raise.json')
}

module.exports = {
  images,
  configs
}
