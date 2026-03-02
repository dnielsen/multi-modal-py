Multi-modal chatbot requirements:

## Chat features:
- Image upload (.jpg, .png)
- Text in responsive UI: Vite/React
- Incremental responses
## Model details:
- Supports Intel Core i7
- Memory footprint: 16 GB
- Minmal Latency: 16GB memory, 2015 CPU
- Output quality: Phi-3.5-vision-instruct-int4-ov 
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
