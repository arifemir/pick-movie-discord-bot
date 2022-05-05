const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("top250movie")
    .setDescription("get all movies"),
  async execute(interaction) {
    const url = "https://imdb-api.com/en/API/Top250Movies/k_dmi4eedv";
    const options = {
      method: "GET",
    };
    const res = await fetch(url, options);
    const data = await res.json();
    const top250Movies = data.items.map((movie, i) => {
      return i + 1 + ". " + movie.title;
    });
    let movies = [];
    while (top250Movies.length > 0) {
      movies = [...movies, top250Movies.splice(0, 10)];
    }
    await interaction.reply("Top 250 movies");
    for (const movie of movies) {
      await interaction.followUp(movie.join(", "));
    }
  },
};
