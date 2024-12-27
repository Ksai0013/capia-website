// scripts/generate-favicon.js
const sharp = require('sharp');

async function generateFavicons() {
  // Using your actual circuit tree logo
  const input = './public/logo.png'; // Save your logo as logo.png first

  // Generate multiple sizes
  await sharp(input)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile('./public/favicon.ico');

  await sharp(input)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile('./public/apple-touch-icon.png');

  await sharp(input)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile('./public/favicon.png');
}

generateFavicons();