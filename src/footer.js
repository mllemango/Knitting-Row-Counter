import React from "react";
import { Typography, Link } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";

var style = {
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  alignItems: "center",
  justifyContent: "center",
  display: "inline-flex",
  left: "0",
  bottom: "0",
  height: "20px",
  width: "100%",
  backgroundColor: 'white'
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
  
};

function Footer() {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <Typography
          color="secondary"
          variant="overline"
          style={{ paddingRight: 20 }}
        >
          <Link
            color="inherit"
            href="https://github.com/mllemango/Knitting-Row-Counter"
            target="_blank"
          >
            <GitHubIcon
              style={{ paddingRight: 10, position: "relative", top: "8px" }}
            />
            Project on GitHub
          </Link>
        </Typography>
        <Typography color="secondary" variant="overline">
          <Link color='inherit' href="mailto:mel.wang24@gmail.com" target="_blank">
            <MailIcon
              style={{ paddingRight: 10, position: "relative", top: "8px" }}
            />
            Contact Me
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
