import { Container } from "@mantine/core";
import Footer from "components/Footer";
import Menu from "components/Menu";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

interface ParentLayoutProps {
  children: ReactNode;
}

const ParentLayout = ({ children }: ParentLayoutProps) => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title> Lucha </title>
      </Head>
      <Menu />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default ParentLayout;
