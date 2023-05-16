# import the package or library
from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


students = {
    1:{
        "name":"Anya",
        "age":21,
        "classes":"L4AC"
    },
    2:{
        "name":"Steph",
        "age":20,
        "classes":"L3AC"
    }
}



@app.get("/")
def index():
    return {"First data":"Hello world"}

# domain/get-student/1
@app.get("/get-student/{student_id}")
def get_student(student_id : int = Path(desciption = "Student ID from school")):
    return students[student_id]

# domain/menu?search="value"
@app.get("/get-student-by-name")
def get_student_by_name(*, name: Optional[str] = None):
    for id in students:
        if students[id]["name"] == name:
            return students[id]
    return {"Error":"Student name not found"}

# you can combine path and query parameter

class Student(BaseModel):
    name: str
    age: int
    classes:str

class UpdateStudent(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    classes: Optional[str] = None

# post method
@app.post("/create_student/{id}")
def add_student_id(id:str, student:Student):
    if id in students:
        return{"Error":"Student ID exists"}
    students[id]= student
    return students[id]

# put method
@app.put("/update-student/{id}")
def update_student(id:int, student:UpdateStudent):
    if id not in students:
        return {"Error":"Student doesn't exists"}
    if students[id].name != None:
        students[id].name = student.name

    if students[id].age != None:
        students[id].age = student.age

    if students[id].classes != None:
        students[id].classes = student.classes
    
    return students[id]

# delete method
@app.delete("/delete-student/{id}")
def delete_student(id:int):
    del students[id]
    return {"Data":"Has been deleted"}