from fastapi import FastAPI
from pydantic import BaseModel
from app.recommender import recommend
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import traceback
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

app = FastAPI()
GOOGLE_CLIENT_ID = "661648786120-q3tunbi37v0b27ui0ii0rgam6c2rk9am.apps.googleusercontent.com"


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

class GoogleCredential(BaseModel):
    credential: str

@app.post("/auth/google")
def auth_google(payload: GoogleCredential):
    try:
        idinfo = id_token.verify_oauth2_token(
            payload.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID,
        )

        return {
            "ok": True,
            "user": {
                "email": idinfo.get("email"),
                "name": idinfo.get("name"),
                "picture": idinfo.get("picture"),
                "sub": idinfo.get("sub"),
            },
        }

    except Exception as e:
        print("GOOGLE VERIFY ERROR:", repr(e))
        traceback.print_exc()
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {e}")

