class Report {
  constructor(channel) {
    this._channel = channel;
  }

  setData(data) {
    this._data = data;
  }

  createName(type) {
    return !isNaN(parseInt(type)) ? `${type} star` : type;
  }

  generateFraction(key) {
    console.log(this._data.toJS())
    return this._data.get(key).reduce((report, amount = 0, type) => {
      return `${report} ${amount} ${this.createName(type)}\n`
    }, ``)
  }

  generate() {
    let report = '';

    if (this._data.get('unit').size > 0) {
      report += 'of the same unit:\n' + this.generateFraction('unit');
    }

    if (this._data.get('faction').size > 0) {
      report += 'of the same faction:\n' + this.generateFraction('faction');
    }

    if (this._data.get('generic').size > 0) {
      report += 'and generic:\n' + this.generateFraction('generic');
    }

    return report;
  }
}

module.exports = Report;