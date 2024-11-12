const { Client, GatewayIntentBits } = require("discord.js")
const env = require("dotenv")
env.config();
// intent means what type of permission you are giving it  
// Guilds means which type of permission you are giving
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate",(message)=>{ // Event listener for when a new message is created in a guild
  // console.log(message) // this gives all the details included in the message
  if (message.author.bot) return; // so this code check if bot is sending the message then it will return
  if(message.content.startsWith("create")){
    const url = message.content.split("create")[1];
    message.reply({
        content: "Generating an ShortID for " + url
    })
    return;
  }
  
      message.reply({
        content: "Hi! from the bot side",
      });
  
})

client.on("interactionCreate", interaction =>{ // Event listener for handling interactions (e.g., commands, buttons, etc.)
  // console.log(interaction);
  interaction.reply("Pong!!");
})

client.login(process.env.TOKEN);
