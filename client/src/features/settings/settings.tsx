import type * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import { useState } from "react"

const Settings = () => {
  const [inputError, setInputError] = useState<boolean>(false)
  const [envAddress, setEnvAddress] = useState<string | null>(null)
  const [envKey, setEnvKey] = useState<string | null>(null)
  const [envAlertMessage, setEnvAlertMessage] = useState<string | null>(null)
  const [envAlert, setEnvAlert] = useState<boolean>(false)

  const handleEnvSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (inputError === true || envAlertMessage === "Success!") return

    try {
      const response = await fetch("http://localhost:8080/api/checkAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: envAddress,
          key: envKey,
        }),
      })

      const data = await response.json()

      if (data.message === "ok") {
        setEnvAlertMessage("Success!")
        setEnvAlert(true)
        setTimeout(() => setEnvAlert(false), 5000)
        setTimeout(() => setEnvAlertMessage(null), 5000)
      } else {
        setEnvAlertMessage("Invalid Address or Key")
        setEnvAlert(true)
        setInputError(true)
        setTimeout(() => setEnvAlert(false), 5000)
        setTimeout(() => setInputError(false), 5000)
        setTimeout(() => setEnvAlertMessage(null), 5000)
      }
    } catch (error) {
      throw new Error(`Something went wrong: ${(error as Error).message}`)
    }
  }

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      style={{
        position: "relative",
        width: "max-content",
        height: "max-content",
      }}
    >
      <h1
        style={{
          width: "max-content",
          position: "relative",
          alignContent: "center",
          top: "-170px",
          left: "-45px",
        }}
      >
        Change Cluster Address and Key
      </h1>
      <div style={{ position: "relative" }}>
        <TextField
          aria-label="Address"
          label="Address"
          color={envAlertMessage === "Success!" ? "success" : "primary"}
          helperText={
            envAddress?.includes("www.")
              ? "Do not include 'www' before Cluster URL"
              : null
          }
          error={
            inputError ||
            (envAddress?.includes("www.") && !envAddress?.includes("www.com"))
          }
          placeholder="clusterurl.com:00000"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnvAddress(e.target.value)
          }
          focused
          style={{
            position: "absolute",
            top: "-150px",
            left: "45px",
            width: "300px",
          }}
        />
        <TextField
          label="Key"
          color={envAlertMessage === "Success!" ? "success" : "primary"}
          error={inputError}
          placeholder="yJhbGciOiJSUzI1NiIsImtpZCI6ImhzU..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnvKey(e.target.value)
          }
          focused
          style={{
            position: "absolute",
            top: "-60px",
            left: "45px",
            width: "300px",
          }}
        />
        <div
          style={{
            position: "relative",
            top: "10px",
            left: "150px",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant={inputError === true ? "outlined" : "contained"}
              color={
                inputError === true
                  ? "error"
                  : envAlertMessage === "Success!"
                    ? "success"
                    : "secondary"
              }
              disabled={
                envAddress?.includes("www.") && !envAddress?.includes("www.com")
                  ? true
                  : false
              }
              onClick={handleEnvSubmit}
              style={{ marginTop: "16px" }}
            >
              Submit
            </Button>
          </Stack>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "90px",
          top: "145px",
          marginTop: "16px",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          {envAlert && (
            <Alert severity={inputError === true ? "error" : "success"}>
              {envAlertMessage}
            </Alert>
          )}
        </Stack>
      </div>
    </Box>
  )
}

export default Settings
