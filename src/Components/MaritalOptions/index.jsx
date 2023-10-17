const maritalStatuses = [
  "Married",
  "Unmarried",
  "Divorced",
  "Domestic Partner",
  "Legally Separated",
  "Living Together",
  "Widowed",
  "Widowed with Surviving Pension",
];

export const maritalOptions = maritalStatuses.map((status) => (
  <option key={status} value={status}>
    {status}
  </option>
));
