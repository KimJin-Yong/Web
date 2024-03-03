
import pandas as pd
import json
return_img_name = '1164.jpg'
with open('archive/styles.csv', 'r') as f:
    df = f.readlines()

iid = return_img_name.split('.')[0]
keys = df[0].split(',')
for data in df:
    temp = data.split(',')
    if iid == temp[0]:
        att = json.dumps({keys[i].strip('\n'): temp[i].strip('\n') for i in range(len(keys))})
print(att)
# df = pd.read_csv('archive/styles.csv') # productDisplayName에 컴마 포함되어 있어 못읽음. e.g. row 6044