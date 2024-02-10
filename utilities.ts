import { v4 as uuidv4 } from "npm:uuid@latest";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateId() {
  return uuidv4();
}
