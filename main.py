from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import List
import uvicorn

app = FastAPI()

database = []

class AimlabStat(BaseModel):
    username: str
    scenario: str
    score: int
    accuracy: float
    kills: int
    shots_fired: int
    headshot_ratio: float
    date_played: datetime

@app.post("/upload")
async def upload_stat(stat: AimlabStat, request: Request):

    database.append(stat)
    return {"message": "Stat received", "total_stats": len(database)}

@app.get("/stats", response_model=List[AimlabStat])
async def get_all_stats():
    return database

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


