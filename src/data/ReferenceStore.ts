import references from "./references.json";

interface Reference {
  id: string;
  full: string;
  short: string;
}

export default class ReferenceStore {
  static get(key: string): Reference {
    return references.find((reference) => reference.id === key)!;
  }
}
