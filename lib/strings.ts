export const ACTION =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://lucha.vercel.app/api";

export const CATEGORIES = ["blog", "baas", "analytics"];

export const WRESTLERS = {
  blog: ["hashnode", "medium", "ghost"],
  analytics: ["splitbee", "matomo", "googleanalytics"],
  baas: ["firebase", "supabase", "appwrite"],
};
