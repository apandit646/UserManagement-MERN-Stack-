import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("❌ Error fetching data");
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      getData();
      alert("🗑️ Data deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error deleting data");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
        📋 User Database <span className="ml-2">🔍</span>
      </h1>

      {isLoading ? (
        <motion.div 
          className="flex justify-center items-center h-64"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          <span className="text-4xl">🔄 Loading...</span>
        </motion.div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500">
          <span className="text-4xl block mb-4">📭</span>
          No users found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {data.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <h5 className="text-xl font-semibold mb-2 flex items-center">
                    👤 {item.name || "Anonymous User"}
                  </h5>
                  <h6 className="text-gray-600 mb-2 flex items-center">
                    ✉️ {item.email || "No email provided"}
                  </h6>
                  <p className="text-gray-500 flex items-center">
                    🎂 Age: {item.age || "Not specified"}
                  </p>
                  <div className="mt-4 flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                    >
                      🗑️ Delete
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={`/${item._id}`} 
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors inline-block"
                      >
                        ✏️ Update
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default Read;