INSERT INTO users (name, email, phone, password_hash, wallet_balance, pin_hash, verification_level)
VALUES
  (
    'Test User',
    'test@flowpocket.app',
    '08030000001',
    'replace-with-generated-password-hash',
    150000.00,
    'replace-with-generated-pin-hash',
    'verified'
  )
ON CONFLICT (email) DO NOTHING;
