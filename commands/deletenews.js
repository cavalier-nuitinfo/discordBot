const axios = require('axios')
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletenews')
		.setDescription('Get all news list')
		.addIntegerOption(option =>
			option.setName('newsid')
				.setDescription('Choose a particular news to display')
                .setRequired(true)),
	async execute(interaction, data) {
		await createPost(interaction);
	},
};

function createPost(interaction) {
	const post = async () => {
		try {
            id = interaction.options.getInteger('newsid');
			url = 'http://95.111.228.177:8080/news/' + id;

			const res = await axios.delete(url);

			interaction.reply('News ' + id + ' successfully deleted');
		} catch (err) {
			console.error(err);
			interaction.reply('Error while trying to delete news number ' + id + '\n' + err);
		}
	}

	post()
}