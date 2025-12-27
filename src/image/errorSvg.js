/**
 * Generates an error SVG when server ID doesn't exist
 * @param {Object} customization - Optional customization parameters
 * @returns {string} - SVG markup as a string
 */
function generateErrorSVG(customization = {}) {
  // Extract only borderRadius from customization
  const { borderRadius = 10 } = customization;

  const width = 375;
  const height = 150;
  const circleYPosition = height / 2 - 20;
  const textColor = "#fff"; // Fixed blue color for text

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap');
        </style>
      </defs>
      <rect width="${width}" height="${height}" rx="${borderRadius}" ry="${borderRadius}" fill="#1a1c1f" />
      
      <!-- Error icon (simple "X" in a circle) -->
      <circle cx="${width / 2
    }" cy="${circleYPosition}" r="25" fill="none" stroke="#ff3a30" stroke-width="2" />
      <path d="M ${width / 2 - 12},${circleYPosition - 12} L ${width / 2 + 12
    },${circleYPosition + 12} M ${width / 2 - 12},${circleYPosition + 12} L ${width / 2 + 12
    },${circleYPosition - 12}" stroke="#ff3a30" stroke-width="2" />
      
      <!-- Error message -->
      <text x="${width / 2}" y="${height / 2 + 20
    }" font-family="Poppins" font-size="16" fill="${textColor}" text-anchor="middle" font-weight="600">Server not found</text>
      <text x="${width / 2}" y="${height / 2 + 40
    }" font-family="Poppins" font-size="14" fill="${textColor}" opacity="0.8" text-anchor="middle">The Bot is not a member of the server</text>
    </svg>
  `;
}

module.exports = { generateErrorSVG };
