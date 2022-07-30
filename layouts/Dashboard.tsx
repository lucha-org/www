import {
  ActionIcon,
  AppShell, Group, Header, Navbar, NavLink, useMantineColorScheme, type NavLinkProps
} from "@mantine/core";
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const Links: NavLinkProps[] = [
  {
    label: "Wrestlers",
  },
];

const CustomNavbar = () => {
  const { pathname, push } = useRouter();

  return (
    <Navbar p="sm" width={{ base: 200 }}>
      <Navbar.Section grow>
        {Links.map((link, index) => (
          <NavLink
            key={index}
            color="teal"
            variant="light"
            active={pathname.includes("dashboard")}
            {...link}
          />
        ))}
      </Navbar.Section>
      <NavLink />
    </Navbar>
  );
};

const CustomHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark" ? true : false;

  return (
    <Header height={70}>
      <Group position="apart" p="sm">
        <div />
        <Group>
          <ActionIcon variant="filled" color="red" onClick={() => signOut()}>
            <ExitIcon />
          </ActionIcon>
          <ActionIcon variant="outline" onClick={() => toggleColorScheme()}>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </ActionIcon>
        </Group>
      </Group>
    </Header>
  );
};

const UserLayout = ({ children }: UserLayoutProps) => {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated" ? true : false;

  return (
    <>
      <Head>
        <title> Home </title>
      </Head>
      <AppShell navbar={<CustomNavbar />} header={<CustomHeader />}>
        {children}
      </AppShell>
    </>
  );
};

export default UserLayout;
