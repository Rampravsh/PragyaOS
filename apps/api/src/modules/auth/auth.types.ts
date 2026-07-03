import { UserContext } from "../../common/types/context.type";

export interface TokenPayload {
  userId: string;
  email: string;
  roles: string[];
  permissions: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserSession {
  user: UserContext;
  tokens: AuthTokens;
}

export interface DeviceMetadata {
  userAgent?: string;
  ipAddress?: string;
  deviceInfo?: string;
}
