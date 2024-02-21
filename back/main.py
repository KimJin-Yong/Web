from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse, Response
from typing import Optional

import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

UPLOAD_DIRECTORY = "uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)
@app.post("/upload")
async def upload(text: str = Form(None), file: UploadFile = File(None)):
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
            image_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
            with open(image_path, "wb") as image_file:
                shutil.copyfileobj(file.file, image_file)
                
            # 이미지 파일과 텍스트 모두가 존재하는 경우에는 둘 다 처리
            if text:
                # 텍스트를 텍스트 파일에 저장
                text_path = os.path.join(UPLOAD_DIRECTORY, 'text.txt')
                with open(text_path, "a") as text_file:
                    text_file.write(text + '\n')
        
        return JSONResponse(content={"message": "Text and image uploaded successfully"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

img_directory = "archive/images"
@app.get("/get_image")
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


# img_directory = "archive/images"
# @app.get(f"/get_image/{img_name}")
# async def get_image():
#     image_path = os.path.join(img_directory, img_name)
#     if not os.path.isfile(image_path):
#         return {"error": "Image not found on the server"}
#     return FileResponse(image_path)