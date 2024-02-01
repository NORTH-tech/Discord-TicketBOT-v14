const { EmbedBuilder, Colors } = require("discord.js");

function htmlSave(interaction) {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: botname,
            iconURL: boticon
        })
        .setColor(Colors.DarkBlue)
        .setDescription("Ticket がクローズされました。\nログファイルを送信します。\n\n")
        .addFields([
            {
                name: "Sever",
                value: "```" + interaction.guild.name + "```"
            },
            {
                name: "Ticket-NAME",
                value: "```" + interaction.channel.name + "```"
            },
            {
                name: "Closed by",
                value: "```" + interaction.user.username + "```"
            },
            {
                name: "Created At",
                value: "```" + interaction.channel.createdAt.toString() + "```"
            },
            {
                name: "Closed At",
                value: "```" + new Date().toString() + "```"
            }
        ])
        .setFooter({
            text: `ticket bot by ${devname}`,
            iconURL: devicon
        })
    return embed
};

function help() {
    const embed = new EmbedBuilder()
    .setAuthor({
        name: botname,
        iconURL: boticon
    })
    .setColor(Colors.White)
    .setTitle("スラッシュコマンドヘルプ")
    .addFields([
        {
            name: "panelset",
            value: "```チケットパネルをセットします。\nこのコマンドを実行する前にスタッフロールを登録する必要があります。\n下記記載の/staffrole を使用。```"
        },
        {
            name: "staffrole",
            value: "```チケット対応可能なスタッフロールを登録します。\n選択したロールがスタッフとして登録されます。\n※ロールの選択がない場合、ロールが自動生成されます。\n※サーバーの設定から、登録したロールの位置をBOTのロールの位置より下に設定してください。```"
        },
        {
            name: "add",
            value: "```任意のユーザーをチケットに追加します。```"
        },
        {
            name: "remove",
            value: "```任意のユーザーをチケットから削除します。```"
        }
    ])
    .setFooter({
        text: `ticket bot by ${devname}`,
        iconURL: devicon
    })
    return embed;
}


module.exports = {
    htmlSave,
    help
}