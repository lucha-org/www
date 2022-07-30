export interface Tweet {
  url: string;
  author_name: string;
  author_url: string;
  html: string;
  width: number | null;
  height: number | null;
  type: "rich";
  cache_age: string;
  provider_name: "Twitter";
  provider_url: "https://twitter.com";
  version: string;
}
