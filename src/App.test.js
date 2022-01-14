import { render, screen } from "@testing-library/react";
import App from "./App";
import NotFound from "../src/user/NotFound";

test("renders learn react link", () => {
  render(<NotFound />);
  const text = screen.getByText(
    /Sorry we can't find the page you looking for/i
  );
  expect(text).toBeInTheDocument();
});
