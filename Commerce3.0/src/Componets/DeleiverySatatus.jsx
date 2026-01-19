import React from "react";
import { FaShoppingCart, FaTruck, FaBoxOpen, FaCheckCircle } from "react-icons/fa";
const STATUS_STEPS = [
  { key: "PLACED", label: "Order Placed", icon: <FaShoppingCart /> },
  { key: "SHIPPED", label: "Shipped", icon: <FaTruck /> },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: <FaBoxOpen /> },
  { key: "DELIVERED", label: "Delivered", icon: <FaCheckCircle /> },
];
function DeleiverySatatus({ status }) {
  const currentStep = STATUS_STEPS.findIndex(step => step.key === status);
  return (
    <div className="flex justify-between items-center w-full max-w-3xl mx-auto mt-6 relative">
      {STATUS_STEPS.map((step, index) => {
        const completed = index <= currentStep;

        return (
          <div key={step.key} className="flex-1 flex flex-col items-center relative">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white z-10 ${
                completed ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {step.icon}
            </div>

            {/* Label */}
            <span
              className={`text-xs mt-2 text-center font-medium ${
                completed ? "text-green-500" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>

            {/* Connector Line */}
            {index < STATUS_STEPS.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-0.5 z-0 ${
                  index < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
                style={{ transform: "translateX(50%)" }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DeleiverySatatus
