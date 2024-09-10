import { jsx as _jsx } from "react/jsx-runtime";
import { afterEach, test } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import ClusterLog from "./ClusterLog";
// import { useGetClusterLogsQuery } from "../clusterLogsApiSlice"
afterEach(() => {
    cleanup();
});
test("if a cluster log renders with correct buttons", () => {
    const sampleClusterLog = {
        name: "log-2024-9-10-11-57-17.json",
        log: [
            {
                date: "September 10, 2024",
                logs: "\n> mock-server@1.0.0 start /usr/src/app\n> node server/server.js\n\nServer listening on port: 3000\n",
                name: "mock-app-deployment-7fdbd7448d-79mtk",
                namespace: "default",
            },
            {
                date: "September 10, 2024",
                logs: "\n> mock-server@1.0.0 start /usr/src/app\n> node server/server.js\n\nServer listening on port: 3000\n",
                name: "mock-app-deployment-7fdbd7448d-gn7c6",
                namespace: "default",
            },
        ],
    };
    renderWithProviders(_jsx(ClusterLog, { clusterLog: sampleClusterLog }));
    const downloadLogButton = screen.getByRole("button", { name: /Download/i });
    expect(downloadLogButton).toBeInTheDocument();
});
