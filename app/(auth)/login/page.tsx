import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-highlight">
          Welcome back
        </h1>
        <p className="text-sm text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 focus:ring-offset-gray-900"
          />
        </div>

        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="text-sm font-medium text-gray-200"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 focus:ring-offset-gray-900"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-highlight focus:ring-highlight focus:ring-offset-gray-900"
            />
            <label 
              htmlFor="remember" 
              className="text-sm font-medium text-gray-200"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link 
              className="text-highlight hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-highlight px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>

      <div className="mt-10 text-center">
        <Link 
          className="text-highlight hover:underline"
          href="/register"
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
