const config = require('./files').configs.raise;

const getGirlsCount = (type) => {
  
  // 4 | 5 | 6 ...
  for (lvl in type) {
    
  }
}

const getStats = () => {
  let total = {
    unit: {},
    faction: {},
    generic: {}
  }

  for (lvl in config) {
    const { girls: { unit, faction, generic } } = lvl


  }
}

module.exports = {
	name: 'raise',
	description: 'raise',
	async execute(message, args, env) {
    const { channel } = message;
    if (args.length < 1) return channel.send('Provide a girl level to raise');

    

    console.log(config);
  }
}