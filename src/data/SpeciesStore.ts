import species from "./species.json";

interface Species {
  binomial: string;
  image: string;
  name: string;
}

export default class SpeciesStore {
  public static get all(): Species[] {
    return species;
  }

  public static get(binomial: string): Species | null {
    return species.find((s) => s.binomial === binomial) ?? null;
  }
}
