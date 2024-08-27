// Lines 2 - 33 are basic kubernetes API setup
import * as k8s from '@kubernetes/client-node';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
    },
    checkAPI: async (key, address) => {
        try {
            const test = await fetch('https://' + address + '/api/v1/nodes', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + key
                }
            });
            console.log(test);
            if (test.status !== 200) {
                //console.log(test.status);
                return 'invalidkey';
            }
            else {
                return 'ok';
            }
        }
        catch (error) {
            //console.log(error);
            if (error instanceof Error) {
                return error;
                // return {
                //     name: error.name,
                //     message: error.message,
                //     //stack: error.stack
                // } as err;
            }
        }
    },
    //function that checks if the environment variables exist and if the env file exists, otherwise create it
    checkEnv: () => {
        // console.log(process.env.KUBERNETES_SERVER);
        // console.log(process.env.KUBERNETES_TOKEN);
        //console.log('envcheck run');
        if (!process.env.KUBERNETES_SERVER || !process.env.KUBERNETES_TOKEN) {
            const envPath = path.resolve(path.resolve('./.env'));
            if (!fs.existsSync(envPath)) {
                const defaultEnv = 'KUBERNETES_SERVER=\n' + 'KUBERNETES_TOKEN=';
                fs.writeFileSync(envPath, defaultEnv.trim());
                return 'init';
            }
            else {
                return 'noVar';
            }
        }
        else {
            return 'exist';
        }
    },
    writeEnv: () => {
    }
};
// Exports service object for use as helper functions
export default kubernetesService;
