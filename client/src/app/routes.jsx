import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App.jsx";

const Dashboard = lazy(() => import("../features/dashboard/Dashboard.jsx"));
const Tracker = lazy(() => import("../features/tracker/Tracker.jsx"));
const Analytics = lazy(() => import("../features/analytics/Analytics.jsx"));
const CheckIn = lazy(() => import("../features/checkin/CheckIn.jsx"));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #151530",
        borderRadius: 14,
        background: "linear-gradient(160deg, #0a0a1a 60%, #0d0520 100%)",
        color: "#00f5ff",
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: 3,
      }}
    >
      LOADING MODULE...
    </div>
  );
}

function withSuspense(element) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={withSuspense(<Dashboard />)} />
        <Route path="tracker" element={withSuspense(<Tracker />)} />
        <Route path="analytics" element={withSuspense(<Analytics />)} />
        <Route path="check-in" element={withSuspense(<CheckIn />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;