export function replace(template: string, data: Record<string, unknown>) {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    return key in data ? String(data[key]) : match;
  });
}
