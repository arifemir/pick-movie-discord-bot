const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("canavar")
    .setDescription("talhaya canavar atar"),
  async execute(interaction) {
    const bread = await interaction.client.users.fetch(process.env.TALHA_ID);
    await bread.send(process.env.MONSTER);
    await interaction.reply(`<@${process.env.TALHA_ID}> canavarrrr!`);
  },
};
