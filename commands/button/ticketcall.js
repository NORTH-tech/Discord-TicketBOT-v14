const fs = require("fs");

module.exports = async (interaction, client) => {
    interaction.deferUpdate();
    const roles = JSON.parse(fs.readFileSync("./utils/role.json").toString());
    interaction.channel.send(`スタッフが呼び出されました。\n至急対応してください。\n<@&${roles[interaction.guild.id]}>`);
}