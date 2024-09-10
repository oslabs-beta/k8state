import { jsx as _jsx } from "react/jsx-runtime"
import { afterEach, test } from "vitest"
import { screen, cleanup } from "@testing-library/react"
import LandingPage from "./LandingPage"
import { renderWithProviders } from "../../utils/test-utils"
import userEvent from "@testing-library/user-event"
afterEach(() => {
  cleanup()
})
test("Landing Page should render", () => {
  renderWithProviders(_jsx(LandingPage, {}))
  // Test for Body Text
  expect(
    screen.getByText(/Revolutionize Kubernetes Management/i),
  ).toBeInTheDocument()
  expect(
    screen.getByText(
      /Experience cluster visualization that moves as fast as you do./i,
    ),
  ).toBeInTheDocument()
  // Test for Footer Render
  expect(
    screen.getByText(/Developed For Engineers by Engineers/i),
  ).toBeInTheDocument()
  expect(
    screen.getByText(/Released under the MIT License./i),
  ).toBeInTheDocument()
  expect(
    screen.getByText(/Copyright © 2024 K8STATE Contributors/i),
  ).toBeInTheDocument()
})
test("Landing Page should navigate to correct link on Get Started click", () => {
  // Render the LandingPage component
  renderWithProviders(_jsx(LandingPage, {}))
  // Find the "Get Started" link by its aria-label
  const getStartedLink = screen.getByLabelText("Get Started")
  // Check if the href attribute is correct
  expect(getStartedLink).toHaveAttribute("href", "clusterui")
  // Optionally, simulate a click on the "Get Started" link
  userEvent.click(getStartedLink)
  // Check if the link was clicked (you could mock or test specific actions)
  // Here, we just test the href and the presence of the element
  expect(getStartedLink).toBeInTheDocument()
})
test("Landing Page should navigate to correct link on Get Started click", () => {
  // Render the LandingPage component
  renderWithProviders(_jsx(LandingPage, {}))
  // Find the "Get Started" link by its aria-label
  const getStartedLink = screen.getByLabelText("Visit GitHub")
  // Check if the href attribute is correct
  expect(getStartedLink).toHaveAttribute(
    "href",
    "https://github.com/oslabs-beta/k8state",
  )
  // Optionally, simulate a click on the "Get Started" link
  userEvent.click(getStartedLink)
  // Check if the link was clicked (you could mock or test specific actions)
  // Here, we just test the href and the presence of the element
  expect(getStartedLink).toBeInTheDocument()
})
