const { PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

async function panelsetFilter(interaction) {
    //コマンド実行場所確認
    if (!interaction.inGuild()) return await interaction.reply({ content: "サーバーで実行してください。", ephemeral: true })
    //ロール登録確認
    const roles = JSON.parse(fs.readFileSync("./utils/role.json").toString());
    const RoleID = roles[interaction.guild.id];
    if (!RoleID) return await interaction.reply({ content: "ロールを登録してください。\n実行コマンド:[/staffrole]", ephemeral: true });
    //権限確認
    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.some(role => role.id === RoleID)) return await interaction.reply({ content: "このコマンドを実行できる権限がありません。", ephemeral: true });
    //ロール位置確認
    const role = await interaction.guild.roles.fetch(RoleID);
    const botrole = interaction.guild.members.me.roles.cache.first();
    if (botrole.position < role.position) return await interaction.reply({ content: `${botrole.toString()} のロール位置を、${role.toString()} より上に設置してください。`, ephemeral: true });
    //カテゴリー確認
    const CategoryID = interaction.channel.parentId;
    if (!CategoryID) return await interaction.reply({ content: "カテゴリ内のチャンネルで実行してください。", ephemeral: true });
    return false
}

async function ticketopenFilter(interaction) {
    //コマンド実行場所確認
    if (!interaction.inGuild()) return await interaction.reply({ content: "サーバーで実行してください。", ephemeral: true });
    //ロール登録確認
    const roles = JSON.parse(fs.readFileSync("./utils/role.json").toString());
    const RoleID = roles[interaction.guild.id];
    if (!RoleID) return await interaction.reply({ content: "ロールを登録してください。\n実行コマンド:[/staffrole]", ephemeral: true });
    //ロール位置確認
    const role = await interaction.guild.roles.fetch(RoleID);
    const botrole = interaction.guild.members.me.roles.cache.first();
    if (botrole.position < role.position) return await interaction.reply({ content: `${botrole.toString()} のロール位置を、${role.toString()} より上に設置してください。`, ephemeral: true });
    //カテゴリー確認
    const CategoryID = interaction.channel.parentId;
    if (!CategoryID) return await interaction.reply({ content: "カテゴリ内のチャンネルで実行してください。", ephemeral: true });
    //カテゴリーチケット上限確認
    const Category = interaction.guild.channels.cache.get(CategoryID);
    if (Category.children.cache.find((channel) => channel.topic === "ticket" + interaction.user.id)) return await interaction.reply({
        content: "ticketの上限に達しています(1/1)",
        ephemeral: true
    });
    return false
}

async function ticketCommandFilter(interaction) {
    //コマンド実行場所確認
    if (!interaction.inGuild()) return await interaction.reply({ content: "サーバーで実行してください。", ephemeral: true });
    if (!interaction.channel.topic) return await interaction.reply({ content: "チケット内で実行してください。", ephemeral: true });
    if (!interaction.channel.topic.startsWith("ticket")) return await interaction.reply({ content: "チケット内で実行してください。", ephemeral: true });
    //ロール位置確認
    const roles = JSON.parse(fs.readFileSync("./utils/role.json").toString());
    const RoleID = roles[interaction.guild.id];
    const role = await interaction.guild.roles.fetch(RoleID);
    const botrole = interaction.guild.members.me.roles.cache.first();
    if (botrole.position < role.position) return await interaction.reply({ content: `${botrole.toString()} のロール位置を、${role.toString()} より上に設置してください。`, ephemeral: true });
    //権限確認
    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator) && !interaction.member.roles.cache.some(role => role.id === RoleID)) return await interaction.reply({ content: "このコマンドを実行できる権限がありません。", ephemeral: true });
    return false;
}

module.exports = { panelsetFilter, ticketopenFilter, ticketCommandFilter };