const { fromJS } = require('immutable');
const config = fromJS(require('../../files').configs.raise);
const Report = require('./report');

class Raise {
  constructor({ from, to, isTotal }) {
    this.from = from;
    this.to = to;
    this.isTotal = isTotal;
    this._Report = new Report();
  }

  generateReport() {
    return this._Report.generate();
  }
  
  getGirlsCount(type) {
    const data = config.getIn([type, 'girls']);
    this._Report.setData(data);
    return data;
  }

  exec() {
    return this.getGirlsCount(this.from);
  }
}


module.exports = Raise