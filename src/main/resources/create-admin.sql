--these are the values for the privilege and role tables
INSERT INTO privilege (id, name)
VALUES (1, 'create'),
	(2, 'read'),
	(3, 'update'),
	(4, 'delete');

INSERT INTO role (id, name)
VALUES (1, 'admin'),
	(2, 'user');

--joining values from the role and privilege tables to create an admin role
INSERT INTO role_privileges (role_id, privilege_id)
VALUES (1, 1),
	(1, 2),
	(1, 3),
	(1, 4);

--joining values from the user and role tables to create an admin user
INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1);


--create a standard user through the app and then transform it to an admin
UPDATE users SET
	name='admin',
	email='admin@mail.com',
	password='$2a$10$WB1ArEQgNyDTreI229a.yOxXzHReRCOBxwWgDC1zu7vhe8sAv6Gwa'
WHERE id=1;
