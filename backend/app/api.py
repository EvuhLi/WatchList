from fastapi import FastAPI
from pydantic import BaseModel
from app.recommender import recommend
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str

@app.post("/recommend")
def get_recommendations(q: Query):
    results = recommend(q.query, top_n=5)
    return {"movies": results}
