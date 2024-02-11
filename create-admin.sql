INSERT INTO privilege (id, name)
VALUES (1, 'create'),
	(2, 'read'),
	(3, 'update'),
	(4, 'delete');

INSERT INTO role (id, name)
VALUES (1, 'admin'),
	(2, 'user');

INSERT INTO users (id, name, email, password)
VALUES (1, 'admin','admin@mail.com','$2a$10$WB1ArEQgNyDTreI229a.yOxXzHReRCOBxwWgDC1zu7vhe8sAv6Gwa');

INSERT INTO role_privileges (privilege_id, role_id)
VALUES (1, 1),
	(2, 1),
	(3, 1),
	(4, 1);

INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1);
