const { exec } = require('../modules/raise');

module.exports = {
	name: 'raise',
	description: 'raise',
	async execute(message, args, env) {
    const { channel } = message;
    if (args.length < 1) return channel.send('Provide a girl level to raise');

    exec();
  }
}