const axios = require("axios");
const path = require("path");

/**
 * Fetch image and convert to base64 with correct MIME
 * @param {string} imageUrl
 * @returns {Promise<string|null>}
 */
async function fetchImageAsBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const cleanUrl = imageUrl.split("?")[0];
    const ext = path.extname(cleanUrl).toLowerCase();

    let mimeType = "image/png";
    if (ext.includes("jpg") || ext.includes("jpeg")) mimeType = "image/jpeg";
    else if (ext.includes("webp")) mimeType = "image/png";
    else if (ext.includes("gif")) mimeType = "image/png";

    const base64 = Buffer.from(response.data).toString("base64");
    return `data:${mimeType};base64,${base64}`;
  } catch (err) {
    console.error("Erro ao buscar imagem:", err.message);
    return null;
  }
}

/**
 *
 * @param {Object} serverData
 * @returns {Promise<string>}
 */
async function generateServerInviteSVGWithBase64Image(serverData) {
  console.log(serverData);
  const {
    name = "Unknown Server",
    memberCount = 0,
    onlineCount = 0,
    iconURL,
    customization = {},
  } = serverData;

  const {
    backgroundColor = "#1a1c1f",
    buttonColor = "#00863A",
    buttonText = "Join",
    buttonTextColor = "#ffffff",
    infoColor = "#b5bac1",
    borderRadius = 10,
    nameColor = "#ffffff",
  } = customization;

  //const base64Icon = iconURL ? await fetchImageAsBase64(iconURL) : null;
  const base64Icon =
    "data:image/png;base64,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";

  const safeName = name.length > 26 ? name.slice(0, 26) + "..." : name;
  const safeButtonText =
    buttonText.length > 28 ? buttonText.slice(0, 28) + "..." : buttonText;
  const escapedName = safeName
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const onlineText = `${onlineCount} Online`;
  const membersText = `${memberCount} Members`;
  const onlineTextWidth = onlineText.length * 8;
  const membersTextWidth = membersText.length * 8;

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
      <rect width="${width}" height="${height}" rx="${borderRadius}" ry="${borderRadius}" fill="${backgroundColor}" />
      <defs>
        <clipPath id="roundedImageCorners">
          <rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" />
        </clipPath>
      </defs>

      ${
        base64Icon
          ? `<image
              x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}"
              xlink:href="${base64Icon}" clip-path="url(#roundedImageCorners)"
            />`
          : `<rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" fill="#5865f2" />`
      }

      <text x="${textStartX}" y="${serverNameY}" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="${nameColor}">
        ${escapedName}
      </text>

      <circle cx="${onlineCircleX}" cy="${statusY}" r="4" fill="#43A25A" />
      <text x="${onlineTextX}" y="${
    statusY + 4
  }" font-family="Arial, sans-serif" font-size="15" fill="${infoColor}">
        ${onlineText}
      </text>

      <circle cx="${membersCircleX}" cy="${statusY}" r="4" fill="#82838B" />
      <text x="${membersTextX}" y="${
    statusY + 4
  }" font-family="Arial, sans-serif" font-size="15" fill="${infoColor}">
        ${membersText}
      </text>

      <rect x="${buttonX}" y="${buttonY}" width="${buttonWidth}" height="${buttonHeight}" rx="10" ry="10" fill="${buttonColor}" />
      <text x="${
        width / 2
      }" y="${buttonTextY}" font-family="Arial, sans-serif" font-size="16" fill="${buttonTextColor}" text-anchor="middle" font-weight="bold">
        ${safeButtonText}
      </text>
    </svg>
  `.trim();
}

module.exports = {
  generateServerInviteSVGWithBase64Image,
};
