import { sequence } from "astro:middleware";
import { onRequest as checkAuthentication } from "./auth";

export const onRequest = sequence(checkAuthentication);