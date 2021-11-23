import subscriptions from "./subscriptions";

export default function subscribe<T>(
  topic: string,
  callback: (data: T) => void
) {
  if (!subscriptions.has(topic)) {
    subscriptions.set(topic, new Set<Function>());
  }
  const handlers = subscriptions.get(topic)!;
  handlers.add(callback);

  return () => {
    handlers.delete(callback);
  };
}
