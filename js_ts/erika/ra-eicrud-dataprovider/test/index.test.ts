import { describe, it, expect, beforeEach } from "vitest";
import { DataProvider } from "react-admin";
import createDataProvider from "../src/index";
import { SuperClient } from "../../erika/eicrud_exports/super_client";

const superClient = new SuperClient({ url: "http://localhost:3000" });

let dataProvider: DataProvider;

beforeEach(() => {
  dataProvider = createDataProvider(superClient);
});

describe("Data Provider (with real SuperClient)", () => {
  var createdBlogId = "";
  const newBlog = {
    title: "Hello World",
    content: "This is my first blog post!",
  };

  it("should fetch a list of blog", async () => {
    const result = await dataProvider.getList("blog", {
      filter: {},
      pagination: { page: 1, perPage: 10 },
      sort: { field: "id", order: "ASC" },
    });

    expect(result.data, "Expected 'data' to be an array").toBeInstanceOf(Array);
    expect(
      result.total,
      "Expected 'total' to be greater than 0",
    ).toBeGreaterThan(0);
    expect(
      result.data.length,
      `Expected 'data' length to be less than or equal to 10, got (${result.data.length})`,
    ).toBe(10);
  });

  it("should create a new blog instance", async () => {
    const result = await dataProvider.create("blog", { data: newBlog });

    createdBlogId = result.data.id;

    expect(result.data).toHaveProperty("id");
    expect(result.data.title).toBe(newBlog.title);
  });

  it("should update a blog", async () => {
    const result = await dataProvider.update("blog", {
      id: createdBlogId,
      data: { title: "Updated title" },
      previousData: { id: createdBlogId, ...newBlog },
    });

    const updatedBlog = await dataProvider.getOne("blog", {
      id: createdBlogId,
    });

    expect(result.data).toBe(1);
    expect(updatedBlog.data.title).toBe("Updated title");
  });

  it("should delete a blog", async () => {
    const result = await dataProvider.delete("blog", { id: createdBlogId });

    expect(result.data).toBe(1);
  });
});
