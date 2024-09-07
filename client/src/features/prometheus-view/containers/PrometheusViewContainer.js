import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetPrometheusCpuUsageQuery, useGetPrometheusMemoryUsageQuery } from "../prometheusViewApiSlice";
import { useState } from "react";
export default function PrometheusViewContainer() {
    // Grabs the CPU and Memory metrics from RTK Query
    // const { data: prometheusCPU = []} = useGetPrometheusCpuUsageQuery();
    const { data: cpuUsage,
    // error: kubernetsPodsError,
    // isLoading: kubernetesPodsIsLoading,
    // refetch: refetchKubernetsPods,
     } = useGetPrometheusCpuUsageQuery();
    const { data: memoryUsage,
    // error: kubernetsPodsError,
    // isLoading: kubernetesPodsIsLoading,
    // refetch: refetchKubernetsPods,
     } = useGetPrometheusMemoryUsageQuery();
    // const { data: prometheusMemory = []} = useGetPrometheusMemoryUsageQuery();
    console.log("data: ", cpuUsage, memoryUsage);
    const [prometheusCharts, setPrometheusCharts] = useState([]);
    return (_jsx(_Fragment, { children: _jsx("div", { children: prometheusCharts }) }));
}
