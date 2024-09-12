import { useState } from "react"
import { setIframeSrc } from "./GrafanaDashboardApiSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type React from "react"
import "./Grafana.css"
import type { RootState } from "../../app/store"
import { TextField, Button } from "@mui/material"

export default function GrafanaViewContainer() {
  const iframeURL = useAppSelector((state: RootState) => state.iframe.src)

  const Form = () => {
    const [inputValue, setInputValue] = useState("")
    const dispatch = useAppDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(setIframeSrc(inputValue))
    }

    return (
      <div
        className="wrapper"
        style={{ position: "relative", left: "-45px", top: "-75px" }}
      >
        <h2>Connect Your Grafana Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Grafana URL"
            color="primary"
            variant="outlined"
            placeholder="http://your-grafana-instance/d/your-dashboard-id"
            focused
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button type="button">Connect</Button>
        </form>
      </div>
    )
  }

  const Dashboard = () => {
    return (
      <iframe
        title="Grafana Dashboard"
        src={iframeURL}
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          position: "relative",
          marginTop: "30px",
        }}
      />
    )
  }

  return <>{iframeURL !== "" ? <Dashboard /> : <Form />}</>
}
