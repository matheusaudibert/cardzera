const express = require("express");
const router = express.Router();

router.get("/guilds", async (req, res) => {
  try {
    const client = req.app.locals.discordClient;

    const guilds = await Promise.all(
      client.guilds.cache.map(async (guild) => {
        const onlineMembers = guild.members.cache.filter((member) =>
          ["online", "idle", "dnd"].includes(member.presence?.status)
        ).size;
        const boostersCount = guild.members.cache.filter(
          (member) => member.premiumSince !== null
        ).size;

        return {
          name: guild.name,
          id: guild.id,
          ownerId: guild.ownerId,
          icon: guild.iconURL({ dynamic: true }),
          banner: guild.bannerURL({ dynamic: true }),
          splash: guild.splashURL({ dynamic: true }),
          memberCount: guild.memberCount,
          onlineCount: onlineMembers,
          boostCount: guild.premiumSubscriptionCount || 0,
          boostersCount: boostersCount,
        };
      })
    );

    res.json(guilds);
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch guilds" });
  }
});

module.exports = router;
