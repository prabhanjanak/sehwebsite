export const numberToIndianWords = (num: number): string => {
  if (num === 0) return 'Zero Rupees Only';

  const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const doubleDigits = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertLessThanOneThousand = (n: number): string => {
    let result = '';

    if (n >= 100) {
      result += `${singleDigits[Math.floor(n / 100)]} Hundred `;
      n %= 100;
    }

    if (n >= 10 && n <= 19) {
      result += `${doubleDigits[n - 10]} `;
    } else if (n >= 20) {
      result += `${tens[Math.floor(n / 10)]} `;
      if (n % 10 > 0) {
        result += `${singleDigits[n % 10]} `;
      }
    } else if (n > 0) {
      result += `${singleDigits[n]} `;
    }

    return result.trim();
  };

  let words = '';
  const crore = Math.floor(num / 10000000);
  num %= 10000000;

  const lakh = Math.floor(num / 100000);
  num %= 100000;

  const thousand = Math.floor(num / 1000);
  num %= 1000;

  const remainder = num;

  if (crore > 0) {
    words += `${convertLessThanOneThousand(crore)} Crore `;
  }

  if (lakh > 0) {
    words += `${convertLessThanOneThousand(lakh)} Lakh `;
  }

  if (thousand > 0) {
    words += `${convertLessThanOneThousand(thousand)} Thousand `;
  }

  if (remainder > 0) {
    words += convertLessThanOneThousand(remainder);
  }

  return `Indian Rupees ${words.trim()} Only`;
};
