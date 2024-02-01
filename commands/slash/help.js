const { SlashCommandBuilder } = require("discord.js");
const { help } = require("../../utils/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("コマンドのヘルプを表示します。"),

    async function(interaction, client) {
        await interaction.reply({ embeds: [help()], ephemeral: true });
    }
}