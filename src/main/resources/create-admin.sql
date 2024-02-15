--Query used to transform the very first user created by the app to an admin.
--Creating the admin from the beginning directly in postgreSQL before any user
--crated by the app gives conflict in the sequence generator, because
--any manually generated user with id=1 in postgreSQL outside JPA
--will conflict with the sequence of the JPA Entity since JPA doesn't register the
--first value created manually through SQL code. To avoid this, just simply
--create a standard user through the app, so jpa can register the first value for
--the sequence generator, and then transform it to an admin:
INSERT INTO privilege (id, name)
VALUES (1, 'create'),
	(2, 'read'),
	(3, 'update'),
	(4, 'delete');

INSERT INTO role (id, name)
VALUES (1, 'admin'),
	(2, 'user');

INSERT INTO role_privileges (role_id, privilege_id)
VALUES (1, 1),
	(1, 2),
	(1, 3),
	(1, 4);

INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1);

UPDATE users SET
	name='admin',
	email='admin@mail.com',
	password='$2a$10$WB1ArEQgNyDTreI229a.yOxXzHReRCOBxwWgDC1zu7vhe8sAv6Gwa'
WHERE id=1;
