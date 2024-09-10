import { useState } from "react"
import { setIframeSrc } from "./GrafanaDashboardApiSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type React from "react"
import "./Grafana.css"
import type { RootState } from "../../app/store"

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
      <div className="wrapper">
        <h2>Connect Your Grafana Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <label>Link URL</label>
          <input
            placeholder={"http://your-grafana-instance/d/your-dashboard-id"}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type={"submit"}>
            <strong>Connect</strong>
          </button>
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
        }}
      />
    )
  }

  return <>{iframeURL !== "" ? <Dashboard /> : <Form />}</>
}
