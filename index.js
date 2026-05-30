require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    REST,
    Routes
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const commands = [
    new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Sendet ein lustiges Meme")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("🔄 Slash Commands werden geladen...");

        await rest.put(
            Routes.applicationCommands("1510353918335389958"),
            { body: commands }
        );

        console.log("✅ Slash Commands geladen!");
    } catch (error) {
        console.error(error);
    }
})();

client.once("clientReady", () => {
    console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "meme") {

        const memes = [
            "https://i.imgur.com/1.jpg",
            "https://i.imgur.com/2.jpg",
            "https://i.imgur.com/3.jpg"
        ];

        const randomMeme =
            memes[Math.floor(Math.random() * memes.length)];

        await interaction.reply(randomMeme);
    }

});

client.login(process.env.TOKEN);