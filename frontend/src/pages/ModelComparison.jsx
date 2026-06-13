
import DashboardLayout from "../components/DashboardLayout";

import { LabelList } from "recharts";

import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  Legend,

} from "recharts";

export default function ModelComparison() {
 
const comparisonData = [
  {
    model: "XGBoost",
    accuracy: 95.08,
    precision: 94.30,
    recall: 95.00,
    f1: 94.80,
  },
  {
    model: "SVM + LR",
    accuracy: 82.30,
    precision: 81.20,
    recall: 82.00,
    f1: 81.50,
  },
];
  return (

    <DashboardLayout title=" Comparison">

      <div className="p-6">

        {/* TITLE */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">

            Proposed vs Existing Models

          </h1>

          <p className="text-gray-300 mt-2">

            XGBoost vs Traditional Machine Learning Models

          </p>

        </div>

        {/* MODEL CARDS */}

        <div className="grid
grid-cols-1
lg:grid-cols-2
gap-6">

          {comparisonData.map((item, index) => (

            <div
              key={index}
              className="
                bg-white/10
                backdrop-blur-xl
                rounded-3xl
                p-6
                shadow-2xl
              "
            >

              <h2 className="text-3xl font-bold text-white">

                {item.model}

              </h2>

              <div className="mt-5 space-y-2">

                <div className="mt-6">

  <div className="flex justify-between mb-3">
    <span>Accuracy</span>
    <span>{item.accuracy}%</span>
  </div>

  <div className="w-full bg-white/10 rounded-full h-3">
    <div
      className="bg-purple-500 h-3 rounded-full"
      style={{
        width: `${item.accuracy}%`
      }}
    />
  </div>

</div>

                
              </div>

            </div>

          ))}

        </div>

       

        {/* COMPARISON CHART */}
<div
  className="
    bg-white/10
    backdrop-blur-xl
    rounded-3xl
    p-6
    shadow-2xl
    mt-10
  "
>
  <h2 className="text-2xl font-bold text-white mb-6">
    Performance Summary
  </h2>

  {comparisonData.length === 0 ? (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* XGBOOST */}

      <div className="
        bg-green-500/10
        border border-green-400/30
        rounded-3xl
        p-6
      ">
        <h3 className="text-3xl font-bold text-green-400">
          🏆 XGBoost
        </h3>

        <div className="mt-5 space-y-3">

          <p className="text-white">
            Accuracy: <strong>95.08%</strong>
          </p>

          <p className="text-white">
            Precision: <strong>94.30%</strong>
          </p>

          <p className="text-white">
            Recall: <strong>95.00%</strong>
          </p>

          <p className="text-white">
            F1 Score: <strong>94.80%</strong>
          </p>

        </div>
      </div>

      {/* SVM + LR */}

      <div className="
        bg-red-500/10
        border border-red-400/30
        rounded-3xl
        p-6
      ">
        <h3 className="text-3xl font-bold text-red-400">
          SVM + LR
        </h3>

        <div className="mt-5 space-y-3">

          <p className="text-white">
            Accuracy: <strong>82.30%</strong>
          </p>

          <p className="text-white">
            Precision: <strong>81.20%</strong>
          </p>

          <p className="text-white">
            Recall: <strong>82.00%</strong>
          </p>

          <p className="text-white">
            F1 Score: <strong>81.50%</strong>
          </p>

        </div>
      </div>

    </div>

  ) : (

    <div className="w-full h-[350px]">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={comparisonData}>
          <XAxis dataKey="model" />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          <Bar
            dataKey="accuracy"
            fill="#7c3aed"
            radius={[10,10,0,0]}
          >
            <LabelList
              dataKey="accuracy"
              position="top"
            />
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>

  )}

</div>
      {/* AI INSIGHTS */}

<div
  className="
    mt-10
    bg-white/10
    backdrop-blur-xl
    rounded-3xl
    p-8
    shadow-2xl
  "
>

  <h2 className="text-3xl font-bold text-white mb-6">
    🤖 AI Insights & Recommendations
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    {/* BEST MODEL */}

    <div className="
      bg-green-500/10
      border border-green-400/30
      rounded-2xl
      p-5
    ">
      <h3 className="text-green-400 font-bold text-xl mb-3">
        🏆 Best Model
      </h3>

      <p className="text-white text-lg">
        XGBoost achieved the highest prediction
        performance among all evaluated models.
      </p>
    </div>

    {/* ACCURACY GAIN */}

    <div className="
      bg-blue-500/10
      border border-blue-400/30
      rounded-2xl
      p-5
    ">
      <h3 className="text-blue-400 font-bold text-xl mb-3">
        📈 Accuracy Improvement
      </h3>

      <p className="text-white text-lg">
        XGBoost improved prediction accuracy
        by approximately 13% compared to
        SVM + Logistic Regression.
      </p>
    </div>

    {/* AI DECISION */}

    <div className="
      bg-purple-500/10
      border border-purple-400/30
      rounded-2xl
      p-5
    ">
      <h3 className="text-purple-400 font-bold text-xl mb-3">
        🧠 AI Decision
      </h3>

      <p className="text-white text-lg">
        XGBoost was selected as the final
        deployment model due to its superior
        accuracy, recall and generalization.
      </p>
    </div>

  </div>

  {/* CONCLUSION */}

  <div
    className="
      mt-8
      bg-white/5
      rounded-2xl
      p-6
    "
  >
    <h3 className="text-white text-xl font-bold mb-3">
      📋 Research Conclusion
    </h3>

    <p className="text-gray-300 leading-8 text-lg">
      The proposed AI-Based Sleep Disorder Detection
      system using XGBoost demonstrated superior
      predictive performance with an accuracy of
      95.08%, outperforming the existing SVM +
      Logistic Regression approach. The model
      effectively identifies sleep disorders and
      supports early clinical decision-making,
      making it suitable for real-world healthcare
      applications.
    </p>
  </div>

</div>
      </div>

    </DashboardLayout>

  );

}

