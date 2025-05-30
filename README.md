<p align="left">
  <img src="src/public/logo.png" alt="CardzeraLogo" width="400">
</p>

# Cardzera

Generates a custom card for your Discord server, designed to be embedded in your GitHub README or any other platform. It visually displays your server info, making it easy to share and invite others.

_This project is inspired in [lanyard-profile-readme](https://github.com/cnrad/lanyard-profile-readme) by [@cnrad](https://github.com/cnrad), that generates a discord user card. Thx!_

## How it works

The service uses [Cardzera#8965](https://discord.com/users/1368283106276147200) (a discord bot) to fetch server information through Discord's API. When you provide a server ID, the bot (which needs to be in your server) retrieves details like:

- Server name
- Server icon
- Member count
- Online members count

Then, it generates a beautifully styled card showing this information that you can embed anywhere. The generated card is an SVG image optimized for fast loading and can be fully customized with your preferred colors and style.

### Prerequisites

1. First, [invite Cardzera Bot to your server](https://discord.com/oauth2/authorize?client_id=1368283106276147200&permissions=525312&integration_type=0&scope=bot).
2. The bot needs to be in your server to access its information. Required permissions:

   | Permission             | Description                                |
   | ---------------------- | ------------------------------------------ |
   | `View Channels`        | `To access server information`             |
   | `View Server Insights` | `To acesses server features (coming soon)` |
   | `Members Intent`       | `To count online members`                  |

> [!TIP]
> Get your server ID (Enable Developer Mode > Right click server > Copy ID)

## Usage

### Basic endpoint

```
https://cardzera.onrender.com/api/:serverId
```

Replace `:serverId` with your Discord server ID.

Example:

```markdown
[![Discord Server Card](https://cardzera.onrender.com/api/:serverId)](https://discord.gg/serverInviteCode)
```

## Live Examples

[![Discord Server Card](https://cardzera.onrender.com/api/1376926676184858716)](https://discord.gg/GU9GjTdNDf)

[![Discord Server Card](https://cardzera.onrender.com/api/1112920281367973900)](https://discord.gg/t86nFuCrbj)

## Parameters

You can customize your card by adding the following query parameters:

| Parameter         | Default  | Description                                |
| ----------------- | -------- | ------------------------------------------ |
| `backgroundColor` | `1a1c1f` | Card background color                      |
| `buttonColor`     | `00863A` | Join button color                          |
| `buttonText`      | `Join`   | Button text (max 28 characters)            |
| `buttonTextColor` | `ffffff` | Button text color                          |
| `infoColor`       | `b5bac1` | Information color (members/online counter) |
| `nameColor`       | `ffffff` | Server name color                          |
| `borderRadius`    | `10`     | Border radius in pixels (min: 0, max: 30)  |

### Example with all parameters:

```markdown
[![Discord Server Card](https://cardzera.onrender.com/api/:serverId?backgroundColor=1a1c1f&buttonColor=5865f2&buttonText=Join%20Now&buttonTextColor=ffffff&infoColor=b5bac1&nameColor=ffffff&borderRadius=15)](https://discord.gg/serverInviteCode)
```

### Output:

[![Discord Server Card](https://cardzera.onrender.com/api/1376926676184858716?backgroundColor=ffffff&buttonColor=000000&buttonText=Star%20the%20repository&buttonTextColor=ffffff&infoColor=353535&nameColor=000000&borderRadius=15)](https://discord.gg/GU9GjTdNDf)

> [!NOTE]
> If the server has no photo, a default photo will be used.

## Guilds Route

Get information about all servers being monitored by the bot:

```
GET https://cardzera.onrender.com/guilds
```

### Response

The route returns a JSON array with detailed information about each server:

```json
[
  {
    "name": "Server Name",
    "id": "Server ID",
    "ownerId": "Owner ID",
    "icon": "Server icon URL",
    "banner": "Server banner URL",
    "splash": "Server splash URL",
    "memberCount": "Total member count",
    "onlineCount": "Online members count",
    "boostCount": "Number of boosts",
    "boostersCount": "Number of boosters"
  }
]
```

### Response Example

```json
[
  {
    "name": "Servidor dos Programadores",
    "id": "1112920281367973900",
    "ownerId": "282182618336854026",
    "icon": "https://cdn.discordapp.com/icons/1112920281367973900/a_16f751425469d6b40897500a71967e6b.gif",
    "banner": "https://cdn.discordapp.com/banners/1112920281367973900/a_16c5b67a8a6b891bea44c5f0c45a22b1.gif",
    "splash": "https://cdn.discordapp.com/splashes/1112920281367973900/473678c810575b5bb2783af9dbfe1752.webp",
    "memberCount": 7107,
    "onlineCount": 724,
    "boostCount": 18,
    "boostersCount": 13
  }
]
```

## Contribuition

Contributions are welcome! Feel free to open an issue or submit a pull request if you have a way to improve this project.

Make sure your request is meaningful and you have tested the app locally before submitting a pull request.

## Support

_If you're using this repo, feel free to show support and give this repo a ⭐ star! It means a lot, thank you :)_
