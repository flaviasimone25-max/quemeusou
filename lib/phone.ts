export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function brazilianPhone(value: string) {
  const digits = digitsOnly(value);
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  if (digits.length >= 10) return `55${digits}`;
  return digits;
}