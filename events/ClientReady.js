module.exports = async (client) => {
    //icon&name set
    const dev = await client.users.fetch(client.developper);
    global.boticon = await client.user.displayAvatarURL();
    global.botname = await client.user.username;
    global.devname = dev.username;
    global.devicon = await dev.avatarURL();
    global.logsavechannel = await client.channels.fetch(client.logsavechannel);

    const size = client.guilds.cache.size
    client.user.setActivity({
        name: `How to use 'help'`
    })

    console.log("Bot is now online!!!")
}