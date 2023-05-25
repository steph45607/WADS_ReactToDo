# import the package or library
from fastapi import FastAPI, Path, Depends
from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy

app = FastAPI()

origins = ["https://localhost:3001",
           "https://localhost:8080"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


mongodb_uri = 'mongodb+srv://manjeet:test1234@cluster0.nbszr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
port = 8000
client = MongoClient(mongodb_uri, port)
db = client["User"]

tasks = {
    "6Y0To1VcSSfBOfrS4beL":{
        "completed":True,
        # "created":"March 15, 2023 at 11:45:28 PM UTC+7",
        "description":"20 duckbills",
        "title":"Buy Masks"
    },
    "DF2nFjMmjvg3Cncrdmqx":{
        "completed":False,
        # "created":"March 15, 2023 at 11:45:28 PM UTC+7",
        "description":"Anya's Room",
        "title":"Do Laundry"
    }
}

@app.get("/")
def index():
    return {"Message":"Welcome to Stephanie's To Do App"}

# domain/get-task/{uid}
# get the task based on the uid
@app.get("/get-task/{uid}")
def get_student(uid : str = Path(desciption = "uid")):
    if uid in tasks:
        return tasks[uid]
    return {"Error":"Task title not found"}

# domain/get-task-by-title?title=task
# get the task based on the title
@app.get("/get-task-by-title")
def get_task_by_title(*, title: Optional[str] = None):
    for uid in tasks:
        if tasks[uid]["title"] == title:
            return tasks[uid]
    return {"Error":"Task title not found"}

@app.get("/list-tasks")
def list_task():
    return tasks


class Task(BaseModel):
    completed: bool
    description: str
    title:str

class UpdatedTask(BaseModel):
    completed: Optional[bool] = None
    description: Optional[str] = None
    title: Optional[str] = None

# post method
# add new task
@app.post("/create-task/{uid}")
def add_task_id(uid:str, task:Task):
    if uid in tasks:
        return{"Error":"Task uid already exists"}
    tasks[uid]= task
    return tasks[uid]


# put method
# update task
@app.put("/update-task/{uid}")
def update_task(uid:str, task:UpdatedTask):
    if uid not in tasks:
        return {"Error":"Task doesn't exists"}
    
    if task.completed != None:
        print(task.completed)
        tasks[uid]["completed"] = task.completed

    if task.description != None:
        tasks[uid]["description"] = task.description

    if task.title != None:
        tasks[uid]["title"] = task.title
    
    return tasks[uid]


# delete method
@app.delete("/delete-task/{id}")
def delete_task(id:str):
    for uid in tasks:
        if uid == id:
            del tasks[uid]
            return {"Data":"has been deleted"}
    return {"Data":"UID doesn't exists"}


@app.delete("/delete-task-by-title")
def delete_task_by_title(title: str = None):
    for uid in tasks:
        if tasks[uid]["title"] == title:
            del tasks[uid]
            return {"Data":"Has been deleted"}
    return {"Data":"Task title not found"}
