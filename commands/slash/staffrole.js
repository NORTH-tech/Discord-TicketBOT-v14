const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("staffrole")
        .setDescription("スタッフロールを登録・作成")
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("登録したいロールを入力してください。\n※未入力の場合は、新規作成されます。")
                .setRequired(false)
        ),

    async function(interaction, client) {
        if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ content: "管理者権限がありません。", ephemeral: true });
        const role = interaction.options.getRole("role");
        const roleData = JSON.parse(fs.readFileSync("./utils/role.json").toString());
        if (role) {
            roleData[interaction.guild.id] = role.id;
            fs.writeFileSync("./utils/role.json", JSON.stringify(roleData));
            return await interaction.reply({content: `${role.toString()} をスタッフロールとして登録しました。`, ephemeral: true });
        } else {
            const staffRole = await interaction.guild.roles.create({
                name: "ticket-staff"
            });
            roleData[interaction.guild.id] = staffRole.id;
            fs.writeFileSync("./utils/role.json", JSON.stringify(roleData));
            return await interaction.reply({content: `${staffRole.toString()} を作成し、スタッフロールとして登録しました。`, ephemeral: true });
        }
    }
}