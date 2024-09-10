import { jsx as _jsx } from "react/jsx-runtime";
import { afterEach, test } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { renderWithProviders } from "../../utils/test-utils";
afterEach(() => {
    cleanup();
});
test("Landing Page should render", async () => {
    renderWithProviders(_jsx(LandingPage, {}));
    // Check if Body rendered correctly with proper text
    expect(screen.getByText(/Revolutionize Kubernetes Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience cluster visualization that moves as fast as you do./i)).toBeInTheDocument();
    // Check if Footer rendered correctly with proper text
    expect(screen.getByText(/Developed For Engineers by Engineers/i)).toBeInTheDocument();
    expect(screen.getByText(/Released under the MIT License./i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright © 2024 K8STATE Contributors/i)).toBeInTheDocument();
});
test("Landing Page should have correct link to Get Started click", async () => {
    // Render the LandingPage component
    renderWithProviders(_jsx(LandingPage, {}));
    // Find the "Get Started" link by its aria-label
    const getStartedLink = screen.getByLabelText("Get Started");
    // Check if the href attribute is correct
    expect(getStartedLink).toHaveAttribute("href", "clusterui");
    // Check if the link is still present
    expect(getStartedLink).toBeInTheDocument();
});
test("Landing Page should correct link to GitHub", async () => {
    // Render the LandingPage component
    renderWithProviders(_jsx(LandingPage, {}));
    // Find the "Get Started" link by its aria-label
    const getStartedLink = screen.getByLabelText("Visit GitHub");
    // Check if the href attribute is correct
    expect(getStartedLink).toHaveAttribute("href", "https://github.com/oslabs-beta/k8state");
    expect(getStartedLink).toBeInTheDocument();
});
