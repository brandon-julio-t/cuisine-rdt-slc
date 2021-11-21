export default function useClone<T>(obj: any): T {
  if (!obj) return {} as T;
  return JSON.parse(JSON.stringify(obj));
}
