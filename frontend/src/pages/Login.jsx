import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your SOC Orchestrator dashboard."
    >
      <LoginForm />
    </AuthLayout>
  );
}