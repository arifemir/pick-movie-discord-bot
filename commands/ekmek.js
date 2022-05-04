const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ekmek")
    .setDescription("ekmege yag surer(canberke butter atiyor)"),
  async execute(interaction) {
    const bread = await interaction.client.users.fetch(process.env.BREAD_ID);
    await bread.send(process.env.BUTTER);
    await interaction.reply(`<@${process.env.BREAD_ID}> yag suruldu!`);
  },
};
