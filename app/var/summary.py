"""Read the access data and calculate some stats"""

import sqlite3
import ipaddress
import requests
import operator

conn = sqlite3.connect("/var/www/PersonalSite/app/sql/data.db")

def access_summary():
    cur = conn.cursor()

    # Get the ip address details
    res = cur.execute("select * from ip_map where ip in "
                      "(select ip from site_access where date >= "
                      "datetime('now', '-10 days'))")

    ip_map = dict()
    for row in res.fetchall():
        ip, city, region, country, lat, lon, org = row
        ip_map[row[0]] = {
                "city": city,
                "region": region,
                "country": country,
                "lat": lat,
                "lon": lon,
                "org": org
        }

    # Now get all of the access data
    res = cur.execute("select ip, date from site_access where date >= "
                      "datetime('now', '-10 days')")

    count_map = {}
    hour_map = {}
    last_x_ips = list()
    for ip, date in res.fetchall():
        hour = date[:-6]
        if hour not in hour_map.keys():
            hour_map[hour] = 0
        hour_map[hour] += 1

        if ip not in count_map:
            count_map[ip] = 0
        count_map[ip] += 1

        last_x_ips.append((ip, date))

    last_x_ips = last_x_ips[-30:]
    # Display all of the accesses by hour for the past ten days 
    data = sorted(hour_map.items(), key=operator.itemgetter(0))
    for entry in data:
        print(entry[0], entry[1])

    # Display the most accesses by ip address
    print("****")

    data = sorted(count_map.items(), key=(operator.itemgetter(1)))
    for entry in data:
        print(f"|{entry[1]:5}| ", end="")
        ipi = ip_map[entry[0]]
        region_str = f"{ipi['city']},{ipi['region']},{ipi['country']}"
        print(f"{entry[0]:15} - {region_str:40} - {ipi['org']}")

    print("****")
    # last 30 ips to visit
    for ip, date in last_x_ips: 
        print(f"|{date:15}| ", end="")
        ipi = ip_map[ip]
        region_str = f"{ipi['city']},{ipi['region']},{ipi['country']}"
        print(f"{ip:15} - {region_str:40} - {ipi['org']}")



if __name__ == "__main__":
    access_summary()
