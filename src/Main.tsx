import React, { FC, ReactNode } from "react";
import { Container } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Main: FC<Props> = ({ children }) => {
  return (
    <Container
      maxWidth={false}
      sx={{ background: "linear-gradient(194deg,#375ae6,#3ebcfe)" }}
    >
      {children}
    </Container>
  );
};

export default Main;
