import { TextInput } from "@mantine/core";
import { GlobalContext } from "pages/dashboard/[wrestler]";
import { useContext, useMemo } from "react";
import type { SuperWrestler } from "types/app";

const Main = () => {
  const { state: form, dispatch } = useContext(GlobalContext);

  const base = useMemo(
    () => ({
      identity: form.identity,
      alias: form.slug,
      description: form.description,
    }),
    []
  );

  return (
    <>
      <h1 id="main"> MAIN </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
        {Object.entries(base).map(([field, value], index) => (
          <TextInput
            key={`${field}-${index}`}
            label={field}
            placeholder={field}
            value={form[field as keyof SuperWrestler] as string}
            onChange={(event) =>
              dispatch({
                type: "SET_INDIE",
                field,
                data: event.currentTarget.value,
              })
            }
          />
        ))}
      </div>
    </>
  );
};

export default Main;
