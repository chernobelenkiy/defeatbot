
const { List } = require('immutable');
const modules = require('../modules');

const stats = new List(['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', "15"]);

const NO_GIRL_LEVEL = 'Provide a girl level to raise.'

module.exports = {
	name: 'raise',
	description: 'raise',
	async execute(message, args, env) {
    const { channel } = message;
    if (args.length < 1) return channel.send(NO_GIRL_LEVEL);

    const levels = args.filter(arg => stats.includes(arg));

    if (levels.length === 0) return (NO_GIRL_LEVEL);

    const [from, to] = levels;
    const isTotal = args.some(arg => arg === '--total');
    const Raise = new modules.Raise({ from, to, isTotal });
    Raise.exec();

    channel.send(`To raise ${from} star girl you need:\n${Raise.generateReport()}`);
  }
}