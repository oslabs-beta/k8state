import kubernetesService from '../services/kubernetesService.js';
import generalService from '../services/generalService.js';
// ***** Controller Object *****
const kubernetesController = {
    // Middleware function to get all pods from the cluster
    getPods: async (_req, res, next) => {
        try {
            const allPods = await kubernetesService.getPodsFromCluster();
            const returnedPods = [];
            for (const pod of allPods) {
                const newPod = {
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
                    conditions: pod.status?.conditions || undefined,
                    startTime: pod.status?.startTime || undefined,
                    uid: pod.metadata?.uid || undefined,
                };
                returnedPods.push(newPod);
            }
            res.locals.podData = returnedPods;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching pods from cluster' });
        }
    },
    // Middleware function to get details on a single pod from the cluster
    getPodDetails: async (req, res, next) => {
        const { podName, namespace } = req.params;
        try {
            const pod = await kubernetesService.getPodDetailsFromCluster(podName, namespace);
            const newPod = {
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
                conditions: pod.status?.conditions || undefined, //(Pod Health)
                startTime: pod.status?.startTime || undefined,
            };
            res.locals.pod = newPod;
            next();
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error occurred while fetching pod data for pod: ${podName} in namespace: ${namespace}`);
        }
    },
    // Middleware function to get all nodes from the cluster
    getNodes: async (_req, res, next) => {
        try {
            const allNodes = await kubernetesService.getNodesFromCluster();
            const returnedNodes = [];
            for (const node of allNodes) {
                const newNode = {
                    creationTimestamp: node.metadata?.creationTimestamp,
                    name: node.metadata?.name,
                    namespace: node.metadata?.namespace,
                    labels: node.metadata?.labels,
                    podCIDR: node.spec?.podCIDR,
                    addresses: node.status?.addresses,
                    allocatable: node.status?.allocatable,
                    capacity: node.status?.capacity,
                    conditions: node.status?.conditions,
                };
                returnedNodes.push(newNode);
            }
            res.locals.nodeData = returnedNodes;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching services from cluster' });
        }
    },
    // Middleware function to get all services from the cluster
    getServices: async (_req, res, next) => {
        try {
            const allServices = await kubernetesService.getServicesFromCluster();
            const returnedServices = [];
            for (const services of allServices) {
                const newService = {
                    name: services.metadata?.name,
                    namespace: services.metadata?.namespace,
                    labels: services.metadata?.labels,
                    creationTimestamp: services.metadata?.creationTimestamp,
                    clusterIP: services.spec?.clusterIP,
                    ports: services.spec?.ports,
                    selector: services.spec?.selector,
                    type: services.spec?.type,
                };
                returnedServices.push(newService);
            }
            res.locals.serviceData = returnedServices;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching nodes from cluster' });
        }
    },
    //middleware function to check if the user provided key and address are valid
    checkAPI: async (req, res, next) => {
        const key = req.body.key;
        const address = req.body.address;
        console.log(address);
        let cleanAddress = address;
        if (cleanAddress) {
            cleanAddress = address.replace('https://', '');
            //console.log(cleanAddress);
            try {
                const check = await kubernetesService.checkAPI(key, cleanAddress);
                if (check === 'ok') {
                    generalService.writeEnv(key, cleanAddress);
                    next();
                }
                else if (check === 'invalidkey') {
                    res.status(403).json({ message: 'invalid_key' });
                }
                else {
                    res.status(500).json({ message: 'unable to connect to cluster' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'error checking API ' });
            }
        }
        else {
            console.log('no address');
            res.status(500).json({ message: 'no address given' });
        }
    },
};
// Exports the controller object for use as middleware
export default kubernetesController;
