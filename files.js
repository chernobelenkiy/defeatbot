const path = require('path');
var fs = require('fs');

const getFile = (filename) => path.resolve(__dirname, 'data', filename);

const getConfig = (filename) => 
  JSON.parse(fs.readFileSync(getFile('configs/' + filename)));

const getImage = (filename) => getFile('images/' + filename)

const images = {
  lost: getImage('lost.png'),
  defeat: getImage('defeat.png'),
  5: getImage('5.png'),
  4: getImage('4.png'),
  3: getImage('3.png')
}

const configs = {
  raise: getConfig('raise.json')
}

module.exports = {
  images,
  configs
}
