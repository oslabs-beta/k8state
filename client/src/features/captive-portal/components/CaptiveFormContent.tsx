import * as React from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded"
import DnsRoundedIcon from "@mui/icons-material/DnsRounded"
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded"
//Instruction components for filling out the address and key
const items = [
  {
    icon: <DnsRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Cluster IP Address or URL",
    description:
      "Enter the IP address or URL of your Kubernetes cluster. This will allow the tool to connect and retrieve the necessary information to visualize your cluster setup.",
  },
  {
    icon: <VpnKeyRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Cluster Credentials",
    description:
      "Provide your Kubernetes credentials to authenticate access. Ensure that the credentials have sufficient permissions to access and interact with cluster resources.",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "View Clusterview",
    description:
      'After entering the necessary details, hit the "View Clusterview" button to dynamically render your cluster. Continue exploring for a seamless and interactive visualization experience.',
  },
]

export default function CaptiveFormContent() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  )
}
