const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick-movie")
    .setDescription("movie picker")
    .addIntegerOption((option) => {
      return option
        .setName("period")
        .setDescription("period(60, 70, 80, 90, 00, 10, 20)")
        .addChoices({ name: "60's", value: 1960 })
        .addChoices({ name: "70's", value: 1970 })
        .addChoices({ name: "80's", value: 1980 })
        .addChoices({ name: "90's", value: 1990 })
        .addChoices({ name: "00's", value: 2000 })
        .addChoices({ name: "10's", value: 2010 })
        .addChoices({ name: "20's", value: 2020 });
    })
    .addStringOption((option) => {
      return option
        .setName("genre")
        .setDescription("comedy, action, etc")
        .addChoices({ name: "comedy", value: "comedy" })
        .addChoices({ name: "action", value: "action" })
        .addChoices({ name: "drama", value: "drama" })
        .addChoices({ name: "horror", value: "horror" })
        .addChoices({ name: "romance", value: "romance" })
        .addChoices({ name: "thriller", value: "thriller" })
        .addChoices({ name: "mystery", value: "mystery" })
        .addChoices({ name: "fantasy", value: "fantasy" })
        .addChoices({ name: "sci-fi", value: "sci-fi" })
        .addChoices({ name: "adventure", value: "adventure" })
        .addChoices({ name: "animation", value: "animation" })
        .addChoices({ name: "family", value: "family" })
        .addChoices({ name: "war", value: "war" })
        .addChoices({ name: "history", value: "history" })
        .addChoices({ name: "western", value: "western" })
        .addChoices({ name: "mythology", value: "mythology" })
        .addChoices({ name: "suspense", value: "suspense" })
        .addChoices({ name: "biography", value: "biography" })
        .addChoices({ name: "documentary", value: "documentary" })
        .addChoices({ name: "film-noir", value: "film-noir" });
    })
    .addIntegerOption((option) => {
      return option
        .setName("rating")
        .setDescription("write a number between 1 and 10(greater than number)")
        .addChoices({ name: "2", value: 2 })
        .addChoices({ name: "3", value: 3 })
        .addChoices({ name: "4", value: 4 })
        .addChoices({ name: "5", value: 5 })
        .addChoices({ name: "6", value: 6 })
        .addChoices({ name: "7", value: 7 })
        .addChoices({ name: "8", value: 8 })
        .addChoices({ name: "9", value: 9 });
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const period = interaction.options.getInteger("period");
    const genre = interaction.options.getString("genre");
    const rating = interaction.options.getInteger("rating");
    let url = `https://imdb-api.com/API/AdvancedSearch/${process.env.IMDB_API_KEY}?count=250`;
    if (period) {
      url += `&release_date=${period}-01-01,${period + 10}-01-01`;
    }
    if (genre) {
      url += `&genres=${genre}`;
    }
    if (rating) {
      url += `&num_votes=${rating},10`;
    }
    const options = {
      method: "GET",
    };
    const res = await fetch(url, options);
    const data = await res.json();
    const random = Math.floor(Math.random() * data.results.length);
    if (data.results.length === 0) {
      await interaction.reply("No results found");
    }
    const movie = data.results[random];
    const reply = `Name: ${movie.title} ${movie.description} ${movie.runtimeStr} \nDesc: ${movie.plot} \nImdb Rating: ${movie.imDbRating} \nGenres: ${movie.genres} \nStars: ${movie.stars} \nDirector: ${movie.director} \nPoster: ${movie.image}`;
    await interaction.editReply(reply);
  },
};
