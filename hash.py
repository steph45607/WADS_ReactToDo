from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash a password
hashed_password = pwd_context.hash("password")

# Verify a password
is_valid_password = pwd_context.verify("password", hashed_password)

print(hashed_password)