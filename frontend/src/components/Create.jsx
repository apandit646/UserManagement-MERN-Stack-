import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, age: parseInt(age) };

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      alert("✨ Data Submitted Successfully! 🎉");
      
      // Clear form
      setName("");
      setEmail("");
      setAge("");
      navigate("/all");
    } catch (error) {
      alert(`❌ Submission Failed: ${error.message}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        📝 Create User Profile <span className="ml-2">✨</span>
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
          🚀 Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Create;