import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();

// Helper function that queries prometheus for specific metrics
const queryPrometheus = async (query: String) => {
    try {
        const response = await axios.get(`${process.env.PROMETHEUS_URL}/api/v1/query`, {
            params: {
                query: query,
            },
        });
        return response.data.data.result;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

// Service object that contains helper functions that connects middleware to Prometheus
const prometheusService = {

    // Function that gets total CPU usage of all pods
    getCpuUsageForPods: async () => {
        const query = 'sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)';
        return queryPrometheus(query);
    },

    // Function that gets total memory usage of all pods
    getMemoryUsageForPods: async () => {
        const query = 'sum(container_memory_usage_bytes) by (pod)';
        return queryPrometheus(query);
    }
}

export default prometheusService;