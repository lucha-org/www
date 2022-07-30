import { Box, Container } from "@mantine/core";
import { VercelLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <Container>
      <Box
        component="footer"
        sx={{
          heigth: "30vh",
          display: "flex",
          justifyContent: "space-around",
          margin: "2rem 0",
        }}
      >
        <div>
          <span> Powered By Vercel </span>
          <VercelLogoIcon />
        </div>
        <span> Hashnode X PlanetScale </span>
        <a
          href="https://github.com/lucha-org/www"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB
        </a>
      </Box>
    </Container>
  );
};

export default Footer;
