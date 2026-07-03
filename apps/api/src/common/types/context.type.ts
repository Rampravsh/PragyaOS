export interface UserContext {
  id: string;
  email: string;
  organizationId: string | null;
  roles: string[];
  permissions: string[];
}

export interface RequestContext {
  correlationId: string;
  user?: UserContext;
}
