import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

from xgboost import XGBClassifier

# LOAD DATASET

df = pd.read_csv("sleep_dataset.csv")

# REMOVE NULL VALUES

df = df.dropna()

# SELECT FEATURES

X = df[
[
"Age",
"Gender",
"Sleep Duration",
"Stress Level",
"BMI Category",
"Heart Rate",
"Daily Steps",
"Quality of Sleep",
"Physical Activity Level",
"Occupation",
"Blood Pressure"
]
]

# TARGET COLUMN

y = df["Sleep Disorder"]

# STORE FEATURE ENCODERS

feature_encoders = {}

# ENCODE ALL NON-NUMERIC COLUMNS
for column in X.columns:
    if not pd.api.types.is_numeric_dtype(X[column]):

        encoder = LabelEncoder()

        X[column] = encoder.fit_transform(
            X[column].astype(str)
        )

        feature_encoders[column] = encoder
# CONVERT ALL DATA TO FLOAT

X = X.astype(float)

# DEBUG

print("\nFEATURE DATA TYPES:\n")
print(X.dtypes)

# ENCODE TARGET LABEL

target_encoder = LabelEncoder()

y = target_encoder.fit_transform(y)

# TRAIN TEST SPLIT

X_train, X_test, y_train, y_test = train_test_split(
X,
y,
test_size=0.2,
random_state=42
)

# CREATE MODEL

model = XGBClassifier(
n_estimators=100,
learning_rate=0.1,
max_depth=5,
random_state=42,
eval_metric="mlogloss"
)

# TRAIN MODEL

model.fit(X_train, y_train)

# PREDICTIONS

predictions = model.predict(X_test)

# ACCURACY

accuracy = accuracy_score(
y_test,
predictions
)

print(
f"\n✅ Model Accuracy: {accuracy * 100:.2f}%"
)

# SAVE MODEL

joblib.dump(
model,
"model.pkl"
)

# SAVE FEATURE ENCODERS

joblib.dump(
feature_encoders,
"feature_encoders.pkl"
)

# SAVE TARGET ENCODER

joblib.dump(
target_encoder,
"target_encoder.pkl"
)

print("✅ model.pkl saved")
print("✅ feature_encoders.pkl saved")
print("✅ target_encoder.pkl saved")
print(df["Blood Pressure"].unique())