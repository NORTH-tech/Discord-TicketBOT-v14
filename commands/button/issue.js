const { PermissionsBitField, ChannelType, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { ticketopenFilter } = require("../../utils/filter");
const fs = require("fs");

module.exports = async (interaction, client) => {
    const filter = await ticketopenFilter(interaction);
    if (filter) return;
    const roles = JSON.parse(fs.readFileSync("./utils/role.json").toString());
    const c = await interaction.guild.channels.create({
        name: `🎫｜${interaction.user.username}`,
        type: ChannelType.GuildText,
        parent: interaction.channel.parentId,
        topic: "ticket" + interaction.user.id,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: roles[interaction.guild.id],
                allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel]
            },
        ]
    });
    const embed = new EmbedBuilder()
        .setColor(Colors.Aqua)
        .setTitle("チケット作成完了")
        .setDescription("ご用件を送信してスタッフの対応をお待ちください。\n※チケットのログは保存され、終了後に取得できます。\n\n")
        .setFooter({
            text: `ticket bot by ${devname}`,
            iconURL: devicon
        })
    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("ticketclose").setLabel("チケットを閉じる").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("ticketcall").setLabel("スタッフを呼び出す").setStyle(ButtonStyle.Success)
        )
    await c.send({ embeds: [embed], components: [button] })
    c.send(interaction.user.toString())
    interaction.reply({ content: `チケットを作成しました。${c.toString()}`, ephemeral: true })
}