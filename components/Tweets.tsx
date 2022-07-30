import { Button, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { GlobalContext } from "pages/dashboard/[wrestler]";
import { useContext } from "react";
import type { CustomTweet } from "types/app";

const Tweets = () => {
  const { state: form, dispatch } = useContext(GlobalContext);

  return (
    <>
      <h1 id="tweets"> TWEETS </h1>
      <Stack>
        {(form.tweets as CustomTweet[]).map((tweet, index) => (
          <SimpleGrid key={`tweet-${index}`} cols={2}>
            <TextInput
              placeholder="Username"
              value={(form.tweets as CustomTweet[])[index].user}
              onChange={(event) => {
                const data = event.currentTarget.value;
                dispatch({ type: "SET_TWEET", index, data, key: "user" });
              }}
            />

            <TextInput
              placeholder="Status"
              value={(form.tweets as CustomTweet[])[index].status}
              onChange={(event) => {
                const data = event.currentTarget.value;
                dispatch({ type: "SET_TWEET", index, data, key: "status" });
              }}
            />
          </SimpleGrid>
        ))}
      </Stack>

      <Button onClick={() => dispatch({ type: "ADD_TWEET" })}>Add Tweet</Button>
    </>
  );
};

export default Tweets;
