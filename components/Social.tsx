import { SimpleGrid, TextInput } from "@mantine/core";
import { GlobalContext } from "pages/dashboard/[wrestler]";
import { SOCIAL } from "pages/[...path]";
import { useContext } from "react";

const Social = () => {
  const { state: form, dispatch } = useContext(GlobalContext);

  return (
    <>
      <h1 id="social"> SOCIAL </h1>
      <SimpleGrid cols={2}>
        {Object.entries(form.social as Record<string, string>).map(
          ([media, value], index) => (
            <TextInput
            key={`social-${media}`}
              sx={{ width: "100%" }}
              icon={SOCIAL[media as keyof typeof SOCIAL]["icon"]}
              value={(form.social as Record<string, string>)[media]}
              onChange={(event) =>
                dispatch({
                  type: "SET_SOCIAL",
                  data: { [media]: event.currentTarget.value },
                })
              }
            />
          )
        )}
      </SimpleGrid>
    </>
  );
};

export default Social;
