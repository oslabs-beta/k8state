import './ReadMe.css'

export default function ReadMe () {

    return (

      <section className="readme-section">
        <h2 className="readme-title">How to Run the Application</h2>
        <h3>## If this application is already running locally, you can skip this section. ##</h3>
        <div className="instructions">
          <p>
            Follow these steps to clone and run the K8State application on your local machine:
          </p>
          <ol>
            <li><strong>Clone the repository:</strong></li>
            <pre><code>git clone https://github.com/oslabs-beta/k8state.git</code></pre>
  
            <li><strong>Navigate to the client directory:</strong></li>
            <pre><code>cd k8state</code></pre>
            <pre><code>cd client</code></pre>

            <li><strong>Install dependencies:</strong></li>
            <pre><code>npm install</code></pre>

            <li><strong>Start the client:</strong></li>
            <pre><code>npm run dev</code></pre>

            <li><strong>Navigate to the server directory:</strong></li>
            <pre><code>cd ..</code></pre>
            <pre><code>cd server</code></pre>
  
            <li><strong>Install dependencies:</strong></li>
            <pre><code>npm install</code></pre>
  
            <li><strong>Start the development server:</strong></li>
            <pre><code>npm run server</code></pre>
  
            <li><strong>Access the app:</strong></li>
            <p>Once the server is running, open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a> in your browser to view the application.</p>
  
          </ol>
        </div>
      </section>
    );
  };