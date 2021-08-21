module.exports = {
    name: "ping",
    aliases: [''],
    description: "",
    usage: "",
    run(message, args, commandName) {
        message.channel.send(`Pong! It took ${(Date.now() - message.createdTimestamp) / 1000}`);
    }
}