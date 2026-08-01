import type { Credentials } from "./Credentials.type";

export type Handler = (value: Credentials) => Promise<unknown>;
