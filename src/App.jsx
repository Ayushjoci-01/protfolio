import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, Calendar, MapPin, 
  ChevronDown, ChevronUp, ExternalLink, Award 
} from 'lucide-react';

// Custom SVG Brand Icons
const Facebook = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Components
import ParticleBackground from './components/ParticleBackground';
import ContactForm from './components/ContactForm';

// Constants
const CODING_PLATFORMS = [
  { name: 'LeetCode', url: 'https://leetcode.com/u/ayushjoshi_01/', icon: '/download.jpg' },
  { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/user/joshiayusxcdp/', icon: '/gfg.jpg' },
  { name: 'Coding Ninjas', url: 'https://www.naukri.com/code360/profile/Ayushjoshi', icon: '/download.png' },
  { name: 'CodeChef', url: 'https://www.codechef.com/users/joshiayushjosh', icon: '/codechef.jpg' }
];

const CERTIFICATES = [
  { title: 'Php and Java Complete Course', url: 'https://www.udemy.com/certificate/UC-b7e10962-e450-406c-a4d9-5c9db8775173/', icon: '/udemy.png', issuer: 'Udemy' },
  { title: 'Android 14 App Development', url: 'https://www.udemy.com/certificate/UC-919e718a-aa1d-49c7-82ab-e3246b9ee408/', icon: '/udemy.png', issuer: 'Udemy' },
  { title: 'Ultimate Bug Bounty', url: 'https://www.udemy.com/certificate/UC-a5fe989b-356e-41a6-a52e-75cb942a4834/', icon: '/udemy.png', issuer: 'Udemy' },
  { title: 'Complete Machine Learning & Data Science Program', url: 'https://www.geeksforgeeks.org/certificate/6f580b764cad27a1a282f89e466f4daa', icon: '/gfg.jpg', issuer: 'GeeksforGeeks' },
  { title: 'AI for Beginners', url: 'https://www.life-global.org/certificate/d503f736-eeaf-491e-b520-bbe53f820125', icon: '/hp.png', issuer: 'HP LIFE' },
  { title: 'Generative AI', url: 'https://www.linkedin.com/posts/ayushjoshi123_generativeai-ai-machinelearning-activity-7217078824239292417-rizv?utm_source=share&utm_medium=member_desktop', icon: '/link.png', issuer: 'LinkedIn' },
  { title: 'Introduction to data engineering on Azure', url: 'https://www.linkedin.com/posts/ayushjoshi123_introduction-to-data-engineering-on-azure-activity-7212439833418293250-MBS5?utm_source=share&utm_medium=member_desktop', icon: '/ma.png', issuer: 'Microsoft/LinkedIn' },
  { title: 'Ministry of Electronics and Information Certificate!', url: 'https://www.linkedin.com/posts/ayushjoshi123_ministryofelectronics-certificateprogram-activity-7078246496856395776-_zYR?utm_source=share&utm_medium=member_desktop', icon: '/gov.jpg', issuer: 'MeitY' },
  { title: 'Tech Wizard', url: 'https://www.linkedin.com/posts/ayushjoshi123_connections-activity-7073633666727350272-V4kI?utm_source=share&utm_medium=member_desktop', icon: '/gehu.jpg', issuer: 'GEHU' },
  { title: 'Web Dev Certificate', url: 'https://www.linkedin.com/posts/ayushjoshi123_activity-7066656942902968320-riX_?utm_source=share&utm_medium=member_desktop', icon: '/gehu.jpg', issuer: 'GEHU' }
];

const PROJECTS = [
  { title: "Rubik's Cube Game", url: 'https://ayushgaming.netlify.app/', category: 'Web development', img: '/rubikcube.jpg', desc: 'An interactive 3D WebGL game simulating a Rubik\'s Cube solver and gameplay.' },
  { title: 'Medicine-Recommendation-System', url: 'https://mainpy-afyszbcywetkdjerwjyypf.streamlit.app/', category: 'Applications', img: '/ai.jpg', desc: 'An AI-powered medicine recommender engine using patient symptom profiles.' },
  { title: 'Elearning System', url: 'https://lms-full-stack-woad.vercel.app/', category: 'Web development', img: '/notes.jpg', desc: 'A full stack Learning Management System featuring course modules and interactive quizzes.' },
  { title: 'Compiler Visualizer', url: 'https://codeoptimization-hpjwhepw4lvbzg9e9ztkyj.streamlit.app', category: 'Applications', img: '/notes.jpg', desc: 'An interactive simulator visualizer illustrating optimization steps of compilation stages.' },
  { title: 'ARIES Research Institute', url: 'https://www.aries.res.in/', category: 'Freelancing', img: '/aries.png', desc: 'Official website for Aryabhatta Research Institute of Observational Sciences — a Government of India research body.' },
  { title: 'Narayana Traders', url: 'https://narayanatraders.com/', category: 'Freelancing', img: '/narayana.png', desc: 'A professional business website developed for Narayana Traders showcasing their products and services.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [sidebarActive, setSidebarActive] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');

  // Handle Project Category Filter
  const filteredProjects = projectFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase() === projectFilter.toLowerCase());

  return (
    <>
      {/* 3D R3F Particle field in the backdrop */}
      <ParticleBackground />

      <main>
        {/* Sidebar Info Section */}
        <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
          <div className="sidebar-header-mobile">
            <div className="sidebar-info">
              <figure className="avatar-box">
                <img src="/linkdlengithu.png" alt="Ayush Joshi" />
              </figure>
              <div className="info-content">
                <h1 className="name">Ayush Joshi</h1>
                <p className="title">Data Science / SE</p>
              </div>
            </div>
            
            <button 
              className="info_more-btn"
              onClick={() => setSidebarActive(!sidebarActive)}
            >
              <span>{sidebarActive ? 'Hide Contacts' : 'Show Contacts'}</span>
              {sidebarActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <div className="sidebar-collapsible-content">
            <div className="separator"></div>

            <ul className="contacts-list">
              <li className="contact-item">
                <div className="icon-box">
                  <Mail size={16} />
                </div>
                <div className="contact-info">
                  <p className="contact-title">Email</p>
                  <a href="mailto:Joshiayushjoshi12@gmail.com" className="contact-link">
                    Joshiayushjoshi12@gmail.com
                  </a>
                </div>
              </li>

              <li className="contact-item">
                <div className="icon-box">
                  <Phone size={16} />
                </div>
                <div className="contact-info">
                  <p className="contact-title">Phone</p>
                  <a href="tel:+918532065910" className="contact-link">
                    +91 8532065910
                  </a>
                </div>
              </li>

              <li className="contact-item">
                <div className="icon-box">
                  <Calendar size={16} />
                </div>
                <div className="contact-info">
                  <p className="contact-title">Birthday</p>
                  <span className="contact-link">Jan 06, 2006</span>
                </div>
              </li>

              <li className="contact-item">
                <div className="icon-box">
                  <MapPin size={16} />
                </div>
                <div className="contact-info">
                  <p className="contact-title">Location</p>
                  <a 
                    href="https://maps.app.goo.gl/sDueKddEjexZ1B9U6?g_st=aw" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-link"
                  >
                    Uttarakhand, India
                  </a>
                </div>
              </li>
            </ul>

            <div className="separator"></div>

            <ul className="social-list">
              <li>
                <a href="https://www.facebook.com/profile.php?id=100081542340866&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Facebook size={18} />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ayushjoshi123/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin size={18} />
                </a>
              </li>
              <li>
                <a href="https://x.com/Ayush___Joshi" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Twitter size={18} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/ayushjoci_01/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Instagram size={18} />
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="main-content">
          
          {/* Navigation Bar */}
          <nav className="navbar">
            <ul className="navbar-list">
              <li>
                <button 
                  className={`navbar-link ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  className={`navbar-link ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  className={`navbar-link ${activeTab === 'certificates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('certificates')}
                >
                  Certificates
                </button>
              </li>
              <li>
                <button 
                  className={`navbar-link ${activeTab === 'resume' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resume')}
                >
                  Resume
                </button>
              </li>
              <li>
                <button 
                  className={`navbar-link ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Tab Content Display */}
          <div className="tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <header>
                    <h2 className="h2 article-title">About Me</h2>
                  </header>

                  <section className="about-text">
                    <p>
                      I am a passionate and driven B.Tech student pursuing a degree in Computer Science from Graphic Era Hill University. I am always eager to learn and take on new challenges, both in academics and extracurricular activities. With a keen interest in software development, data structures, and machine learning, I have worked on several projects, including web-based applications and recommendation systems.
                    </p>
                    <p>
                      In addition to my technical skills, I am involved in leadership roles such as being an active member of the Robotics Club, part of the Placement Cell, and a mentor in the Entrepreneurship Cell at GEHU. I am continuously working on improving my problem-solving skills and gaining practical experience through my involvement in various tech-related projects.
                    </p>
                    <p>
                      My job is to build your website so that it is functional and user-friendly but at the same time attractive.
                      Moreover, I add a personal touch to your product and make sure that it is eye-catching and easy to use. My aim is to bring across your message and identity in the most creative way.
                    </p>
                  </section>



                  {/* Coding Platforms List */}
                  <section className="service">
                    <h3 className="h3 service-title">Coding Platforms</h3>
                    <ul className="service-list">
                      {CODING_PLATFORMS.map((platform) => (
                        <li className="service-item" key={platform.name}>
                          <div className="service-icon-box">
                            <img src={platform.icon} alt={platform.name} />
                          </div>
                          <div className="service-content-box">
                            <h4 className="service-item-title">
                              <a href={platform.url} target="_blank" rel="noopener noreferrer">
                                {platform.name}
                              </a>
                            </h4>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className="projects"
                >
                  <header>
                    <h2 className="h2 article-title">Projects</h2>
                  </header>

                  {/* Filter tabs */}
                  <ul className="filter-list">
                    {['All', 'Web development', 'Applications', 'Freelancing'].map((cat) => (
                      <li className="filter-item" key={cat}>
                        <button 
                          className={projectFilter === cat ? 'active' : ''}
                          onClick={() => setProjectFilter(cat)}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Projects grid */}
                  <motion.ul className="project-list" layout>
                    <AnimatePresence>
                      {filteredProjects.map((project) => (
                        <motion.li 
                          className="project-card"
                          key={project.title}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div className="project-item">
                              <figure className="project-img">
                                <div className="project-item-icon-box">
                                  <ExternalLink size={24} />
                                </div>
                                <img src={project.img} alt={project.title} loading="lazy" />
                              </figure>
                              <h3 className="project-title">{project.title}</h3>
                              <p className="project-category">{project.category}</p>
                              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '5px' }}>{project.desc}</p>
                            </div>
                          </a>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                </motion.div>
              )}

              {activeTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <header>
                    <h2 className="h2 article-title">Certificates</h2>
                  </header>

                  <div className="certificates-container">
                    {CERTIFICATES.map((cert) => (
                      <div className="certificate-card" key={cert.title}>
                        <div className="cert-icon-wrapper">
                          <img src={cert.icon} alt={cert.issuer} />
                        </div>
                        <div className="cert-content">
                          <h4 className="cert-title">
                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                              {cert.title}
                            </a>
                          </h4>
                          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-neon)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Award size={12} /> {cert.issuer}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'resume' && (
                <motion.div
                  key="resume"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <header>
                    <h2 className="h2 article-title">Resume &amp; Intro</h2>
                  </header>

                  {/* Video Introduction */}
                  <section className="resume-section">
                    <h3 className="h3 resume-sub-title">🎬 Video Introduction</h3>
                    <div className="video-intro-wrapper">
                      <video
                        className="intro-video"
                        controls
                        playsInline
                        preload="metadata"
                      >
                        <source src="/intro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </section>

                  {/* Resume Preview */}
                  <section className="resume-section" style={{ marginTop: '40px' }}>
                    <div className="resume-header-row">
                      <h3 className="h3 resume-sub-title">📄 Resume Preview</h3>
                      <a
                        href="https://drive.google.com/file/d/1CFrsp-mtpo6VTjR47pL6tdzy5-8Ch7Aq/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-download-btn"
                      >
                        <ExternalLink size={15} /> View / Download
                      </a>
                    </div>
                    <div className="resume-iframe-wrapper">
                      <iframe
                        src="https://drive.google.com/file/d/1CFrsp-mtpo6VTjR47pL6tdzy5-8Ch7Aq/preview"
                        className="resume-iframe"
                        allow="autoplay"
                        title="Ayush Joshi Resume"
                      />
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'contact' && (
                <ContactForm key="contact" />
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  );
}
