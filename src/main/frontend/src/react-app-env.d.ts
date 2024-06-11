/// <reference types="react-scripts" />
declare module "*.module.css";
export const Role = {
	//the values of each property are stored in database, the concatenation with ':' are done in the backend
	// if the values have to be modified, change it in the database and in the backend first
	ADMIN: 'admin',
	ADMIN_CREATE: 'admin:create',
	ADMIN_READ: 'admin:read',
	ADMIN_UPDATE: 'admin:update',
	ADMIN_DELETE: 'admin:delete',
	USER: 'user',
	USER_CREATE: 'user:create',
	USER_READ: 'user:read',
  } as const;
 
