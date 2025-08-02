import React from "react";
import OrdersList from "./OrdersList";

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
      </div>
      <OrdersList />
    </div>
  );
};

export default Orders; 