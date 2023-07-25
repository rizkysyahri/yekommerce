export function serializePhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber.replace(/\D/g, "");

  if (phoneNumber.startsWith("+62")) {
    phoneNumber = phoneNumber.substring(1);
  } else if (phoneNumber.startsWith("0")) {
    phoneNumber = "62" + phoneNumber.substring(1);
  } else if (phoneNumber.startsWith("8")) {
    phoneNumber = "62" + phoneNumber;
  }
  return phoneNumber;
}
