const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { ticketCommandFilter } = require("../../utils/filter");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("チケットからユーザーを削除します。")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("削除するユーザーを選択してください。")
                .setRequired(true)
        ),

    async function(interaction, client) {
        const filter = await ticketCommandFilter(interaction);
        if (filter) return;
        const user = interaction.options.getUser("user");
        const member = await interaction.guild.members.fetch(user.id);
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "管理者は操作できません。", ephemeral: true });
        await interaction.channel.permissionOverwrites.edit(member, {
            "ViewChannel": false
        });
        interaction.reply({ content: user.toString() + " を削除しました。", ephemeral: true })
    }
}