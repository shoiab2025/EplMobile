export const parseGradient = (colorString) => {
  if (!colorString.includes('linear-gradient')) {
    // Single color case
    return { isGradient: false, solidColor: colorString };
  }

  // Updated regex to match 2 or 3 colors
  const regex = /linear-gradient\((-?\d+)deg, (rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}) \d+%, (rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}) \d+%(?:, (rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}) \d+%)?\)/;
  const match = colorString.match(regex);

  if (!match) {
    return { isGradient: false, solidColor: '#FFFFFF' }; // Default fallback
  }

  const angle = parseInt(match[1], 10);
  const color1 = match[2];
  const color2 = match[3];
  const color3 = match[4] || null; // Handle optional third color

  // Convert angle to `start` and `end` points
  const angleRad = (angle * Math.PI) / 180;
  const start = { x: 0.5 - Math.cos(angleRad) / 2, y: 0.5 - Math.sin(angleRad) / 2 };
  const end = { x: 0.5 + Math.cos(angleRad) / 2, y: 0.5 + Math.sin(angleRad) / 2 };

  const gradientColors = color3 ? [color1, color2, color3] : [color1, color2];

  return { isGradient: true, gradientColors, start, end };
};
