import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';
import kubernetesService from '../services/kubernetesService.js';

// Controller object that contains middleware functions
const kubernetesController = {

    // Middleware function to get all pods from the cluster
    getPods: async (_req: Request, res: Response, next: NextFunction) => {
        const allPods = await (kubernetesService.getPodsFromCluster());
        interface ReturnedPod {
            name: string;
            creationTimestamp: Date | undefined;
            namespace: String;
            labels: {[key: string]: string;} | undefined;
            nodeName: String | undefined;
            // containers: k8s.V1Container[] | undefined; //(Stretch)
            restartPolicy: String;
            hostIP: String;
            podIP: String;
            phase: string | undefined;
            // conditions: k8s.V1PodCondition[] | undefined; //(Pod Health)
            startTime: Date | undefined;
        }
        const returnedPods: ReturnedPod[] = [];
        for (const pod of allPods) {
            const newPod: ReturnedPod = {
                name: pod.metadata?.name || 'Unknown Pod Name',
                creationTimestamp: pod.metadata?.creationTimestamp || undefined,
                namespace: pod.metadata?.namespace || 'Unknown namespce',
                labels: pod.metadata?.labels || undefined,
                nodeName: pod.spec?.nodeName,
                // containers: pod.spec?.containers || undefined, //(Stretch)
                restartPolicy: pod.spec?.restartPolicy || 'Unknown restart policy',
                hostIP: pod.status?.hostIP || 'Unknown host IP',
                podIP: pod.status?.podIP || 'Unknown pod IP',
                phase: pod.status?.phase || 'Unknown phase',
                // conditions: pod.status?.conditions || undefined, //(Pod Health)
                startTime: pod.status?.startTime || undefined,
            }
            returnedPods.push(newPod);
        }
        res.locals.podData = returnedPods;
        next();
    },

    // Middleware function to get details on a single pod from the cluster
    getPodDetails: async (req: Request, res: Response, next: NextFunction) => {
        const { podName, namespace } = req.params;
        interface ReturnedPod {
            name: string;
            creationTimestamp: Date | undefined;
            namespace: String;
            labels: {[key: string]: string;} | undefined;
            nodeName: String | undefined;
            // containers: k8s.V1Container[] | undefined; //(Stretch)
            restartPolicy: String;
            hostIP: String;
            podIP: String;
            phase: string | undefined;
            // conditions: k8s.V1PodCondition[] | undefined; //(Pod Health)
            startTime: Date | undefined;
        }
        try {
            const pod = await kubernetesService.getPodDetailsFromCluster(podName, namespace);
            const newPod: ReturnedPod = {
                name: pod.metadata?.name || 'Unknown Pod Name',
                creationTimestamp: pod.metadata?.creationTimestamp || undefined,
                namespace: pod.metadata?.namespace || 'Unknown namespce',
                labels: pod.metadata?.labels || undefined,
                nodeName: pod.spec?.nodeName,
                // containers: pod.spec?.containers || undefined, //(Stretch)
                restartPolicy: pod.spec?.restartPolicy || 'Unknown restart policy',
                hostIP: pod.status?.hostIP || 'Unknown host IP',
                podIP: pod.status?.podIP || 'Unknown pod IP',
                phase: pod.status?.phase || 'Unknown phase',
                // conditions: pod.status?.conditions || undefined, //(Pod Health)
                startTime: pod.status?.startTime || undefined,
            }
            res.locals.pod = newPod;
            next();
        }
        catch(error) {
            console.log(error);
            throw new Error(
                `Error occurred while fetching pod data for pod: ${podName} in namespace: ${namespace}`
            )
        }
    },

    // Middleware function to get all nodes from the cluster
    getNodes: async (_req: Request, res: Response, next: NextFunction) => {
        const allNodes = await (kubernetesService.getNodesFromCluster());
        interface ReturnedNode {
            name: String | undefined;
            namespace: String | undefined;
            creationTimestamp: Date | undefined;
            podCIDR: String | undefined;
            addresses: k8s.V1NodeAddress[] | undefined;
            // podCIDRs: String[];
            allocatable: {[key: string]: string} | undefined;
            capacity: {[key: string]: string} | undefined;
            conditions: k8s.V1NodeCondition[] | undefined,
            labels: {[key: string]: string} | undefined,
        }
        const returnedNodes: ReturnedNode[] = [];
        for (const node of allNodes) {
            const newNode: ReturnedNode = {
                creationTimestamp: node.metadata?.creationTimestamp,
                name: node.metadata?.name,
                namespace: node.metadata?.namespace,
                labels: node.metadata?.labels,
                podCIDR: node.spec?.podCIDR,
                addresses: node.status?.addresses,
                allocatable: node.status?.allocatable,
                capacity: node.status?.capacity,
                conditions: node.status?.conditions,
            }
            returnedNodes.push(newNode);
        }
        res.locals.nodeData = returnedNodes;
        next();
    },

    // Middleware function to get all services from the cluster
    getServices: async (_req: Request, res: Response, next: NextFunction) => {
        const allServices = await (kubernetesService.getServicesFromCluster());
        interface ReturnedServices {
            name: String | undefined;
            namespace: String | undefined;
            labels: {[key: string]: string} | undefined,
            creationTimestamp: Date | undefined;
            clusterIP: String | undefined;
            ports: k8s.V1ServicePort[] | undefined;
            selector: {[key: string]: string} | undefined;
            type: String | undefined;
        }

        const returnedServices: ReturnedServices[] = [];

        for(const services of allServices){
            const newService: ReturnedServices = {
                name: services.metadata?.name,
                namespace: services.metadata?.namespace,
                labels: services.metadata?.labels,
                creationTimestamp: services.metadata?.creationTimestamp,
                clusterIP: services.spec?.clusterIP,
                ports: services.spec?.ports,
                selector: services.spec?.selector,
                type: services.spec?.type,
            }
            returnedServices.push(newService);
        }
        res.locals.serviceData = returnedServices;
        next();
    }

};

// Exports the controller object for use as middleware
export default kubernetesController;