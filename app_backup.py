from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import shap


# =========================================
# 1. FastAPI application
# =========================================

app = FastAPI(
    title="IndusMind Machine Failure API",
    description="Machine failure prediction API",
    version="1.1"
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