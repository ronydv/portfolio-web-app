--Query used to transform the very first user created by the app to an admin.
--Creating the admin from the beginning through SQL before any user
--crated by the app gives conflict in the sequence generator, because
--the manually generated user with id=1 in postgreSQL will conflict later
--with the next created user by the app, because the sequence generator from the app
--will create the user starting with id=1.
--To avoid that just create the first user through the app and spring will give it the first id value,
--then just update the first user and transform to an admin, so the next user crated by the app will give the
--next id value without any conflict.
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
