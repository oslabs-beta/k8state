import { useState } from "react"

export default function PrometheusChart() {
  const [iframes, setIframes] = useState([])

  // Helper function that creates an iframe element
  const createIFrame = (input: string) => {
    return <iframe src={input} />
  }

  return (
    <div id="clusterview-container" className="container">
      <div style={{ width: "100vw", height: "100vh" }}>{iframes}</div>
    </div>
  )
}
