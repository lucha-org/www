import { ActionIcon, Group, Stack } from "@mantine/core";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  HomeIcon,
  TwitterLogoIcon
} from "@radix-ui/react-icons";
import Table from "components/Comparison";
import Tweets from "components/Testimonials";
import MainLayout from "layouts/Parent";
import { fetcher } from "lib/fetcher";
import { ACTION } from "lib/strings";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Script from "next/script";
import useSWR from "swr";
import type { CustomTweet, SuperWrestler } from "types/app";

interface WrestlerProps {
  wrestlers: string[];
}

export const SOCIAL = {
  twitter: {
    source: "https://twitter.com",
    icon: <TwitterLogoIcon />,
  },
  github: {
    source: "https://github.com",
    icon: <GitHubLogoIcon />,
  },
  website: {
    source: "",
    icon: <HomeIcon />,
  },
  discord: {
    source: "",
    icon: <DiscordLogoIcon />,
  },
};

const Wrestler = ({ wrestlers }: WrestlerProps) => {
  const [main, toCompare] = wrestlers;

  const { data: first } = useSWR<SuperWrestler>(
    `/api/wrestlers/${main}`,
    fetcher
  );

  const { data: second } = useSWR<SuperWrestler>(
    first && toCompare && `/api/wrestlers/${toCompare}`,
    fetcher
  );

  const newWindow = (url: string) => window.open(url, "_blank");

  if (!first) return <p> Loading... </p>;

  return (
    <MainLayout>
      <Stack align="center">
        {first.identity && (
          <Image src={first.identity} alt="" width={300} height={300} />
        )}

        <Group>
          {Object.entries(first?.social as Object).map(
            ([media, value], index) => (
              <ActionIcon
                key={index}
                color="blue"
                variant="outline"
                onClick={() =>
                  newWindow(
                    media === "website"
                      ? value
                      : SOCIAL[media as keyof typeof SOCIAL]["source"] +
                          "/" +
                          value
                  )
                }
              >
                {SOCIAL[media as keyof typeof SOCIAL]["icon"]}
              </ActionIcon>
            )
          )}
        </Group>

        <span style={{ textAlign: "center", padding: "2rem" }}>
          {first.description}
        </span>
      </Stack>

      {second && <Table wrestlers={[first, second]} />}

      <Tweets items={first.tweets as CustomTweet[]} />

      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </MainLayout>
  );
};

interface Params {
  path: string[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [main, vs, toCompare] = params?.path as string[];

  try {
    await fetch(ACTION + `/wrestlers/${main}`);
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      wrestlers: params?.path?.length === 1 ? [main] : [main, toCompare],
    },
  };
};

export default Wrestler;
