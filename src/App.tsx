import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isDownloading, setIsDownloading] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter effect for name
  useEffect(() => {
    const name = "Thanusri";
    if (nameIndex < name.length) {
      const timeout = setTimeout(() => {
        setTypedName(prev => prev + name[nameIndex]);
        setNameIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      const resetTimeout = setTimeout(() => {
        setTypedName('');
        setNameIndex(0);
        clearInterval(cursorInterval);
      }, 2000);
      return () => {
        clearInterval(cursorInterval);
        clearTimeout(resetTimeout);
      };
    }
  }, [nameIndex]);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'skills', 'projects', 'achievements', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  };

  // Mock resume download function
  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Vema_Pooja_Thanusri_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#31363F] fixed w-full z-50 shadow-lg"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-[#76ABAE] hover:text-[#EEEEEE] transition-colors duration-300"
            >
              Vema Pooja Thanusri
            </motion.h1>
            <div className="flex items-center gap-6">
              {['about', 'education', 'skills', 'projects', 'achievements', 'certifications', 'contact'].map((item) => (
                <div key={item} className="relative h-full">
                  <motion.button 
                    whileHover={{ scale: 1.1, color: '#76ABAE' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item)}
                    className={`text-[#EEEEEE] hover:text-[#76ABAE] transition-all duration-300 font-medium capitalize ${
                      activeSection === item ? 'text-[#76ABAE]' : ''
                    }`}
                  >
                    {item}
                  </motion.button>
                  <AnimatePresence>
                    {activeSection === item && (
                      <motion.div
                        layoutId="navUnderline"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.3, type: 'spring' }}
                        className="absolute bottom-0 left-0 h-0.5 bg-[#76ABAE]"
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#EEEEEE', color: '#222831' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex items-center gap-2 bg-[#76ABAE] text-[#222831] px-4 py-2 rounded-lg transition-all duration-300 font-medium relative overflow-hidden"
              >
                <Download size={20} />
                Download Resume
                {isDownloading && (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -top-6 left-0 right-0 text-xs"
                  >
                    Downloading...
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="about" className="snap-start min-h-screen bg-[#31363F] flex items-center justify-center py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Vema Pooja{' '}
                <span className="text-[#76ABAE]">
                  {typedName}
                  <span className={`inline-block w-1 h-8 bg-[#76ABAE] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                </span>
              </h1>
              <p className="text-l mb-8 text-[#EEEEEE]/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hi, I am a data science and machine learning enthusiast with hands-on experience in exploratory data analysis (EDA), 
              predictive modeling, and machine learning techniques like regression, classification, and clustering. 
              I specialize in deriving insights from data using Python, SQL, and data visualization tools. 
              My projects include HR analytics and ticket confirmation prediction, 
              applying advanced data analysis and machine learning methodologies. 
              Aspiring to become a data analyst, I aim to transition into a data scientist role, 
              leveraging data-driven solutions for real-world challenges.</p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: '#EEEEEE' }}
                  whileTap={{ scale: 0.98 }}
                  href="https://linkedin.com/in/pooja-vema/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-[#76ABAE] text-[#222831] px-4 py-2 rounded-lg hover:bg-[#EEEEEE] transition-all duration-300 font-medium"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: '#EEEEEE' }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/pooja-vema" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-[#76ABAE] text-[#222831] px-4 py-2 rounded-lg hover:bg-[#EEEEEE] transition-all duration-300 font-medium"
                >
                  <Github size={20} />
                  GitHub
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#76ABAE] shadow-xl relative"
                >
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4D03AQFtDHVXE0ygWg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1665721006846?e=1749081600&v=beta&t=YWBJ3Es_iNLpHwQnTayyaV5BVCCy3kypYmM3Q6cp9BY" 
                    alt="Vema Pooja Thanusri"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-4 border-transparent border-dashed rounded-full"
                  />
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 -right-4 bg-[#76ABAE] text-[#222831] px-4 py-2 rounded-lg font-medium shadow-lg"
                >
                  Data Scientist
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      {/* <section id="education" className="snap-start h-screen bg-[#222831] flex items-center justify-center py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mt-20 mb-12 text-[#76ABAE] text-center"
          >
            Education <span className="text-[#EEEEEE]">Details</span>
          </motion.h2>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { 
                institution: "Lovely Professional University",
                degree: "B.Tech in Computer Science and Engineering with Specialization in Data Science",
                location:"Punjab, India",
                duration: "2022 - 2026",
                grade: "CGPA: 8.45/10 (Current)",
                icon: "🎓"
              },
              { 
                institution: "Sasi Junior College",
                degree: "Intermediate (MPC)",
                location:"Nallajerla, Andhra Pradesh",
                duration: "2020 - 2022",
                grade: "Percentage: 94.3%",
                icon: "📚"
              },
              { 
                institution: "St. Clarets,vijaywada",
                degree: "Matriculation",
                location:"Nallajerla, Andhra Pradesh",
                duration: "2019 - 2020",
                grade: "Percentage: 96.4%",
                icon: "🏫"
              }
            ].map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#31363F] p-6 rounded-lg shadow-xl border border-[#76ABAE]/20 hover:border-[#76ABAE]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    {edu.icon && <span className="text-2xl">{edu.icon}</span>}
                    <h3 className="text-xl font-semibold text-[#76ABAE]">{edu.institution}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#EEEEEE]/80"><span className="font-medium">Degree:</span> {edu.degree}</p>
                    <p className="text-[#EEEEEE]/80"><span className="font-medium">Location:</span> {edu.location}</p>
                    <p className="text-[#EEEEEE]/80"><span className="font-medium">Duration:</span> {edu.duration}</p>
                    <p className="text-[#EEEEEE]/80"><span className="font-medium">Grade:</span> {edu.grade}</p>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Skills Section */}
      <section id="skills" className="snap-start h-screen bg-[#222831] flex items-center justify-center py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-[#76ABAE] text-center"
          >
            Technical <span className="text-[#EEEEEE]">Skills</span>
          </motion.h2>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { title: "Languages", skills: ['Python', 'Java', 'C', 'JavaScript','HTML', 'CSS'], icon: "💻" },
              { title: "Frameworks/Libraries", skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'], icon: "📊" },
              { title: "Tools/Platforms", skills: ['MySQL', 'Tableau', 'PowerBI', 'Excel'], icon: "🛠️" },
              { title: "Soft Skills", skills: ['Problem-Solving', 'Adaptability', 'Time Management'], icon: "🤝" }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#31363F] p-6 rounded-lg shadow-xl border border-[#76ABAE]/20 hover:border-[#76ABAE]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    {skill.icon && <span className="text-2xl">{skill.icon}</span>}
                    <h3 className="text-xl font-semibold text-[#76ABAE]">{skill.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((skill) => (
                      <motion.span 
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#76ABAE] text-[#222831] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="snap-start h-screen bg-[#31363F] flex items-center justify-center py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-[#76ABAE] text-center"
          >
            Featured <span className="text-[#EEEEEE]">Projects</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "HR Analytics: EDA & Clustering",
                description: "Analyzed employee satisfaction and performance trends using EDA and K-Means clustering to identify turnover risks.",
                tech: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Scikit-learn'],
                date: "Aug 2024 - Dec 2024",
                repoUrl: "https://github.com/pooja-vema/HR_Analytics-using-EDA-and-ML-algo",
                image: "https://greatpeopleinside.com/wp-content/uploads/2019/06/analytics-1030x618.jpg"
              },
              {
                title: "Coffee Chain Sales Dashboard",
                description: "Developed interactive Tableau dashboard for sales analysis, tracking revenue and customer behavior.",
                tech: ['Tableau', 'Data Visualization', 'Business Intelligence'],
                date: "June 2024 - July 2024",
                repoUrl: "https://github.com/pooja-vema/Coffee-chain-dashboard-using-Tableau",
                image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800&h=400&fit=crop"
              },
              {
                title: "Blood Donation Website",
                description: "Web platform connecting blood donors with recipients, featuring real-time matching and location-based search.",
                tech: ['HTML', 'CSS', 'JavaScript'],
                date: "Aug 2023 - Dec 2023",
                repoUrl: "https://github.com/pooja-vema/Blood-donation-Website",
                image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=400&fit=crop"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#31363F] rounded-lg shadow-xl overflow-hidden border border-[#76ABAE]/20 hover:border-[#76ABAE]/40 transition-all duration-300 h-full flex flex-col">
                  <div className="overflow-hidden h-48">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-[#76ABAE]">{project.title}</h3>
                      <motion.a 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#76ABAE] hover:text-[#EEEEEE] transition-colors duration-300"
                      >
                        <Github size={20} />
                      </motion.a>
                    </div>
                    <p className="text-[#EEEEEE]/60 text-sm mb-3">{project.date}</p>
                    <p className="text-[#EEEEEE]/80 mb-5">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((item) => (
                        <motion.span 
                          key={item}
                          whileHover={{ scale: 1.05 }}
                          className="bg-[#76ABAE]/20 text-[#EEEEEE] px-2 py-1 rounded text-sm font-medium"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="snap-start h-screen bg-[#222831] flex items-center justify-center py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-[#76ABAE] text-center"
          >
            My <span className="text-[#EEEEEE]">Achievements</span>
          </motion.h2>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              {
                title: "CipherSchools Summer Training",
                description: "Successfully completed Python, Data Science & Machine Learning Integrated Summer Training program, gaining hands-on experience with industry-relevant tools and technologies.",
                icon: "🏆"
              },
              {
                title: "Kho-Kho Championship",
                description: "Led the school Kho-Kho team to secure first place in the inter-school competition, demonstrating leadership and team coordination skills.",
                icon: "🥇"
              }
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#31363F] p-6 rounded-lg shadow-xl border border-[#76ABAE]/20 hover:border-[#76ABAE]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    {achievement.icon && <span className="text-2xl">{achievement.icon}</span>}
                    <h3 className="text-xl font-semibold text-[#76ABAE]">{achievement.title}</h3>
                  </div>
                  <p className="text-[#EEEEEE]/80 leading-relaxed">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="snap-start h-screen bg-[#31363F] flex items-center justify-center py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-[#76ABAE] text-center"
          >
            My <span className="text-[#EEEEEE]">Certifications</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Foundations: Data, Data, Everywhere",
                issuer: "Google/Coursera",
                date: "January 2025",
                image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~5O1RP3YHQ415/CERTIFICATE_LANDING_PAGE~5O1RP3YHQ415.jpeg"
              },
              {
                title: "Become a Data Scientist",
                issuer: "LinkedIn Learning",
                date: "February 2023",
                image: "https://media.licdn.com/dms/image/v2/C4D1FAQFv7NKxdg3rUg/feedshare-document-cover-images_1280/feedshare-document-cover-images_1280/0/1676600117889?e=1744052400&v=beta&t=GSVz43fi77O2O19xXR2ROIH29zq4wX5i-XwrHkr-hjw"
              },
              {
                title: "The Bits and Bytes of Computer Networking",
                issuer: "Coursera",
                date: "March 2023",
                image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~PFECVMUSDKRD/CERTIFICATE_LANDING_PAGE~PFECVMUSDKRD.jpeg"
              }
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#31363F] rounded-lg shadow-xl overflow-hidden border border-[#76ABAE]/20 hover:border-[#76ABAE]/40 transition-all duration-300 h-full flex flex-col">
                  <div className="overflow-hidden h-48">
                    <motion.img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-[#76ABAE]">{cert.title}</h3>
                    <p className="text-[#EEEEEE]/80 mb-1">{cert.issuer}</p>
                    <p className="text-[#EEEEEE]/60 text-sm">{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="snap-start h-screen bg-[#222831] flex items-center justify-center py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-[#76ABAE] text-center"
          >
            Get In <span className="text-[#EEEEEE]">Touch</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#31363F] p-8 rounded-lg shadow-xl border border-[#76ABAE]/20 hover:border-[#76ABAE]/40 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 text-[#76ABAE]">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#76ABAE]/10 transition-colors duration-300">
                  <Mail size={24} className="text-[#76ABAE] flex-shrink-0" />
                  <a 
                    href="mailto:vemapoojathanusri@gmail.com"
                    className="text-[#EEEEEE]/80 hover:text-[#76ABAE] transition-colors duration-300"
                  >
                    vemapoojathanusri@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#76ABAE]/10 transition-colors duration-300">
                  <span className="w-6 h-6 flex items-center justify-center text-[#76ABAE]">📞</span>
                  <a 
                    href="tel:+917657976566"
                    className="text-[#EEEEEE]/80 hover:text-[#76ABAE] transition-colors duration-300"
                  >
                    +91 7657976566
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#31363F] p-8 rounded-lg shadow-xl border border-[#76ABAE]/20 hover:border-[#76ABAE]/40 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 text-[#76ABAE]">Social Links</h3>
              <div className="space-y-6">
                <a 
                  href="https://linkedin.com/in/pooja-vema/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#76ABAE]/10 transition-colors duration-300"
                >
                  <Linkedin size={24} className="text-[#76ABAE] flex-shrink-0" />
                  <span className="text-[#EEEEEE]/80 hover:text-[#76ABAE] transition-colors duration-300">
                    linkedin.com/in/pooja-vema
                  </span>
                </a>
                <a 
                  href="https://github.com/pooja-vema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#76ABAE]/10 transition-colors duration-300"
                >
                  <Github size={24} className="text-[#76ABAE] flex-shrink-0" />
                  <span className="text-[#EEEEEE]/80 hover:text-[#76ABAE] transition-colors duration-300">
                    github.com/pooja-vema
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#31363F] text-[#EEEEEE] py-8 border-t border-[#76ABAE]/20"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">© 2025 Vema Pooja Thanusri. All rights reserved.</p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <button 
              onClick={() => scrollToSection('about')}
              className="text-[#76ABAE] hover:text-[#EEEEEE] transition-colors duration-300 font-medium"
            >
              Back to Top ↑
            </button>
          </motion.div>
        </div>
      </motion.footer>

      {/* Download Success Notification */}
      <AnimatePresence>
        {isDownloading && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-8 right-8 bg-[#76ABAE] text-[#222831] px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Download started!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;