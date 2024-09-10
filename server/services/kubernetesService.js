// Lines 2 - 33 are basic kubernetes API setup
import * as k8s from '@kubernetes/client-node';
import dotenv from 'dotenv';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
dotenv.config();
// Defines helper functions that will connect middleware to the Kubernetes API Client functions
const kubernetesService = {
    createClient: () => {
        // Creates the config file that the server will be using to communicate with the cluster
        const kc = new k8s.KubeConfig();
        kc.loadFromOptions({
            clusters: [
                {
                    name: 'main-cluster',
                    server: `${process.env.KUBERNETES_SERVER}`,
                    skipTLSVerify: true,
                },
            ],
            users: [
                {
                    name: 'main-user',
                    token: `${process.env.KUBERNETES_TOKEN}`,
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
        return k8sApi;
    },
    // Function that gets all pods from the cluster
    getPodsFromCluster: async () => {
        const k8sApi = kubernetesService.createClient();
        try {
            const res = await k8sApi.listPodForAllNamespaces();
            return res.body.items;
        }
        catch (error) {
            throw new Error(`Error fetching all pod details from the cluster.`);
        }
    },
    // Function that gets a specific pod's details from the cluster
    getPodDetailsFromCluster: async (podName, namespace) => {
        const k8sApi = kubernetesService.createClient();
        try {
            const res = await k8sApi.readNamespacedPod(podName, namespace);
            return res.body;
        }
        catch (error) {
            throw new Error(`Error fetching pod details from the cluster for pod name: ${podName} in namespace: ${namespace}.`);
        }
    },
    // Function that gets all services from the cluster
    getServicesFromCluster: async () => {
        const k8sApi = kubernetesService.createClient();
        try {
            const res = await k8sApi.listServiceForAllNamespaces();
            return res.body.items;
        }
        catch (error) {
            throw new Error(`Error fetching all service data from the cluster.`);
        }
    },
    // Function that gets all nodes from the cluster
    getNodesFromCluster: async () => {
        const k8sApi = kubernetesService.createClient();
        try {
            const res = await k8sApi.listNode();
            return res.body.items;
        }
        catch (error) {
            throw new Error(`Error fetching all node data from the cluster.`);
        }
    },
    // Function that checks if the API is reachable and the authorization works
    checkAPI: async (key, address) => {
        try {
            const test = await fetch('https://' + address + '/api/v1/nodes', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + key,
                },
            });
            if (test.status !== 200) {
                return 'invalidkey';
            }
            else {
                return 'ok';
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return error;
            }
        }
    },
    // Function gets the logs from the logs folder and formats them
    getLogs: async (input) => {
        const k8sApi = kubernetesService.createClient();
        try {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const formattedDate = formatter.format(date);
            const logs = [];
            for (let i = 0; i < input.length; i++) {
                if (input[i].namespace !== 'kube-system' &&
                    input[i].namespace !== 'monitoring') {
                    const result = await k8sApi.readNamespacedPodLog(input[i].name, input[i].namespace);
                    logs.push({
                        name: input[i].name,
                        namespace: input[i].namespace,
                        logs: result.body,
                        date: formattedDate,
                    });
                }
            }
            return logs;
        }
        catch (error) {
            throw new Error(`Something went wrong: ${error.message}`);
        }
    },
};
// Exports service object for use as helper functions
export default kubernetesService;
