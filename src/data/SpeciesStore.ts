import species from "./species.json";

interface Species {
  binomial: string;
  image: string;
  name: string;
  status: string;
  description: string;
  taxonomy: string[];
  wikipedia?: string;
  references?: string[];
  youtube?: string;
  adaptations?: string[];
}

species.forEach((s) => {
  const img = new Image();
  img.src = s.image;
});

export default class SpeciesStore {
  public static get all(): Species[] {
    return species;
  }

  public static get(binomial: string): Species | null {
    return species.find((s) => s.binomial === binomial) ?? null;
  }
}
