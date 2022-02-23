import dotenv from 'dotenv'
import fetch from 'node-fetch'
import Discord from 'discord.js'

dotenv.config()

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES'
    ]})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

const url = process.env.DISCORD_COMMAND_URL_ID
const discord_url = 'https://discord.com/'

client.on('messageCreate', (message) => {
    let channel = message.channel

    if (message.content == '.start_stream') {
        channel.createInvite({unique: true, maxAge: 21600})
            .then(invite => {
                let discord_link = discord_url + invite.code
                let data = {
                    message: 'Join Elis 1-E Class Here ' + discord_link + ' ! You must be of the age of 13 or above to abide by Discord ToS. '
                }
                let settings = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': process.env.NIGHT_BOT_ACCESS_TOKEN
                    },
                    body: JSON.stringify(data),
                }

                fetch(url, settings)
                    .then(response => response.json())
                    .then(result => {
                        console.log('Success:', result)
                    })
            })
            message.author.send("The command !discord as been successfully updated with the Nightbot API!")
            
    }
    if (message.content == '.end_stream') {
        let data = {
            message: 'Woo! You missed it. Come back for the next stream to get the link to \
            Elis Class 1-E Discord Server!'
        }
        let settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.NIGHT_BOT_ACCESS_TOKEN
            },
            body: JSON.stringify(data),
        }
        fetch(url, settings)
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result)
            })
            message.author.send("The command !discord as been successfully updated with the Nightbot API!")
    }
})
client.login(process.env.DISCORD_BOT_TOKEN)