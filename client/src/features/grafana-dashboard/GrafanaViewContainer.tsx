import { useState } from 'react'
import type React from 'react'
import './Grafana.css'

export default function GrafanaViewContainer () {

    const [iframeURL, setIframeURL] = useState("");

    const Form = () => {
        const [inputValue, setInputValue] = useState("");

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        }

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIframeURL(inputValue);
        };

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

                    <button type={"submit"}><strong>Connect</strong></button>

                </form>
            </div>
        )

    }

    const Dashboard = () => {
        return (
          <div className="iframe-container">
            <iframe
              title="Grafana Dashboard"
              src={iframeURL}
              style={{ width: '100vh', height: '80vh', border: 'none', position: 'relative' }}
            />
          </div>
        );
      };

    // **********************************
    // **   Render Grafana dashboard   **
    // **********************************
    return (
        <>
        {iframeURL !== ""/** && Link Works */ ?  <Dashboard/> : <Form/> }
        </>
    )
}