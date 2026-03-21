from pydantic import BaseModel
from typing import List, Dict

class Paitent(BaseModel):
    name:str
    age:int
    weight : float
    married : bool
    alergies : List[str]
    contact_details = Dict[str,str]


paitent_info = {'name':'nitin',"age":25,"weight":80.3,'married': False,"alergies":['pollen','dust'],'contact_details':{'phone':"43434343","email":"asa@ffs.cs"}}

p1 = Paitent(**paitent_info)

def insertpv(p : Paitent):

    print(p)
    pass    


insertpv(p1)