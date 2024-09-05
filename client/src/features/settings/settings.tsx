import type React from "react"
import { useState } from "react"

const Settings = () => {
  // state for mode option functionality
  // const [selectedOption, setSelectedOption] = useState<string>(
  //   "Kubernetes API (default)",
  // )

  // setting selector function for mode option functionality
  // const handleSettingSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedOption(event.target.value)
  // }

  const [envOption, setEnvOption] = useState<boolean>(false)
  const [envAddress, setEnvAddress] = useState<string | null>(null)
  const [envKey, setEnvKey] = useState<string | null>(null)
  const [envToolTip, setEnvToolTip] = useState<boolean | null>(null)
  const [envToolTipMessage, setEnvToolTipMessage] = useState<string | null>(
    null,
  )

  const handleEditClick = () => {
    setEnvOption(true)
  }
  const handleEnvSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    fetch("http://localhost:8080/api/checkAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: envAddress,
        key: envKey,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "ok") {
          setEnvToolTipMessage("Success!")
          setEnvToolTip(true)
          setTimeout(() => setEnvToolTip(false), 5000)
        } else {
          setEnvToolTipMessage("Invalid Address or Key")
          setEnvToolTip(true)
          setTimeout(() => setEnvToolTip(false), 5000)
        }
      })
    setEnvOption(false)
  }

  return (
    <div
      className="container"
      id="settings-container"
      style={{
        position: "sticky",
        marginTop: "100px",
        marginLeft: "300px",
        textAlign: "center",
        backgroundColor: "#ac96cf",
        paddingBottom: "20px",
      }}
    >
      <div
        className="container"
        id="env-settings-container"
        style={{ margin: "15px", padding: "5px" }}
      >
        <section>
          <h2 style={{ textDecoration: "underline" }}>
            .ENV settings for API access
          </h2>
          <form className="env-settings" id="env-settings-form">
            <br />
            <label style={{ fontWeight: "bold" }}>
              Set new .ENV Address and Key
            </label>
            <br />
            <button
              type="button"
              style={{ borderRadius: "10px", marginTop: "10px" }}
              onClick={handleEditClick}
            >
              Edit
            </button>
            <br />
            <div
              className="container"
              id="env-settings-input"
              style={{ marginTop: "20px" }}
            >
              {envOption && (
                <input
                  type="text"
                  placeholder="Cluster Address"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEnvAddress(e.target.value)
                  }
                />
              )}
              <br />
              {envOption && (
                <input
                  type="text"
                  placeholder="Cluster Key"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEnvKey(e.target.value)
                  }
                />
              )}
              <br />
              {envOption && (
                <button type="submit" onClick={e => handleEnvSubmit(e)}>
                  Submit
                </button>
              )}
              <br />
              {envToolTip && (
                <div
                  className="settings-tooltip"
                  id="settings-env-tooltip"
                  style={{ marginTop: "10px" }}
                >
                  {envToolTipMessage}
                </div>
              )}
            </div>
          </form>
        </section>
      </div>
      {/* TSX component for mode option functionality
      <div className="container" id="current-settings-container">
        <section
          className="settings"
          id="current-settings"
          style={{
            paddingTop: "5px",
            paddingBottom: "5px",
            backgroundColor: "#ac96cf",
            fontWeight: "bold",
          }}
        >
          Current Mode: {selectedOption}
        </section>
        <br />
      </div>
      <form
        className="settings"
        id="settings-menu"
        style={{
          display: "inline-block",
          textAlign: "left",
          backgroundColor: "#c8eaeb",
          padding: "10px",
          paddingBottom: "10px",
        }}
      >
        <label>Select Mode:</label>
        <br />
        <input
          type="radio"
          id="kubernetes-setting"
          name="kubernetes-mode"
          value="Kubernetes API"
          onChange={handleSettingSelect}
          checked={selectedOption === "Kubernetes API"}
        />
        <label htmlFor="kubernetes-setting">Kubernetes API</label>
        <br />
        <input
          type="radio"
          id="prometheus-setting"
          name="prometheus-mode"
          value="Prometheus API"
          onChange={handleSettingSelect}
          checked={selectedOption === "Prometheus API"}
        />
        <label htmlFor="prometheus-setting">Prometheus API</label>
        <br />
        <input
          type="radio"
          id="grafana-setting"
          name="grafana-mode"
          value="Grafana API"
          onChange={handleSettingSelect}
          checked={selectedOption === "Grafana API"}
        />
        <label htmlFor="grafana-setting">Grafana API</label>
      </form> */}
    </div>
  )
}

export default Settings
