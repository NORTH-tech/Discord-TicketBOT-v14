const discordTranscripts = require('discord-html-transcripts');
const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { htmlSave } = require("../../utils/embeds");

module.exports = async (interaction, client) => {
    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("collect-yes").setLabel("はい").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("collect-no").setLabel("いいえ").setStyle(ButtonStyle.Danger),
        )
    await interaction.reply({ content: "本当に閉じますか?", components: [button], ephemeral: true });
    const filter = (int) => int.user.id === interaction.user.id && int.customId.startsWith("collect");
    try {
        const collect = await interaction.channel.awaitMessageComponent({ filter, time: 10000 });
        if (collect.customId.split("-")[1] === "no") return interaction.deleteReply();
        await interaction.channel.send("このチケットは" + interaction.user.toString() + "によって閉じられました。");
        const file = await discordTranscripts.createTranscript(interaction.channel, {
            filename: interaction.channel.name + "-transcript.html"
        });
        const filemessage = await logsavechannel.send({ files: [file] });
        interaction.channel.delete()
        const file_url = filemessage.attachments.first().attachment;
        const fileDownloadButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(file_url).setLabel("Log Download")
            );
        interaction.channel.members.map(member => {
            try {
                if (member.user.bot) return;
                member.send({ embeds: [htmlSave(interaction)], components: [fileDownloadButton] });
            } catch (e) { console.error(e) }
        });
    } catch (e) {
        //console.error(e);
        interaction.editReply({ content: "選択時間切れです。", components: [], ephemeral: true });
    }
}