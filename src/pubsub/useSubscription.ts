import { useEffect, useState } from "react";
import subscribe from "./subscribe";

export default function useSubscription<T>(topic: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    return subscribe(topic, setData);
  }, [topic]);

  return data;
}
