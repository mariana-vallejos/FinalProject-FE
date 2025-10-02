import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Table } from "./Table";
import type { User } from "../domain/User";

describe("Table component", () => {
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  const data: User[] = [
    {
      name: "John Perez",
      email: "john@gmail.com",
      password: "user",
      role: "user",
      isLoggedIn: true,
    },
    {
      name: "Juan Perez",
      email: "juan@gmail.com",
      password: "user",
      role: "user",
      isLoggedIn: true,
    },
  ];

  it("should render table headers", () => {
    render(<Table data={data} columns={columns} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
