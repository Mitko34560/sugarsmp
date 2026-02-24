const express = require("express");
const cors = require("cors");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const app = express();

app.use(cors());
app.use(express.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const BOT_TOKEN = "MTQ3NTI1MzI1MDcyOTk2Nzg0OQ.GbpVEz.D5SOBYt5-2BgKPrtNmNOCmImnHwanCF3Fj-fNc";
const CHANNEL_ID = "1475585049083773131";

client.login(BOT_TOKEN);

app.post("/apply", async (req, res) => {

  try {

    const data = req.body;
    const channel = await client.channels.fetch(CHANNEL_ID);

    const embed = new EmbedBuilder()
      .setTitle("Нова кандидатура")
      .addFields(
        { name: "Име", value: data.name || "-" },
        { name: "Години", value: data.age || "-" },
        { name: "Discord", value: data.discord || "-" },
        { name: "Minecraft", value: data.minecraft || "-" },
        { name: "Опит", value: data.experience || "-" },
        { name: "Мотивация", value: data.motivation || "-" },
        { name: "Активност", value: data.activity || "-" },
        { name: "Причина", value: data.why || "-" }
      )
      .setColor(0x9b59b6);

    await channel.send({ embeds: [embed] });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка" });
  }

});

app.listen(3000, () => console.log("Server started"));
