import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material"
import logo from "../../public/images/logo.svg"
import "./landingpage.css"

export default function LandingPage() {
  return (
    <>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <img
            src={logo}
            alt="App logo"
            style={{ width: "50px", marginRight: "15px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 5 }}>
            K8STATE
          </Typography>
          {/* <Button color="inherit">Guide</Button> */}
          {/* <Button color="inherit">Config</Button> */}
          <Button color="inherit">Meet The Team</Button>
          <Button color="inherit">Read Me</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container className="landingpage" maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h1" component="h1" gutterBottom>
              K<span style={{ color: "#ad97d0" }}>8</span>STATE
            </Typography>
            <Typography variant="h4" component="p" gutterBottom>
              Revolutionize Kubernetes Management
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              Experience cluster visualization that moves as fast as you do.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginRight: "10px" }}
              href="clusterui"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="https://github.com/oslabs-beta/k8state"
            >
              Visit GitHub
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              className="logo-main"
              src={logo}
              alt="App logo"
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <Container maxWidth="lg">
          <Typography variant="body2" color="#ad97d0" align="center">
            Developed For Engineers by Engineers
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Released under the MIT License.
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Copyright © 2024 K8STATE Contributors
          </Typography>
        </Container>
      </footer>
    </>
  )
}
