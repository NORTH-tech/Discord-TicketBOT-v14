const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { ticketCommandFilter } = require("../../utils/filter");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("チケットにユーザーを追加します。")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("追加するユーザーを選択してください。")
                .setRequired(true)
        ),

    async function(interaction, client) {
        const filter = await ticketCommandFilter(interaction);
        if (filter) return;
        const user = interaction.options.getUser("user");
        const member = await interaction.guild.members.fetch(user.id);
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "管理者は操作できません。", ephemeral: true });
        await interaction.channel.permissionOverwrites.edit(member, {
            "ViewChannel": true
        });
        interaction.reply({ content: user.toString() + " を追加しました。", ephemeral: true })
    }
}