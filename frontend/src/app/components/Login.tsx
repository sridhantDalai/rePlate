import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, ArrowRight } from "lucide-react";
import axios from 'axios'

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    
  const loginUser = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/user/login",
      {
        email,
        password
      },
      {
        withCredentials: true,
      }
    );

    alert(res.data.message);
    return true;
  } catch (error: any) {
    alert(
      error?.response?.data?.message ||
      error?.message ||
      "Login failed"
    );
    return false;
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccessful = await loginUser();

    if (loginSuccessful) {
      setEmail('');
      setPassword('');
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-black text-gray-900 mb-3" style={{ fontSize: '3.5rem', lineHeight: 1.1 }}>
              Welcome
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Back
              </span>
            </h1>
            <p className="text-gray-600" style={{ fontSize: '1.125rem' }}>
              Continue making a difference in your community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <StatBadge number="12,847" label="Active Members" delay={0.4} />
            <StatBadge number="45,293" label="Meals Shared" delay={0.5} />
            <StatBadge number="98%" label="Satisfaction Rate" delay={0.6} />
          </motion.div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-2xl bg-white/80 border border-white/60 rounded-3xl shadow-2xl p-8 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-black text-gray-900 mb-2" style={{ fontSize: '2rem' }}>
              Sign In
            </h2>
            <p className="text-gray-600">Access your account to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block font-black text-gray-900 mb-2" style={{ fontSize: '0.875rem' }}>
                Email Address
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block font-black text-gray-900 mb-2" style={{ fontSize: '0.875rem' }}>
                Password
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                />
              </motion.div>
            </motion.div>
{/* 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-lg border-2 border-gray-300 checked:bg-emerald-500 checked:border-emerald-500 cursor-pointer transition-all"
                />
                <span className="font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors" style={{ fontSize: '0.875rem' }}>
                  Remember me
                </span>
              </label>

              <motion.a
                whileHover={{ x: 3 }}
                href="#"
                className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                style={{ fontSize: '0.875rem' }}
              >
                Forgot password?
              </motion.a>
            </motion.div> */}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3"
              style={{ fontSize: '1.125rem' }}
            >
              Sign In
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup">
                <motion.span
                  whileHover={{ x: 3 }}
                  className="font-black text-emerald-600 hover:text-emerald-700 transition-colors inline-block"
                >
                  Sign up now
                </motion.span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function StatBadge({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ x: 8, scale: 1.02 }}
      className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-2xl px-6 py-4 shadow-lg inline-flex items-center gap-4"
    >
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
      <div>
        <p className="font-black text-gray-900" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
          {number}
        </p>
        <p className="text-gray-600 font-semibold" style={{ fontSize: '0.875rem' }}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}
