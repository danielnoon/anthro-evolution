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
  const tag = document.createElement("link");
  tag.rel = "prefetch";
  tag.href = s.image;
  document.head.appendChild(tag);
  const img = new Image();
  img.src = s.image;
  img.hidden = true;
  document.body.appendChild(img);
});

export default class SpeciesStore {
  public static get all(): Species[] {
    return species;
  }

  public static get(binomial: string): Species | null {
    return species.find((s) => s.binomial === binomial) ?? null;
  }
}
