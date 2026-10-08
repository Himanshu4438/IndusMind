import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, f1_score

# Load dataset
df = pd.read_csv("data/manufacturing_defect_dataset.csv")

# Features and target
X = df.drop(columns=["DefectStatus"])
y = df["DefectStatus"]

# Same split as training
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Load trained model
model = joblib.load("indusmind_production_quality_model.pkl")

# Get defect probabilities
probabilities = model.predict_proba(X_test)[:, 1]

print("--- THRESHOLD ANALYSIS ---")

for threshold in [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70]:

    predictions = (probabilities >= threshold).astype(int)

    precision = precision_score(y_test, predictions, zero_division=0)
    recall = recall_score(y_test, predictions, zero_division=0)
    f1 = f1_score(y_test, predictions, zero_division=0)

    print(
        f"Threshold: {threshold:.2f} | "
        f"Precision: {precision:.3f} | "
        f"Recall: {recall:.3f} | "
        f"F1: {f1:.3f}"
    )
    import joblib

production_threshold = 0.50

joblib.dump(
    production_threshold,
    "indusmind_production_threshold.pkl"
)

print("\n--- THRESHOLD SAVED ---")
print("Production threshold:", production_threshold)
print("Threshold file saved successfully!")