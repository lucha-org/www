export const gitFetcher = async <T>(
  endpoint: string,
  token: string,
  req?: any
): Promise<T> => {
  const resp = await fetch("https://api.github.com" + endpoint, {
    method: "GET",
    headers: new Headers({
      Accept: "application/vnd.github+json",
      Authorization: "token " + token,
    }),
    ...req,
  });
  return await resp.json();
};

export const fetcher = async <T>(url: string): Promise<T> =>
  await (await fetch(url)).json();
