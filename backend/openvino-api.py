import openvino as ov
import openvino_genai as ov_genai
from flask_cors import CORS
from PIL import Image
import numpy as np
from flask import Flask, jsonify, request
app = Flask(__name__)
CORS(app)
from pathlib import Path
model_path="./Phi-3.5-vision-instruct-int4-ov"
#prompt="What is the name of the first president of the United States?"

pipe = ov_genai.VLMPipeline(model_path, "CPU")

@app.post("/api/chat")
def chat():
    prompt = request.form.get("prompt")
    file = request.files.get("image")
    images = []
    if file and file.filename:
        img = Image.open(file).convert("RGB")
        images.append(ov.Tensor(np.array(img, dtype=np.uint8)))

    result = pipe.generate(prompt, images=images, max_new_tokens=100)
    return jsonify({"answer": result.texts[0]})

@app.get("/")
def index():
    pipe = ov_genai.VLMPipeline(model_path, "CPU")
    result = pipe.generate(prompt, max_new_tokens=100)
    return result.texts[0]

@app.get("/api/generate")
def generate():
    return jsonify(
        {
            "service": "openvino-vlm-backend",
            "status": "ok",
            "health_endpoint": "/api/health",
            "chat_endpoint": "/api/chat",
        }
    )    

# def read_image(path: str) -> ov.Tensor:
#   pic = Image.open(path).convert("RGB")
#   image_data = np.array(pic)[None]
#   return ov.Tensor(image_data)

# def read_images(path: str) -> list[ov.Tensor]:
#   entry = Path(path)
#   if entry.is_dir():
#       return [read_image(str(file)) for file in sorted(entry.iterdir())]
#   return [read_image(path)]

# images = read_images("./images/")

# pipe = ov_genai.VLMPipeline(model_path, "CPU")
# result = pipe.generate(prompt, images=images, max_new_tokens=100)
# print(result.texts[0])

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=False)

# To input videos frames, use 'videos=', frames tensor layout = [Frame, H, W, C]
# result = pipe.generate(prompt, videos=[frames], max_new_tokens=100)