const CMAP = {
  red: "#C96480",
  orange: "#F58A07",
  lightGreen: "#30B077",
  green: "#12664F",
  lightBlue: "#4A5899",
  blue: "#3F88C5",
  purple: "#6200B3",
  olive: "#37423D",
  brown: "#7A542E",
};

const COLORS: Record<string, string> = {
  order: CMAP.red,
  suborder: CMAP.orange,
  infraorder: CMAP.green,
  parvorder: CMAP.lightGreen,
  superfamily: CMAP.lightBlue,
  family: CMAP.blue,
  subfamily: CMAP.purple,
  tribe: CMAP.olive,
  genus: CMAP.brown,
};

export default COLORS;
