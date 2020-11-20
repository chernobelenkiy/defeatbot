const path = require('path');
var fs = require('fs');

const CONFIG_PATH = 'configs';
const IMAGE_PATH = 'images';

const getFile = (...paths) => path.resolve(__dirname, 'data', ...paths);

const getConfig = (filename) => 
  JSON.parse(fs.readFileSync(getFile(CONFIG_PATH, `${filename}.json`)));

const getImage = (filename) => getFile(IMAGE_PATH, filename);

const images = {
  lost: getImage('lost.png'),
  defeat: getImage('defeat.png'),
  5: getImage('5.png'),
  4: getImage('4.png'),
  3: getImage('3.png')
}

const configs = {
  raise: getConfig('raise')
}

module.exports = {
  images,
  configs
}
