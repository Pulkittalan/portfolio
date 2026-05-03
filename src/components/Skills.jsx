import { motion } from "framer-motion";


const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML", level: 95, icon: "fab fa-html5", color: "#e34c26" },
      { name: "CSS", level: 90, icon: "fab fa-css3-alt", color: "#264de4" },
      { name: "JavaScript", level: 85, icon: "fab fa-js", color: "#f0db4f" },
      { name: "React", level: 70, icon: "fab fa-react", color: "#61dbfb" },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", level: 70, icon: "fab fa-node-js", color: "#3c873a" },
      { name: "Python", level: 75, icon: "fab fa-python", color: "#306998" },
      { name: "SQL", level: 80, icon: "fas fa-database", color: "#4db33d" },
    ],
  },
  {
    category: "App Development",
    skills: [
      { name: "Android", level: 25, icon: "fab fa-android", color: "#3ddc84" },
      { name: "Java", level: 50, icon: "fab fa-java", color: "#f89820" },
      { name: "Kotlin", level: 20, img:"/kotlin.png", color: "#7f52ff" },
    ],
  },
];

const SkillItem = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
    >
      {/* LOGO SECTION */}
      <div className="flex flex-col items-center text-center mb-5">
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 10,
            boxShadow: `0 0 25px ${skill.color}`,
          }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
          style={{
                      background: `${skill.color}20`,
                  }}
              >
                  {skill.img ? (
                      <img
                          src={skill.img}
                          alt={skill.name}
                          style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                          }}
                      />
                  ) : (
                      <i
                          className={skill.icon}
                          style={{
                              color: skill.color,
                              fontSize: "50px",
                          }}
                      ></i>
                  )}
              </motion.div>

        <h4 className="font-semibold mt-3">{skill.name}</h4>
      </div>

      {/* PROGRESS BAR */}
      <div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-2 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${skill.color}, #6366f1)`,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1.2 }}
          />
        </div>

        <div className="text-right text-sm mt-1 text-gray-600">
          {skill.level}%
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">My Skills</h2>
          <p className="text-gray-500 mt-2">Technical Expertise</p>
        </motion.div>

        {/* CATEGORY SECTIONS */}
        {skillsData.map((category, index) => (
          <div key={index} className="mb-14">
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-indigo-500 mb-6"
            >
              {category.category}
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.skills.map((skill, i) => (
                <SkillItem key={i} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}