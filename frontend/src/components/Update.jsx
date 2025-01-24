import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch user data by ID
  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setAge(data.age);
    } catch (error) {
      alert(`❌ Failed to fetch user data: ${error.message}`);
    }
  };

  // Handle form submission to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { name, email, age: parseInt(age) };

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH", // Use PUT or PATCH for updating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("✨ User updated successfully!");
      navigate("/all"); // Navigate to the user list or any desired route
    } catch (error) {
      alert(`❌ Update Failed: ${error.message}`);
    }
  };

  useEffect(() => {
    getSingleUser();
    handleSubmit();
  }, [id]); // Add `id` as a dependency

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        📝 Update User Profile <span className="ml-2">✨</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            👤 Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </motion.div>

        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            ✉️ Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </motion.div>

        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            🎂 Age
          </label>
          <input
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your age"
            min="0"
            max="120"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          🚀 Update
        </motion.button>
      </form>
    </motion.div>
  );
}

export default Update;
