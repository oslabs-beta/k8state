import { jsx as _jsx } from "react/jsx-runtime";
import { afterEach, test } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/test-utils";
import ClusterLog from "./ClusterLog";
describe("if cluster log page renders", () => {
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
    beforeEach(() => {
        renderWithProviders(_jsx(ClusterLog, { clusterLog: sampleClusterLog }));
    });
    afterEach(() => {
        cleanup();
    });
    test("if a cluster log renders with download button", async () => {
        // Simulate expanding the accordion to show its content
        const accordionToggle = screen.getByRole("button", {
            name: /log instance/i,
        });
        await userEvent.click(accordionToggle);
        // Try to find the "Download" button after expanding the accordion
        const downloadLogButton = await screen.findByRole("button", {
            name: /Download/i,
        });
        expect(downloadLogButton).toBeInTheDocument();
    });
    test("if a cluster log renders with delete buttons", async () => {
        // Simulate expanding the accordion to show its content
        const accordionToggle = screen.getByRole("button", {
            name: /log instance/i,
        });
        await userEvent.click(accordionToggle);
        const deleteLogButton = await screen.findByRole("button", {
            name: /Delete/i,
        });
        expect(deleteLogButton).toBeInTheDocument();
    });
});
