import { Wrestler } from "@prisma/client";

export interface SuperWrestler extends Partial<Wrestler> {
  features: Record<string, boolean>;
}

export interface APIResponse {
  code: number;
  detail: string;
}

export type CustomTweet = Record<"user" | "status", string>;
