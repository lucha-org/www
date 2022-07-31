import { CustomTweet, SuperWrestler } from "types/app";

export type ACTIONTYPE =
  | {
      type: "ADD_TWEET";
    }
  | { type: "SET_TWEET"; index: number; key: "user" | "status"; data: string }
  | {
      type: "SET_SOCIAL";
      data: Record<string, string>;
    }
  | { type: "SET_INDIE"; field: string; data: any }
  | { type: "PAYLOAD"; data: Partial<SuperWrestler> };

export const init: Partial<SuperWrestler> = {
  id: 1,
  category: "blog",
  identity: "",
  slug: "",
  alias: "",
  description: "",
  tweets: [{ user: "", status: "" }],
  social: {
    github: "",
    discord: "",
    twitter: "",
    website: "",
  },
};

export const reducer = (state: Partial<SuperWrestler>, action: ACTIONTYPE) => {
  switch (action.type) {
    case "ADD_TWEET":
      return {
        ...state,
        tweets: [...(state.tweets as CustomTweet[]), { user: "", status: "" }],
      };

    case "SET_TWEET":
      const copy = state.tweets as CustomTweet[];
      copy[action.index][action.key] = action.data;
      return {
        ...state,
        tweets: copy,
      };

    case "SET_SOCIAL":
      return {
        ...state,
        social: {
          ...(state.social as Record<string, string>),
          ...action.data,
        },
      };

    case "SET_INDIE":
      return {
        ...state,
        [action.field]: action.data,
      };

    case "PAYLOAD":
      return action.data;

    default:
      return state;
  }
};
