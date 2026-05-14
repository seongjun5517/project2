import joblib
import numpy as np

heart_model = joblib.load("./models/best_model.pkl")

def getheartPredict(features):
    print(">>>>>>예측시작")
    heart_array = np.array(features)
    heart_name = heart_model.predict([heart_array])[0]
    print(">>>>>>>예측결과 : ", heart_name)
    return heart_name