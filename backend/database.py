# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
import mysql.connector

conn = mysql.connector.connect(
    host="35.238.148.78",
    user="staniswinata",
    password="staniswinata07",
    database="LibraryDB",
    auth_plugin="mysql_native_password",
)

# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

# engine = create_engine(
#     conn, connect_args={"check_same_thread": False}
# )
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

global cursor
cursor = conn.cursor()
