import { Button, Group, Select, Stack } from "@mantine/core";
import MainLayout from "layouts/Parent";
import { CATEGORIES, WRESTLERS } from "lib/strings";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [category, setCategory] = useState("blog");
  const [fight, setFight] = useState<string[]>(["", ""]);

  const [main, toCompare] = fight;
  const byCategory = WRESTLERS[category as keyof typeof WRESTLERS];

  return (
    <MainLayout>
      <Stack align="center" justify="center" sx={{ height: "90vh" }}>
        <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: 700 }}>
          Your Comparison Pages, Free.
        </h1>

        <Select
          autoFocus
          value={category}
          data={CATEGORIES}
          onChange={(value) => setCategory(value as string)}
          sx={{ marginBottom: "1rem" }}
        />

        <Group>
          <Select
            data={byCategory}
            value={fight[0]}
            onChange={(value) => {
              const copy = [...fight];
              copy[0] = value as string;
              setFight(copy);
            }}
          />

          <span style={{ textAlign: "center" }}> VS </span>

          <Select
            data={byCategory}
            value={fight[1]}
            onChange={(value) => {
              const copy = [...fight];
              copy[1] = value as string;
              setFight(copy);
            }}
          />
        </Group>

        <Link href={`/${main}/vs/${toCompare}`} passHref>
          <Button disabled={fight.length < 2} size="xl" color="red">
            Fight
          </Button>
        </Link>
      </Stack>
    </MainLayout>
  );
};

export default Home;
