import SignupForm from './SignUpForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Get Started With Smart Agent!</h1>
          <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
        </div>
        <button className="w-full border py-2 mb-4 flex items-center justify-center gap-2">
          <img src="/google-icon.svg" className="h-5 w-5" /> Sign up with Google
        </button>
        <SignupForm />
        <p className="text-sm text-center mt-4">
          Already Have an account? <a href="/login" className="underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}
