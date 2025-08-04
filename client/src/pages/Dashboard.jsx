// Dashboard.jsx
import React, { useState } from "react";
import "../Styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../../public/Context/AuthContext";
import VendorC1 from "../components/vendor/vendorC1";
// import SavedItems from "../components/user/SavedItems";
import OrderHistory from "../components/user/OrderHistory";
import Favorites from "../components/user/Favorites";
import UserProfile from "./UserProfile";
import ProductList from "../components/vendor/ProductList";
import ProductForm from "../components/vendor/ProductForm";
import SalesAnalytics from "../components/vendor/SalesAnalytics";
import AdminDashboardStats from "../components/admin/AdminDashboardStats";
import UserList from "../components/admin/UserList";
import VendorList from "../components/admin/VendorList";
import SupplyPurchaseDetails from "../components/admin/SupplyPurchaseDetails";
import ProductModeration from "../components/admin/ProductModeration";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("comparisons");

  const roleComponents = {
    user: {
      saved: <SavedItems />,
      "order-history": <OrderHistory />,
      favorites: <Favorites />,
      profile: <UserProfile user={user} onLogout={logout} />,
    },
    vendor: {
      "product-management": <ProductList />,
      "sales-analytics": <SalesAnalytics />,
      "upload-product": <ProductForm />,
    },
    admin: {
      "admin-dashboard": <AdminDashboardStats />,
      "user-management": <UserList />,
      "vendor-management": <VendorList />,
      "supply-purchase": <SupplyPurchaseDetails />,
      "product-moderation": <ProductModeration />,
    },
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="dashboard-main">
        {roleComponents[user?.role]?.[activeTab] ?? (
          <div>Select a section from the sidebar</div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
