import type React from "react"
import { useState } from "react"

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState<string>(
    "Kubernetes API (default)",
  )

  const handleSettingSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div
      className="container"
      id="settings-container"
      style={{ textAlign: "center" }}
    >
      <div className="container" id="current-settings-container">
        <section className="settings" id="current-settings">
          Current Mode: {selectedOption}
        </section>
        <br />
      </div>
      <form
        className="settings"
        id="settings-menu"
        style={{ display: "inline-block", textAlign: "left" }}
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
      </form>
    </div>
  )
}

export default Settings
