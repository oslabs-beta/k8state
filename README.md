# K8State: Kubernetes Dashboard

K8State is a comprehensive Kubernetes dashboard application designed to provide real-time insights into your Kubernetes clusters. With K8State, you can monitor, manage, and optimize your Kubernetes resources through a user-friendly interface built on modern web technologies.

## Features

•	Real-Time Monitoring: View the status of pods, nodes, and services in real-time.
•	Resource Visualization: Graphical representation of resource utilization, leveraging Prometheus and Grafana.
•	Interactive UI: Built with React, Redux, React-Flow and Material-UI, offering a responsive and intuitive interface.
•	Scalability: Designed to scale with your Kubernetes clusters, supporting multiple namespaces and contexts.
•	Extensibility: Easily extendable through a modular architecture to accommodate custom metrics and features.

## Prerequisites

•	Node.js (version 14 or higher)
•	npm or Yarn
•	Kubernetes Cluster 

## Optional

•	Prometheus instance running in your Kubernetes cluster
•	Grafana instance for visualizations

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Installation

1. Clone the Repository
```sh
git clone https://github.com/your-username/k8state.git
cd k8state
```

2. Install Dependencies

Using npm:
```sh
npm install
```

Using yarn:

```sh
yarn install
```

## Configuration

Create a .env file in the root directory and add the following variables:
• The server address either an IP or a domain name
• A bearer token generated from the kubernetes cluster.
https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_token/
```
KUBERNETES_SERVER=https://kubernetes-server.com:00000
KUBERNETES_TOKEN=Insert_Your_Token_Here
```

## Running the Application

1. Start the Backend

In the root directory:

```sh
cd server
npm run server
```
Starts the server on http://localhost:8080


2. Start the Frontend

In the root directory:

```sh
cd client
npm run build
npm run start
```
Starts the client on http://localhost:3000

<!-- - [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib) -->
