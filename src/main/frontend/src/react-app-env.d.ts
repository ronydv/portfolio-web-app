/// <reference types="react-scripts" />
declare module "*.module.css";
export const Role = {
	ADMIN: 'admin',
	ADMIN_CREATE: 'admin:create',
	ADMIN_READ: 'admin:read',
	ADMIN_UPDATE: 'admin:update',
	ADMIN_DELETE: 'admin:delete',
	USER: 'user',
	USER_CREATE: 'user:create',
	USER_READ: 'user:read',
  } as const;
 
