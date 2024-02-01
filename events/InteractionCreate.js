module.exports = async (client, interaction) => {
    if (interaction.user.bot) return;
    switch (true) {
        //command
        case interaction.type === 2:
            try {
                var command = require(`../commands/slash/${interaction.commandName}`);
                await command.function(interaction, client);
                break;
            } catch (e) {
                console.error(e)
                break;
            }
        //button
        case interaction.isButton():
            if (interaction.customId.startsWith("collect")) return;
            var customId = interaction.customId;
            try {
                var command = require(`../commands/button/${customId}`);
                await command(interaction, client)
                break;
            } catch (e) {
                console.error(e)
                break;
            }
        //selectmenu
        case interaction.isSelectMenu():
            var customId = interaction.customId;
            try {
                var command = require(`../commands/menu/${customId}`);
                await command(interaction, client);
                break;
            } catch (e) {
                console.error(e)
                break;
            }
        //modal
        case interaction.type === 5:
            var customId = interaction.customId;
            try {
                var command = require(`../commands/modal/${customId}`);
                await command(interaction, client);
                break;
            } catch (e) {
                console.error(e)
                break;
            }
    }
}