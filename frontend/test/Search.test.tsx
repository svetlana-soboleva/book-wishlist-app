import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Search } from "../../frontend/src/components/Search";

describe("Search Component", () => {
  it("renders the input field and search icon", () => {
    render(<Search onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });
  it("calls onSearchChange with the input value when Enter is pressed", () => {
    const handleSearchChange = vi.fn();
    render(<Search onSearchChange={handleSearchChange} />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(handleSearchChange).toHaveBeenCalledTimes(1);
    expect(handleSearchChange).toHaveBeenCalledWith("test query");
  });

  it("calls onSearchChange with the input value when the search icon is clicked", () => {
    const handleSearchChange = vi.fn();
    render(<Search onSearchChange={handleSearchChange} />);

    const input = screen.getByPlaceholderText("Search");
    const searchIcon = screen.getByTestId("search-icon");

    fireEvent.change(input, { target: { value: "icon click query" } });
    fireEvent.click(searchIcon);

    expect(handleSearchChange).toHaveBeenCalledTimes(1);
    expect(handleSearchChange).toHaveBeenCalledWith("icon click query");
  });
});
