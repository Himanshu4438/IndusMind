from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import shap
from fastapi.middleware.cors import CORSMiddleware

# =========================================
# 1. FastAPI application
# =========================================

app = FastAPI(
    title="IndusMind Machine Failure API",
    description="Machine failure prediction API",
    version="1.1"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# 2. Load ML model
# =========================================

model = joblib.load(
    "indusmind_machine_failure_model.pkl"
)

threshold = joblib.load(
    "indusmind_threshold.pkl"
)

feature_columns = joblib.load(
    "indusmind_features.pkl"
)
explainer = shap.TreeExplainer(model)

# -----------------------------------
# PRODUCTION QUALITY MODEL
# -----------------------------------

production_model = joblib.load(
    "indusmind_production_quality_model.pkl"
)

production_threshold = joblib.load(
    "indusmind_production_threshold.pkl"
)

production_features = joblib.load(
    "indusmind_production_features.pkl"
)

production_explainer = shap.TreeExplainer(
    production_model
)


# =========================================
# 3. Input structure
# =========================================

class MachineData(BaseModel):

    machine_type: str

    air_temperature: float

    process_temperature: float

    rotational_speed: float

    torque: float

    tool_wear: float

    # -----------------------------------
# PRODUCTION DATA INPUT
# -----------------------------------

class ProductionData(BaseModel):
    ProductionVolume: int
    ProductionCost: float
    SupplierQuality: float
    DeliveryDelay: int
    DefectRate: float
    QualityScore: float
    MaintenanceHours: int
    DowntimePercentage: float
    InventoryTurnover: float
    StockoutRate: float
    WorkerProductivity: float
    SafetyIncidents: int
    EnergyConsumption: float
    EnergyEfficiency: float
    AdditiveProcessTime: float
    AdditiveMaterialCost: float


# =========================================
# 4. Home endpoint
# =========================================

@app.get("/")
def home():

    return {
        "message": "IndusMind ML API is running"
    }


# =========================================
# 5. Prediction endpoint
# =========================================

# =========================================
# 5. Prediction endpoint
# =========================================

# =========================================
# 5. Prediction endpoint
# =========================================

@app.post("/predict")
def predict_machine(data: MachineData):

    # -------------------------------------
    # Create input dataframe
    # -------------------------------------

    input_data = pd.DataFrame({

        "Type": [data.machine_type],

        "Air temperature [K]": [
            data.air_temperature
        ],

        "Process temperature [K]": [
            data.process_temperature
        ],

        "Rotational speed [rpm]": [
            data.rotational_speed
        ],

        "Torque [Nm]": [
            data.torque
        ],

        "Tool wear [min]": [
            data.tool_wear
        ]
    })

    # -------------------------------------
    # Convert Type into model format
    # -------------------------------------

    input_data = pd.get_dummies(
        input_data,
        columns=["Type"],
        drop_first=True
    )

    # -------------------------------------
    # Match training features
    # -------------------------------------

    input_data = input_data.reindex(
        columns=feature_columns,
        fill_value=0
    )

    # -------------------------------------
    # Predict probability
    # -------------------------------------

    probability = model.predict_proba(
        input_data
    )[0][1]

    # -------------------------------------
    # Apply threshold
    # -------------------------------------

    prediction = int(
        probability >= threshold
    )

    if prediction == 1:
        status = "FAILURE RISK"
    else:
        status = "NORMAL"

    # -------------------------------------
    # SHAP explanation
    # -------------------------------------

    shap_values = explainer.shap_values(input_data)

    # -------------------------------------
    # Handle SHAP output formats
    # -------------------------------------

    if isinstance(shap_values, list):

        values = shap_values[1][0]

    else:

        values = shap_values

        # New SHAP format may contain
        # an extra output dimension
        if len(values.shape) == 3:

            values = values[0, :, 1]

        elif len(values.shape) == 2:

            values = values[0]

    # -------------------------------------
    # Create feature impacts
    # -------------------------------------

    feature_impacts = []

    for feature, impact in zip(
        input_data.columns,
        values
    ):

        impact_value = float(
            impact.item()
            if hasattr(impact, "item")
            else impact
        )

        feature_impacts.append({

            "feature": feature,

            "impact": round(
                impact_value,
                4
            )
        })

    # -------------------------------------
    # Sort by strongest impact
    # -------------------------------------

    feature_impacts.sort(
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    # -------------------------------------
    # Top 3 factors
    # -------------------------------------

    top_factors = feature_impacts[:3]
    recommendations = []

    if prediction == 1:

      recommendations.append(
        "Schedule machine inspection before the next production cycle."
    )

      if data.torque >= 60:
        recommendations.append(
            "High torque detected. Inspect machine load, motor condition, and mechanical resistance."
        )

      if data.tool_wear >= 180:
        recommendations.append(
            "High tool wear detected. Inspect or replace the cutting tool."
        )

      elif data.tool_wear >= 150:
        recommendations.append(
            "Tool wear is elevated. Consider preventive inspection."
        )

      if data.rotational_speed <= 1500 and data.torque >= 60:
        recommendations.append(
            "Low rotational speed combined with high torque may indicate excessive machine load."
        )

    else:

      recommendations.append(
        "Machine condition appears normal. Continue regular monitoring."
    )

      if data.tool_wear >= 150:
        recommendations.append(
            "Tool wear is increasing. Consider preventive inspection."
        )

    # -------------------------------------
    # Final response
    # -------------------------------------

    return {

    "raw_probability": float(probability),

    "failure_probability": round(
        float(probability),
        4
    ),

    "failure_probability_percent": round(
        float(probability) * 100,
        2
    ),


    "threshold": round(
        float(threshold),
        4
    ),

    "threshold_percent": round(
        float(threshold) * 100,
        2
    ),

    "prediction": prediction,

    "status": status,

    "explanation": top_factors,

    "recommendations": recommendations
}

# -----------------------------------
# PRODUCTION QUALITY PREDICTION API
# -----------------------------------

@app.post("/predict-production")
def predict_production(data: ProductionData):

    input_data = pd.DataFrame([{
        "ProductionVolume": data.ProductionVolume,
        "ProductionCost": data.ProductionCost,
        "SupplierQuality": data.SupplierQuality,
        "DeliveryDelay": data.DeliveryDelay,
        "DefectRate": data.DefectRate,
        "QualityScore": data.QualityScore,
        "MaintenanceHours": data.MaintenanceHours,
        "DowntimePercentage": data.DowntimePercentage,
        "InventoryTurnover": data.InventoryTurnover,
        "StockoutRate": data.StockoutRate,
        "WorkerProductivity": data.WorkerProductivity,
        "SafetyIncidents": data.SafetyIncidents,
        "EnergyConsumption": data.EnergyConsumption,
        "EnergyEfficiency": data.EnergyEfficiency,
        "AdditiveProcessTime": data.AdditiveProcessTime,
        "AdditiveMaterialCost": data.AdditiveMaterialCost
    }])

    # Keep exact training feature order
    input_data = input_data[production_features]

    # -----------------------------------
    # PREDICTION
    # -----------------------------------

    probability = production_model.predict_proba(
        input_data
    )[0][1]

    prediction = int(
        probability >= production_threshold
    )

    if prediction == 1:
        status = "HIGH DEFECT RISK"
    else:
        status = "LOW DEFECT RISK"

    # -----------------------------------
    # SHAP EXPLANATION
    # -----------------------------------

    shap_values = production_explainer.shap_values(
        input_data
    )

    if isinstance(shap_values, list):
        values = shap_values[1][0]

    elif len(shap_values.shape) == 3:
        values = shap_values[0, :, 1]

    else:
        values = shap_values[0]

    explanation = pd.DataFrame({
        "Feature": production_features,
        "SHAP_Value": values,
        "Input_Value": input_data.iloc[0].values
    })

    explanation["Absolute_SHAP"] = (
        explanation["SHAP_Value"].abs()
    )

    explanation = explanation.sort_values(
        by="Absolute_SHAP",
        ascending=False
    )

    # Top 5 factors
    top_factors = []

    for _, row in explanation.head(5).iterrows():

        effect = (
            "INCREASES risk"
            if row["SHAP_Value"] > 0
            else "REDUCES risk"
        )

        top_factors.append({
            "feature": row["Feature"],
            "value": float(row["Input_Value"]),
            "shap_value": round(
                float(row["SHAP_Value"]), 4
            ),
            "effect": effect
        })

    # -----------------------------------
    # RECOMMENDATIONS
    # -----------------------------------

    recommendations = []

    if prediction == 1:
        recommendations.append(
            "High defect risk detected. "
            "Production quality should be reviewed."
        )

    if data.DefectRate >= 4:
        recommendations.append(
            "Defect rate is high. "
            "Investigate the main sources of production defects."
        )

    if data.MaintenanceHours >= 15:
        recommendations.append(
            "Maintenance hours are high. "
            "Schedule a maintenance inspection."
        )

    if data.QualityScore <= 75:
        recommendations.append(
            "Quality score is low. "
            "Review the production quality parameters."
        )

    if data.AdditiveMaterialCost >= 400:
        recommendations.append(
            "Additive material cost is high. "
            "Check material usage and wastage."
        )

    if data.StockoutRate >= 0.07:
        recommendations.append(
            "Stockout rate is elevated. "
            "Review inventory and material availability."
        )

    if not recommendations:
        recommendations.append(
            "No immediate action required. "
            "Continue monitoring production."
        )

    # -----------------------------------
    # API RESPONSE
    # -----------------------------------

    return {
        "defect_probability": round(
            float(probability), 4
        ),
        "threshold": production_threshold,
        "prediction": prediction,
        "status": status,
        "top_factors": top_factors,
        "recommendations": recommendations
    }