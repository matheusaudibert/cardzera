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

## Usage

### Basic endpoint

```
https://cardzera.audibert.dev/api/:serverId?t={timestamp}
```

Replace `:serverId` with your Discord server ID.

> [!TIP]
> Get your server ID (Enable Developer Mode > Right click server > Copy ID)

Example:

```markdown
[![Discord Server Card](https://cardzera.audibert.dev/api/:serverId?t={timestamp})](https://discord.gg/serverInviteCode)
```

## Live Examples

[![Discord Server Card](https://cardzera.audibert.dev/api/1383718526694461532?t={timestamp})](https://discord.gg/XuhsaMEqzf)

[![Discord Server Card](https://cardzera.audibert.dev/api/1112920281367973900?t={timestamp})](https://discord.gg/servidordosprogramadores)

> [!IMPORTANT]
> Adding `?t={timestamp}` to the URL is essential to force the card to update in real time.

## Parameters

You can customize your card by adding the following query parameters:

| Parameter            | Default  | Description                                      |
| -------------------- | -------- | ------------------------------------------------ |
| `backgroundColor`    | `1a1c1f` | Card background color                            |
| `buttonColor`        | `00863A` | Join button color                                |
| `buttonText`         | `Join`   | Button text (max 28 characters)                  |
| `buttonTextColor`    | `ffffff` | Join button color                                | 
| `buttonBorderRadius` | `10`     | Button Border radius in pixels (min: 0, max: 30) |
| `infoColor`          | `b5bac1` | Information color (members/online counter)       |
| `nameColor`          | `ffffff` | Server name color                                |
| `borderRadius`       | `10`     | Border radius in pixels (min: 0, max: 30)        |


### Example with all parameters:

```markdown
[![Discord Server Card](https://cardzera.audibert.dev/api/:serverId?backgroundColor=ffffff&buttonColor=000000&buttonBorderRadius=0&buttonText=Star%20the%20repository&buttonTextColor=ffffff&infoColor=353535&nameColor=000000&borderRadius=0?t={timestamp})](https://discord.gg/serverInviteCode)
```

### Output:

[![Discord Server Card](https://cardzera.audibert.dev/api/1383718526694461532?backgroundColor=ffffff&buttonBorderRadius=10&buttonColor=000000&buttonText=Star%20the%20repository&buttonTextColor=ffffff&infoColor=353535&nameColor=000000&borderRadius=0?t={timestamp})](https://discord.gg/XuhsaMEqzf)

> [!NOTE]
> If the server has no photo, a default photo will be used.

## Contribuition

Contributions are welcome! Feel free to open an issue or submit a pull request if you have a way to improve this project.

Make sure your request is meaningful and you have tested the app locally before submitting a pull request.

## Support

_If you're using this repo, feel free to show support and give this repo a ⭐ star! It means a lot, thank you :)_
