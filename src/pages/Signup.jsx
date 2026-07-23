import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';

// Signup page — renders the shared AuthLayout with SignupForm.
// AuthLayout provides the branded split-screen; SignupForm handles
// validation via React Hook Form + Zod and calls authService.signup.
export default function Signup() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of buyers and investors finding their next property."
    >
      <SignupForm />
    </AuthLayout>
  );
}
