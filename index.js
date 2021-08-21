const Discord = global.Discord = require("discord.js");
const fs = global.fs = require("fs");
const express = global.express = require("express");
const db = global.db = require("quick.db");
const port = process.env.PORT || 2002;

global.app = express();

app.get("/", (req, res) => {
  res.send(`nigga i like so so`);
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

global.bot = new Discord.Client();

global.getCommands = function () {
  let files = fs.readdirSync(commandsDir).filter(file => (
  !fs.statSync(commandsDir + file).isDirectory() &&
  !file.startsWith("!") &&
  file.endsWith(".js")));
  let commands = {};

  for (let i = 0; i < files.length; i++) {
    try {
      let command = require(commandsDir + files[i]);
      commands[command.name] = command;
    } catch (e) {
      console.error(e);
    }
  }
  return commands;
}

global.getCommand = function (commandName) {
  if (commands[commandName]) return commands[commandName];

  for (let i in commands)
    if (commands[i].aliases.includes(commandName)) return commands[i];
}

global.prefix = "d!"
global.commandsDir = __dirname + "/commands/";
global.commands = getCommands();

bot.on("ready", () => {
  console.log('im nigga');
});

bot.on("message", message => {
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || !message.guild) return;
  let [commandName, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  let command = getCommand(commandName.toLowerCase());
  if (!command) return;
  try {
    command.run(message, args, commandName);
  } catch (e) {
    console.error(e);
    message.channel.send("Something went wrong...");
  }
});

let TOKEN = process.env.TOKEN

bot.login(TOKEN);