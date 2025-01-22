import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import ProtectedRoute from "./ProtectedRoute";

jest.mock("../../app/hooks", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore([thunk]);
const mockFetch = jest.fn();

global.fetch = mockFetch;

describe("ProtectedRoute", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      portalSlice: { init: false },
    });
    mockFetch.mockClear();
  });

  test("renders loading state initially", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({}),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute element={<div>ClusterUI</div>} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders the element when credentials exist", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ address: "localhost", key: "12345" }),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute element={<div>ClusterUI</div>} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText(/ClusterUI/i)).toBeInTheDocument());
  });

  test("redirects to /portal when init is false", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({}),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute element={<div>ClusterUI</div>} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/ClusterUI/i)).not.toBeInTheDocument();
      expect(window.location.pathname).toBe("/portal");
    });
  });
});
