// Lines 2 - 7 are just basic kubernetes API setup
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// Function that gets all pods from the cluster
export const getPodsFromCluster = () => {

}

// Function that gets a specific pod's details from the cluster
export const getPodDetailsFromCluster = () => {

}

// Function that gets all services from the cluster
export const getServicesFromCluster = () => {

}

// Function that gets all nodes from the cluster
export const getNodesFromCluster = () => {

}