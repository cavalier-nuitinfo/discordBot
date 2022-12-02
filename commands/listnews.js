const axios = require('axios')
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listnews')
		.setDescription('Get all news list')
		.addIntegerOption(option =>
			option.setName('newsid')
				.setDescription('Choose a particular news to display')),
	async execute(interaction, data) {
		await createPost(interaction);
	},
};

function createPost(interaction) {
	const post = async () => {
		try {
			url = 'http://95.111.228.177:8080/news/';
			id =interaction.options.getInteger('newsid')
			url += id != null ? id : ''

			const res = await axios.get(url);

			answer = '';
			
			if (id == null) {
				res.data.forEach((el) => {
					answer += el.title + '\n' + el.content + '\n\n';
				});
			} else {
				answer += res.data.title + '\n' + res.data.content + '\n\n';
			}

			interaction.reply(answer);
		} catch (err) {
			console.error(err);
			interaction.reply('Error while trying to list all news\n' + err);
		}
	}

	post()
}