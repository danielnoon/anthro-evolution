import subscriptions from "./subscriptions";

export default function publish(topic: string, data: any) {
  if (!subscriptions.has(topic)) {
    subscriptions.set(topic, new Set<Function>());
  }
  const handlers = subscriptions.get(topic)!;
  handlers.forEach((handler) => handler(data));
}
