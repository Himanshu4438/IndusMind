import pandas as pd

df = pd.read_csv("data/manufacturing_defect_dataset.csv")

print("Shape:")
print(df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())

print("\nData Types:")
print(df.dtypes)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nTarget Distribution:")
print(df["DefectStatus"].value_counts())
print("\nTarget Percentage:")
print(df["DefectStatus"].value_counts(normalize=True) * 100)

print("\nStatistical Summary:")
print(df.describe().T)