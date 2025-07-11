import { UAParser } from 'ua-parser-js';

export const DEVICE_TYPE_COOKIE_NAME = 'deviceType';

/**
 * Determines the device type from a User-Agent string.
 *
 * @param {string|null|undefined} [userAgent] - The browser's User‑Agent string.
 *   If not provided or falsy, defaults to 'desktop'.
 * @returns {DeviceType} - One of:
 *   - 'mobile'   – handheld phone
 *   - 'tablet'   – slate/tablet device
 *   - 'console'  – game console
 *   - 'smarttv'  – smart TV
 *   - 'wearable' – wearable device (watch, etc.)
 *   - 'xr'       – extended reality device (VR/AR)
 *   - 'embedded' – other embedded device
 *   - 'desktop'  – desktop or unknown device
 */
export const getDeviceType = (userAgent?: string | null) => {
  if (!userAgent) return 'desktop';

  const parser = new UAParser(userAgent);
  return parser.getDevice().type || 'desktop';
};

/**
 * Determines the device preset based on fixed width intervals:
 * 1. From 0 up to the smallest preset width (inclusive) → the first preset
 * 2. Above the first preset width up to the second (inclusive) → the second preset
 * 3. Anything greater than the second preset width → the last preset
 *
 * @param {{ name: string; width: number }[]} presets
 *   Array of device presets. If not already in ascending order by width,
 *   they will be sorted internally.
 * @param {number} targetWidth
 *   The target screen width in pixels.
 * @returns {string|undefined}
 *   The lowercase name of the matching preset, or `undefined` if no presets are given.
 */
export const getBestDevicePreset = (
  presets: { name: string; width: number }[],
  targetWidth: number
): string | undefined => {
  if (presets.length === 0) return undefined;

  const sorted = presets.slice().sort((a, b) => a.width - b.width);

  for (const preset of sorted) {
    if (targetWidth <= preset.width) {
      return preset.name.toLowerCase();
    }
  }

  return sorted[sorted.length - 1].name.toLowerCase();
};
