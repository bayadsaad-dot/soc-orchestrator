import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join SOC Orchestrator and start managing your security operations."
    >
      <RegisterForm />
    </AuthLayout>
  );
}