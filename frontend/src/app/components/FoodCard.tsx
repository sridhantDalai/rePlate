import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Clock, Calendar, ShoppingBag, Thermometer, Shield, Droplet } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  image: string;
  price: string;
  manufactureDate: string;
  expiryDate: string;
  expiryLabel?: string;
  storageTemp: string;
  sealed: boolean;
  acidic: boolean;
  uploader: {
    name: string;
    phone: string;
    location: string;
  };
}

export function FoodCard({ item, delay }: { item: FoodItem; delay: number }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const [urgency, setUrgency] = useState<"safe" | "warning" | "critical">("safe");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(item.expiryDate);
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Expired");
        setUrgency("critical");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days === 0 && hours < 12) {
        setUrgency("critical");
      } else if (days === 0) {
        setUrgency("warning");
      } else {
        setUrgency("safe");
      }

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m left`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [item.expiryDate]);

  const urgencyColors = {
    safe: "from-emerald-500 to-emerald-600",
    warning: "from-orange-500 to-orange-600",
    critical: "from-red-500 to-red-600",
  };

  const urgencyBorderColors = {
    safe: "border-emerald-500/20",
    warning: "border-orange-500/20",
    critical: "border-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div
        className={`backdrop-blur-xl bg-white/70 border ${urgencyBorderColors[urgency]} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />

          {/* Expiry Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="absolute top-3 right-3"
          >
            <div
              className={`backdrop-blur-md bg-gradient-to-r ${urgencyColors[urgency]} text-white px-3 py-2 rounded-xl shadow-lg flex items-center gap-2`}
            >
              <Clock className="w-4 h-4" strokeWidth={2.5} />
              <span className="font-black" style={{ fontSize: '0.75rem' }}>
                {timeLeft}
              </span>
            </div>
          </motion.div>

          {/* Tags */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            {item.sealed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3 }}
                className="backdrop-blur-md bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1"
              >
                <Shield className="w-3 h-3 text-emerald-600" />
                <span className="font-bold text-emerald-700" style={{ fontSize: '0.65rem' }}>
                  Sealed
                </span>
              </motion.div>
            )}
            {item.acidic && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.4 }}
                className="backdrop-blur-md bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1"
              >
                <Droplet className="w-3 h-3 text-orange-600" />
                <span className="font-bold text-orange-700" style={{ fontSize: '0.65rem' }}>
                  Acidic
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-black text-gray-900 mb-3" style={{ fontSize: '1.25rem' }}>
            {item.name}
          </h3>

          <div className="space-y-2 mb-4">
            <InfoRow icon={Calendar} label="Made" value={formatDate(item.manufactureDate)} />
            <InfoRow icon={Calendar} label={`
              AI Prediction Expiry
              `} value={item.expiryLabel || formatDate(item.expiryDate)} />
            <InfoRow icon={Thermometer} label="Storage" value={item.storageTemp} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-gray-500 font-semibold" style={{ fontSize: '0.75rem' }}>
                Price
              </p>
              <p className="font-black text-emerald-600" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
                {item.price}
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/food/${item.id}`, { state: { item } })}
              className="px-5 py-2.5 rounded-xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 flex items-center gap-2"
              style={{ fontSize: '0.875rem' }}
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2.5} />
              Get Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Icon className="w-4 h-4 text-emerald-600" strokeWidth={2} />
      <span className="font-semibold" style={{ fontSize: '0.875rem' }}>
        {label}:
      </span>
      <span className="font-bold text-gray-900" style={{ fontSize: '0.875rem' }}>
        {value}
      </span>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
