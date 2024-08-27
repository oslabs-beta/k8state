import kubernetesService from '../services/kubernetesService.js';
// Controller object that contains middleware functions
const kubernetesController = {
    // Middleware function to get all pods from the cluster
    getPods: async (_req, res, next) => {
        try {
            const allPods = await (kubernetesService.getPodsFromCluster());
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
                    conditions: pod.status?.conditions || undefined, //(Pod Health)
                    startTime: pod.status?.startTime || undefined,
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
                // conditions: pod.status?.conditions || undefined, //(Pod Health)
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
            const allNodes = await (kubernetesService.getNodesFromCluster());
            const returnedNodes = [];
            for (const node of allNodes) {
                console.log(node.status?.conditions, node.status?.capacity);
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
            const allServices = await (kubernetesService.getServicesFromCluster());
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
    checkAPI: async (_req, res, next) => {
        try {
            const check = await (kubernetesService.checkAPI());
            console.log(check);
            if (check === 'ok') {
                next();
            }
            else {
                res.status(500).json({ message: check });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error checking API ' });
        }
    },
    checkEnv: async (_req, res, next) => {
        try {
            const check = await (kubernetesService.checkEnv());
            console.log(check);
            res.locals.env = check;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error checking env ' });
        }
    }
};
// Exports the controller object for use as middleware
export default kubernetesController;
