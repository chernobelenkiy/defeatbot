const Canvas = require('canvas');
const Discord = require('discord.js');

const sendError = (message,) => {
	message.channel.send('No one to defeat.')
}

const getUser = async (mention, members, users) => {
	let user;
	
	if (/<@/.test(mention)) {
		const userID = mention.replace(/<@!?|>|</g, '');
		user = await users.fetch(userID);
	} else {
		const allMembers = await members.fetch({ query: mention, limit: 1 });
		user = allMembers.first() && allMembers.first().user
	}

	return user;
}

const drawAvatar = async (ctx, username, url, { x, y }) => {
	const winnerAvatar = await Canvas.loadImage(url);
	ctx.drawImage(winnerAvatar, x, y, 80, 85);
	ctx.fillText(username, x, y - 10);
}

module.exports = {
	name: 'defeat',
	description: 'defeat',
	async execute(message, args, config) {
		if (args.length === 0) return sendError(message);

		const { author, author: { username }, guild: { members }, client: { users } } = message
		const canvas = Canvas.createCanvas(736, 347);
		const ctx = canvas.getContext('2d');
		let background;
		let shout;

		const user = await getUser(args[0], members, users);
						
		if (!user) return sendError(message);

		if (user.id === config.SECRET_USER) {
			background = await Canvas.loadImage('./commands/lost.png');
			shout = 'you lost!'
		} else {
			shout = 'defeated!';
			background = await Canvas.loadImage('./commands/defeat.png')
		}

		ctx.font = 'bold 14px sans-serif';
		ctx.fillStyle = '#000000';

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		await drawAvatar(
			ctx,
			username,
			author.displayAvatarURL({ format: 'jpg' }),
			{ x: 210, y: 200 }
		);

		await drawAvatar(
			ctx,
			user.username, 
			user.displayAvatarURL({ format: 'jpg' }),
			{ x: 450, y: 190 }
		);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'defeated.png');

		message.channel.send(shout, attachment);
	},
};