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
};

function ExpandableCard({ item }: { item: ExpandableItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold text-stone-800">{item.title}</h4>
          {item.subtitle && (
            <p className="mt-1 text-sm font-medium text-stone-500">{item.subtitle}</p>
          )}
          <p className="mt-3 text-stone-600">{item.summary}</p>

          {/* Skills Preview */}
          {item.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 border border-stone-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          aria-expanded={open}
        >
          {open ? 'Hide details' : 'View details'}
        </button>
      </div>

      {/* Expanded Details */}
      {open && (
        <div className="mt-5 border-t border-stone-200 pt-5">
          <p className="mb-4 leading-7 text-stone-600">{item.details}</p>

          {item.images && item.images.length > 0 && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {item.images.map((img, index) => (
              <div key={index} className="rounded-xl border border-stone-200 overflow-hidden bg-white">
                <Image
                  src={img}
                  alt={`${item.title} - image ${index + 1}`}
                  width={1200}
                  height={0} // Setting height to 0 with 'h-auto' lets the natural ratio take over
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto block" 
                />
              </div>
            ))}
          </div>
        )}

          {item.pdfLink && (
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-rose-600 hover:underline"
            >
              View Full Technical Report (PDF) →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

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
    },
  ];

  const nexusProjects: ExpandableItem[] = [
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
    },
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
    },
  ];

  const classProjects: ExpandableItem[] = [
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
    },
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
      pdfLink: '/pdfs/ELI SP 2025 Poster.pdf'
    },
  ];

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      {/* Top Intro */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-rose-50 via-stone-50 to-stone-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.3fr_0.9fr] md:items-center">
          <div>
            <h1 className="text-6xl font-extrabold tracking-tighter text-stone-900 md:text-6xl">
              Amber Li
            </h1>
            <p className="mt-4 text-2xl font-bold tracking-tight text-rose-600 md:text-3xl">
              Electrical & Computer Engineering Student
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-600">
              I’m a senior at Cornell studying Electrical and Computer Engineering with a
              minor in Computer Science. I’m passionate about sustainable technology,
              robotics, embedded systems, and applying engineering for social impact.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="https://github.com/AmberL235"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-100"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/amberli235"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-100"
              >
                LinkedIn
              </a>
              <a
                href="mailto:li.amber235@gmail.com"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-100"
              >
                Get in Touch
              </a>
              <a
                href="/pdfs/Amber Li Resume 2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-100"
              >
                Resume
              </a>
              </div>
          </div>

          {/* Headshot */}
          <div className="flex justify-center md:justify-end">
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
        </div>
      </section>

      {/* Experience */}
      <section id="internships" className="bg-blue-50/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-4 text-3xl font-semibold text-stone-900">Internships</h2>
          <p className="mb-10 max-w-3xl text-stone-600">
            Industry experience across energy and semiconductor engineering.
          </p>

          <div className="space-y-6">
            {internships.map((item) => (
              <ExpandableCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-stone-100/70">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-4 text-3xl font-semibold text-stone-900">Projects</h2>

          {/* Sub-Field 1: Cornell Nexus Project Team */}
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-rose-600 mb-2">Cornell Nexus Project Team</h3>
            <p className="max-w-3xl text-stone-600">
              Highlights from Cornell Nexus Project Team, where I worked on an autonomous beach-cleaning robot that filters microplastics from the sand.
            </p>
          </div>
    
          <div className="space-y-6">
            {nexusProjects.map((item) => (
              <ExpandableCard key={item.id} item={item} />
            ))}
          </div>

          {/* Sub-Field 2: Class Projects with proper top spacing */}
          <div className="mt-20 mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-rose-600 mb-2">Technical Coursework</h3>
            <p className="max-w-3xl text-stone-600">
              Advanced projects from ECE courses covering Analog IC design, VLSI, and hardware acceleration.
            </p>
          </div>

          <div className="space-y-6">
            {classProjects.map((item) => (
              <ExpandableCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="bg-emerald-50/50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-4 text-3xl font-semibold text-stone-900">Research</h2>
          <p className="mb-10 max-w-3xl text-stone-600">
            Undergraduate research in assistive robotics, focused on hardware systems,
            sensing, and human-centered applications.
          </p>

          <div className="space-y-6">
            {researchProjects.map((item) => (
              <ExpandableCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white py-8 text-center text-stone-500">
        <p>© <CurrentYear /> Amber Li </p>
        <span className="hidden h-1 w-1 rounded-full bg-stone-300 md:block"></span>

        {/* Email Link */}
        <a 
          href="mailto:li.amber235@gmail.com" 
          className="transition-colors hover:text-rose-600"
        >
          li.amber235@gmail.com
        </a>
      </footer>
    </main>
  );
}