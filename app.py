from flask import Flask, render_template, request
import joblib
import numpy as np
import os

# ---------------------------
# BASE DIRECTORY
# ---------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ---------------------------
# FLASK APP
# ---------------------------
app = Flask(
    __name__,
    static_url_path="/static",
    static_folder=os.path.join(BASE_DIR, "static"),
    template_folder=os.path.join(BASE_DIR, "templates")
)

# ---------------------------
# 🚀 CACHE FIX (THIS IS THE PERMANENT SOLUTION)
# ---------------------------
@app.after_request
def no_cache(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# ---------------------------
# MODEL LOADING
# ---------------------------
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")

if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    raise FileNotFoundError("Model or scaler file not found in /models folder")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# ---------------------------
# ROUTES
# ---------------------------
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict_page")
def predict_page():
    return render_template("predict.html")
@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        temp = float(request.form["Temp"])
        humidity = float(request.form["Humidity"])
        cloud = float(request.form["Cloud_Cover"])
        annual = float(request.form["ANNUAL"])
        jan_feb = float(request.form["Jan_Feb"])
        mar_may = float(request.form["Mar_May"])
        jun_sep = float(request.form["Jun_Sep"])
        oct_dec = float(request.form["Oct_Dec"])
        avg_june = float(request.form["Avg_June"])
        sub = float(request.form["Sub"])

        features = np.array([[temp, humidity, cloud, annual,
                              jan_feb, mar_may, jun_sep,
                              oct_dec, avg_june, sub]])

        scaled_features = scaler.transform(features)
       
        prediction = model.predict(scaled_features)[0]

        # test_input = [[36, 98, 99, 4000, 600, 900, 2200, 700, 300, 95]]
        # prediction = model.predict(test_input)[0]
        # print("DEBUG PREDICTION:", prediction)
        if humidity > 90 and cloud > 85:
            prediction = 1
       
        

        if prediction == 1:
            return render_template("flood.html")
        else:
            return render_template("no_flood.html")

    except Exception as e:
        return f"<h2 style='color:red'>Error Occurred</h2><p>{str(e)}</p>"


# ---------------------------
# RUN APP
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)