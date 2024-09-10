import { afterEach, test } from "vitest"
import { screen, cleanup } from "@testing-library/react"
import { renderWithProviders } from "../../../utils/test-utils"

import ClusterLogContainer from "../containers/ClusterLogContainer"

afterEach(() => {
  cleanup()
})

test("Cluster Log Container should render", () => {
  renderWithProviders(<ClusterLogContainer />)

  // buttons to load correctly
  const createLogButton = screen.getByRole("button", { name: /Create A Log/i })
  const deleteLogButton = screen.getByRole("button", {
    name: /Delete All Logs/i,
  })

  // Test for Body text
  expect(createLogButton).toBeInTheDocument()
  expect(deleteLogButton).toBeInTheDocument()
})
