// Real Estate Home Loan & EMI Calculation Utilities

/**
 * Calculate Monthly EMI, Total Interest, Total Payment, and Breakdown percentages.
 * 
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * P = Principal Loan Amount
 * r = Monthly Interest Rate (Annual Rate / 12 / 100)
 * n = Tenure in months (Tenure Years * 12)
 */
export function calculateEMI(loanAmount, annualInterestRate, tenureYears) {
  const principal = parseFloat(loanAmount);
  const rate = parseFloat(annualInterestRate);
  const years = parseFloat(tenureYears);

  if (
    isNaN(principal) || principal <= 0 ||
    isNaN(rate) || rate <= 0 ||
    isNaN(years) || years <= 0
  ) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalPayment: 0,
      principalPercent: 0,
      interestPercent: 0,
      isValid: false,
    };
  }

  const monthlyRate = rate / 12 / 100;
  const totalMonths = years * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  const principalPercent = Math.round((principal / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  return {
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principalPercent,
    interestPercent,
    totalMonths,
    isValid: true,
  };
}

/**
 * Format Indian currency string (e.g. ₹ 45,00,000 or ₹ 45 Lacs)
 */
export function formatCurrency(amount) {
  const val = Number(amount);
  if (isNaN(val)) return '₹ 0';

  if (val >= 10000000) {
    return `₹ ${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹ ${(val / 100000).toFixed(2)} Lacs`;
  }
  return `₹ ${val.toLocaleString('en-IN')}`;
}
