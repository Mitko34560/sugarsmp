const express = require("express");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const app = express();
app.use(express.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const BOT_TOKEN = "ТУК_СЛОЖИ_ТОКЕНА";
const CHANNEL_ID = "КАНАЛ_ЗА_КАНДИДАТУРИ";
const ROLE_ID = "ROLE_ID_АКО_ИСКАШ_ДА_ДАВА";

client.login(BOT_TOKEN);

app.post("/apply", async (req, res) => {

  const data = req.body;

  const channel = await client.channels.fetch(CHANNEL_ID);

  const embed = new EmbedBuilder()
    .setTitle("Нова кандидатура")
    .addFields(
      { name: "Име", value: data.name || "Не е попълнено" },
      { name: "Години", value: data.age || "-" },
      { name: "Discord", value: data.discord || "-" },
      { name: "Minecraft", value: data.minecraft || "-" },
      { name: "Опит", value: data.experience || "-" },
      { name: "Мотивация", value: data.motivation || "-" }
    )
    .setColor(0x9b59b6);

  await channel.send({ embeds: [embed] });

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server started"));
