import csv
from scraper import CSV_PATH

"""
I choose the top 100 restaurant with lowest reviews counts and rate < 4.0 as not recommended
"""

with open(CSV_PATH, 'r') as csv_file:

    reader = csv.reader(csv_file)
    fieldnames = next(reader)  # move the cursor
    reader = csv.DictReader(csv_file, fieldnames=fieldnames)
    rows = [row for row in reader]
    rows.sort(key=lambda row: int(row['review_count']))
    rows.reverse()

    count = 0
    for row in rows:
        if 4 > float(row['rate']):
            row['recommended'] = 0
            count += 1

        if count == 100:
            break

    else:
        print('NOT THAT MANY CANDIDATES')


R_CSV_PATH = './data/data_marked.csv'

with open(R_CSV_PATH, 'w+') as out_file:
    writer = csv.DictWriter(fieldnames=fieldnames, f=out_file)
    writer.writeheader()
    for row in rows:
        writer.writerow(row)
