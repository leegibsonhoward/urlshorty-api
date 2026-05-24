/**
 * Validates whether a string is a properly formatted URL.
 *
 * @param value - The URL string to validate.
 * @returns True if the URL is valid, otherwise false.
 */
export function isValidUrl(value: string): boolean {
  try {
    new URL(value);

    return true;
  } catch {
    return false;
  }
}