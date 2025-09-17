import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// src/App.jsx
import Navbar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";
import Step from "./components/Step";
import Contact from "./components/Contact";

function App() {
  // Sample walkthrough steps
  const steps = [
    { title: "Step 1: Create AWS Account", text: "Go to aws.amazon.com and sign up." },
    { title: "Step 2: Login to Console", text: "Open AWS Management Console and log in." },
    { title: "Step 3: Launch EC2 Instance", text: "Navigate to EC2 service and launch a new instance." },
    { title: "Step 4: Configure Security Group", text: "Set inbound rules to allow SSH and HTTP." },
    { title: "Step 5: Verify Setup", text: "Access your instance and confirm deployment works." },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="font-sans bg-[#FAFAFA] text-gray-800">
      <Navbar />
      <ProgressBar current={currentStep + 1} total={steps.length} />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Step
          title={steps[currentStep].title}
          text={steps[currentStep].text}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={currentStep === 0}
          isLast={currentStep === steps.length - 1}
        />
      </main>
      <Contact />
    </div>
  );
}

export default App;
