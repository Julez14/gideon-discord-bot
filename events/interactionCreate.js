module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if (interaction.isButton()) {
      console.log(
        `${interaction.user.tag} in #${interaction.channel.name} pressed a button.`
      );
      return;
    }
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
  },
};
