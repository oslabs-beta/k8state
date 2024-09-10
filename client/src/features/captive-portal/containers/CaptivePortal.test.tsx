import { screen, fireEvent, cleanup } from "@testing-library/react"
import { renderWithProviders } from "../../../utils/test-utils"
import CaptivePortal from "./CaptivePortal"
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles"

describe("check if captive portal renders", () => {
  const violetBase = "#7F00FF"
  const violetMain = alpha(violetBase, 0.7)

  const theme = createTheme({
    palette: {
      violet: {
        main: violetMain,
        light: alpha(violetBase, 0.5),
        dark: alpha(violetBase, 0.9),
        contrastText:
          getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      h1: {
        fontFamily: '"Oswald", sans-serif',
        fontWeight: 900,
      },
    },
  })

  beforeEach(() => {
    renderWithProviders(
      <ThemeProvider theme={theme}>
        <CaptivePortal />
      </ThemeProvider>,
    )
  })
  afterEach(() => {
    cleanup()
  })

  test("Check if the input boxes and button exist", () => {
    const address: HTMLInputElement = screen.getByLabelText(
      /IP Address or URL/i,
    ) as HTMLInputElement
    const token: HTMLElement = screen.getByPlaceholderText(/Bearer Token/i)
    const button: HTMLElement = screen.getByRole("button", {
      name: /View Cluster/i,
    })

    expect(address).toBeInTheDocument()
    expect(token).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test("Check if the address input accepts only urls", () => {
    const address: HTMLInputElement = screen.getByLabelText(
      /IP Address or URL/i,
    ) as HTMLInputElement

    fireEvent.change(address, { target: { value: "jahgifjmzxiwek" } })

    expect(address.validity.typeMismatch).toBeTruthy()
    expect(address.validity.valid).toBeFalsy()
    fireEvent.change(address, { target: { value: "https://test.com" } })
    expect(address.validity.typeMismatch).toBeFalsy()
    expect(address.validity.valid).toBeTruthy()
  })
})
