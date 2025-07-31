import React from "react";
import OrdersList from "./OrdersList";

const Orders = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-black">Orders</h2>
      </div>
      <OrdersList />
    </div>
  );
};

export default Orders; 