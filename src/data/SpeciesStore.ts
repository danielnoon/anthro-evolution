import species from "./species.json";

interface Species {
  binomial: string;
  image: string;
  name: string;
  description: string;
  taxonomy: string[];
  wikipedia?: string;
}

species.forEach((s) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = s.image;
  link.as = "image";
  document.head.appendChild(link);
});

export default class SpeciesStore {
  public static get all(): Species[] {
    return species;
  }

  public static get(binomial: string): Species | null {
    return species.find((s) => s.binomial === binomial) ?? null;
  }
}
