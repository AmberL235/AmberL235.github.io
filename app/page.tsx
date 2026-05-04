'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CurrentYear from '@/components/CurrentYear';

type ExpandableItem = {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  details: string;
  images?: string[];
  pdfLink?: string;
  tags?: string[];
  date?: string;
};

function ExpandableCard({ item, noDetails = false }: { item: ExpandableItem, noDetails?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-w-0 w-full overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-stone-700 dark:bg-stone-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="text-xl font-semibold text-stone-800 truncate md:whitespace-normal dark:text-stone-100">{item.title}</h4>
          {item.subtitle && (
            <p className="mt-1 text-sm font-medium text-stone-500 dark:text-stone-400">{item.subtitle}</p>
          )}
          <p className="mt-3 text-stone-600 dark:text-stone-300">{item.summary}</p>

          {/* Skills Preview */}
          {item.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 border border-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Expand/Collapse Button */}
        {!noDetails && (
          <button
            onClick={() => setOpen(!open)}
            className={`
              shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200
              ${open 
                ? 'bg-stone-100 text-stone-700 border border-stone-300 dark:bg-white dark:text-black dark:border-stone-300' 
                : 'bg-stone-900 text-white shadow-sm hover:bg-stone-800 hover:shadow-md active:scale-95 dark:bg-white dark:text-black dark:border-stone-300 dark:hover:bg-stone-100'
              }
            `}
            aria-expanded={open}
          >
            {open ? 'Hide details' : 'View details'}
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {!noDetails && open && (
        <div className="mt-5 border-t border-stone-200 pt-5 dark:border-stone-700">
          <p className="mb-4 leading-7 text-stone-600 dark:text-stone-300 dark:text-stone-100">{item.details}</p>

          {item.pdfLink && (
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-rose-500 dark:text-blue-600 hover:underline"
            >
              View Full Technical Report (PDF) →
            </a>
          )}

          {/* Project Gallery Slider */}
          {item.images && item.images.length > 0 && (
            <div className="mt-6 w-full overflow-hidden">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-300 mb-3">
                Project Gallery
              </p>
              
              {/* FIX 3: Ensure the scroll container has w-full and min-w-0 
              */}
              <div className="flex w-full min-w-0 gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {item.images.map((img, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-video w-[320px] md:w-[500px] shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 snap-center shadow-sm dark:border-stone-700 dark:bg-stone-800"
                  >
                    <Image
                      src={img}
                      alt={`${item.title} gallery ${index + 1}`}
                      fill
                      className="object-contain transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 260px, 400px"
                    />
                  </div>
                ))}
              </div>

              {item.images.length > 1 && (
                <p className="mt-2 text-center text-xs text-stone-400 italic">
                  ← Swipe to view more →
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  function parseDate(dateStr?: string): number {
    if (!dateStr) return 0;
    if (dateStr.includes('Summer')) {
      return parseInt(dateStr.split(' ')[1]) + 0.5;
    }
    if (dateStr.includes('Fall')) {
      return parseInt(dateStr.split(' ')[1]) + 0.8;
    }
    if (dateStr.includes('Spring')) {
      return parseInt(dateStr.split(' ')[1]) + 0.2;
    }
    if (dateStr.includes('-')) {
      const [start, end] = dateStr.split('-').map(Number);
      return (start + end) / 2;
    }
    return parseInt(dateStr) || 0;
  }

  const education: ExpandableItem[] = [
    {
      id: 'cornell-masters',
      title: 'Cornell University',
      subtitle: 'Master of Engineering in Electrical and Computer Engineering',
      summary: 'Focus: Hardware Acceleration via FPGAs',
      details: 'Pursuing advanced coursework in high-performance computer architecture, asynchronous circuit design, and hardware-software co-design. Continuing research in assistive robotics and sensor integration.',
      date: 'Jan 2026 - Dec 2026',
      tags: ['FPGA', 'ASIC Design', 'Power Electronics'],
    },
    {
      id: 'cornell-undergrad',
      title: 'Cornell University',
      subtitle: 'B.S. in Electrical and Computer Engineering, Minor in Computer Science',
      summary: 'Cumulative GPA: 3.78/4.00 | Dean\'s List Fall 2022 - Spring 2026',
      details: 'Relevant coursework includes Embedded Systems, Digital Logic Design, Analog IC Design, and VLSI. Recipient of Dean\'s List honors for all semesters.',
      date: 'Aug 2022 - May 2026',
      tags: ['VLSI', 'Computer Architecture', 'Analog IC', 'Embedded Systems', 'Robotics', 'Semiconductors & Nanofabrication'],
    },
  ];

  const internships: ExpandableItem[] = [
    {
      id: 'plug-power',
      title: 'Plug Power',
      tags: ['Altium Designer', 'Analog Circuit Design', 'PCB Prototyping', 'Harness Design', 'Automotive Protocols', 'Microcontrollers'],
      subtitle: 'Electrical Engineering Intern',
      summary:
        'Designed PCB test hardware and prototyped communication between CAN, LIN, and SENT protocols.',
      details:
        `Built a PCB test board in Altium for verifying hydrogen fuel cell stack functions. 
        The circuit consisted of differential amplifiers, voltage comparators, and a linear regulator for voltage step down. 
        Also prototyped a communication gateway using a microcontroller to convert between CAN, LIN, and SENT protocols, so that various sensors can be used regardless of their communication interface.
        Validated message conversion for a Bosch air pressure sensor by decoding data from the SENT message bitstream, then encoding it into CAN messages 
        to verify transmission onto a CAN bus.`,
      images: ['/images/PCB3.jpg'],
      date: 'May 2025 - Aug 2025',
    },
    {
      id: 'tokyo-electron',
      title: 'Tokyo Electron',
      tags: ['SEM Imaging', 'Origin Lab', 'OES Analysis', 'Fab Experience', 'Process Engineering'],
      subtitle: 'Process Engineering Intern',
      summary:
        'Performed SEM imaging and etch analysis on wafer samples in semiconductor fabrication workflows.',
      details:
        `Prepared wafers in the fab to run etch processes, cleaved samples for SEM image data collection, and analyzed etch profiles and critical dimensions. 
        Performed Optical Emission Spectroscopy (OES) analysis to monitor the etch tool chamber's composition and determine optimal etching elements. 
        Compiled findings using data analysis tools such as Origin Lab to support process engineers and enable quicker experiment turnaround times.`,
      images: [],
      date: 'May 2023 - Aug 2023',
    },
  ];

  const nexusProjects: ExpandableItem[] = [
    {
      id: 'pcb-design',
      title: 'PCB Design',
      tags: ['Altium Designer', 'PCB Prototyping', 'Power Systems', 'Harness Design', 'Soldering'],
      summary:
        `Used Altium to design custom boards to power and control the electronics for our robot's mobility and filtration systems.`,
      details:
        `Designed schematics and layouts using Altium, and assembled prototypes in-house for testing and debugging. 
        Focused on safe power delivery, connector reliability, and wire organization to support iteration during development.
        The Filtration PCB was designed for the mechanical subteam to perform off the rover testing of their filtration designs, 
        and provides power and controls to the motors and sensors via a Raspberry Pi, a PWM expansion chip, and motor controllers.
        Other on rover boards such as the Power Distribution Board, provide power regulation and distribution for the rover's various subsystems from our 12V battery.`,
      images: ['/images/PCB1.png', '/images/schematic1.png', '/images/Filtration Wiring Diagram.png'],
      date: 'Spring 2025 - Fall 2025',
    },
    {
      id: 'gps-rtk',
      title: 'GPS-RTK',
      tags: ['Embedded Systems', 'Wireless Communication', 'GPS Software'],
      summary:
        'Developed an enhanced GPS system that uses real-time kinematics (RTK) to correct the rover’s position for centimeter-level precision.',
      details:
        `Worked on improving accuracy for the autonomous beach-cleaning robot by integrating RTK correction data into the GPS localization system.
        This helped reduce position error drift over time and is essential for navigation on sandy beaches where wheel slipping makes position determination unreliable.
        Set up wireless communication between the rover and base station GPS modules via Wifi for mid range wireless communication.`,
      images: ['/images/GPS_RTK_Setup.jpg', '/images/RTK_FIXED.png'],
      date: 'Spring 2023 - Spring 2024',
    },
  ];

  const classProjects: ExpandableItem[] = [
    {
      id: '4-bit-alu',
      title: '4-Bit ALU',
      tags: ['VLSI', 'Cadence Virtuoso', 'Custom Digital Logic Design', 'Standard Cell Design'],
      summary:
        `Designed a 4-bit arithmetic logic unit (ALU) using VLSI techniques and Cadence Virtuoso.`,
      details:
        `Created the digital logic design for a 4-bit ALU, implementing basic arithmetic, multiplication, shifting, and logical operations. 
        The logical operations were optimized using dynamic logic.
        The design was simulated in Cadence Virtuoso, with individual subcircuits verified for proper functionality.`,
      images: [],
      date: 'Spring 2025',
    },
    {
      id: 'cmos-image-sensor-array',
      title: 'CMOS Image Sensor Array',
      tags: ['Analog IC Design', 'Cadence Virtuoso', 'Switched Capacitor Circuits', 'Pixel Arrays'],
      summary:
        'Developed a CMOS image sensor array uisng a mix of digital and analog design techniques.',
      details:
        `Designed and simulated a CMOS image sensor array using Cadence Virtuoso. The design consisted of a 32x32 4T pixel array, 
        row/column addressing and level shifting, correlated double sampling (CDS) for noise reduction, and an 8-bit SAR ADC.
        The sensors were optimized for low noise and high dynamic range, making them suitable for use in challenging lighting conditions.`,
      images: [],
      date: 'Fall 2025',
    },
    {
      id: 'des-encryption-accelerator',
      title: 'DES Encryption Accelerator',
      tags: ['Digital ASIC Design', 'KLayout', 'SystemVerilog', 'Hardware Acceleration Analysis'],
      summary:
        `Designed a DES encryption accelerator in SystemVerilog and pushed it through a commercial chip flow.`,
      details:
        `Created a software baseline and the Verilog design for a DES encryption accelerator, 
        focusing on hardware acceleration for improved performance. The design was implemented and verified using a 
        combination of commercial and open source tools ensuring optimal area utilization and power efficiency.`,
      images: [],
      date: 'Spring 2026',
    },
  ];

  const researchProjects: ExpandableItem[] = [
    {
      id: 'whole-arm-skin',
      title: 'Whole-Arm Skin',
      tags: ['Sensors', 'Robotics', 'Machine Learning', 'Data Collection and Calibration', 'ROS', 'ROS Visualization'],
      summary:
        'Fabricated a force-sensing skin with 28 taxels for robotic arm contact sensing.',
      details:
        `Constructed custom force-sensing resistors (FSRs) with soft bases using piezoresistive sheets and copper conducting fabric 
        and arranged them into an array that covers a robotic arm. The system was controlled using an Arduino Mega with a 64:1 multiplexer.
        The sensors were calibrated using a multilayer perceptron model to improve the mapping between analog sensor readings and ground-truth force-torque data
        for accurate force sensing during human–robot interaction. RVIZ was used to visualize the force vectors on the arm in real time.`,
      images: ['images/Resistive Taxel Diagram.png', '/images/Arm-Cleaned.png', '/images/RVIZ.jpg', '/images/calibration.jpg'],
      date: 'Mar 2024 - Sep 2024',
    },
    {
      id: 'feeding-nipple',
      title: 'Instrumented Feeding Nipple',
      tags: ['Engineering Design Prototyping', '3D Printing', 'PCB Design', 'Embedded Systems', 'Sensors'],
      summary:
        'Designed a silicone feeding nipple with embedded force and temperature sensors to study early disease detection in calves.',
      details:
        `Created 3D-printed molds for silicone casting and designed a custom PCB for the microcontroller and sensing circuitry.
        The nipple contains an array of 12 small custom made force-sensing resistors (FSRs) and a thermistor, and was designed to be compatible with 
        industry standard feeding bottles. The materials were all chosen to be FDA compliant for food safety as well as waterproof for cleaning and durability.
        The electronics are housed in a 3D printed electrical box that is small enough to be attached onto the side of the feeding bottle.
        The device will be used to characterize behavioral differences such as weaker suckling force and temperature variations that may help distinguish 
        healthy calves from those likely to fall ill.`,
      images: ['/images/Instrumented_Feeding_Nipple.jpg','/images/PCB2.png', '/images/schematic2.png'],
      pdfLink: '/pdfs/ELI SP 2025 Poster.pdf',
      date: 'Oct 2024 - May 2025',
    },
  ];

  const sortedInternships = [...internships].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const sortedNexusProjects = [...nexusProjects].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const sortedClassProjects = [...classProjects].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const sortedResearchProjects = [...researchProjects].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 dark:bg-stone-950 dark:text-stone-100">
      {/* Floating Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Home Button / Name */}
          <a href="#" className="text-lg font-bold tracking-tighter text-stone-900 transition hover:text-rose-500 dark:text-stone-100 dark:hover:text-blue-600">
            AL
          </a>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 text-sm font-semibold text-stone-500 dark:text-stone-300">
            <a href="#" className="transition hover:text-stone-900 dark:hover:text-white">About Me</a>
            <a href="#education" className="transition hover:text-stone-900 dark:hover:text-white">Education</a>
            <a href="#internships" className="transition hover:text-stone-900 dark:hover:text-white">Internships</a>
            <a href="#projects" className="transition hover:text-stone-900 dark:hover:text-white">Projects</a>
            <a href="#research" className="transition hover:text-stone-900 dark:hover:text-white">Research</a>
            <a 
              href="/contact" 
              className="rounded-full bg-stone-900 px-5 py-2.5 text-white transition hover:bg-stone-800 shadow-sm dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Contact Me
            </a>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
          >
            {mounted ? (darkMode ? '☀️' : '🌙') : null}
          </button>
        </div>
      </nav>

      {/* Top Intro */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-blue-50 via-stone-50 to-stone-50 dark:border-stone-800 dark:from-stone-900 dark:via-stone-950 dark:to-stone-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[0.9fr_1.3fr] md:items-center">
          <div className="flex justify-center md:justify-start"> {/* Left-align on desktop */}
            <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-stone-200 shadow-sm">
              <Image
                src="/images/headshot2.png"
                alt="Amber Li"
                fill
                className="object-cover"
                priority // Use priority for the main intro image
              />
            </div>
          </div>

          {/* About Me */}
          <div>
            <h1 className="text-6xl font-extrabold tracking-tighter text-stone-900 md:text-6xl dark:text-stone-100">
              Amber Li
            </h1>
            <p className="mt-4 text-2xl font-bold tracking-tight text-rose-500 dark:text-blue-600 md:text-3xl">
              Electrical & Computer Engineer
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
              I’m a senior at Cornell studying Electrical and Computer Engineering with a
              minor in Computer Science. I’m passionate about sustainable technology,
              robotics, embedded systems, and applying engineering for social impact.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="https://github.com/AmberL235"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/amberli235"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
              >
                LinkedIn
              </a>
              <a
                href="/pdfs/Amber Li Resume 2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="scroll-mt-20 border-b border-stone-100 bg-white dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-8 text-3xl font-semibold text-stone-900 dark:text-stone-100">Education</h2>
          
          <div className="relative">
            {/* The vertical line */}
            <div className="absolute left-1.5 top-0 w-1 bg-stone-200 dark:bg-stone-700" style={{ height: 'calc(100% - 2rem)' }}></div>
            
            {education.map((item) => (
              <div key={item.id} className="relative flex items-center mb-8">
                <div className="flex-shrink-0 w-4 h-4 bg-rose-500 dark:bg-blue-600 mr-4 z-10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2 tracking-tight">{item.date}</p>
                  <ExpandableCard item={item} noDetails={true} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="internships" className="scroll-mt-20 bg-blue-50/40 bg-blue-50/40 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-4 text-3xl font-semibold text-stone-900 dark:text-stone-100">Internships</h2>
          <p className="mb-10 max-w-3xl text-stone-600 dark:text-stone-300">
            Industry experience across energy and semiconductor engineering.
          </p>

          <div className="relative">
            <div className="absolute left-1.5 top-0 w-1 bg-stone-300 dark:bg-stone-700" style={{ height: 'calc(100% - 2rem)' }}></div>
            {sortedInternships.map((item, index) => (
              <div key={item.id} className="relative flex items-center mb-8">
                <div className="flex-shrink-0 w-4 h-4 bg-rose-500 dark:bg-blue-600 mr-4 z-10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">{item.date}</p>
                  <ExpandableCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 bg-stone-100/70 dark:bg-stone-950">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-4 text-3xl font-semibold text-stone-900 dark:text-stone-100">Projects</h2>

          {/* Sub-Field 1: Cornell Nexus Project Team */}
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-rose-500 dark:text-blue-600 mb-2">Cornell Nexus Project Team</h3>
            <p className="max-w-3xl text-stone-600 dark:text-stone-300">
              Highlights from Cornell Nexus Project Team, where I worked on an autonomous beach-cleaning robot that filters microplastics from the sand.
            </p>
          </div>
    
          <div className="relative">
            <div className="absolute left-1.5 top-0 w-1 bg-stone-300 dark:bg-stone-700" style={{ height: 'calc(100% - 2rem)' }}></div>
            {sortedNexusProjects.map((item, index) => (
              <div key={item.id} className="relative flex items-center mb-8">
                <div className="flex-shrink-0 w-4 h-4 bg-rose-500 dark:bg-blue-600 mr-4 z-10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">{item.date}</p>
                  <ExpandableCard item={item} />
                </div>
              </div>
            ))}
          </div>

          {/* Sub-Field 2: Class Projects */}
          <div className="mt-20 mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-rose-500 dark:text-blue-600 mb-2">Technical Coursework</h3>
            <p className="max-w-3xl text-stone-600 dark:text-stone-300">
              Advanced projects from ECE courses covering Analog IC design, VLSI, and hardware acceleration.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1.5 top-0 w-1 bg-stone-300 dark:bg-stone-700" style={{ height: 'calc(100% - 2rem)' }}></div>
            {sortedClassProjects.map((item, index) => (
              <div key={item.id} className="relative flex items-center mb-8">
                <div className="flex-shrink-0 w-4 h-4 bg-rose-500 dark:bg-blue-600 mr-4 z-10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">{item.date}</p>
                  <ExpandableCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="scroll-mt-20 bg-emerald-50/50 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-4 text-3xl font-semibold text-stone-900 dark:text-stone-100">Research</h2>
          <p className="mb-10 max-w-3xl text-stone-600 dark:text-stone-300">
            Undergraduate research in assistive robotics, focused on hardware systems,
            sensing, and human-centered applications.
          </p>

          <div className="relative">
            <div className="absolute left-1.5 top-0 w-1 bg-stone-300 dark:bg-stone-700" style={{ height: 'calc(100% - 2rem)' }}></div>
            {sortedResearchProjects.map((item, index) => (
              <div key={item.id} className="relative flex items-center mb-8">
                <div className="flex-shrink-0 w-4 h-4 bg-rose-500 dark:bg-blue-600 mr-4 z-10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">{item.date}</p>
                  <ExpandableCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white py-10 dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-col items-center justify-center gap-4 text-sm font-medium text-stone-500 dark:text-stone-400 md:flex-row">
          <p>© <CurrentYear /> Amber Li</p>
        </div>
      </footer>
    </main>
  );
}