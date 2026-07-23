import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

// Login page — renders the shared AuthLayout with LoginForm.
// AuthLayout provides the branded split-screen; LoginForm handles
// validation via React Hook Form + Zod and calls authService.login.
export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your dashboard, wishlist, and saved searches."
    >
      <LoginForm />
    </AuthLayout>
  );
}
