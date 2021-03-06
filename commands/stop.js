const Client = require('../struct/Client');
const log4js = require('log4js');
log4js.configure('./config/log_config.json',{});
const log = log4js.getLogger('BOT - stop');

module.exports = {
	name: 'stop',
	description: 'Arrête complétement la lecture de musique (Remise à 0 de la playlist)',
	usage: `${Client.config.prefix}stop`,
	execute(message)   {
		
		const { channel } = message.member.voice;

		const serverQueue = message.client.queue.get(message.guild.id);
		
		if (!serverQueue) {

			log.info(`Il n'y a pas de musique en cours !`);

			return message.channel.send(`Il n'y a pas de musique en cours !`);

		} 
		
		if (!channel) {

			log.error(`L'utilisateur n'est pas dans un channel !`);

			return message.channel.send(`J'ai besoin que tu sois dans un channel pour stoper la musique ! `);

		} 
		
		if( serverQueue.voiceChannel.name !== channel.name ) {

			log.error(`L'utilisateur n'est pas dans le même channel que le bot !`);

			return message.channel.send(`J'ai besoin que tu sois dans le même channel que moi pour stoper la musique ! `);

		} 

		serverQueue.songs = [];
		
		serverQueue.connection.dispatcher.end('Stop command has been used!');

		log.info(`Arrêt de la musique `);

		return message.channel.send(`Arrêt de la musique `);
		
	}
};