import pandas as pd

# Load dataset
df = pd.read_csv("data/manufacturing_defect_dataset.csv")

# Target
target = "DefectStatus"

# Features
X = df.drop(columns=[target])
y = df[target]

print("Features:")
print(X.columns.tolist())

print("\nNumber of features:", X.shape[1])

print("\nTarget:")
print(y.name)

print("\nTarget values:")
print(y.unique())

print("\nTarget distribution:")
print(y.value_counts())

print("\nFeature correlation with target:")
correlation = df.corr(numeric_only=True)["DefectStatus"].sort_values(
    ascending=False
)

print(correlation)