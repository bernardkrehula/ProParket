import type { Credentials } from "./Credentials.type";

// Required credentials so password sign-in is assignable; a zero-arg handler
// (e.g. anonymous demo login) still satisfies this.
export type Handler = (value: Credentials) => Promise<unknown>;
