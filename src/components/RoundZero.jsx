import { useState, useEffect } from "react";

import "./RoundZero.css";

import LeftOption from "../assets/LeftOptions.svg";
import RightOption from "../assets/RightOption.svg";

const questions = [
  { id: 1, type: "text", label: "Phone Number", required: true },
  { id: 2, type: "text", label: "GitHub Profile (Optional)", required: false },
  {
    id: 3,
    type: "text",
    label: "Previous Project Link (Optional)",
    required: false,
  },
  {
    id: 4,
    type: "textarea",
    label: "Description (If link provided)",
    required: false,
  },
  {
    id: 5,
    type: "multi-select",
    label: "Select your domains (Min: 1, Max: 2)",
    required: true,
    options: [
      "APP DEV",
      "WEB DEV",
      "ELECTRONICS",
      "AR VR",
      "VIDEO EDITING",
      "MACHINE LEARNING",
      "DESIGN",
      "CYBER SECURITY",
      "BLOCK CHAIN",
      "COMPETITIVE CODING",
      "GAME DEV",
    ],
    min: 1,
    max: 2,
  },
  {
    id: 6,
    type: "text",
    label:
      "What's one technology or software you want to explore in the future?",
    required: true,
  },
  {
    id: 7,
    type: "textarea",
    label:
      "Have you participated in any hackathons/competitions in the past? If yes, describe your experience.",
    required: false,
  },
  {
    id: 8,
    type: "textarea",
    label:
      "Have you done any projects previously? If yes, what was your experience doing the project? What problems did you face, and how did you solve them?",
    required: false,
  },
];

const sanitizeInput = (input) => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export default function RoundZero() {
  const [formStarted, setFormStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(() => {
    return JSON.parse(sessionStorage.getItem("formAnswers")) || {};
  });
  const [formCompleted, setFormCompleted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    sessionStorage.setItem("formAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleStart = () => {
    setFormStarted(true);
  };

  const handleNext = () => {
    let newErrors = { ...errors };
    if (
      questions[currentQuestion].required &&
      !answers[questions[currentQuestion].id]
    ) {
      newErrors[questions[currentQuestion].id] = "This question is required.";
      setErrors(newErrors);
      return;
    } else {
      delete newErrors[questions[currentQuestion].id];
      setErrors(newErrors);
    }

    if (questions[currentQuestion].id === 1) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(answers[1])) {
        newErrors[1] = "Invalid phone number.";
        setErrors(newErrors);
        return;
      } else {
        delete newErrors[1];
        setErrors(newErrors);
      }
    }

    if (currentQuestion === questions.length - 1) {
      setFormCompleted(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: sanitizeInput(e.target.value),
    });
    setErrors({ ...errors, [questions[currentQuestion].id]: "" });
  };

  const handleMultiSelect = (option) => {
    const selected = answers[questions[currentQuestion].id] || [];
    if (selected.includes(option)) {
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: selected.filter((o) => o !== option),
      });
    } else if (selected.length < questions[currentQuestion].max) {
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: [...selected, option],
      });
    } else {
      setErrors({
        ...errors,
        [questions[currentQuestion].id]: "You can select up to 2 options only.",
      });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", answers);
    sessionStorage.clear();
  };

  return (
    <>
      {!formStarted ? (
        <button className="s-button" onClick={handleStart}>
          START
        </button>
      ) : formCompleted ? (
        <>
          <button className="s-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="review" onClick={() => setFormCompleted(false)}>
            Review
          </button>
        </>
      ) : (
        <div className="form-container">
          <div
            className={`question-box card ${
              questions[currentQuestion].type === "multi-select"
                ? "multi-select-question"
                : questions[currentQuestion].type === "textarea"
                ? "textarea-question"
                : "text-question"
            }`}
          >
            <p className="question-text">{questions[currentQuestion].label}</p>

            {questions[currentQuestion].type === "multi-select" ? (
              <div className="options-container">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    className={`option-button ${
                      answers[questions[currentQuestion].id]?.includes(option)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleMultiSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <input
                  className={`input-field ${
                    questions[currentQuestion].type === "textarea"
                      ? "textarea-input"
                      : "text-input"
                  }`}
                  type={
                    questions[currentQuestion].type === "textarea"
                      ? "textarea"
                      : "text"
                  }
                  value={answers[questions[currentQuestion].id] || ""}
                  onChange={handleChange}
                  maxLength={500}
                />
                {errors[questions[currentQuestion].id] && (
                  <p className="error-text text-danger">
                    {errors[questions[currentQuestion].id]}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="navigation-buttons">
            <button
              className="btn"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              <img src={LeftOption} alt="Previous Question Button" />
            </button>
            <button
              className="btn"
              onClick={handleNext}
              disabled={
                questions[currentQuestion].required &&
                !answers[questions[currentQuestion].id]
              }
            >
              <img src={RightOption} alt="Next Question Button" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
