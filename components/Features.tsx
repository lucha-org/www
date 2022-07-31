import { Select, SimpleGrid, Stack, Switch } from "@mantine/core";
import { fetcher } from "lib/fetcher";
import { CATEGORIES } from "lib/strings";
import { GlobalContext } from "pages/dashboard/[wrestler]";
import { useCallback, useContext, useEffect } from "react";
import useSWR from "swr";

const Features = () => {
  const { state: form, dispatch, mode } = useContext(GlobalContext);

  const { data: features } = useSWR<string[]>(
    form.category && `/api/categories/${form.category}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const resolveFeatures = useCallback(() => {
    const data: Record<string, boolean> = {};
    for (const feat of features ?? []) {
      data[feat] = true;
    }
    dispatch({ type: "SET_INDIE", field: "features", data });
  }, [features, dispatch]);

  useEffect(() => {
    resolveFeatures();
  }, [features, resolveFeatures]);

  return (
    <>
      <h1 id="features"> FEATURES </h1>
      <Stack>
        <Select
          label="Category"
          data={CATEGORIES}
          value={form.category}
          onChange={(data) =>
            dispatch({ type: "SET_INDIE", field: "category", data })
          }
        />

        {mode === "init" ? (
          features?.map((feat, index) => (
            <SimpleGrid cols={2} key={`feat-${index}`}>
              <Switch
                label={feat}
                id={`feat-${index}`}
                checked={form?.features?.[feat]}
                onChange={({ currentTarget: { checked } }) => {
                  const data = { ...form.features };
                  data[feat] = checked;
                  dispatch({ type: "SET_INDIE", field: "features", data });
                }}
              />
            </SimpleGrid>
          ))
        ) : (
          <a
            href={`https://github.com/${form.slug}/Luchador`}
            target="_blank"
            rel="noreferrer"
          >
            Edit Features
          </a>
        )}
      </Stack>
    </>
  );
};

export default Features;
