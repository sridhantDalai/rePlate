import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { UtensilsCrossed, MapPin, Search, Menu, X } from "lucide-react";
import { useState } from "react";

const cities = ["Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka", "Patna, Bihar"];

export function Layout() {
  const location = useLocation();
  const [searchLocation, setSearchLocation] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      {/* Glass Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
              </motion.div>
              <div>
                <motion.h1
                  className="font-black tracking-tight"
                  style={{ fontSize: 'clamp(1.125rem, 1.5rem, 1.5rem)', lineHeight: 1 }}
                >
                  rePlate
                </motion.h1>
                <p className="hidden sm:block text-[0.65rem] text-emerald-600 font-semibold tracking-wide uppercase">
                  Share Food, Share Hope
                </p>
              </div>
            </Link>

            {/* Search Location */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block flex-1 max-w-md relative"
            >
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 z-10" strokeWidth={2.5} />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onFocus={() => setShowCityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                  placeholder="Search location or city..."
                  className="w-full pl-12 pr-12 py-2.5 rounded-xl backdrop-blur-md bg-white/60 border border-white/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold placeholder:text-gray-400"
                  style={{ fontSize: '0.875rem' }}
                />

                {/* City Dropdown */}
                <AnimatePresence>
                  {showCityDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/95 border border-white/60 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {cities.map((city, index) => (
                        <motion.button
                          key={city}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                          onClick={() => {
                            setSearchLocation(city);
                            setShowCityDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-emerald-50/50 transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                          <span className="font-semibold text-gray-700" style={{ fontSize: '0.875rem' }}>
                            {city}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              <NavLink to="/" active={location.pathname === "/"}>
                Home
              </NavLink>
              <NavLink to="/about" active={location.pathname === "/about"}>
                About
              </NavLink>
              <NavLink to="/products" active={location.pathname === "/products"}>
                Browse Food
              </NavLink>
              <NavLink to="/dashbaord" active={location.pathname === "/dashbaord"}>
                Dashboard
              </NavLink>
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl font-bold backdrop-blur-sm bg-white/50 border border-white/60 hover:bg-white/80 transition-colors shadow-sm"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(16, 185, 129, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-shadow"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg backdrop-blur-sm bg-white/60 border border-white/70 text-gray-800 shadow-sm"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" strokeWidth={2.5} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2.5} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden mt-4 rounded-lg border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-xl"
              >
                <div className="md:hidden relative mb-4">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 z-10" strokeWidth={2.5} />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search location or city..."
                    className="w-full pl-12 pr-12 py-3 rounded-lg bg-white border border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold placeholder:text-gray-400"
                    style={{ fontSize: '0.875rem' }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <MobileNavLink to="/" active={location.pathname === "/"} onClick={closeMobileMenu}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink to="/about" active={location.pathname === "/about"} onClick={closeMobileMenu}>
                    About
                  </MobileNavLink>
                  <MobileNavLink to="/products" active={location.pathname === "/products"} onClick={closeMobileMenu}>
                    Browse Food
                  </MobileNavLink>
                  <MobileNavLink to="/dashbaord" active={location.pathname === "/dashbaord"} onClick={closeMobileMenu}>
                    Dashboard
                  </MobileNavLink>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 rounded-lg font-bold bg-white border border-emerald-100 hover:bg-emerald-50 transition-colors shadow-sm">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Page Content with Route Transitions */}
      <div className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileNavLink({
  to,
  active,
  onClick,
  children,
}: {
  to: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`rounded-lg px-4 py-3 font-bold transition-colors ${
        active ? "bg-emerald-50 text-emerald-700" : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
      }`}
    >
      {children}
    </Link>
  );
}

function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className="relative group">
      <motion.span
        className={`font-bold transition-colors ${
          active ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
        }`}
        whileHover={{ y: -2 }}
      >
        {children}
      </motion.span>
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
