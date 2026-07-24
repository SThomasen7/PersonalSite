from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import subprocess
from email.message import EmailMessage
import sqlite3
import traceback

app = FastAPI()

conn = sqlite3.connect("/var/www/PersonalSite/app/sql/data.db")
cur = conn.cursor()

def record_access(request):
    global conn
    global cur

    try:
        # Get the IP Address
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            ip = forwarded.split(",")[0].strip()
        else:
            ip = request.client.host if request.client else "unknown"

        # Save to DB
        cur.execute(f"insert into site_access values ('{ip}', current_timestamp)")
        conn.commit()
    except Exception as e:
        con = sqlite3.connect("/var/www/PersonalSite/app/sql/data.db")
        cur = conn.cursor()
        # Notify the exception
        msg = EmailMessage()
        msg["Subject"] = "Exception in website middleware: "+str(e)
        msg["From"] = "sthomasen7@gmail.com"
        msg["To"] = "sthomasen7@gmail.com"
        msg.set_content(f"""
        Exception recording data to data.db in website.
        ***
        {traceback.format_exc()}
        ***
        {str(e)}
        ****
        """)

        subprocess.run(
            ["/usr/bin/msmtp", "-t"],
            input=msg.as_bytes(),
            check=True,
        )
    
@app.middleware("http")
async def log_request(request: Request, call_next):
    if request.method == "GET" and request.url.path == "/":
        record_access(request)

    response = await call_next(request)
    return response

@app.post("/contactme")
async def login(name: Annotated[str, Form()], email: Annotated[str, Form()],
                message: Annotated[str, Form()]):

    msg = EmailMessage()
    msg["Subject"] = "Website email received from "+name
    msg["From"] = "sthomasen7@gmail.com"
    msg["To"] = "sthomasen7@gmail.com"
    msg.set_content(f"""
    Name: {name}
    Email: {email}
    Message: 
    ***
    {message}
    ****
    """)

    subprocess.run(
        ["/usr/bin/msmtp", "-t"],
        input=msg.as_bytes(),
        check=True,
    )
    
    with open("email_logs.txt", 'a') as fptr:
        fptr.write(msg.as_string()+'\n~~~~~~~~~~~\n')

    return RedirectResponse(
        url="/",
        status_code=303
    )

app.mount("/", StaticFiles(directory="/var/www/PersonalSite/app/engine", html=True), name="engine")
