import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { FoodCard } from "./FoodCard";
import { AddFoodModal } from "./AddFoodModal";
import axios from 'axios'

   


// Mock data for food items
const mockFoodItems = [
  {
    id: 1,
    name: "Fresh Vegetable Curry",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    price: "Free",
    manufactureDate: "2026-04-09",
    expiryDate: "2026-04-11",
    storageTemp: "4°C",
    sealed: true,
    acidic: false,
    nutrition: {
      calories: "180 kcal",
      protein: "6g",
      carbs: "25g",
      fat: "7g",
      fiber: "8g",
      sugar: "5g",
    },
    uploader: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      location: "Patna, Bihar",
    },
  },
  {
    id: 2,
    name: "Homemade Pasta Bake",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
    price: "Free",
    manufactureDate: "2026-04-10",
    expiryDate: "2026-04-12",
    storageTemp: "2°C",
    sealed: true,
    acidic: true,
    // nutrition: {
    //   calories: "350 kcal",
    //   protein: "15g",
    //   carbs: "45g",
    //   fat: "12g",
    //   fiber: "4g",
    //   sugar: "6g",
    // },
    uploader: {
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      location: "Mumbai, Maharashtra",
    },
  },
  {
    id: 3,
    name: "Mixed Rice Bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
    price: "Free",
    manufactureDate: "2026-04-10",
    expiryDate: "2026-04-11",
    storageTemp: "5°C",
    sealed: false,
    acidic: false,
    nutrition: {
      calories: "280 kcal",
      protein: "8g",
      carbs: "52g",
      fat: "5g",
      fiber: "3g",
      sugar: "2g",
    },
    uploader: {
      name: "Amit Singh",
      phone: "+91 76543 21098",
      location: "Delhi, NCR",
    },
  },
  {
    id: 4,
    name: "Fruit Salad Mix",
    image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=600&h=400&fit=crop",
    price: "Free",
    manufactureDate: "2026-04-09",
    expiryDate: "2026-04-10",
    storageTemp: "3°C",
    sealed: true,
    acidic: true,
    nutrition: {
      calories: "120 kcal",
      protein: "2g",
      carbs: "30g",
      fat: "0.5g",
      fiber: "5g",
      sugar: "24g",
    },
    uploader: {
      name: "Sneha Patel",
      phone: "+91 65432 10987",
      location: "Bangalore, Karnataka",
    },
  },
  {
    id: 5,
    name: "Chicken Tikka Masala",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
    price: "Free",
    manufactureDate: "2026-04-10",
    expiryDate: "2026-04-13",
    storageTemp: "4°C",
    sealed: true,
    acidic: false,
    nutrition: {
      calories: "420 kcal",
      protein: "32g",
      carbs: "18g",
      fat: "24g",
      fiber: "3g",
      sugar: "4g",
    },
    uploader: {
      name: "Rahul Verma",
      phone: "+91 54321 09876",
      location: "Patna, Bihar",
    },
  },
  {
    id: 6,
    name: "Fresh Bread Loaves",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
    price: "Free",
    manufactureDate: "2026-04-10",
    expiryDate: "2026-04-12",
    storageTemp: "Room Temp",
    sealed: false,
    acidic: false,
    nutrition: {
      calories: "265 kcal",
      protein: "9g",
      carbs: "49g",
      fat: "3g",
      fiber: "2g",
      sugar: "5g",
    },
    uploader: {
      name: "Anita Das",
      phone: "+91 43210 98765",
      location: "Mumbai, Maharashtra",
    },
  },
  

];

export function ProductShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodItems, setFoodItems] = useState(mockFoodItems);

  const handleAddFood = async (newItem: any) => {
    console.log(newItem);
      try {
    const res = await axios.post(
      "http://localhost:8000/post/create",
       newItem,
        {withCredentials: true,}

    );
    const newFoodItem = {
      id: foodItems.length + 1,
      ...newItem,
    };
    setFoodItems([newFoodItem, ...foodItems]);

  } catch (error: any) {
    alert(error);
  }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="font-black text-gray-900 mb-2" style={{ fontSize: '3rem' }}>
              Available Food
            </h1>
            <p className="text-gray-600" style={{ fontSize: '1.125rem' }}>
              Browse meals ready to share with the community
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center gap-3"
            style={{ fontSize: '1rem' }}
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Add Food
          </motion.button>
        </motion.div>

        {/* Food Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {foodItems.map((item, index) => (
            <FoodCard key={item.id} item={item} delay={index * 0.1} />
          ))}
        </motion.div>
      </div>

      {/* Add Food Modal */}
      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFood}
      />
    </div>
  );
} 
