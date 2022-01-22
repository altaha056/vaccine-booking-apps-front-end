import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const text = screen.getByText(
    /Sorry we can't find the page you looking for/i
  );
  expect(text).toBeInTheDocument();
});
