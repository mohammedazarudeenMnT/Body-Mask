import crypto from "crypto";

/**
 * Utility to generate an HMAC signature for secure public API requests.
 * This should ideally be called in Server Components or API routes to keep
 * the secret secure.
 */
export function generateHMACSignature(
  method: string,
  path: string,
  timestamp: string,
  secret: string,
) {
  // Standardize the payload: METHOD:PATH:TIMESTAMP
  const rawPath = path.split("?")[0].toLowerCase();
  const standardizedPath =
    rawPath.endsWith("/") && rawPath.length > 1
      ? rawPath.slice(0, -1)
      : rawPath;
  const payload = `${method.toUpperCase()}:${standardizedPath}:${timestamp}`;

  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Helper to get the necessary headers for a signed request.
 */
export function getSignatureHeaders(
  method: string,
  path: string,
  secret: string,
) {
  const timestamp = Date.now().toString();
  const signature = generateHMACSignature(method, path, timestamp, secret);

  return {
    "x-signature": signature,
    "x-timestamp": timestamp,
  };
}
