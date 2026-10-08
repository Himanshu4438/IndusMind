import pandas as pd
import joblib
import shap

# Load dataset
df = pd.read_csv("data/manufacturing_defect_dataset.csv")

# Features and target
X = df.drop(columns=["DefectStatus"])

# Load trained model
model = joblib.load("indusmind_production_quality_model.pkl")

print("--- SHAP ANALYSIS ---")

# Create SHAP explainer
explainer = shap.TreeExplainer(model)

# Calculate SHAP values
shap_values = explainer.shap_values(X)

print("SHAP analysis completed!")

# Handle different SHAP output formats
if isinstance(shap_values, list):
    values = shap_values[1]

elif len(shap_values.shape) == 3:
    values = shap_values[:, :, 1]

else:
    values = shap_values

# Mean absolute SHAP importance
shap_importance = pd.DataFrame({
    "Feature": X.columns,
    "Mean_ABS_SHAP": abs(values).mean(axis=0)
})

shap_importance = shap_importance.sort_values(
    by="Mean_ABS_SHAP",
    ascending=False
)

print("\n--- SHAP FEATURE IMPORTANCE ---")
print(shap_importance.to_string(index=False))