import { SimpleGrid } from "@mantine/core";
import { fetcher } from "lib/fetcher";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { CustomTweet } from "types/app";
import { Tweet } from "types/twitter";

interface TweetsProps {
  items: CustomTweet[];
}

const Tweets = ({ items }: TweetsProps) => {
  const [param, setParam] = useState<string | null>(null);
  const { data: blocks, error } = useSWR<Tweet[]>(
    param && `/api/tweets?items=${param}`,
    fetcher
  );

  const resolver = useCallback(() => {
    const value = items.map((item) => `${item.user}:${item.status}`).join(",");
    setParam(value);
  }, [items]);

  useEffect(() => resolver(), [resolver]);

  if (!blocks?.length) return <p> Loading... </p>;

  return (
    <SimpleGrid cols={3}>
      {blocks?.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
      ))}
    </SimpleGrid>
  );
};

export default Tweets;
