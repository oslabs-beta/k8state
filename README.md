# K8State: Kubernetes Dashboard

K8State is a comprehensive Kubernetes dashboard application designed to provide real-time insights into your Kubernetes clusters. With K8State, you can monitor, manage, and optimize your Kubernetes resources through a user-friendly interface built on modern web technologies.

## Features

• Real-Time Monitoring: View the status of pods, nodes, and services in real-time.
• Resource Visualization: Graphical representation of resource utilization, leveraging Prometheus and Grafana.
• Interactive UI: Built with React, Redux, React-Flow and Material-UI, offering a responsive and intuitive interface.
• Scalability: Designed to scale with your Kubernetes clusters, supporting multiple namespaces and contexts.
• Extensibility: Easily extendable through a modular architecture to accommodate custom metrics and features.

## Prerequisites

• Node.js (v14.x or higher)
• Kubernetes Cluster URL / Bearer Token
• Prometheus and Grafana (Installed on the Kubernetes Cluster)
• Helm (for deploying Grafana on the cluster)
• npm or Yarn

More information about how to generate a bearer token:
https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_token/

## Installation

1. Clone the Repository

```sh
git clone https://github.com/your-username/k8state.git
cd k8state
```

2. Install dependencies in both the client and server folders

Using npm:

```sh
cd client
npm install

cd server
npm install

```

Using yarn:

```sh
yarn install
```

## Grafana / Prometheus

In order to import your Grafana dashboard, Grafana must be installed in the
cluster. If you already have a Grafana dashboard, ensure the 'allow_embedding'
property is enabled and restart Grafana.

Check this documentation to set up grafana:
https://grafana.com/docs/grafana/latest/setup-grafana/installation/kubernetes/

After installing Grafana, you can then create and import that dashboard to be
used in the application. This allows you to centralize monitoring and viewing
tools within a single application.

We recommend also installing Prometheus to automatically scrape
the cluster for necessary metrics. Both Prometheus and Grafana can be installed
using Helm.

To create your dashboard, log in to Grafana and add your Prometheus URL as a new
data source under 'Connections'. Once saved and tested, you'll be able to
customize a dashboard on Grafana, allowing you to generate a link for embedding.
Input this link in the Grafana Dashboard prompt in the application.

## Scripts

- `dev` - start dev server on port 3000
- `server` - start backend server on port 8080

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

## Technology Stack (This application uses Typescript)

    •	Frontend: React, Redux, React-Flow, Material-UI
    •	Backend: Node.js, Express
    •	Metrics and Monitoring: Prometheus, Grafana
    •	Data Management: Kubernetes API
    •	Deployment: Kubernetes, Helm

## Creators

- [Vincent Collis](https://github.com/VincentCollis)
- [Jonathan Wu](https://github.com/Jon-Wu1)
- [Michael Chen](https://github.com/mochamochaccino)
- [Alex Greenberg](https://github.com/AlexG0718)
