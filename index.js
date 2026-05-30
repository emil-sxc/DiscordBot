require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    REST,
    Routes,
    EmbedBuilder
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// SLASH COMMANDS
const commands = [
    new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Sendet ein lustiges Meme")
].map(command => command.toJSON());

// CLIENT ID HIER EINSETZEN
const CLIENT_ID = "1510353918335389958";

// SERVER ID HIER EINSETZEN
const GUILD_ID = "1510349474701246565";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {

        console.log("🔄 Slash Commands werden geladen...");

        await rest.put(
            Routes.applicationGuildCommands(1510353918335389958, GUILD_ID),
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

    // MEME COMMAND
    if (interaction.commandName === "meme") {

        const memes = [
            "https://i.imgur.com/W3duR07.jpeg",
            "https://i.imgur.com/8Km9tLL.jpeg",
            "https://i.imgur.com/4M34hi2.png",
            "https://i.imgur.com/jJ8s8Ej.jpeg"
        ];

        const randomMeme =
            memes[Math.floor(Math.random() * memes.length)];

        const embed = new EmbedBuilder()
            .setTitle("😂 Meme")
            .setColor("Purple")
            .setImage(randomMeme)
            .setFooter({ text: "Discord Meme Bot" });

        await interaction.reply({
            embeds: [embed]
        });
    }

});

client.login(process.env.TOKEN);