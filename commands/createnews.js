const axios = require('axios')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createnews')
		.setDescription('Create a new post on the site!')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('The news title')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('content')
				.setDescription('The news content')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('backgound')
				.setDescription('The news background image')),
	async execute(interaction, data) {
		await createPost(interaction);
	},
};

function createPost(interaction) {
	const data = {
		title: interaction.options.getString('title'),
		content: interaction.options.getString('content'),
		date: Date.now().toString(),
		background: interaction.options.getString('background') ?? 'https://picsum.photos/200/300',
	}

	const post = async () => {
		try {
			const res = await axios.post('http://95.111.228.177:8080/news', data);
			interaction.reply('News created succesfuly');
		} catch (err) {
			console.error(err);
			interaction.reply('Error while trying to create a news\n' + err);
		}
	}

	post()
}