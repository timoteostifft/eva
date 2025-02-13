// Utils
import { replace } from "@/core/utils/replace";

describe("replace", () => {
  it("should replace template variables with provided data", () => {
    const template = "Hello {{name}}!";
    const data = { name: "John" };

    expect(replace(template, data)).toBe("Hello John!");
  });

  it("should handle multiple replacements", () => {
    const template = "{{greeting}} {{name}}! How is the {{weather}}?";
    const data = {
      greeting: "Hi",
      name: "Alice",
      weather: "sunshine",
    };

    expect(replace(template, data)).toBe("Hi Alice! How is the sunshine?");
  });

  it("should keep original placeholder if data key is not found", () => {
    const template = "Hello {{name}}! {{missing}}";
    const data = { name: "Bob" };

    expect(replace(template, data)).toBe("Hello Bob! {{missing}}");
  });

  it("should handle non-string values by converting them to strings", () => {
    const template = "Count: {{number}}, Active: {{boolean}}, Score: {{float}}";
    const data = {
      number: 42,
      boolean: true,
      float: 3.14,
    };

    expect(replace(template, data)).toBe(
      "Count: 42, Active: true, Score: 3.14"
    );
  });

  it("should handle empty template", () => {
    const template = "";
    const data = { name: "John" };

    expect(replace(template, data)).toBe("");
  });
});
