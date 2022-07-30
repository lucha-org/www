import { Button, Grid, Stack } from "@mantine/core";
import { ACTION } from "lib/strings";
import Image from "next/image";
import { useRouter } from "next/router";
import { GlobalContext } from "pages/dashboard/[wrestler]";
import { useContext } from "react";

import Features from "./Features";
import Main from "./Main";
import Social from "./Social";
import Tweets from "./Tweets";

const Form = () => {
  const { push } = useRouter();
  const { state: form, mode } = useContext(GlobalContext);

  const handleSubmit = async () => {
    // alert(JSON.stringify(form));

    try {
      await fetch(ACTION + `/wrestlers/${form.id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid>
      <Grid.Col span={2}>
        <Stack align="center">
          <Image
            alt={`Logo`}
            width={200}
            height={200}
            src={form.identity as string}
            style={{ borderRadius: "5px" }}
          />

          <Button uppercase type="submit" onClick={() => handleSubmit()}>
            {mode === "init" ? "Submit" : "Save"}
          </Button>
        </Stack>
      </Grid.Col>

      <Grid.Col span={10} p="xl">
        <form>
          <Stack>
            <Main />
            <Social />
            <Features />
            <Tweets />
          </Stack>
        </form>
      </Grid.Col>
    </Grid>
  );
};

export default Form;
