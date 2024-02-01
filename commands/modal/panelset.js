const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (interaction, client) => {
    await interaction.reply("パネルを設置中です。")
    const title = interaction.fields.getTextInputValue('title');
    const description = interaction.fields.getTextInputValue('description');
    const label = interaction.fields.getTextInputValue('label');
    const hasImage = interaction.fields.fields.has('image') ? true : false;
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor("Random")
        .setDescription("```" + description + "```")
        .setFooter({
            text: `ticket bot by ${devname}`,
            iconURL: devicon
        })
    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("issue")
                .setLabel(label)
                .setStyle(ButtonStyle.Success)
        )
    if (hasImage) {
        const image = interaction.fields.getTextInputValue('image');
        embed.setImage(image);
    }
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed], components: [button] })
}