// Function to obfuscate email address
export const obfuscateEmail = (email) => {
  const [localPart, domainPart] = email.split("@");
  const obfuscatedLocal = localPart[0] + "*".repeat(localPart.length - 1);
  const [domainName, domainExtension] = domainPart.split(".");
  const obfuscatedDomain =
    "*".repeat(domainName.length - 1) + domainName.slice(-1);
  return `${obfuscatedLocal}@${obfuscatedDomain}.${domainExtension}`;
};
