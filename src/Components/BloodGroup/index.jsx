const bloods = ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"];
// .toLowerCase().replace(/ /g, "-")
export const bloodOptions = bloods.map((blood) => (
  <option key={blood} value={blood}>
    {blood}
  </option>
));
