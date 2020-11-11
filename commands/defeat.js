const Canvas = require('canvas');
const Discord = require('discord.js');

const sendError = (message) => {
	message.channel.send('No one to defeat.')
}

module.exports = {
	name: 'defeat',
	description: 'defeat',
	async execute(message, args) {
		if (args.length === 0) return sendError(message);

		const canvas = Canvas.createCanvas(736, 347);
		const ctx = canvas.getContext('2d');
		let background;
		let shout;

		//ToDo: fix images later
		let left = 0;
		let top = 0;
		
		const mention = args[0]
		let user

		if (mention.includes('<@!') || mention.includes('<@')) {
			let userID = mention.includes('<@!') ? mention.replace('<@!', '').replace('>', '')
						: mention.includes('<@') ? mention.replace('<@', '').replace('<', '') : '';

			user = await message.client.users.fetch(userID);
		} else {
			const members = await message.guild.members.fetch({ query: mention, limit: 1 });
			user = members.first().user
		}
						
		if (!user) return sendError(message);

		if (user.id === '509083292008579110') {
			background = await Canvas.loadImage('./commands/lost.png');
			left = 3;
			top = 5;
			shout = 'you lost!'
		} else {
			shout = 'defeated!';
			background = await Canvas.loadImage('./commands/defeat.png')
		}

		ctx.font = 'bold 14px sans-serif';
		ctx.fillStyle = '#000000';

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		const winnerAvatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(winnerAvatar, 210 - left, 200 - top, 80, 85);
		ctx.fillText(message.author.username, 210 - left, 190 - top);

		const looserAvatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(looserAvatar, 450- left, 200 - top, 80, 85);
		ctx.fillText(user.username, 450- left, 190 - top);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'defeated.png');

		message.channel.send(shout, attachment);
	},
};