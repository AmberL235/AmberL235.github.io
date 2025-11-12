'use client';
import { useEffect } from 'react';
import CurrentYear from '@/components/CurrentYear';

export default function Home() {
  // Enable smooth scrolling for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-emerald-50 text-gray-800 scroll-smooth">
      {/* Hero / Intro Section */}
      <section
        id="intro"
        className="w-full flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-transparent to-white/50"
      >
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Hi, I’m Amber Li 👋</h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-10">
          I’m a senior at Cornell studying Electrical and Computer Engineering with a minor in Computer Science. 
          I’m passionate about building sustainable technology for social impact — combining engineering, research, 
          and creativity to make a difference.
        </p>
        <a
          href="#projects"
          className="rounded-full bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition"
        >
          See My Work ↓
        </a>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full max-w-5xl px-6 py-20">
        <h2 className="text-4xl font-semibold mb-12 text-center">Experience</h2>

        {/* Cornell Nexus Project Team 🐢 */}
        <div id="nexus" className="mb-16">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            🐢 Cornell Nexus Project Team
          </h3>
          <p className="text-gray-700 mb-6">
            I am a member of the electrical subteam of Cornell Nexus. We are building an autonomous robot to 
            traverse beaches and filter microplastics, combining environmental engineering and embedded systems.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                title: 'GPS-RTK',
                desc: 'Developed an enhanced GPS system that uses real-time kinematics ' +
                  'to correct the rover’s position for centimeter-level precision.',
              },
              {
                title: 'PCB Design',
                desc: 'Used Altium to design a custom board to power and control the electronics for our filtration system. ' +
                  'Assembled the boards manually in-house for testing and debugging.',
              },
            ].map((proj) => (
              <div
                key={proj.title}
                className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-semibold mb-2">{proj.title}</h4>
                <p className="text-gray-600">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Section 🤖 */}
        <div id="research" className="mb-16">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            🤖 EmPRISE Robotics Lab – Research
          </h3>
          <p className="text-gray-700 mb-6">
            I am an undergraduate researcher in EmPRISE Robotics Lab, which focuses on assistive robotics for people with mobility limitations. 
            I primarily work on hardware and embedded systems for a range of interdisciplinary projects.
          </p>
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-2">Whole-Arm Skin</h4>
              <p className="text-gray-600">
                Fabricated custom force-sensing resistors (FSRs) with soft bases arranged into an array of 28 taxels 
                covering a robotic arm like a sleeve. This allows the arm to sense contact forces during human–robot 
                interaction. Calibrated the FSRs using a multilayer perceptron model to improve fit between analog readings 
                and real-world forces.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-2">Instrumented Feeding Nipple</h4>
              <p className="text-gray-600">
                Designed and constructed a silicone feeding nipple with embedded force and temperature sensors to 
                characterize calf suckling behavior, helping distinguish between healthy and sick animals. 
                Modeled 3D-printed molds for the silicone and designed a custom PCB for the microcontroller and sensor circuits.
              </p>
            </div>
          </div>
        </div>

        {/* Internship Experience */}
        <div id="internships">
          <h3 className="text-2xl font-semibold mb-4">Internships</h3>
          <p className="text-gray-700 mb-6">
            I’ve gained hands-on experience across different industries, applying engineering principles to 
            solve practical challenges and build reliable systems.
          </p>
          <div className="space-y-8">
            {[
              {
                company: 'Plug Power',
                role: 'Electrical Engineering Intern',
                desc:
                  'Designed a PCB test board in Altium for verification of specific hydrogen fuel cell stack functions. ' +
                  'Prototyped a communication gateway between CAN, LIN, and SENT protocols using a microcontroller, ' +
                  'and tested message conversion of an air pressure sensor.',
              },
              {
                company: 'Tokyo Electron',
                role: 'Process Engineering Intern',
                desc:
                  'Cleaved wafer samples and performed SEM imaging to analyze etch profiles and measure critical dimensions. ' +
                  'Prepared wafers, ran etch processes in the fab, and compiled weekly reports with SEM images and etch data.',
              },
            ].map((exp) => (
              <div
                key={exp.company}
                className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-1">
                  {exp.role} @ {exp.company}
                </h4>
                <p className="text-gray-600">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white/70 backdrop-blur-sm py-8 text-center text-gray-600">
        <p className="mb-2">© <CurrentYear /> Amber Li</p>
        <div className="space-x-4">
          <a href="https://github.com/AmberL235" className="hover:text-blue-600">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/amberli235" className="hover:text-blue-600">
            LinkedIn
          </a>
          <a href="mailto:li.amber235@gmail.com" className="hover:text-blue-600">
            Email
          </a>
        </div>
      </footer>
    </main>
  );
}
