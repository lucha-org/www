import {
  ActionIcon,
  Button,
  Container,
  Group,
  useMantineColorScheme
} from "@mantine/core";
import { GitHubLogoIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Menu = () => {
  const { status } = useSession();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isAuth = status === "authenticated" ? true : false;
  const isDarkMode = colorScheme === "dark" ? true : false;

  return (
    <Container>
      <Group position="apart" p="sm">
        <div>
          <Image src="/static/luchador.svg" alt="Logo" width={35} height={35} />
        </div>

        <Group>
          {!isAuth && (
            <Button
              rightIcon={<GitHubLogoIcon />}
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/dashboard",
                })
              }
            >
              Sign In
            </Button>
          )}
          <ActionIcon variant="outline" onClick={() => toggleColorScheme()}>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </ActionIcon>
        </Group>
      </Group>
    </Container>
  );
};

export default Menu;
