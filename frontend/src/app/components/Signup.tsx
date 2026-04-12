import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { User, Mail, Phone, Lock, ArrowRight, Heart } from "lucide-react";
import axios from 'axios'

export function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const signupUser = async () => {
    try {
      const res = await axios.post("https://replate-pycw.onrender.com/user/signup", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true // important if using cookies (JWT)
      });
      alert('User created successfully.')

    } catch (error: any) {

      alert(error.response?.data?.message || error.message)
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });
    signupUser();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-2xl bg-white/80 border border-white/60 rounded-3xl shadow-2xl p-8 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-black text-gray-900 mb-2" style={{ fontSize: '2rem' }}>
              Join rePlate
            </h2>
            <p className="text-gray-600">Start sharing food and making an impact</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block font-black text-gray-900 mb-2" style={{ fontSize: '0.875rem' }}>
                Full Name
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                />
              </motion.div>
            </motion.div>

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
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                />
              </motion.div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block font-black text-gray-900 mb-2" style={{ fontSize: '0.875rem' }}>
                Mobile Number
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                />
              </motion.div>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block font-black text-gray-900 mb-2" style={{ fontSize: '0.875rem' }}>
                Password
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 mt-0.5 rounded-lg border-2 border-gray-300 checked:bg-emerald-500 checked:border-emerald-500 cursor-pointer transition-all"
                />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors" style={{ fontSize: '0.875rem' }}>
                  I agree to the{" "}
                  <span className="font-bold text-emerald-600 hover:text-emerald-700">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-bold text-emerald-600 hover:text-emerald-700">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3"
              style={{ fontSize: '1.125rem' }}
            >
              Create Account
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login">
                <motion.span
                  whileHover={{ x: 3 }}
                  className="font-black text-emerald-600 hover:text-emerald-700 transition-colors inline-block"
                >
                  Sign in
                </motion.span>
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-black text-gray-900 mb-3" style={{ fontSize: '3.5rem', lineHeight: 1.1 }}>
              Make A
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Difference
              </span>
            </h1>
            <p className="text-gray-600" style={{ fontSize: '1.125rem' }}>
              Join thousands of community members fighting food waste and hunger
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <BenefitCard
              icon={Heart}
              title="Share with Care"
              description="Help those in need while reducing waste"
              delay={0.4}
            />
            <BenefitCard
              icon={User}
              title="Build Community"
              description="Connect with like-minded neighbors"
              delay={0.5}
            />
            <BenefitCard
              icon={ArrowRight}
              title="Track Impact"
              description="See the difference you're making"
              delay={0.6}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ x: 8, scale: 1.02 }}
      className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-2xl p-6 shadow-lg flex items-start gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="font-black text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>
          {title}
        </h3>
        <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
