import { MantineTheme } from "@mantine/core";

export const theme: Partial<MantineTheme> = {
  fontFamily: "IBM Plex Sans",
  components: {
    TextInput: {
      defaultProps: {
        size: "lg",
      },
    },
    Button: {
      defaultProps: {
        color: "teal",
      },
    },
    Select: {
      defaultProps: {
        size: "lg",
      },
    },
    Switch: {
      defaultProps: {
        size: "lg",
        color: "teal"
      },
    },
  },
};
