from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse, Response
from typing import Optional

import os
import shutil
import base64
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

UPLOAD_DIRECTORY = "uploads"
img_directory = "archive/images"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@app.post("/upload")
async def upload(
    text: str = Form(None), 
    file: UploadFile = File(None), 
    return_img_name: str = '1163.jpg',
    return_txt: str = "This came from the FastAPI Server ;)"
    ):
    try:
        # 파일 업로드 필드가 없는 경우에는 텍스트만 처리
        if not file:
            if text:
                # 텍스트를 텍스트 파일에 저장
                text_path = os.path.join(UPLOAD_DIRECTORY, 'text.txt')
                with open(text_path, "a") as text_file:
                    text_file.write(text + '\n')
        
        # 파일 업로드 필드가 있는 경우에는 이미지를 이미지 파일에 저장
        else:
            print(file)
            image_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
            with open(image_path, "wb") as image_file:
                shutil.copyfileobj(file.file, image_file)
                
            # 이미지 파일과 텍스트 모두가 존재하는 경우에는 둘 다 처리
            if text:
                # 텍스트를 텍스트 파일에 저장
                text_path = os.path.join(UPLOAD_DIRECTORY, 'text.txt')
                with open(text_path, "a") as text_file:
                    text_file.write(text + '\n')
        
        # 서버에서 이미지와 텍스트 받아 response에 저장
        response_dir = os.path.join(img_directory, return_img_name)
        with open(response_dir, 'rb') as img_file:
            # URL이 아닌 파일시스템 내부의 이미지를 반환하기 위해 64byte 인코드
            encode_img = base64.b64encode(img_file.read()).decode('utf-8')
        
        return JSONResponse(content={"img": encode_img, "txt": return_txt})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/get-image")
async def get_image(img_name: str = '1163.jpg'):
    try:
        image_path = os.path.join(img_directory, img_name)
        if not os.path.isfile(image_path):
            return {"error": "Image not found on the server"}
        with open(image_path, "rb") as image_file:
            content = image_file.read()
        return Response(content, media_type="image/jpeg")
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})