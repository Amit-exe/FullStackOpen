from typing import Union
import json
from fastapi import FastAPI, HTTPException,Path,Query

app = FastAPI()

def load_date():
    with open('patient.json','r') as f:
        temp = json.load(f)

    return temp

@app.get("/")
def read_root():
    return {"message": "Paitent management System"}

@app.get("/about")
def read_user():
    return {"message":"A fully functional API to manage your patient records"}


@app.get("/view")
def view():
    temp = load_date()
    return temp 


@app.get("/patient/{id}")
def get_patient(id:int= Path(...,description='ID of the patient to fetch from DB')):
    temp = load_date()['data']
    
    for a in temp:
        print(a)
        if a.get('id') == id:   
            return a
    raise HTTPException(status_code=404, detail="paitent not found")


@app.get("/sort}")
def sort_patient(sortby:str = Query(...,description="to sort the patient data by age | weight | height"), orderby = Query("asc",description="To sort patient data in ascending or descending eg. asc | desc")):
    temp = load_date()['data']
    sort_fields = ['height','weight','age']

    if sortby not in sort_fields:
        raise HTTPException(status_code=400, detail=f"select values from {sort_fields}")
    
    if orderby not in ['asc','desc']:
        raise HTTPException(status_code=400, detail=f"select values from 'asc' or 'desc'")
    print(temp)
    sorted_values = sorted(temp,key = lambda a:a.get(sortby),reverse= True if orderby=='desc' else False)
    return sorted_values