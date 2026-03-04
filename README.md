## Multi-Modal Py

The simple demo app demonstrates Visual Question Answering (VQA) using a VLM (Vision Language Model). A VLM is a multimodal AI system that combines computer vision encoders with Large Language Models (LLMs) to understand and analyze both images and text. Specifically, the VLM maps visual features (people, places, things, activities, etc.) in the image into a language model's embedding space, allowing the model to "see" and interpret visual content. This app allows you to ask a question about an image, or just ask a question by itself.  

Python and TypeScript:
- The backend is implemented in Python/Flask using the OpenVino supported Phi-3.5-vision-instruct-int4-ov model running on an Intel CPU.
- The frontend uses Vite/React/TypeScript.

## Chat features:
- Supports both text input and image upload (.jpg, .png)
- Responsive UI: Streaming not implimented yet
- Incremental responses: Frontend only. No backend memory yet

## Model details:
- Uses OpenVino to support models running on CPU
- Tested on 2015 Macbook with Intel Core i7
- Minmal Latency: Currently ~ 50-70 seconds on my laptop
- Output quality: not measured
- Model selection rational: smallest VLM supported by openvino

## Example Questions: 
- Ask about details in an image or ask text only questions

## Description of the UI and usage instructions.
- This chat app runs in any web browser. It requires Python for the backend and NPM for the frontend

## Installation instructions:
- Clone this repo
- git clone https://github.com/dnielsen/multi-modal-py
- Run the following commands
- python -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- python ./backend/openvino-api.py
- open a new terminal window or tab
- cd frontend
- npm run dev
