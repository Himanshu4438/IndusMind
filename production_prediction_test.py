import pandas as pd
import joblib
import shap

# Load model
model = joblib.load("indusmind_production_quality_model.pkl")

# Load threshold
threshold = joblib.load("indusmind_production_threshold.pkl")

# Load feature list
features = joblib.load("indusmind_production_features.pkl")

print("--- PRODUCTION RISK PREDICTION ---")

# Test production data
data = {
    "ProductionVolume": 800,
    "ProductionCost": 15000,
    "SupplierQuality": 90,
    "DeliveryDelay": 2,
    "DefectRate": 4.2,
    "QualityScore": 70,
    "MaintenanceHours": 20,
    "DowntimePercentage": 4.0,
    "InventoryTurnover": 5,
    "StockoutRate": 0.07,
    "WorkerProductivity": 85,
    "SafetyIncidents": 5,
    "EnergyConsumption": 4000,
    "EnergyEfficiency": 0.20,
    "AdditiveProcessTime": 8,
    "AdditiveMaterialCost": 400
}

# Convert to DataFrame
input_data = pd.DataFrame([data])

# Correct feature order
input_data = input_data[features]

# Prediction probability
probability = model.predict_proba(input_data)[0][1]

# Apply threshold
prediction = int(probability >= threshold)

print("\nDefect Probability:", round(probability, 4))
print("Threshold:", threshold)
print("Prediction:", prediction)

if prediction == 1:
    print("Status: HIGH DEFECT RISK")
else:
    print("Status: LOW DEFECT RISK")


# -----------------------------------
# SHAP INDIVIDUAL EXPLANATION
# -----------------------------------

print("\n--- WHY THIS PREDICTION? ---")

# Create SHAP explainer
explainer = shap.TreeExplainer(model)

# Calculate SHAP values
shap_values = explainer.shap_values(input_data)

# Handle SHAP output format
if isinstance(shap_values, list):
    values = shap_values[1][0]

elif len(shap_values.shape) == 3:
    values = shap_values[0, :, 1]

else:
    values = shap_values[0]

# Create explanation table
explanation = pd.DataFrame({
    "Feature": features,
    "SHAP_Value": values,
    "Input_Value": input_data.iloc[0].values
})

# Sort by absolute SHAP value
explanation["Absolute_SHAP"] = explanation["SHAP_Value"].abs()

explanation = explanation.sort_values(
    by="Absolute_SHAP",
    ascending=False
)

print("\n--- TOP 5 CONTRIBUTING FACTORS ---")

for _, row in explanation.head(5).iterrows():

    direction = "INCREASES risk" if row["SHAP_Value"] > 0 else "REDUCES risk"

    print(
        f"{row['Feature']}: "
        f"{row['Input_Value']} → "
        f"{direction} "
        f"(SHAP: {row['SHAP_Value']:.4f})"
    )

    # -----------------------------------
# ACTION / RECOMMENDATIONS
# -----------------------------------

print("\n--- RECOMMENDED ACTIONS ---")

recommendations = []

if prediction == 1:
    recommendations.append(
        "High defect risk detected. Production quality should be reviewed."
    )

if data["DefectRate"] >= 4:
    recommendations.append(
        "Defect rate is high. Investigate the main sources of production defects."
    )

if data["MaintenanceHours"] >= 15:
    recommendations.append(
        "Maintenance hours are high. Schedule a maintenance inspection."
    )

if data["QualityScore"] <= 75:
    recommendations.append(
        "Quality score is low. Review the production quality parameters."
    )

if data["AdditiveMaterialCost"] >= 400:
    recommendations.append(
        "Additive material cost is high. Check material usage and wastage."
    )

if data["StockoutRate"] >= 0.07:
    recommendations.append(
        "Stockout rate is elevated. Review inventory and material availability."
    )

if not recommendations:
    recommendations.append(
        "No immediate action required. Continue monitoring production."
    )

for i, recommendation in enumerate(recommendations, start=1):
    print(f"{i}. {recommendation}")