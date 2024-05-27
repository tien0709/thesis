export default function phoneNumberValidator(phoneNumber) {
    const phoneNumberRegex = /^[0-9]+$/;
  
    if (!phoneNumber) return "Phone number can't be empty.";
    if (!phoneNumberRegex.test(phoneNumber)) return 'Phone number must only contain numeric characters.';
    // Các điều kiện khác có thể được thêm vào tùy thuộc vào yêu cầu cụ thể.
  
    return '';
  }