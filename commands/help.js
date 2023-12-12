const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Replies with a command list"),
  async execute(interaction) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#00ff9f")
      .setTitle("Gideon Commands")
      .setDescription(
        "Greetings Time Keepers! My name is Gideon. I know everything about the timeline. Here is how you will use my services:"
      )
      .addFields(
        {
          name: "`/help`",
          value: "Opens the page you are looking at right now.",
        },
        { name: "`/ping`", value: "Check if I am awake." },
        {
          name: "`/events`",
          value:
            "Search for the events that occurred on date. I've been losing my memory lately, so some events may be missing.",
        },
        {
          name: "`/births`",
          value:
            "Search for the births that occurred on date. I've been losing my memory lately, so some events may be missing.",
        },
        {
          name: "`/deaths`",
          value:
            "Search for the deaths that occurred on date. I've been losing my memory lately, so some events may be missing.",
        }
      )
      .setThumbnail(
        "https://static.wikia.nocookie.net/marvel_dc/images/5/5e/Gideon_II_Arrow_001.png/revision/latest/smart/width/250/height/250?cb=20190815011616"
      );
    await interaction.reply({ embeds: [newEmbed] });
  },
};
