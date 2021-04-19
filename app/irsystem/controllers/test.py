from json_reader import *

varieties = [
    'Cabernet Franc', 'Syrah',
    'Nebbiolo', 'Grenache', 'Tempranillo', 'Sangiovese', 'Carmen\u00e8re',
    'Moscato', 'Champagne Blend', 'Pinot Noir', 'Pinot Grigio', 'Cabernet Sauvignon',
    'Chardonnay', 'Riesling', 'Ros\u00e9', 'Malbec', 'Zinfandel',
    'Sauvignon Blanc', 'Merlot'
]

df = json_read("winemag_data_withtoks.json")

wine_types = {}
for i in range(len(df)):
    v = df["variety"][i]
    if v in wine_types:
        wine_types[v] += 1
    else:
        wine_types[v] = 1

# print(wine_types)
for i in wine_types:
    assert wine_types[i] >= 5
print("Sufficient data for each wine.")

union = []
unnecessary = []
needed = []
for i in wine_types:
    if i in varieties:
        union.append(i)
    else:
        unnecessary.append(i)

for i in varieties:
    if i not in wine_types:
        needed.append(i)

# print(union)
# print(needed)
# print(unnecessary)

assert len(needed) == 0
print("All wine types available.")
assert len(unnecessary) == 0
print("Most efficient json.")

print()
print("Tests passed.")
