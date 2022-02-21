// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./contexts/UserContextProvider";
import store from "./redux/store/index";

export const renderInBocata = (component) => {
  const Bocata = ({ children }) => (
    <BrowserRouter>
      <UserContextProvider>
        <Provider store={store}>{children}</Provider>
      </UserContextProvider>
    </BrowserRouter>
  );

  render(component, { wrapper: Bocata });
};
