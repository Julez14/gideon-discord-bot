const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deaths")
    .setDescription("Returns the deaths that occurred on a certain date")
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("Date to search (M/D)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("year")
        .setDescription("Year to search (YYYY)")
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const date = interaction.options.getString("date");
    var { data } = {};
    try {
      var { data } = await fetch(
        `https://history.muffinlabs.com/date/${date}`
      ).then((response) => response.json());
      //console.log(data);
    } catch {
      return interaction.editReply(`**${date}** is invalid!`);
    }

    // YEAR NOT SPECIFIED
    if (!interaction.options.getString("year")) {
      console.log(`Searching for all deaths on ${date}`);

      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("one")
          .setLabel("1")
          .setStyle("PRIMARY"),
        new Discord.MessageButton()
          .setCustomId("two")
          .setLabel("2")
          .setStyle("PRIMARY"),
        new Discord.MessageButton()
          .setCustomId("three")
          .setLabel("3")
          .setStyle("PRIMARY")
      );

      let newEmbed1 = new Discord.MessageEmbed()
        .setColor("#00ff9f")
        .setTitle(`${date}`)
        .setDescription("Page 1");
      let newEmbed2 = new Discord.MessageEmbed()
        .setColor("#00ff9f")
        .setTitle(`${date}`)
        .setDescription("Page 2");
      let newEmbed3 = new Discord.MessageEmbed()
        .setColor("#00ff9f")
        .setTitle(`${date}`)
        .setDescription("Page 3");

      let fieldCounter = 0;
      for (let i = 0; i < data.Deaths.length - 1; i++) {
        if (fieldCounter < 25) {
          newEmbed1.addFields({
            name: data.Deaths[i].year,
            value: data.Deaths[i].text,
          });
        } else if (fieldCounter >= 25 && fieldCounter < 50) {
          newEmbed2.addFields({
            name: data.Deaths[i].year,
            value: data.Deaths[i].text,
          });
        } else if (fieldCounter >= 50 && fieldCounter < 75) {
          newEmbed3.addFields({
            name: data.Deaths[i].year,
            value: data.Deaths[i].text,
          });
        } else {
          console.log("More embeds are needed!");
        }

        fieldCounter++;
      }

      interaction.editReply({ embeds: [newEmbed1], components: [row] });

      const collector = interaction.channel.createMessageComponentCollector({
        time: 15 * 1000,
        componentType: "BUTTON",
      });

      collector.on("collect", async (i) => {
        if (i.customId === "one") {
          await i.deferUpdate();
          await interaction.editReply({
            embeds: [newEmbed1],
            components: [row],
          });
        } else if (i.customId === "two") {
          await i.deferUpdate();
          await interaction.editReply({
            embeds: [newEmbed2],
            components: [row],
          });
        } else if (i.customId === "three") {
          await i.deferUpdate();
          await interaction.editReply({
            embeds: [newEmbed3],
            components: [row],
          });
        }
      });

      return;
    }

    // YEAR SPECIFIED
    const chosenYear = interaction.options
      .getString("year")
      .split(" ")
      .join("");

    console.log(`Searching for deaths on ${date}/${chosenYear}`);

    let basicEmbed = new Discord.MessageEmbed()
      .setColor("#00ff9f")
      .setTitle(`${date}/${chosenYear}`);

    let yearCheck = "";
    for (let i = 0; i < data.Deaths.length - 1; i++) {
      yearCheck = data.Deaths[i].year.split(" ").join("");
      if (chosenYear === yearCheck) {
        basicEmbed.addFields({
          name: "-",
          value: data.Deaths[i].text,
        });
      }
    }
    await interaction.editReply({
      embeds: [basicEmbed],
    });
  },
};
