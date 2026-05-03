// components/Footer.jsx
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6">
          <span className="text-xs text-gray-400">New release</span>
          <span className="text-xs text-gray-400">Preview</span>
          <span className="text-xs text-gray-400">Get Template</span>
        </div>
        
        <p className="text-xs text-gray-400">
          Made with ♥ in Framer
        </p>
        
        <div className="flex gap-4">
          <motion.a 
            href="#" 
            whileHover={{ y: -2 }} 
            className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
          >
            Twitter
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ y: -2 }} 
            className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
          >
            Instagram
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ y: -2 }} 
            className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
          >
            LinkedIn
          </motion.a>
        </div>
      </div>
    </footer>
  );
}