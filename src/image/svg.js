/**
 * Generates a simple card SVG with server image and info
 * @param {Object} serverData - Data about the server
 * @returns {string} - SVG markup as a string
 */
function generateServerInviteSVG(serverData) {
  const {
    iconURL,
    name = "Unknown Server",
    memberCount = 0,
    onlineCount = 0,
    customization = {}, // Get customization options if provided
  } = serverData;

  // Extract customization options with defaults
  const {
    backgroundColor = "#1a1c1f",
    buttonColor = "#00863A",
    buttonText = "Join",
    buttonTextColor = "#ffffff", // New parameter for button text color
    infoColor = "#b5bac1",
    borderRadius = 10, // Default border radius
    nameColor = "#ffffff", // Default color for server name (white)
  } = customization;

  // Truncate button text to 20 characters with ellipsis if longer
  const buttonMaxLength = 28;
  let safeButtonText = buttonText || "Join";
  let buttonTruncated = false;
  if (safeButtonText.length > buttonMaxLength) {
    safeButtonText = safeButtonText.substring(0, buttonMaxLength);
    buttonTruncated = true;
  }
  // Add ellipsis if truncated
  if (buttonTruncated) {
    safeButtonText += "...";
  }

  // Calculate dynamic width based on content
  const nameMaxLength = 26;
  let safeName = name || "Unknown Server";
  let truncated = false;
  if (safeName.length > nameMaxLength) {
    safeName = safeName.substring(0, nameMaxLength);
    truncated = true;
  }

  const onlineText = `${onlineCount} Online`;
  const onlineTextWidth = onlineText.length * 8;
  const membersText = `${memberCount} Members`;
  const membersTextWidth = membersText.length * 8;

  // Server icon dimensions and position
  const iconSize = 60;
  const margin = 20;

  const iconRadius = 16;

  // Increase height for the button
  const height = 150; // Increased from 100 to add space for button

  const width = 375; // Fixed width instead of dynamic calculation

  const iconX = margin;
  const iconY = 20; // Fixed position from the top

  // Text positioning adjusted to align with the upper icon
  const textStartX = iconX + iconSize + 15;
  const serverNameY = 45; // Aligned with the icon
  const statusY = 65;

  // Escape for SVG
  const escapedName = safeName
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Calculate spacing between status indicators
  const onlineCircleX = textStartX + 5;
  const onlineTextX = onlineCircleX + 10;
  const fixedSpacing = 10;
  const membersCircleX = onlineTextX + onlineTextWidth + fixedSpacing;
  const membersTextX = membersCircleX + 10;

  // Button dimensions
  const buttonY = 95; // Position for the button
  const buttonHeight = 35;
  const buttonWidth = width - margin * 2; // Full width minus margins
  const buttonX = margin;
  const buttonTextY = buttonY + buttonHeight / 2 + 5; // Center text vertically

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Simple background card with customizable color and border radius -->
      <rect width="${width}" height="${height}" rx="${borderRadius}" ry="${borderRadius}" fill="${backgroundColor}" />
      
      <!-- Clipping path for rounded corners on the image -->
      <defs>
        <clipPath id="roundedImageCorners">
          <rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" />
        </clipPath>
      </defs>
      
      <!-- Server Icon on left side with fixed rounded corners (radius 16) -->
      ${
        iconURL
          ? `<image href="${iconURL}" x="${iconX}" y="${iconY}" height="${iconSize}" width="${iconSize}" clip-path="url(#roundedImageCorners)" />`
          : `<rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" fill="#5865f2" />`
      }
      
      <!-- Server Name with possible ellipsis -->
      <text x="${textStartX}" y="${serverNameY}" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="${nameColor}">${escapedName}${
    truncated ? "..." : ""
  }</text>
      
      <!-- Member Counts with Indicators - Dynamic positioning with fixed spacing between -->
      <!-- Online Members with green indicator -->
      <circle cx="${onlineCircleX}" cy="${statusY}" r="4" fill="#43A25A" />
      <text x="${onlineTextX}" y="${
    statusY + 4
  }" font-family="Arial, sans-serif" font-size="15" fill="${infoColor}">${onlineCount} Online</text>
      
      <!-- Total Members with gray indicator - fixed distance from the end of online text -->
      <circle cx="${membersCircleX}" cy="${statusY}" r="4" fill="#82838B" />
      <text x="${membersTextX}" y="${
    statusY + 4
  }" font-family="Arial, sans-serif" font-size="15" fill="${infoColor}">${memberCount} Members</text>
      
      <!-- Join Button - Full width with margins and customizable color and text -->
      <rect x="${buttonX}" y="${buttonY}" width="${buttonWidth}" height="${buttonHeight}" rx="10" ry="10" fill="${buttonColor}" />
      <text x="${
        width / 2
      }" y="${buttonTextY}" font-family="Arial, sans-serif" font-size="16" fill="${buttonTextColor}" text-anchor="middle" font-weight="bold">${safeButtonText}</text>
    </svg>
  `;
}

module.exports = { generateServerInviteSVG };
