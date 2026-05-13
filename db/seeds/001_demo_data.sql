TRUNCATE approval_requests, users RESTART IDENTITY CASCADE;

INSERT INTO users (id, name, role) VALUES
  ('employee-1', 'Eli Employee', 'employee'),
  ('manager-1', 'Maya Manager', 'manager'),
  ('admin-1', 'Avery Admin', 'admin');

INSERT INTO approval_requests (title, amount_cents, requested_by, status) VALUES
  ('Laptop stand', 8900, 'employee-1', 'pending'),
  ('Conference ticket', 75000, 'employee-1', 'pending'),
  ('Production database access', 1, 'employee-1', 'pending');
