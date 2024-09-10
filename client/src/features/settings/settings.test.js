import { jsx as _jsx } from "react/jsx-runtime";
import { afterEach, test } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Settings from "./settings";
describe("if setting page renders", () => {
    beforeEach(() => {
        renderWithProviders(_jsx(Settings, {}));
    });
    afterEach(() => {
        cleanup();
    });
    test("test if submit button renders", () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        expect(submitButton).toBeInTheDocument();
    });
    test("test if address input box renders", () => {
        const addressInputBox = screen.getByRole("textbox", { name: /address/i });
        expect(addressInputBox).toBeInTheDocument();
    });
    test("test if key input box renders", () => {
        const addressInputBox = screen.getByRole("textbox", { name: /key/i });
        expect(addressInputBox).toBeInTheDocument();
    });
});
