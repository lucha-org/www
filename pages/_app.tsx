import {
  ColorScheme, ColorSchemeProvider, MantineProvider
} from "@mantine/core";
import { theme } from "lib/theme";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ ...theme, colorScheme }}
      >
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
