"""Read the access data and calculate some stats"""

import sqlite3
import ipaddress
import requests

conn = sqlite3.connect("/var/www/PersonalSite/app/sql/data.db")

def get_missing_ips():
    cur = conn.cursor()
    res = cur.execute("select distinct ip from site_access "
                "where ip not in (select ip from ip_map)")

    for row in res.fetchall():
        # update the ip map with info
        print(row)
        try:
            info = get_ip_info(row[0])
        except Exception as e:
            continue
        
        # Store the ip info in the db
        lat, lon = info.get("loc", ",").split(",")
        cur.execute("insert into ip_map values (?, ?, ?, ?, ?, ?, ?)",
                    (row[0], info.get("city"), info.get("region"),
                     info.get("country"), lat, lon, info.get("org"))
        )
    conn.commit()

def get_ip_info(ip: str):
    ip = str(ipaddress.ip_address(ip))
    response = requests.get(f"https://ipinfo.io/{ip}/json", timeout=5)
    response.raise_for_status()
    return response.json()

if __name__ == "__main__":
    get_missing_ips()
