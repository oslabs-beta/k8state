import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';
import kubernetesService from '../services/kubernetesService.js';
import generalService from '../services/generalService.js';

// ***** Define Interfaces *****
interface ReturnedPod {
	name: string;
	creationTimestamp: Date | undefined;
	namespace: String;
	labels: { [key: string]: string } | undefined;
	nodeName: String | undefined;
	// containers: k8s.V1Container[] | undefined; //(Stretch)
	restartPolicy: String;
	hostIP: String;
	podIP: String;
	phase: string | undefined;
	conditions: k8s.V1PodCondition[] | undefined;
	startTime: Date | undefined;
	uid: String | undefined;
}

interface ReturnedNode {
	name: String | undefined;
	namespace: String | undefined;
	creationTimestamp: Date | undefined;
	podCIDR: String | undefined;
	addresses: k8s.V1NodeAddress[] | undefined;
	allocatable: { [key: string]: string } | undefined;
	capacity: { [key: string]: string } | undefined;
	conditions: k8s.V1NodeCondition[] | undefined;
	labels: { [key: string]: string } | undefined;
}

interface ReturnedServices {
	name: String | undefined;
	namespace: String | undefined;
	labels: { [key: string]: string } | undefined;
	creationTimestamp: Date | undefined;
	clusterIP: String | undefined;
	ports: k8s.V1ServicePort[] | undefined;
	selector: { [key: string]: string } | undefined;
	type: String | undefined;
}

// ***** Controller Object *****
const kubernetesController = {

	// Middleware function to get all pods from the cluster
	getPods: async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const allPods = await kubernetesService.getPodsFromCluster();
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
					conditions: pod.status?.conditions || undefined,
					startTime: pod.status?.startTime || undefined,
					uid: pod.metadata?.uid || undefined,
				};
				returnedPods.push(newPod);
			}
			res.locals.podData = returnedPods;
			next();
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error fetching pods from cluster' });
		}
	},

	// Middleware function to get details on a single pod from the cluster
	getPodDetails: async (req: Request, res: Response, next: NextFunction) => {
		const { podName, namespace } = req.params;
		interface ReturnedPod {
			name: string;
			creationTimestamp: Date | undefined;
			namespace: String;
			labels: { [key: string]: string } | undefined;
			nodeName: String | undefined;
			// containers: k8s.V1Container[] | undefined; //(Stretch)
			restartPolicy: String;
			hostIP: String;
			podIP: String;
			phase: string | undefined;
			conditions: k8s.V1PodCondition[] | undefined;
			startTime: Date | undefined;
		}
		try {
			const pod = await kubernetesService.getPodDetailsFromCluster(
				podName,
				namespace
			);
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
				conditions: pod.status?.conditions || undefined, //(Pod Health)
				startTime: pod.status?.startTime || undefined,
			};
			res.locals.pod = newPod;
			next();
		} catch (error) {
			console.log(error);
			throw new Error(
				`Error occurred while fetching pod data for pod: ${podName} in namespace: ${namespace}`
			);
		}
	},

	// Middleware function to get all nodes from the cluster
	getNodes: async (_req: Request, res: Response, next: NextFunction) => {

		try {
			const allNodes = await kubernetesService.getNodesFromCluster();
			const returnedNodes: ReturnedNode[] = [];
			for (const node of allNodes) {
				console.log(node.status?.conditions, node.status?.capacity);
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
				};
				returnedNodes.push(newNode);
			}
			res.locals.nodeData = returnedNodes;
			next();
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error fetching services from cluster' });
		}
	},

	// Middleware function to get all services from the cluster
	getServices: async (_req: Request, res: Response, next: NextFunction) => {

		try {
			const allServices = await kubernetesService.getServicesFromCluster();
			const returnedServices: ReturnedServices[] = [];

			for (const services of allServices) {
				const newService: ReturnedServices = {
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
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error fetching nodes from cluster' });
		}
	},

	//middleware function to check if the user provided key and address are valid
	checkAPI: async (req: Request, res: Response, next: NextFunction) => {
		const key: string = req.body.key;
		const address: string = req.body.address;
		try {
			const check = await kubernetesService.checkAPI(key, address);
			if (check === 'ok') {
				generalService.writeEnv(key, address);
				next();
			} else if (check === 'invalidkey') {
				res.status(403).json({ message: 'invalid_key' });
			} else {
				res.status(500).json({ message: 'unable to connect to cluster' });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'error checking API ' });
		}
	},
};

// Exports the controller object for use as middleware
export default kubernetesController;
