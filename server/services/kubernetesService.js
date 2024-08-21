// Lines 2 - 31 are just basic kubernetes API setup
import * as k8s from '@kubernetes/client-node';
// Creates the config file that the server will be using to communicate with the cluster
const kc = new k8s.KubeConfig();
kc.loadFromOptions({
    clusters: [
        {
            name: 'main-cluster',
            server: 'https://blue-mocha.com:30006',
            skipTLSVerify: true,
        },
    ],
    users: [
        {
            name: 'main-user',
            token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImhzU0E2OUlaSno2VmZRSnpJNjhLLWJGalQyaUZWbkJJUkpmVVdPYU1WV2cifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzI2Nzc1OTkzLCJpYXQiOjE3MjQxODM5OTMsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwianRpIjoiYTliMWQzOTQtM2JlNi00ZGVkLWFmZjEtOTYwNzY1N2I2YzRjIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJkZWZhdWx0Iiwic2VydmljZWFjY291bnQiOnsibmFtZSI6Ims4c3RhdGUiLCJ1aWQiOiI2MWNlODAyZS1lNzY5LTQyNzMtYjkxNS1kMzNiYmFjYjdlNDMifX0sIm5iZiI6MTcyNDE4Mzk5Mywic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6azhzdGF0ZSJ9.ZF4pDBwIOqLyhy6GQdnAoorwue-JDcczQW8eLwPTp8SDOoLv1l-R7tah-auTzzh5UmPAhTRF5gsiwbrDJZvkgddCgTVy8PjZJ5RS1q9wRVAWMO7pUMg8AtvPcafnfw86iy5Q3eitVi42zGfpWUdZRbrevzgqbq4me0aNdiWJKR-_rgIodv_ABM2XY_RMqsI3mcJ6yv8DSuF8FyTsfEB7N9sOmAdXOy2tpia8AgAyRx20nIFexIAusjObrjCPIaN7a5K8wFNidDVb7CJ5SOmuWvrkzzA-JOxUuQs-OA9SRPIh69DMg9Z-lUVNZzWJbKITYV7ocbrC7OWRKf_W64tfeQ',
        },
    ],
    contexts: [
        {
            name: 'main-context',
            cluster: 'main-cluster',
            user: 'main-user',
        },
    ],
    currentContext: 'main-context',
});
// Creates an instance of a Kubernetes API Client to interact with the Kubernetes API
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// Defines helper functions that will connect middleware to the Kubernetes API Client functions
const kubernetesService = {
    // Function that gets all pods from the cluster
    getPodsFromCluster: async () => {
        try {
            const res = await k8sApi.listPodForAllNamespaces();
            return res.body.items;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error fetching all pod details from the cluster.`);
        }
        ;
    },
    // Function that gets a specific pod's details from the cluster
    getPodDetailsFromCluster: async (podName, namespace) => {
        try {
            const res = await k8sApi.readNamespacedPod(podName, namespace);
            return res.body;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error fetching pod details from the cluster for pod name: ${podName} in namespace: ${namespace}.`);
        }
    },
    // Function that gets all services from the cluster
    getServicesFromCluster: async () => {
        try {
            const res = await k8sApi.listServiceForAllNamespaces();
            return res.body.items;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error fetching all service data from the cluster.`);
        }
    },
    // Function that gets all nodes from the cluster
    getNodesFromCluster: async () => {
        try {
            const res = await k8sApi.listNode();
            return res.body.items;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error fetching all node data from the cluster.`);
        }
    }
};
// Exports service object for use as helper functions
export default kubernetesService;
