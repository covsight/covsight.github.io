/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Allow importing YAML data files
declare module '*.yaml' {
  const data: Record<string, unknown>;
  export default data;
}
