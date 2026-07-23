from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import smtplib

from email.mime.text import MIMEText

app = FastAPI()

@app.middleware("http")
async def debug_request(request: Request, call_next):
    print("METHOD:", request.method, "PATH:", request.url.path, flush=True)
    response = await call_next(request)
    return response

@app.post("/contactme")
async def login(name: Annotated[str, Form()], email: Annotated[str, Form()],
                message: Annotated[str, Form()]):
    msg = MIMEText(message)
    msg['Subject'] = 'Website email received from '+name
    msg['From'] = email
    msg['To'] = 'sthomasen7@gmail.com'

    #s = smtplib.SMTP('localhost')
    #s.sendmail(email, 'sthomasen7@gmail.com', msg.as_string())
    #s.quit()
    
    with open("email_logs.txt", 'a') as fptr:
        fptr.write(msg.as_string()+'\n~~~~~~~~~~~\n')

    return RedirectResponse(
        url="/",
        status_code=303
    )

app.mount("/", StaticFiles(directory="/var/www/PersonalSite/app/engine", html=True), name="engine")
