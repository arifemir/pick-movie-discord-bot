const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yalanci")
    .setDescription("furkana yalanci yalanci film posterini atar"),
  async execute(interaction) {
    const bread = await interaction.client.users.fetch(process.env.FURKAN_ID);
    await bread.send(process.env.LIARLIAR);
    await interaction.reply(
      `<@${process.env.FURKAN_ID}> yalancilikla suclandi!`
    );
  },
};
