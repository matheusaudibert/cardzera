# Discord Server Cards

An SVG card generator for Discord servers that can be easily embedded in any website or README.

_This project is inspired by [Lanyard](https://github.com/Phineas/lanyard), which provides Discord profile cards. Thanks for the inspiration!_

## How it works

The service receives a Discord server ID, fetches the server data using the official Discord API, and generates a customized SVG with the server information. The generated card is optimized for fast loading and can be styled according to your preferences.

## Getting Started

1. First, [invite the bot to your server](https://discord.com/oauth2/authorize?client_id=1368283106276147200&permissions=2199023780865&integration_type=0&scope=bot)
2. The bot needs to be in your server to access its information (name, icon, member count, etc)
3. Once the bot is in your server, you can use your server ID to generate the card

> **Note**: The bot requires basic permissions to read server information. Make sure to keep it in your server for the cards to work properly.

## Usage

### Basic endpoint

```
https://your-domain.com/invite/:serverId
```

Replace `:serverId` with the Discord server ID you want to display.

Example:

```markdown
![Discord Server Card](https://your-domain.com/invite/123456789)
```

## Live Examples

![Discord Server Card](https://your-domain.com/invite/123456789)
![Discord Server Card](https://your-domain.com/invite/987654321)

## Parameters

You can customize your card by adding the following query parameters:

| Parameter         | Default  | Description                               |
| ----------------- | -------- | ----------------------------------------- |
| `backgroundColor` | `1a1c1f` | Card background color                     |
| `buttonColor`     | `00863A` | Join button color                         |
| `buttonText`      | `Join`   | Button text                               |
| `buttonTextColor` | `ffffff` | Button text color                         |
| `infoColor`       | `b5bac1` | Information color (members/online)        |
| `nameColor`       | `ffffff` | Server name color                         |
| `borderRadius`    | `10`     | Border radius in pixels (min: 0, max: 30) |

### Example with all parameters:

```markdown
![Discord Server Card](https://your-domain.com/invite/123456789?backgroundColor=1a1c1f&buttonColor=00863A&buttonText=Join&buttonTextColor=ffffff&infoColor=b5bac1&nameColor=ffffff&borderRadius=10)
```

### Output:

[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/G9PNoGMO2-4?width=250&theme=github&max_title_lines=2&show_duration=false)](https://youtube.com/watch?v=G9PNoGMO2-4)

## Contribuition

Contributions are welcome! Feel free to open an issue or submit a pull request if you have a way to improve this project.

Make sure your request is meaningful and you have tested the app locally before submitting a pull request.

## Support

_If you're using this repo, feel free to show support and give this repo a ⭐ star! It means a lot, thank you :)_
