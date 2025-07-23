import os
import time
import json
import requests
from datetime import datetime

# Replace with your actual endpoint and API key
API_ENDPOINT = "https://aimlabs-reporting-tool.onrender.com"
API_KEY = "FMu4-X7bHQ-9lW3acpcGZPgABx8_qjeR8fj5EtKnNjY"

SAVE_DIR = os.path.join(os.getenv("LOCALAPPDATA"), "Aim Lab", "Saved", "SaveGames")
SEEN_FILES = set()

def upload_data(data):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(API_ENDPOINT, headers=headers, json=data)
        if response.status_code == 200:
            print(f"[{datetime.now()}] ✅ Uploaded: {data['scenario']}, Score: {data['score']}")
        else:
            print(f"[{datetime.now()}] ❌ Upload failed: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"[{datetime.now()}] ❌ Exception during upload: {e}")

def parse_result_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            result = json.load(f)
        except json.JSONDecodeError:
            return None

    return {
        "username": result.get("PlayerName", "unknown"),
        "scenario": result.get("TaskName", "unknown"),
        "score": int(result.get("Score", 0)),
        "accuracy": float(result.get("Accuracy", 0.0)),
        "kills": int(result.get("Kills", 0)),
        "shots_fired": int(result.get("ShotsFired", 0)),
        "headshot_ratio": float(result.get("HeadshotRatio", 0.0)),
        "date_played": datetime.utcnow().isoformat()
    }

def watch_directory():
    print(f"👀 Watching: {SAVE_DIR}")
    while True:
        files = [f for f in os.listdir(SAVE_DIR) if f.endswith(".json")]
        new_files = set(files) - SEEN_FILES

        for file in sorted(new_files):
            file_path = os.path.join(SAVE_DIR, file)
            print(f"[{datetime.now()}] 📄 New file detected: {file}")

            data = parse_result_file(file_path)
            if data:
                upload_data(data)
            else:
                print(f"⚠️ Could not parse {file}")

            SEEN_FILES.add(file)

        time.sleep(5)

if __name__ == "__main__":
    watch_directory()
