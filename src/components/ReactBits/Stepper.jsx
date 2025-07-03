// Stepper.js
import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Fields/AnimatedButton";
import { IoChevronBackOutline } from "react-icons/io5";
import Logo from "../../assets/bglogo.png";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => { },
  onFinalStepCompleted = () => { },
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  Heading,
  handleSubmit,
  canProceed = true,
  purpose,
  errors = {}, // Receive errors as prop
  setErrors = () => { }, // Receive setErrors as prop
  validateStep = () => true, // Validation function
  typeofstepper = "requirement",
  backtohome = false,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const navigate = useNavigate()

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    if (isLastStep) return;

    // Clear previous errors
    setErrors({});

    // Validate current step before proceeding
    const validationErrors = await validateStep(currentStep);
    setErrors(validationErrors || {});

    if (!validationErrors || Object.keys(validationErrors).length === 0) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    if (isLastStep) {
      // Clear previous errors
      setErrors({});

      const validationErrors = await validateStep(currentStep);
      setErrors(validationErrors || {});

      if (!validationErrors || Object.keys(validationErrors).length === 0) {
        setDirection(1);
        updateStep(totalSteps + 1);
      }
    }
  };

  const role = localStorage.getItem("role");

  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center"
      {...rest}
    >
      <div
        className={`mx-auto w-full max-w-4xl rounded-4xl bg-[#ffffff]/90 shadow-xl ${stepCircleContainerClassName}`}
        style={{ border: "1px solid #222" }}
      >
        {Heading && (
          <div className="ml-5 flex items-center p-2">
            <p
              className="flex items-center gap-2 text-[#084040]  text-xl cursor-pointer"
              onClick={() => setIsExitModalOpen(true)}
            >
              <IoMdArrowBack />Back To Home
            </p>
            <p className="mt-10 text-center font-semibold mx-auto  flex-1 ml-[-5cm]">{Heading}</p>
          </div>
        )}
        <div
          className={`${stepContainerClassName} flex w-full items-center p-4 px-8`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-4 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`px-4 pb-4 ${footerClassName}`}>
            {/* Add the horizontal line here */}
            <div className="border-t border-[#265953] mt-4 mx-50"></div>

            <div className="flex items-center justify-center gap-10">
              <div
                className={`flex w-[60%] sm:w-[25%] text-[#B7A380] ${currentStep !== 1 ? "justify-between" : "justify-end"
                  }`}
              >
                {currentStep !== 1 && (
                  <AnimatedButton
                    onClick={handleBack}
                    className={`${currentStep === 1
                      ? "pointer-events-none opacity-50 text-neutral-400"
                      : "bg-[#084040] text-white rounded-full"
                      }`}
                    text={backButtonText}
                    {...backButtonProps}
                  />
                )}
              </div>
              <div className="w-[60%] sm:w-[25%] text-[#B7A380]">
                <AnimatedButton
                  text={
                    isLastStep
                      ? typeofstepper == "requirement"
                        ? "Pay Subscription"
                        : typeofstepper == "updateproperty"
                          ? "Update Property"
                          : "Add Property"
                      : nextButtonText
                  }
                  onClick={isLastStep ? handleSubmit : handleNext}
                  otherStyles="w-full rounded-full cursor-pointer"
                />
              </div>
            </div>

            {isLastStep && typeofstepper === "requirement" && (
              <>
                {purpose === "residential" && (
                  <p className="text-xs mt-3 text-center text-primary poppins-bold">
                    Note: Based on your price range, if you choose to rent a
                    residential property, we charge 20% of the higher end of
                    your selected range. In case we are unable to find a
                    suitable property for you within 3 months, we will refund
                    15% of the amount and retain 5% as a platform fee.
                  </p>
                )}
                {purpose === "commercial" && (
                  <p className="text-xs mt-3 text-center text-primary poppins-bold">
                    Note: Based on your price range, if you choose to rent a
                    commercial property, we charge 40% of the higher end of your
                    selected range. In case we are unable to find a suitable
                    property for you within 3 months, we will refund 30% of the
                    amount and retain 10% as a platform fee.
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {isExitModalOpen && (
        <>
          <div className="fixed animate-fadeIn inset-0 bg-opacity-50 bg-[#00000071] backdrop-blur-xs flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-[#B7A380] p-10 rounded-lg border border-[#084040]">
              <p className="text-[#084040] text-center text-2xl">Are you sure you want to exit</p>
              <div className="flex justify-center mt-4 gap-5">
                <button className="hover:bg-[#084040] text-[#084040] hover:text-white px-2 py-1 rounded transform duration-150 text-lg" onClick={() => navigate("/app/broker/dashboard")}>Yes</button>
                <button className="hover:bg-[#084040] text-[#084040] hover:text-white px-2 py-1 rounded transform duration-150 text-lg" onClick={() => setIsExitModalOpen(false)}>No</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: "relative" }} // Removed overflow: hidden
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir >= 0 ? "-50%" : "50%",
    opacity: 0,
  }),
};

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      // onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#E5E5E5", color: "#000" },
          active: { scale: 1.1, backgroundColor: "#265953", color: "#fff" },
          complete: { scale: 1, backgroundColor: "#265953", color: "#fff" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-white" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: "#56a39a" },
    complete: { width: "100%", backgroundColor: "#265953" },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-200">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function Step({ children }) {
  return <div className="px-2 sm:px-8">{children}</div>;
}
