import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material"
import logoSVG from "../../public/logo.svg"
import logoPNG from "../../public/logo.png"
import "./landingpage.css"

export default function LandingPage() {
  return (
    <Box sx={{ minWidth: "750px" }}>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(to bottom, white 70%, rgba(255, 255, 255, 0))",
          transition: "background-color 0.5s ease",
        }}
        color="transparent"
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img
            src={logoSVG}
            alt="App logo"
            style={{ width: "50px", marginRight: "15px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            K8STATE
          </Typography>
          <Button color="inherit">Meet The Team</Button>
          <Button color="inherit">Read Me</Button>
        </Toolbar>
      </AppBar>
      {/* Main Content */}
      <Container className="landingpage" maxWidth="lg" sx={{ pt: 6 }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          direction="column"
          textAlign="center"
        >
          <Grid item xs={12}>
            <img
              className="logo-main App-logo-float"
              src={logoPNG}
              alt="App logo"
              style={{ width: "100%", maxWidth: "300px", marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={12}>
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
    </Box>
  )
}
