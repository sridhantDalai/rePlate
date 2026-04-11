import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router";
import { FoodCard } from "./FoodCard";
import { AddFoodModal } from "./AddFoodModal";

type ApiFoodPost = {
  _id: string;
  itemList: string;
  imgFood: string;
  price?: string;
  dateOfPrep: string;
  expiryDate: string;
  storageTemp: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  isSealed: boolean;
  isAcidic: boolean;
};

type FoodItem = {
  id: string;
  name: string;
  image: string;
  price: string;
  manufactureDate: string;
  expiryDate: string;
  storageTemp: string;
  sealed: boolean;
  acidic: boolean;
  uploader: {
    name: string;
    phone: string;
    email: string;
    location: string;
  };
};

const mapApiFoodPost = (post: ApiFoodPost): FoodItem => ({
  id: post._id,
  name: post.itemList,
  image: post.imgFood,
  price: post.price || "Free",
  manufactureDate: post.dateOfPrep,
  expiryDate: post.expiryDate,
  storageTemp: post.storageTemp,
  sealed: post.isSealed,
  acidic: post.isAcidic,
  uploader: {
    name: post.name,
    phone: post.phone,
    email: post.email,
    location: post.location,
  },
});

export function ProductShowcase() {
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFoodPosts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("http://localhost:8000/postFood/all");
      const data = await res.json();

      if (!res.ok || !data.success || !Array.isArray(data.data)) {
        throw new Error(data.message || "Could not load food posts.");
      }

      setFoodItems(data.data.map(mapApiFoodPost));
    } catch (err: any) {
      console.error("Food posts fetch failed:", err);
      setFoodItems([]);
      setError(err?.message || "Could not load food posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFoodPosts();
  }, []);

  const handleAddFood = (newItem: FoodItem) => {
    setFoodItems((items) => [newItem, ...items]);
  };

  const selectedLocation = searchParams.get("location")?.trim() || "All";

  const filteredFoodItems = useMemo(() => {
    const normalizedSelectedLocation = selectedLocation.trim().toLowerCase();

    if (normalizedSelectedLocation === "all") {
      return foodItems;
    }

    return foodItems.filter(
      (item) => item.uploader.location.trim().toLowerCase() === normalizedSelectedLocation
    );
  }, [foodItems, selectedLocation]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12 gap-6"
        >
          <div>
            <h1 className="font-black text-gray-900 mb-2" style={{ fontSize: "3rem" }}>
              Available Food
            </h1>
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              Browse meals ready to share with the community
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center gap-3"
            style={{ fontSize: "1rem" }}
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Add Food
          </motion.button>
        </motion.div>

        {isLoading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white/70 p-10 text-center shadow-lg">
            <p className="font-black text-gray-900" style={{ fontSize: "1.25rem" }}>
              Loading food posts...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white/70 p-10 text-center shadow-lg">
            <p className="font-black text-red-600 mb-4" style={{ fontSize: "1.25rem" }}>
              {error}
            </p>
            <button
              type="button"
              onClick={loadFoodPosts}
              className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-black shadow-lg shadow-emerald-500/20"
            >
              Try Again
            </button>
          </div>
        ) : foodItems.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white/70 p-10 text-center shadow-lg">
            <p className="font-black text-gray-900" style={{ fontSize: "1.25rem" }}>
              No food posts yet.
            </p>
          </div>
        ) : filteredFoodItems.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white/70 p-10 text-center shadow-lg">
            <p className="font-black text-gray-900" style={{ fontSize: "1.25rem" }}>
              No food posts found for this location.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFoodItems.map((item, index) => (
              <FoodCard key={item.id} item={item} delay={index * 0.1} />
            ))}
          </motion.div>
        )}
      </div>

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFood}
      />
    </div>
  );
}
