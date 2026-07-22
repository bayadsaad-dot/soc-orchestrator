import ThreatDashboard from "../pages/ThreatDashboard";
import IOCDetails from "../pages/IOCDetails";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Reports from "../pages/Reports";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Incidents from "../pages/Incidents";
import CreateIncident from "../pages/CreateIncident";
import EditIncident from "../pages/EditIncident";
import IncidentDetails from "../pages/IncidentDetails";

import IOCs from "../pages/IOCs";
import CreateIOC from "../pages/CreateIOC";
import EditIOC from "../pages/EditIOC";

import Users from "../pages/Users";
import AuditLogs from "../pages/AuditLogs";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/threat-intelligence"
          element={
            <ProtectedRoute>
              <ThreatDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <Incidents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/incidents/create"
          element={
            <ProtectedRoute>
              <CreateIncident />
            </ProtectedRoute>
          }
        />

        <Route
          path="/incidents/edit/:id"
          element={
            <ProtectedRoute>
              <EditIncident />
            </ProtectedRoute>
          }
        />

        <Route
          path="/incidents/:id"
          element={
            <ProtectedRoute>
              <IncidentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/iocs"
          element={
            <ProtectedRoute>
              <IOCs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/iocs/create"
          element={
            <ProtectedRoute>
              <CreateIOC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/iocs/edit/:id"
          element={
            <ProtectedRoute>
              <EditIOC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/iocs/:id"
          element={
            <ProtectedRoute>
              <IOCDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit"
          element={
            <ProtectedRoute>
              <AuditLogs />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}