import fs from "fs";
import path from "path";
import YAML from "yaml";
import { swaggerSpec } from "../config/swagger";

const DOCS_DIR = path.resolve(process.cwd(), "../../docs/api");

// Ensure docs/api directory exists
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

async function exportSpecs() {
  console.log("🚀 Starting API Contract Export...");

  // 1. Export openapi.json
  const jsonPath = path.join(DOCS_DIR, "openapi.json");
  fs.writeFileSync(jsonPath, JSON.stringify(swaggerSpec, null, 2), "utf-8");
  console.log(`✅ Exported JSON spec to: ${jsonPath}`);

  // 2. Export openapi.yaml
  const yamlPath = path.join(DOCS_DIR, "openapi.yaml");
  fs.writeFileSync(yamlPath, YAML.stringify(swaggerSpec), "utf-8");
  console.log(`✅ Exported YAML spec to: ${yamlPath}`);

  // 3. Export API_CONTRACT_V1.md
  const mdPath = path.join(DOCS_DIR, "API_CONTRACT_V1.md");
  let mdContent = `# PragyaOS LXP API Contract (v1.0)\n\n`;
  mdContent += `This document serves as the official API contract for frontend integration. All HTTP endpoints return JSON payloads wrapped inside standard envelopes. All requests requiring authorization must pass the \`Authorization: Bearer <JWT>\` header.\n\n`;
  mdContent += `## Standard Success Envelope\n\n`;
  mdContent += `\`\`\`json\n{\n  "success": true,\n  "message": "Operation successful.",\n  "data": {}\n}\n\`\`\`\n\n`;
  mdContent += `## Endpoints Index\n\n`;

  const paths = swaggerSpec.paths || {};
  mdContent += `| Method | Path | Summary | Tags | Security |\n`;
  mdContent += `|---|---|---|---|---|\n`;

  for (const [routePath, methods] of Object.entries(paths)) {
    for (const [method, spec] of Object.entries(methods as any)) {
      const summary = spec.summary || "No description available.";
      const tags = (spec.tags || []).join(", ");
      const hasSecurity = spec.security ? "Bearer JWT" : "None";
      mdContent += `| \`${method.toUpperCase()}\` | \`${routePath}\` | ${summary} | ${tags} | ${hasSecurity} |\n`;
    }
  }

  mdContent += `\n---\n\n## Endpoints Specification\n\n`;

  for (const [routePath, methods] of Object.entries(paths)) {
    for (const [method, spec] of Object.entries(methods as any)) {
      mdContent += `### ${method.toUpperCase()} \`${routePath}\`\n\n`;
      mdContent += `**Summary**: ${spec.summary || "N/A"}\n\n`;
      mdContent += `**Tags**: \`${(spec.tags || []).join(", ") || "N/A"}\`\n\n`;
      mdContent += `**Security**: ${spec.security ? "🔒 Authorized Only" : "🔓 Public Access"}\n\n`;

      if (spec.parameters && spec.parameters.length > 0) {
        mdContent += `#### Query/Path Parameters\n\n`;
        mdContent += `| Name | In | Required | Type | Description |\n`;
        mdContent += `|---|---|---|---|---|\n`;
        for (const param of spec.parameters) {
          mdContent += `| \`${param.name}\` | \`${param.in}\` | \`${param.required ? "Yes" : "No"}\` | \`${param.schema?.type || "string"}\` | ${param.description || ""} |\n`;
        }
        mdContent += `\n`;
      }

      if (spec.requestBody) {
        const bodyContent = spec.requestBody.content?.["application/json"];
        if (bodyContent && bodyContent.schema) {
          mdContent += `#### Request Body Schema\n\n`;
          mdContent += `\`\`\`json\n${JSON.stringify(bodyContent.schema, null, 2)}\n\`\`\`\n\n`;
        }
      }

      mdContent += `#### Responses\n\n`;
      for (const [code, resp] of Object.entries(spec.responses || {})) {
        mdContent += `- **${code}**: ${(resp as any).description || ""}\n`;
      }
      mdContent += `\n---\n\n`;
    }
  }

  fs.writeFileSync(mdPath, mdContent, "utf-8");
  console.log(`✅ Exported API Contract markdown to: ${mdPath}`);

  // 4. Export POSTMAN_COLLECTION.json
  const postmanPath = path.join(DOCS_DIR, "POSTMAN_COLLECTION.json");
  const postmanItems: any[] = [];

  for (const [routePath, methods] of Object.entries(paths)) {
    for (const [method, spec] of Object.entries(methods as any)) {
      const pmPath = routePath.replace(/^\//, "").split("/");
      const queryParams = (spec.parameters || [])
        .filter((p: any) => p.in === "query")
        .map((p: any) => ({
          key: p.name,
          value: p.schema?.default !== undefined ? String(p.schema.default) : "",
          description: p.description || "",
        }));

      const bodyData = spec.requestBody?.content?.["application/json"]?.schema
        ? {
            mode: "raw",
            raw: JSON.stringify(generateBodyTemplate(spec.requestBody.content["application/json"].schema), null, 2),
            options: { raw: { language: "json" } },
          }
        : undefined;

      const securityHeader = spec.security
        ? [
            {
              key: "Authorization",
              value: "Bearer {{access_token}}",
              type: "text",
            },
          ]
        : [];

      postmanItems.push({
        name: spec.summary || `${method.toUpperCase()} ${routePath}`,
        request: {
          method: method.toUpperCase(),
          header: [
            {
              key: "Content-Type",
              value: "application/json",
              type: "text",
            },
            ...securityHeader,
          ],
          url: {
            raw: `{{base_url}}${routePath}`,
            host: ["{{base_url}}"],
            path: pmPath,
            query: queryParams.length > 0 ? queryParams : undefined,
          },
          body: bodyData,
        },
        response: [],
      });
    }
  }

  const postmanCollection = {
    info: {
      name: "PragyaOS LXP API v1.0",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: postmanItems,
    variable: [
      {
        key: "base_url",
        value: "http://localhost:3001/api/v1",
        type: "string",
      },
      {
        key: "access_token",
        value: "your-jwt-here",
        type: "string",
      },
    ],
  };

  fs.writeFileSync(postmanPath, JSON.stringify(postmanCollection, null, 2), "utf-8");
  console.log(`✅ Exported Postman Collection to: ${postmanPath}`);
}

function generateBodyTemplate(schema: any): any {
  if (!schema) return {};
  if (schema.type === "object" && schema.properties) {
    const obj: any = {};
    for (const [key, value] of Object.entries(schema.properties)) {
      obj[key] = generateBodyTemplate(value);
    }
    return obj;
  }
  if (schema.type === "array") {
    return [generateBodyTemplate(schema.items)];
  }
  if (schema.enum) {
    return schema.enum[0];
  }
  if (schema.type === "string") {
    if (schema.format === "uuid") return "00000000-0000-0000-0000-000000000000";
    if (schema.format === "email") return "user@example.com";
    return "string";
  }
  if (schema.type === "integer" || schema.type === "number") {
    return 0;
  }
  if (schema.type === "boolean") {
    return true;
  }
  return null;
}

exportSpecs().catch((err) => {
  console.error("❌ Spec export failed:", err);
  process.exit(1);
});
