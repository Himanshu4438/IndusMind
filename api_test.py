import requests


BASE_URL = "http://127.0.0.1:8000"


# ===================================
# 1. MACHINE FAILURE API TEST
# ===================================

print("\n===================================")
print(" MACHINE FAILURE API TEST")
print("===================================")

machine_data = {
    "machine_type": "L",
    "air_temperature": 305,
    "process_temperature": 315,
    "rotational_speed": 1200,
    "torque": 70,
    "tool_wear": 220
}

response = requests.post(
    f"{BASE_URL}/predict",
    json=machine_data
)

print("Status Code:", response.status_code)

if response.status_code == 200:

    result = response.json()

    print("Prediction:", result.get("prediction"))
    print("Status:", result.get("status"))

    print("\nComplete Machine API Response:")
    print(result)

else:

    print("Machine API Error:")
    print(response.text)


# ===================================
# 2. PRODUCTION QUALITY API TEST
# ===================================

print("\n===================================")
print(" PRODUCTION QUALITY API TEST")
print("===================================")

production_data = {
    "ProductionVolume": 800,
    "ProductionCost": 15000,
    "SupplierQuality": 90,
    "DeliveryDelay": 2,
    "DefectRate": 4.2,
    "QualityScore": 70,
    "MaintenanceHours": 20,
    "DowntimePercentage": 4,
    "InventoryTurnover": 5,
    "StockoutRate": 0.07,
    "WorkerProductivity": 85,
    "SafetyIncidents": 5,
    "EnergyConsumption": 4000,
    "EnergyEfficiency": 0.2,
    "AdditiveProcessTime": 8,
    "AdditiveMaterialCost": 400
}

response = requests.post(
    f"{BASE_URL}/predict-production",
    json=production_data
)

print("Status Code:", response.status_code)

if response.status_code == 200:

    result = response.json()

    print("Defect Probability:",
          result.get("defect_probability"))

    print("Prediction:",
          result.get("prediction"))

    print("Status:",
          result.get("status"))

    print("\nTop Factors:")

    for factor in result.get("top_factors", []):
        print(
            f"- {factor['feature']}: "
            f"{factor['effect']}"
        )

    print("\nRecommendations:")

    for recommendation in result.get("recommendations", []):
        print(f"- {recommendation}")

else:

    print("Production API Error:")
    print(response.text)


print("\n===================================")
print(" ALL API TESTS COMPLETED")
print("===================================")