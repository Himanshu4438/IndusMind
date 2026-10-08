import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)

# Load dataset
df = pd.read_csv("data/manufacturing_defect_dataset.csv")

# Features and target
X = df.drop(columns=["DefectStatus"])
y = df["DefectStatus"]

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("Training samples:", X_train.shape[0])
print("Testing samples:", X_test.shape[0])

# Random Forest
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)

# Train model
model.fit(X_train, y_train)

print("\nModel training completed!")

# Predictions
y_pred = model.predict(X_test)
y_probability = model.predict_proba(X_test)[:, 1]

# Evaluation
print("\n--- MODEL PERFORMANCE ---")

print("Accuracy :", round(accuracy_score(y_test, y_pred), 4))
print("Precision:", round(precision_score(y_test, y_pred), 4))
print("Recall   :", round(recall_score(y_test, y_pred), 4))
print("F1 Score :", round(f1_score(y_test, y_pred), 4))
print("ROC-AUC  :", round(roc_auc_score(y_test, y_probability), 4))

print("\n--- CLASSIFICATION REPORT ---")
print(classification_report(y_test, y_pred))

print("\n--- CONFUSION MATRIX ---")
print(confusion_matrix(y_test, y_pred))

print("\n--- FEATURE IMPORTANCE ---")

importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

importance = importance.sort_values(
    by="Importance",
    ascending=False
)

print(importance.to_string(index=False))

import joblib

print("\n--- SAVING PRODUCTION MODEL ---")

joblib.dump(
    model,
    "indusmind_production_quality_model.pkl"
)

joblib.dump(
    list(X.columns),
    "indusmind_production_features.pkl"
)

print("Production model saved successfully!")
print("Feature list saved successfully!")

