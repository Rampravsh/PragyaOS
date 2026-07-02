import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";
import { HttpStatus } from "../common/constants/httpStatus";

describe("API Core Health Check Endpoints", () => {
  it("should return healthy status on GET /health", async () => {
    const res = await request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(HttpStatus.OK);

    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("status", "healthy");
    expect(res.body.data).toHaveProperty("timestamp");
    expect(res.headers).toHaveProperty("x-request-id");
  });

  it("should return OK on GET /live", async () => {
    const res = await request(app)
      .get("/live")
      .expect(HttpStatus.OK);

    expect(res.text).toBe("OK");
  });

  it("should return READY on GET /ready", async () => {
    const res = await request(app)
      .get("/ready")
      .expect(HttpStatus.OK);

    expect(res.text).toBe("READY");
  });

  it("should return 404 for undefined routes", async () => {
    const res = await request(app)
      .get("/api/v1/invalid-route-name-xyz")
      .expect("Content-Type", /json/)
      .expect(HttpStatus.NOT_FOUND);

    expect(res.body).toHaveProperty("success", false);
    expect(res.body.error).toHaveProperty("code", "NOT_FOUND");
    expect(res.body.error).toHaveProperty("message");
  });
});
