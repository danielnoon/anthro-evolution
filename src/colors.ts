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
  pink: "#E869A2",
  white: "#FFFFFF",
  black: "#000000",
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

  "vulnerable:bg": CMAP.orange,
  "vulnerable:text": CMAP.white,
  "endangered:bg": CMAP.red,
  "endangered:text": CMAP.white,
  "critically endangered:bg": CMAP.red,
  "critically endangered:text": CMAP.white,
  "least concern:bg": CMAP.lightBlue,
  "least concern:text": CMAP.white,
  "near threatened:bg": CMAP.lightGreen,
  "near threatened:text": CMAP.white,
};

export default COLORS;
