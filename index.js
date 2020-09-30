require('dotenv').config()
const Discord = require('discord.js');
var io = require('socket.io-client')(process.env.SOCKET_SERVER_URL);

io.on('connect', function(){});

//this triggers when a someone first connects to the socket server, send them back current data.
io.on('freshConnection', async function(msg){
    console.log(msg);
    const memberCollection = await getUsersOnlineStatus(client);
     console.log(memberCollection);
    io.emit('freshConnectionData', memberCollection);
  });

const client = new Discord.Client();
client.once('ready', () =>{
    console.log('danbot is online');
});

//discord event that triggers everytime someone connects/disconnects/changes a voice channel.
client.on('voiceStateUpdate', async (oldMember, newMember) => {
    const memberCollection = await getUsersOnlineStatus(client);

    io.emit('memberStatusChange', memberCollection);
    console.log(memberCollection);
  });

  async function getUsersOnlineStatus(cli) {
    const channels = await cli.channels.cache;
    let petrol = false;
    let waldy = false;
    let cashen = false;
    let marly = false;
    let kenzo = false;
    let darbo = false;
    let jack = false;
    let nips = false;
    let sheena = false;

    //get all voice channels from the discord server and check who's in a voice channel.
    for (const channel of channels) {
       // console.log(channel);
        if (channel[1].type == 'voice') {
            //console.log(channel[1].name);
            const members = await client.channels.cache.get(channel[0]).members;
            for (const [memberID, member] of members) {
                console.log(member.user.username);
                if (member.user.username == 'dannmate') { petrol = true;} 
                if (member.user.username == 'Waldy') { waldy = true;} 
                if (member.user.username == 'SammySpaceCadet') { cashen = true;} 
                if (member.user.username == 'marlymarc') { marly = true;}
                if (member.user.username == 'Kenzo') { kenzo = true;}
                if (member.user.username == 'Darbsquire') { darbo = true;}
                if (member.user.username == 'KingofFairies') { jack = true;}
                if (member.user.username == 'Nipples') { nips = true;}
                if (member.user.username == 'Sheena') { sheena = true;}
            }
        }
    }
    
    return {"petrol": petrol,
            "waldy": waldy,
            "cashen": cashen,
            "marly": marly,
            "kenzo": kenzo,
            "darbo": darbo,
            "jack": jack,
            "nips": nips,
            "sheena": sheena};


}

client.login(process.env.DISCORD_TOKEN);