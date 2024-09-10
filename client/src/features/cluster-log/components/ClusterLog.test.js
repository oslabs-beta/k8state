import { jsx as _jsx } from "react/jsx-runtime";
import { afterEach, test } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import LandingPage from "./LandingPage"
import { renderWithProviders } from "../../../utils/test-utils";
// import ClusterLogContainer from "../containers/ClusterLogContainer"
import ClusterLog from "./ClusterLog";
// import { useGetClusterLogsQuery } from "../clusterLogsApiSlice"
afterEach(() => {
    cleanup();
});
test("if a cluster log renders with correct buttons", async () => {
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
    // Simulate expanding the accordion to show its content
    const accordionToggle = screen.getByRole("button", { name: /log instance/i });
    userEvent.click(accordionToggle);
    // Try to find the "Download" button after expanding the accordion
    const downloadLogButton = await screen.findByRole("button", {
        name: /Download/i,
    });
    const deleteLogButton = await screen.findByRole("button", {
        name: /Delete/i,
    });
    expect(downloadLogButton).toBeInTheDocument();
    expect(deleteLogButton).toBeInTheDocument();
});
