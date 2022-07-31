import { Card as Container } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Organization } from "types/octokit";

interface CardProps extends Organization {}

const Card = ({ avatar_url, description, login, id }: CardProps) => {
  const { push } = useRouter();

  return (
    <Container onClick={() => push(`/dashboard/${login}`)}>
      <Image
        alt="Logo"
        width={100}
        height={100}
        src={avatar_url}
        style={{ borderRadius: "5px" }}
      />

      <h1 style={{ color: "#fff" }}> {login} </h1>
      {/* <small>{description || "No Description"}</small> */}
    </Container>
  );
};

export default Card;
