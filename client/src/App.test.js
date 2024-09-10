import { jsx as _jsx } from "react/jsx-runtime";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./utils/test-utils";
// Testing to ensure App component renders
test("renders MiniDrawer component", () => {
    // Render the App component
    renderWithProviders(_jsx(App, {}));
    // Check if MiniDrawer is in the document
    // Check if the menu button (IconButton) is in the document
    const menuButton = screen.getByLabelText(/open drawer/i);
    expect(menuButton).toBeInTheDocument();
});
