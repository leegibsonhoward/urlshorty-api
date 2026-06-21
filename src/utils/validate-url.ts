/**
 * Validates whether a string is a properly formatted HTTP or HTTPS URL.
 *
 * @param value - The URL string to validate.
 * @returns True if the URL is valid, otherwise false.
 */
export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}