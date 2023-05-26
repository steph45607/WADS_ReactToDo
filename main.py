from datetime import datetime, timedelta
from typing import Union

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing_extensions import Annotated
from fastapi.middleware.cors import CORSMiddleware

import mysql.connector


conn = mysql.connector.connect(
    host="35.238.148.78",
    user="staniswinata",
    password="staniswinata07",
    database="AWSLibrary",
    auth_plugin="mysql_native_password",
)

global cursor
cursor = conn.cursor()

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# fake_users_db = {
#     "johndoe": {
#         "username": "johndoe",
#         "full_name": "John Doe",
#         "email": "johndoe@example.com",
#         "hashed_password": "$2b$12$PtR2CjD4oCuY5Q1fsjs/dup/Dw1xm43pagomECFylks9eCXY1wq06",
#         "disabled": False,
#     }
# }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None

class User(BaseModel):
    username: str
    full_name: Union[str, None] = None
    email: Union[str, None] = None
    password:  Union[str, None] = None
    disabled: Union[bool, None] = None

class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str):
    cursor.execute("select * from User")
    db = cursor.fetchall()
    # print(db)
    # print(username)
    if username == db[0][2]:
        # user_dict = db[username]
        # return UserInDB(**user_dict)
        return db[0]


def authenticate_user(username: str, password: str):
    cursor.execute("select * from User")
    anya = cursor.fetchall()
    # print(anya)
    # print(anya[0][2])
    # print(anya[0][3])
    # print(item.username)
    if username == anya[0][2] and verify_password(password, anya[0][3]):
        # return {"status": "ok"}
        return username
    else:
        return False

    # user = get_user(cursor, username)
    # if not user:
    #     return False
    # if not verify_password(password, user.hashed_password):
    #     return False
    # return user

def get_user_full_name(username: str):
    cursor.execute("SELECT fullname FROM User WHERE username = %s", (username,))
    result = cursor.fetchall()
    if result:
        return result[0]
    else:
        return None

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    # print("user :", user)
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    # print(current_user[1])
    if current_user[0][4] == 1:
        # print("fail")
        raise HTTPException(status_code=400, detail="Inactive user")
    # print("through")
    # print(current_user[1])
    return current_user
    # return current_user

@app.get("/dummy")
def check():
    cursor.execute("select * from User")
    anya = cursor.fetchall()
    # print(anya)
    return {"data":"data"}

class Test(BaseModel):
    username: str

@app.post("/login")
def login(item: Test):
    cursor.execute("select * from User")
    anya = cursor.fetchall()
    # print(anya)
    # print(item.username)
    if item.username in anya[0]:
        return {"status": "ok"}
    else:
        return {"status": "not ok"}
    # return item

@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# @app.get("/users/me/", response_model=User)
# async def read_users_me(
#     current_user: Annotated[User, Depends(get_current_active_user)]
#     # current_user: Annotated[ ,Depends(get_current_active_user)]
#     # current_user : str
# ):
#     # current_user = Depends(get_current_active_user)
#     # dict(current_user)
#     return current_user

@app.get("/users/me/")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user[1]


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return [{"item_id": "Foo", "owner": current_user.username}]