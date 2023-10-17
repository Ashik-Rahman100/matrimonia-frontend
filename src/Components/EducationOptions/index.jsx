const educationLevels = [
  "Associates",
  "B Pharm",
  "B.Com",
  "BBA",
  "BSC",
  "Bachelors",
  "CA",
  "Dakhil",
  "Did not complete High School",
  "Diploma",
  "Doctorate",
  "Fazil",
  "HSC",
  "High School",
  "Kamil",
  "LLB",
  "LLM",
  "M Pharm",
  "M.Com",
  "MBA",
  "MBBS",
  "MPhil",
  "MSC",
  "Masters",
  "SSC",
  "Some College",
];
// .toLowerCase().replace(/ /g, "-")
export const educationOptions = educationLevels.map((education) => (
  <option key={education} value={education}>
    {education}
  </option>
));
