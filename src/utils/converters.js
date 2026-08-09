// Real Estate Unit Conversion Utilities

export const UNIT_TYPES = {
  AREA: 'area',
  LENGTH: 'length',
};

// Regional Bigha conversion factors in Square Feet
export const BIGHA_REGIONS = {
  UP_STANDARD: { name: 'Uttar Pradesh (Standard)', sqft: 27225, desc: '1 Bigha = 27,225 sq. ft (55 × 55 yards)' },
  MP_CENTRAL: { name: 'Madhya Pradesh / Central', sqft: 12000, desc: '1 Bigha = 12,000 sq. ft' },
  WEST_BENGAL: { name: 'West Bengal', sqft: 14400, desc: '1 Bigha = 14,400 sq. ft' },
  PUNJAB_HARYANA: { name: 'Punjab / Haryana', sqft: 9075, desc: '1 Bigha = 9,075 sq. ft' },
  BIHAR: { name: 'Bihar', sqft: 27220, desc: '1 Bigha = 27,220 sq. ft' },
  RAJASTHAN: { name: 'Rajasthan (Pucca)', sqft: 27225, desc: '1 Bigha = 27,225 sq. ft' },
};

// Area units relative to Square Feet (base unit)
export const AREA_UNITS = [
  { id: 'sqft', name: 'Square Feet (sq ft)', symbol: 'sq.ft', category: 'Area', toSqFt: (v) => v, fromSqFt: (v) => v },
  { id: 'sqm', name: 'Square Meters (sq m)', symbol: 'sq.m', category: 'Area', toSqFt: (v) => v * 10.76391, fromSqFt: (v) => v / 10.76391 },
  { id: 'sqyd', name: 'Square Yards (Gaj)', symbol: 'sq.yd', category: 'Area', toSqFt: (v) => v * 9, fromSqFt: (v) => v / 9 },
  { id: 'acre', name: 'Acres', symbol: 'acre', category: 'Area', toSqFt: (v) => v * 43560, fromSqFt: (v) => v / 43560 },
  { id: 'hectare', name: 'Hectares', symbol: 'ha', category: 'Area', toSqFt: (v) => v * 107639.1, fromSqFt: (v) => v / 107639.1 },
  { id: 'bigha', name: 'Bigha (Regional)', symbol: 'bigha', category: 'Area', isRegional: true },
  { id: 'biswa', name: 'Biswa (1/20 Bigha)', symbol: 'biswa', category: 'Area', isRegional: true },
  { id: 'katha', name: 'Katha', symbol: 'katha', category: 'Area', toSqFt: (v) => v * 1361.25, fromSqFt: (v) => v / 1361.25 },
  { id: 'marla', name: 'Marla', symbol: 'marla', category: 'Area', toSqFt: (v) => v * 272.25, fromSqFt: (v) => v / 272.25 },
];

// Length units relative to Feet (base unit)
export const LENGTH_UNITS = [
  { id: 'ft', name: 'Feet (ft)', symbol: 'ft', category: 'Length', toFeet: (v) => v, fromFeet: (v) => v },
  { id: 'm', name: 'Meters (m)', symbol: 'm', category: 'Length', toFeet: (v) => v * 3.28084, fromFeet: (v) => v / 3.28084 },
  { id: 'in', name: 'Inches (in)', symbol: 'in', category: 'Length', toFeet: (v) => v / 12, fromFeet: (v) => v * 12 },
  { id: 'yd', name: 'Yards (Gaj)', symbol: 'yd', category: 'Length', toFeet: (v) => v * 3, fromFeet: (v) => v / 3 },
  { id: 'km', name: 'Kilometers (km)', symbol: 'km', category: 'Length', toFeet: (v) => v * 3280.84, fromFeet: (v) => v / 3280.84 },
  { id: 'mi', name: 'Miles (mi)', symbol: 'mi', category: 'Length', toFeet: (v) => v * 5280, fromFeet: (v) => v / 5280 },
];

/**
 * Convert area or length units accurately.
 */
export function convertUnits({ value, fromUnitId, toUnitId, bighaRegionKey = 'UP_STANDARD' }) {
  const numVal = parseFloat(value);
  if (isNaN(numVal) || numVal < 0) return 0;
  if (fromUnitId === toUnitId) return numVal;

  const bighaFactor = BIGHA_REGIONS[bighaRegionKey]?.sqft || 27225;

  // Helper for area conversion using Sq Ft as base
  const getSqFt = (id, val) => {
    if (id === 'bigha') return val * bighaFactor;
    if (id === 'biswa') return val * (bighaFactor / 20);
    const unit = AREA_UNITS.find((u) => u.id === id);
    return unit ? unit.toSqFt(val) : val;
  };

  const fromSqFt = (id, sqftVal) => {
    if (id === 'bigha') return sqftVal / bighaFactor;
    if (id === 'biswa') return sqftVal / (bighaFactor / 20);
    const unit = AREA_UNITS.find((u) => u.id === id);
    return unit ? unit.fromSqFt(sqftVal) : sqftVal;
  };

  // Check if both are Area units
  const isFromArea = AREA_UNITS.some((u) => u.id === fromUnitId);
  const isToArea = AREA_UNITS.some((u) => u.id === toUnitId);

  if (isFromArea && isToArea) {
    const baseSqFt = getSqFt(fromUnitId, numVal);
    return fromSqFt(toUnitId, baseSqFt);
  }

  // Check if both are Length units
  const fromLength = LENGTH_UNITS.find((u) => u.id === fromUnitId);
  const toLength = LENGTH_UNITS.find((u) => u.id === toUnitId);

  if (fromLength && toLength) {
    const baseFeet = fromLength.toFeet(numVal);
    return toLength.fromFeet(baseFeet);
  }

  return 0;
}
