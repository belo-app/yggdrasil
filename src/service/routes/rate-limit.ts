import { RateLimitOptions, RateLimitPluginOptions } from "@fastify/rate-limit";
import Redis from "ioredis";
import ms from "ms";

export const rateLimitGlobal = (redis: Redis): RateLimitPluginOptions => ({
  max: (request) => (request.user ? 10 : 50),
  keyGenerator: (request: any) => {
    const userId =
      request?.user?.id ?? request?.user?.email ?? request?.user?.sub;
    return userId ? `user-${userId}` : `ip-${request.ip}`;
  },
  timeWindow: ms("1 second"),
  redis,
});

export const rateLimitToVerifyPin: RateLimitOptions = {
  max: 1,
  keyGenerator: (request: any) => {
    const userId = request?.user?.id;
    return `user-auth-${userId}`;
  },
  timeWindow: ms("1 second"),
};

export const rateLimitTo404: RateLimitOptions = {
  max: 1,
  keyGenerator: (request: any) => `404-ip-${request.ip}`,
  timeWindow: ms("1 second"),
};
