require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () =>{
    console.log('danbot is online');
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    //console.log(oldMember);

    //console.log(client.channels);
    //console.log(client.channels.cache.get("693620288910524416"));
    //693620288910524416
    const channel = client.channels.cache.get("693620288910524416");
    for (const [memberID, member] of channel.members) {
        console.log(member.user.username);
      }
  console.log(Object.keys(channel.members).length);
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        //console.log(newMember);
       // User Joins a voice channel
  
    } else if(newUserChannel === undefined){
        //console.log(oldMember);
      // User leaves a voice channel
  
    }
  });

  client.on('message', message =>{
    console.log(message.content);

    if (message.content == 'test'){
        message.channel.send('test1');
    }
  });


client.login(process.env.MONGODB_CONNECTION_STRING);