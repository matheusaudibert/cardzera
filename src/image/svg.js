/**
 *
 * @param {Object} serverData
 * @returns {Promise<string>}
 */
async function generateServerInviteSVGWithBase64Image(serverData) {
  const {
    name = "Unknown Server",
    memberCount = 0,
    onlineCount = 0,
    iconURL,
    customization = {},
  } = serverData;

  const {
    borderRadius = 10,
    backgroundColor = "#1a1c1f",
    infoColor = "#b5bac1",
    nameColor = "#ffffff",
    buttonColor = "#00863A",
    buttonText = "Join",
    buttonTextColor = "#ffffff",
    buttonBorderRadius = 10,
    titleLen = 26,
    elipsis = true,
  } = customization;

  let safeName = name;
  if (typeof titleLen === "number" && titleLen > 0 && name.length > titleLen) {
    if (elipsis) {
      safeName = name.slice(0, titleLen) + "...";
    } else {
      safeName = name.slice(0, titleLen);
    }
  }
  const safeButtonText =
    buttonText.length > 28 ? buttonText.slice(0, 28) + "..." : buttonText;
  const escapedName = safeName
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let displayOnlineCount = onlineCount;

  const onlineCountNumber =
    typeof onlineCount === "string"
      ? parseInt(onlineCount.replace(/,/g, ""))
      : onlineCount;

  if (onlineCountNumber > 1000) {
    displayOnlineCount = (onlineCountNumber + 400).toLocaleString("en-US");
  } else {
    displayOnlineCount = onlineCount;
  }

  const onlineText = `${displayOnlineCount} Online`;
  const membersText = `${memberCount} Members`;
  const onlineTextWidth = onlineText.length * 8;

  const width = 375;
  const height = 150;
  const iconSize = 60;
  const margin = 20;
  const iconX = margin;
  const iconY = 20;
  const iconRadius = 16;
  const textStartX = iconX + iconSize + 15;
  const serverNameY = 45;
  const statusY = 65;

  const onlineCircleX = textStartX + 5;
  const onlineTextX = onlineCircleX + 10;
  const fixedSpacing = 10;
  const membersCircleX = onlineTextX + onlineTextWidth + fixedSpacing;
  const membersTextX = membersCircleX + 10;

  const buttonY = 95;
  const buttonHeight = 35;
  const buttonWidth = width - margin * 2;
  const buttonX = margin;
  const buttonTextY = buttonY + buttonHeight / 2 + 5;

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap');
          text {
            font-family: 'Poppins', 'Century Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
        </style>
      </defs>
      <rect width="${width}" height="${height}" rx="${borderRadius}" ry="${borderRadius}" fill="${backgroundColor}" />
      <defs>
        <clipPath id="roundedImageCorners">
          <rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" />
        </clipPath>
      </defs>

      ${
        iconURL
          ? `<image
              x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}"
              xlink:href="${iconURL}" clip-path="url(#roundedImageCorners)"
            />`
          : `<rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" fill="#5865f2" />`
      }

      <text x="${textStartX}" y="${serverNameY}" font-family="Poppins" font-weight="600" font-size="17.7" fill="${nameColor}">
        ${escapedName}
      </text>

      <circle cx="${onlineCircleX}" cy="${statusY}" r="4" fill="#43A25A" />
      <text x="${onlineTextX}" y="${
    statusY + 4
  }" font-family="Poppins" font-size="15" fill="${infoColor}">
        ${onlineText}
      </text>

      <circle cx="${membersCircleX}" cy="${statusY}" r="4" fill="#82838B" />
      <text x="${membersTextX}" y="${
    statusY + 4
  }" font-family="Poppins" font-size="15" fill="${infoColor}">
        ${membersText}
      </text>

      <rect x="${buttonX}" y="${buttonY}" width="${buttonWidth}" height="${buttonHeight}" rx="${buttonBorderRadius}" ry="${buttonBorderRadius}" fill="${buttonColor}" />
      <text x="${
        width / 2
      }" y="${buttonTextY}" font-family="Poppins" font-size="16" fill="${buttonTextColor}" text-anchor="middle" font-weight="600">
        ${safeButtonText}
      </text>
    </svg>
  `.trim();
}

module.exports = {
  generateServerInviteSVGWithBase64Image,
};
