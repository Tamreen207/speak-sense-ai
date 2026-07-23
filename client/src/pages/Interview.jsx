// import { useState, useRef, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./interview.css";

// export default function Interview() {
//   const navigate = useNavigate();
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const [showAvatarSelect, setShowAvatarSelect] = useState(true);
//   const [permissions, setPermissions] = useState({ video: false, audio: false });
//   const [useChat, setUseChat] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [interviewActive, setInterviewActive] = useState(false);
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [showResults, setShowResults] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
  
//   const videoRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const timerRef = useRef(null);

//   // AI Avatars
//   const avatars = [
//     { id: 1, name: "Alex", gender: "male", role: "Technical Interviewer", avatar: "👨‍💼", color: "#4f9eff", bgColor: "linear-gradient(135deg, #0066cc, #004080)" },
//     { id: 2, name: "Sarah", gender: "female", role: "HR Specialist", avatar: "👩‍💼", color: "#f687b3", bgColor: "linear-gradient(135deg, #d53f8c, #97266d)" },
//     { id: 3, name: "Michael", gender: "male", role: "Senior Developer", avatar: "👨‍💻", color: "#48bb78", bgColor: "linear-gradient(135deg, #2f855a, #1e4b3c)" },
//     { id: 4, name: "Emma", gender: "female", role: "Product Manager", avatar: "👩‍💼", color: "#9f7aea", bgColor: "linear-gradient(135deg, #6b46c1, #44337a)" }
//   ];

//   // Interview questions
//   const questions = [
//     { id: 1, question: "Tell me about yourself and your background." },
//     { id: 2, question: "Why are you interested in this position?" },
//     { id: 3, question: "Describe a challenging project you worked on." },
//     { id: 4, question: "How do you handle pressure and deadlines?" },
//     { id: 5, question: "Where do you see yourself in 5 years?" }
//   ];

//   // Auto-scroll chat
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Timer
//   useEffect(() => {
//     if (interviewActive) {
//       timerRef.current = setInterval(() => {
//         setTimeElapsed(prev => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [interviewActive]);

//   // Request permissions
//   const requestPermissions = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setPermissions({ video: true, audio: true });
//       setUseChat(false);
//     } catch (err) {
//       console.log("Permission denied, using chat mode");
//       setPermissions({ video: false, audio: false });
//       setUseChat(true);
//     }
//   };

//   // Start interview
//   const startInterview = async (avatar) => {
//     setSelectedAvatar(avatar);
//     setShowAvatarSelect(false);
//     await requestPermissions();
//     setInterviewActive(true);
    
//     // Add welcome message
//     setMessages([
//       {
//         id: Date.now(),
//         sender: "ai",
//         message: `Hello! I'm ${avatar.name}, your ${avatar.role}. Let's begin your interview.`,
//         timestamp: new Date().toLocaleTimeString()
//       }
//     ]);
//   };

//   // Send message
//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     // Add user message
//     const userMessage = {
//       id: Date.now(),
//       sender: "user",
//       message: inputMessage,
//       timestamp: new Date().toLocaleTimeString()
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage("");

//     // Simulate AI response
//     setTimeout(() => {
//       const aiResponse = {
//         id: Date.now() + 1,
//         sender: "ai",
//         message: questions[currentQuestion].question,
//         timestamp: new Date().toLocaleTimeString()
//       };
//       setMessages(prev => [...prev, aiResponse]);
      
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion(prev => prev + 1);
//       }
//     }, 1000);
//   };

//   // Next question
//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(prev => prev + 1);
//     }
//   };

//   // End interview
//   const endInterview = () => {
//     setInterviewActive(false);
//     clearInterval(timerRef.current);
//     setShowResults(true);
//   };

//   // Format time
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Toggle controls
//   const toggleMute = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getAudioTracks();
//       tracks.forEach(track => track.enabled = isMuted);
//       setIsMuted(!isMuted);
//     }
//   };

//   const toggleVideo = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getVideoTracks();
//       tracks.forEach(track => track.enabled = isVideoOff);
//       setIsVideoOff(!isVideoOff);
//     }
//   };

//   return (
//     <div className="interview-page">
//       {/* Background Elements */}
//       <div className="interview-bg">
//         <div className="bg-grid"></div>
//         <div className="bg-glow glow-1"></div>
//         <div className="bg-glow glow-2"></div>
//       </div>

//       <div className="interview-container">
//         {/* Header */}
//         <div className="interview-header">
//           <Link to="/dashboard" className="back-link">
//             <span className="back-icon">←</span>
//             Back to Dashboard
//           </Link>
//           <h1>AI Mock Interview</h1>
//           {interviewActive && (
//             <div className="interview-timer">
//               <span className="timer-icon">⏱️</span>
//               <span className="timer-text">{formatTime(timeElapsed)}</span>
//             </div>
//           )}
//         </div>

//         {showAvatarSelect ? (
//           /* Avatar Selection Screen */
//           <div className="avatar-selection">
//             <h2>Choose Your Interviewer</h2>
//             <p>Select an AI avatar to conduct your interview</p>
            
//             <div className="avatars-grid">
//               {avatars.map(avatar => (
//                 <div
//                   key={avatar.id}
//                   className="avatar-card"
//                   onClick={() => startInterview(avatar)}
//                   style={{ background: avatar.bgColor }}
//                 >
//                   <div className="avatar-icon-large">{avatar.avatar}</div>
//                   <h3>{avatar.name}</h3>
//                   <p className="avatar-role">{avatar.role}</p>
//                   <button className="select-avatar-btn">Select</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : showResults ? (
//           /* Results Screen */
//           <div className="results-screen">
//             <div className="results-card">
//               <div className="results-icon">🏆</div>
//               <h2>Interview Completed!</h2>
//               <p>Great job! Your interview has been analyzed.</p>
              
//               <div className="results-stats">
//                 <div className="result-stat">
//                   <span className="stat-label">Duration</span>
//                   <span className="stat-value">{formatTime(timeElapsed)}</span>
//                 </div>
//                 <div className="result-stat">
//                   <span className="stat-label">Questions</span>
//                   <span className="stat-value">{questions.length}</span>
//                 </div>
//                 <div className="result-stat">
//                   <span className="stat-label">Mode</span>
//                   <span className="stat-value">{useChat ? 'Chat' : 'Video'}</span>
//                 </div>
//               </div>

//               <div className="results-actions">
//                 <Link to="/results" className="view-results-btn">
//                   View Detailed Results →
//                 </Link>
//                 <button 
//                   className="new-interview-btn"
//                   onClick={() => {
//                     setShowAvatarSelect(true);
//                     setSelectedAvatar(null);
//                     setMessages([]);
//                     setCurrentQuestion(0);
//                     setTimeElapsed(0);
//                   }}
//                 >
//                   New Interview
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Active Interview */
//           <div className="interview-session">
//             <div className="interview-main">
//               {/* Video/Chat Area */}
//               <div className="interview-area">
//                 {!useChat ? (
//                   <div className="video-container">
//                     <video
//                       ref={videoRef}
//                       autoPlay
//                       playsInline
//                       muted={isMuted}
//                       className={isVideoOff ? 'video-off' : ''}
//                     ></video>
                    
//                     {isVideoOff && (
//                       <div className="video-off-placeholder">
//                         <span className="video-off-icon">📹</span>
//                         <p>Camera is off</p>
//                       </div>
//                     )}

//                     {/* AI Avatar Overlay */}
//                     {selectedAvatar && (
//                       <div className="ai-avatar-overlay">
//                         <div className="ai-avatar-small">
//                           <span className="avatar-emoji">{selectedAvatar.avatar}</span>
//                         </div>
//                         <div className="ai-status">
//                           <span className="status-dot"></span>
//                           <span>AI is speaking</span>
//                         </div>
//                       </div>
//                     )}

//                     {/* Video Controls */}
//                     <div className="video-controls">
//                       <button 
//                         className={`control-btn ${isMuted ? 'active' : ''}`}
//                         onClick={toggleMute}
//                       >
//                         {isMuted ? '🔇' : '🎤'}
//                       </button>
//                       <button 
//                         className={`control-btn ${isVideoOff ? 'active' : ''}`}
//                         onClick={toggleVideo}
//                       >
//                         {isVideoOff ? '📹' : '🎥'}
//                       </button>
//                       <button 
//                         className="control-btn settings"
//                         onClick={() => setUseChat(true)}
//                       >
//                         💬 Switch to Chat
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   /* Chat Interface */
//                   <div className="chat-container">
//                     <div className="chat-header">
//                       <div className="chat-avatar">
//                         <span className="chat-avatar-icon">{selectedAvatar?.avatar}</span>
//                         <div>
//                           <h3>{selectedAvatar?.name}</h3>
//                           <p>{selectedAvatar?.role}</p>
//                         </div>
//                       </div>
//                       <button 
//                         className="switch-video-btn"
//                         onClick={() => setUseChat(false)}
//                       >
//                         📹 Switch to Video
//                       </button>
//                     </div>

//                     <div className="chat-messages" ref={chatContainerRef}>
//                       {messages.map(msg => (
//                         <div
//                           key={msg.id}
//                           className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
//                         >
//                           <div className="message-avatar">
//                             {msg.sender === 'user' ? '👤' : selectedAvatar?.avatar}
//                           </div>
//                           <div className="message-content">
//                             <div className="message-header">
//                               <span className="message-sender">
//                                 {msg.sender === 'user' ? 'You' : selectedAvatar?.name}
//                               </span>
//                               <span className="message-time">{msg.timestamp}</span>
//                             </div>
//                             <p className="message-text">{msg.message}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <form onSubmit={sendMessage} className="chat-input-form">
//                       <input
//                         type="text"
//                         value={inputMessage}
//                         onChange={(e) => setInputMessage(e.target.value)}
//                         placeholder="Type your response..."
//                         className="chat-input"
//                       />
//                       <button type="submit" className="send-btn">Send →</button>
//                     </form>
//                   </div>
//                 )}
//               </div>

//               {/* Sidebar */}
//               <div className="interview-sidebar">
//                 {/* Current Question */}
//                 <div className="current-question">
//                   <h3>Current Question</h3>
//                   <div className="question-box">
//                     <p>{questions[currentQuestion].question}</p>
//                   </div>
//                   <div className="question-progress">
//                     <span>Question {currentQuestion + 1} of {questions.length}</span>
//                     <div className="progress-bar">
//                       <div 
//                         className="progress-fill"
//                         style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Interview Info */}
//                 <div className="interview-info">
//                   <h3>Interview Details</h3>
//                   <div className="info-item">
//                     <span className="info-label">Interviewer:</span>
//                     <span className="info-value">{selectedAvatar?.name}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Role:</span>
//                     <span className="info-value">{selectedAvatar?.role}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Mode:</span>
//                     <span className="info-value">{useChat ? 'Chat' : 'Video'}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Duration:</span>
//                     <span className="info-value">{formatTime(timeElapsed)}</span>
//                   </div>
//                 </div>

//                 {/* Tips */}
//                 <div className="interview-tips">
//                   <h3>Quick Tips</h3>
//                   <ul>
//                     <li>✓ Speak clearly and confidently</li>
//                     <li>✓ Use the STAR method for behavioral questions</li>
//                     <li>✓ Take your time to think before answering</li>
//                     <li>✓ Maintain eye contact with the camera</li>
//                   </ul>
//                 </div>

//                 {/* End Interview Button */}
//                 <button className="end-interview-btn" onClick={endInterview}>
//                   End Interview
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../services/api";
import { getFeatureFlags } from "../config/featureFlags";
import { formatTime, deriveSpeechTip } from "../utils/interviewUtils";
// REMOVE THIS LINE: import { getAuthToken, getStoredUser, saveStoredUser } from "../utils/authStorage";
import { avatarCatalog, getFilteredAvatars } from "../data/avatars";
import AvatarFigure from "./AvatarFigure";
import FeedbackSidebar from "./FeedbackSidebar";
import PostureChecker from "./PostureChecker";
import SilentErrorBoundary from "../SilentErrorBoundary";
import "./interview.css";
import "./AvatarFigure.css";

// Add OpenAI configuration
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Add your API key to .env file
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const AVATAR_PACK_STORAGE_KEY = "avatarPackStyle";

const normalizeAvatarPackStyle = (rawStyle) => {
  if (rawStyle === "illustrated" || rawStyle === "emoji" || rawStyle === "premium") {
    return rawStyle;
  }
  return "premium";
};

const defaultPostureTuning = {
  confidenceMin: 62,
  centerMin: 0.16,
  balanceMax: 0.46,
  brightnessMin: 35,
  brightnessMax: 235,
  faceSizeMin: 0.15,
  faceSizeMax: 0.45
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizePostureTuning = (candidate = {}) => {
  const normalized = {
    confidenceMin: clamp(Number(candidate.confidenceMin ?? defaultPostureTuning.confidenceMin), 35, 90),
    centerMin: clamp(Number(candidate.centerMin ?? defaultPostureTuning.centerMin), 0.08, 0.32),
    balanceMax: clamp(Number(candidate.balanceMax ?? defaultPostureTuning.balanceMax), 0.2, 0.7),
    brightnessMin: clamp(Number(candidate.brightnessMin ?? defaultPostureTuning.brightnessMin), 10, 120),
    brightnessMax: clamp(Number(candidate.brightnessMax ?? defaultPostureTuning.brightnessMax), 150, 255),
    faceSizeMin: clamp(Number(candidate.faceSizeMin ?? defaultPostureTuning.faceSizeMin), 0.1, 0.3),
    faceSizeMax: clamp(Number(candidate.faceSizeMax ?? defaultPostureTuning.faceSizeMax), 0.3, 0.6)
  };

  if (normalized.brightnessMin >= normalized.brightnessMax) {
    normalized.brightnessMin = defaultPostureTuning.brightnessMin;
    normalized.brightnessMax = defaultPostureTuning.brightnessMax;
  }

  return normalized;
};

const clampScore = (value, min = 0, max = 100) => Math.min(Math.max(Math.round(value), min), max);

const summarizeGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B+";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
};

const buildSpeechCorrection = (rawText) => {
  const source = String(rawText || "").replace(/\s+/g, " ").trim();
  if (!source) return "";

  let corrected = source
    .replace(/\bi\b/g, "I")
    .replace(/\bgonna\b/gi, "going to")
    .replace(/\bwanna\b/gi, "want to")
    .replace(/\bgotta\b/gi, "got to")
    .replace(/\balot\b/gi, "a lot")
    .replace(/\b(uh|um|er|ah)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;!?])/g, "$1")
    .trim();

  if (corrected) {
    corrected = `${corrected.charAt(0).toUpperCase()}${corrected.slice(1)}`;
    if (!/[.!?]$/.test(corrected)) corrected = `${corrected}.`;
  }

  return corrected;
};

const tokenizeWords = (text) => String(text || "").trim().split(/\s+/).filter(Boolean);

const normalizeWord = (word) => String(word || "").toLowerCase().replace(/[^a-z0-9']/g, "");

const MAX_DIFF_WORDS = 180;
const MAX_DIFF_CELLS = 25000;

const buildCorrectedWordDiff = (originalText, correctedText) => {
  const originalWords = tokenizeWords(originalText).slice(0, MAX_DIFF_WORDS).map(normalizeWord).filter(Boolean);
  const correctedWords = tokenizeWords(correctedText).slice(0, MAX_DIFF_WORDS);
  const correctedComparable = correctedWords.map(normalizeWord);

  if (!correctedWords.length) return [];
  if (!originalWords.length) {
    return correctedWords.map((word) => ({ word, changed: false }));
  }

  if ((originalWords.length * correctedComparable.length) > MAX_DIFF_CELLS) {
    return correctedWords.map((word, index) => ({
      word,
      changed: normalizeWord(word) !== (originalWords[index] || ""),
    }));
  }

  const rows = originalWords.length;
  const cols = correctedComparable.length;
  const lcs = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));

  for (let row = 1; row <= rows; row += 1) {
    for (let col = 1; col <= cols; col += 1) {
      if (originalWords[row - 1] === correctedComparable[col - 1] && correctedComparable[col - 1]) {
        lcs[row][col] = lcs[row - 1][col - 1] + 1;
      } else {
        lcs[row][col] = Math.max(lcs[row - 1][col], lcs[row][col - 1]);
      }
    }
  }

  const unchangedCorrectedIndexes = new Set();
  let row = rows;
  let col = cols;
  while (row > 0 && col > 0) {
    if (originalWords[row - 1] === correctedComparable[col - 1] && correctedComparable[col - 1]) {
      unchangedCorrectedIndexes.add(col - 1);
      row -= 1;
      col -= 1;
    } else if (lcs[row - 1][col] >= lcs[row][col - 1]) {
      row -= 1;
    } else {
      col -= 1;
    }
  }

  return correctedWords.map((word, index) => ({
    word,
    changed: Boolean(correctedComparable[index]) && !unchangedCorrectedIndexes.has(index),
  }));
};

const buildInterviewReport = (entries, totalDurationSeconds, totalQuestionsAsked) => {
  const safeEntries = Array.isArray(entries) ? entries : [];
  const answered = safeEntries.length;

  if (!answered) {
    return {
      generatedAt: new Date().toISOString(),
      overview: {
        score: 0,
        grade: "D",
        questionsAttempted: 0,
        totalQuestions: totalQuestionsAsked || 0,
        timeSpentSeconds: totalDurationSeconds || 0,
      },
      speaking: {
        wordsPerMinute: 0,
        pauses: 0,
        fillerWords: 0,
        clarity: 0,
      },
      grammar: {
        score: 0,
        mistakes: 0,
      },
      categories: {
        technical: 0,
        behavioral: 0,
        communication: 0,
        problemSolving: 0,
        clarity: 0,
      },
      confidenceTimeline: [],
      questionAnalysis: [],
      feedback: {
        positive: ["Complete at least one answer to generate personalized strengths."],
        improvements: ["Answer with 3–4 clear sentences and include one measurable outcome."],
      },
    };
  }

  const overallScores = safeEntries.map((entry) => entry.verification?.overallScore ?? entry.stats?.score ?? 65);
  const relevanceScores = safeEntries.map((entry) => entry.verification?.relevanceScore ?? 65);
  const grammarScores = safeEntries.map((entry) => entry.verification?.grammarScore ?? 68);
  const grammarMistakes = safeEntries.reduce((count, entry) => count + (entry.grammarIssues?.length || 0), 0);

  const speechEntries = safeEntries.filter((entry) => entry.speechMetrics);
  const totalWpm = speechEntries.reduce((sum, entry) => sum + (entry.speechMetrics?.wordsPerMinute || 0), 0);
  const totalPauses = speechEntries.reduce((sum, entry) => sum + (entry.speechMetrics?.pauseCount || 0), 0);
  const totalFillers = speechEntries.reduce((sum, entry) => sum + (entry.speechMetrics?.fillerCount || 0), 0);

  const averageOverall = clampScore(overallScores.reduce((sum, value) => sum + value, 0) / answered);
  const averageGrammar = clampScore(grammarScores.reduce((sum, value) => sum + value, 0) / answered);
  const averageRelevance = clampScore(relevanceScores.reduce((sum, value) => sum + value, 0) / answered);
  const averageWpm = speechEntries.length ? clampScore(totalWpm / speechEntries.length) : 0;

  const questionAnalysis = safeEntries.map((entry, index) => {
    const score = clampScore(entry.verification?.overallScore ?? entry.stats?.score ?? 65);
    const improvements = [...(entry.improvements || [])].slice(0, 3);
    const strengths = [];

    if ((entry.verification?.relevanceScore ?? 0) >= 75) strengths.push("Stayed relevant to the asked question");
    if ((entry.verification?.grammarScore ?? 0) >= 75) strengths.push("Maintained solid grammar quality");
    if ((entry.stats?.wordCount ?? 0) >= 35) strengths.push("Provided enough detail in the response");
    if (strengths.length === 0) strengths.push("Attempted the question with clear intent");

    return {
      id: index + 1,
      question: entry.question || `Interview question ${index + 1}`,
      answer: entry.answer || "",
      score,
      feedback: entry.verification?.verdict || "Answer reviewed successfully.",
      strengths: strengths.slice(0, 3),
      improvements,
      correctnessLabel: entry.verification?.correctnessLabel || "needs-improvement",
    };
  });

  const confidenceTimeline = questionAnalysis.map((question, index) => ({
    minute: index + 1,
    level: question.score,
  }));

  const positive = [];
  const improvementSet = new Set();

  if (averageRelevance >= 75) positive.push("Answers were mostly aligned with each question.");
  if (averageGrammar >= 75) positive.push("Grammar quality stayed strong across responses.");
  if (averageOverall >= 75) positive.push("Overall interview communication was consistent.");
  if (speechEntries.length && totalFillers <= speechEntries.length * 2) positive.push("Filler words stayed controlled during speech responses.");
  if (positive.length === 0) positive.push("You stayed engaged and completed the interview flow.");

  safeEntries.forEach((entry) => {
    (entry.improvements || []).forEach((item) => {
      if (item) improvementSet.add(item);
    });
  });

  if (totalFillers > speechEntries.length * 2 && speechEntries.length) {
    improvementSet.add("Reduce filler words by pausing briefly before key points.");
  }
  if (averageRelevance < 70) {
    improvementSet.add("Stay closer to the interviewer question and include role-specific details.");
  }
  if (averageGrammar < 70) {
    improvementSet.add("Focus on shorter, complete sentences to improve grammar accuracy.");
  }

  return {
    generatedAt: new Date().toISOString(),
    overview: {
      score: averageOverall,
      grade: summarizeGrade(averageOverall),
      questionsAttempted: answered,
      totalQuestions: totalQuestionsAsked,
      timeSpentSeconds: totalDurationSeconds,
    },
    speaking: {
      wordsPerMinute: averageWpm,
      pauses: totalPauses,
      fillerWords: totalFillers,
      clarity: clampScore((averageOverall * 0.6) + (averageGrammar * 0.4)),
    },
    grammar: {
      score: averageGrammar,
      mistakes: grammarMistakes,
    },
    categories: {
      technical: averageRelevance,
      behavioral: clampScore((averageOverall * 0.7) + 12),
      communication: averageOverall,
      problemSolving: clampScore((averageRelevance * 0.8) + 10),
      clarity: clampScore((averageGrammar * 0.7) + (averageOverall * 0.3)),
    },
    confidenceTimeline,
    questionAnalysis,
    feedback: {
      positive: positive.slice(0, 4),
      improvements: [...improvementSet].slice(0, 5),
    },
  };
};

// Enhanced avatar data with more attractive options
const enhancedAvatars = [
  {
    id: "professional-1",
    name: "Sarah Chen",
    role: "Senior Technical Recruiter",
    avatar: "👩‍💼",
    image: "/avatars/sarah-chen.jpg",
    bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gender: "female",
    species: "human",
    style: "professional",
    description: "Expert in tech hiring with 8+ years at FAANG companies"
  },
  {
    id: "professional-2",
    name: "Marcus Wright",
    role: "Engineering Manager",
    avatar: "👨‍💼",
    image: "/avatars/marcus-wright.jpg",
    bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    gender: "male",
    species: "human",
    style: "professional",
    description: "Former Google Tech Lead specializing in system design"
  },
  {
    id: "professional-3",
    name: "Dr. Elena Rodriguez",
    role: "Behavioral Interview Specialist",
    avatar: "👩‍🔬",
    image: "/avatars/elena-rodriguez.jpg",
    bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    gender: "female",
    species: "human",
    style: "professional",
    description: "PhD in Organizational Psychology, 5000+ interviews conducted"
  },
  {
    id: "professional-4",
    name: "James O'Connor",
    role: "Startup Founder & Hiring Lead",
    avatar: "👨‍💻",
    image: "/avatars/james-oconnor.jpg",
    bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    gender: "male",
    species: "human",
    style: "professional",
    description: "Built 3 startups, hired 200+ engineers personally"
  },
  {
    id: "professional-5",
    name: "Priya Patel",
    role: "HR Director",
    avatar: "👩‍💼",
    image: "/avatars/priya-patel.jpg",
    bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    gender: "female",
    species: "human",
    style: "professional",
    description: "Global talent acquisition leader, specializes in cultural fit"
  },
  {
    id: "professional-6",
    name: "Alex Thompson",
    role: "Product Manager",
    avatar: "👨‍💼",
    image: "/avatars/alex-thompson.jpg",
    bgColor: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    gender: "male",
    species: "human",
    style: "professional",
    description: "Ex-Amazon PM, expert in product sense interviews"
  }
];

// Question cache to store generated questions per session
const questionCache = new Map();

export default function Interview() {
  const navigate = useNavigate();
  const location = useLocation();
  const planningSelections = useMemo(() => {
    const state = location.state;
    if (!state || typeof state !== "object") return {};
    return state;
  }, [location.state]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showAvatarSelect, setShowAvatarSelect] = useState(true);
  const [useChat, setUseChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewActive, setInterviewActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [autoVoiceInputEnabled, setAutoVoiceInputEnabled] = useState(() => {
    try {
      return localStorage.getItem("autoVoiceInputEnabled") !== "false";
    } catch {
      return true;
    }
  });
  const [aiVoiceEnabled, setAiVoiceEnabled] = useState(() => {
    try {
      return localStorage.getItem("aiVoiceEnabled") !== "false";
    } catch {
      return true;
    }
  });
  const [avatarPackStyle, setAvatarPackStyle] = useState(() => {
    try {
      return normalizeAvatarPackStyle(localStorage.getItem(AVATAR_PACK_STORAGE_KEY));
    } catch {
      return "premium";
    }
  });

  // Add state for dynamic questions
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const currentAvatarPackLabel =
    avatarPackStyle === "premium"
      ? "Premium"
      : avatarPackStyle === "illustrated"
        ? "Game Avatar"
        : "Emoji";
  
  const [isStartingInterview, setIsStartingInterview] = useState(false);
  const [startError, setStartError] = useState("");
  const [chatError, setChatError] = useState("");
  const [isListeningUser, setIsListeningUser] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [speechMetrics, setSpeechMetrics] = useState(null);
  const [sessionAnalyses, setSessionAnalyses] = useState([]);
  const [latestVerification, setLatestVerification] = useState(null);
  const [analysisTrigger, setAnalysisTrigger] = useState(0);
  const [isFetchingNextQuestion, setIsFetchingNextQuestion] = useState(false);
  const [postureFeedback, setPostureFeedback] = useState({ 
    status: "pending", 
    tips: [], 
    score: null, 
    statusMessage: "Run posture check for guidance." 
  });
  const [postureDebug, setPostureDebug] = useState({
    confidence: null,
    source: "idle",
    avgBrightness: null,
    centerEdgeRatio: null,
    horizontalBalance: null,
    hasDetail: null,
    faceDetected: null,
    faceSize: null
  });
  const [postureTuning, setPostureTuning] = useState(() => {
    try {
      const raw = localStorage.getItem("postureTuning");
      if (!raw) return defaultPostureTuning;
      const parsed = JSON.parse(raw);
      return normalizePostureTuning(parsed);
    } catch {
      return defaultPostureTuning;
    }
  });
  const [isPostureChecking, setIsPostureChecking] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [skipReason, setSkipReason] = useState("too hard");
  const [livePostureStatus, setLivePostureStatus] = useState({
    level: "idle",
    message: "Waiting for interview to start posture monitoring."
  });
  const [livePostureScore, setLivePostureScore] = useState(null);
  const [pendingAutoVoiceStart, setPendingAutoVoiceStart] = useState(false);
  const [isCorrectionCopied, setIsCorrectionCopied] = useState(false);

  // Auto-play 2 questions state
  const [autoPlayQuestionsCount] = useState(2);
  const [questionsAutoPlayed, setQuestionsAutoPlayed] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(() => {
    try {
      return localStorage.getItem("autoPlayEnabled") !== "false";
    } catch {
      return true;
    }
  });

  // Avatar posture state
  const [avatarPosture, setAvatarPosture] = useState("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  // Hover preview posture
  const [hoveredAvatarId, setHoveredAvatarId] = useState(null);
  // Feedback sidebar
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const [lastUserMessage, setLastUserMessage] = useState('');
  
  // REMOVED: userProfile state that used getStoredUser
  // Hardcoded user profile instead
  const [userProfile] = useState({
    industry: "Technology",
    name: "User"
  });
  
  const [interviewConfig, setInterviewConfig] = useState(() => {
    const selectedRole = planningSelections.role;
    const selectedDifficulty = planningSelections.difficulty?.name;
    const selectedType = planningSelections.type?.name;

    const difficultyMap = {
      Beginner: "beginner",
      Intermediate: "intermediate",
      Advanced: "advanced",
      Expert: "advanced",
    };

    const modeMap = {
      Technical: "technical",
      "System Design": "technical",
      Behavioral: "behavioral",
      Mixed: "balanced",
    };

    return {
      mode: modeMap[selectedType] || "balanced",
      difficulty: difficultyMap[selectedDifficulty] || "intermediate",
      questionCount: selectedType === "Mixed" ? 7 : 5,
      responseStyle: "coaching",
      targetRole: selectedRole || "Software Engineer",
      answerLength: "medium"
    };
  });

  const videoRef = useRef(null);
  const avatarModuleFrameRef = useRef(null);
  const postureVideoRef = useRef(null);
  const postureStreamRef = useRef(null);
  const chatContainerRef = useRef(null);
  const timerRef = useRef(null);
  const speakTimerRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const speechStartTimeRef = useRef(0);
  const recognitionFinalTranscriptRef = useRef("");
  const recognitionLatestTranscriptRef = useRef("");
  const isVoiceSubmittingRef = useRef(false);
  const sessionAnalysesRef = useRef([]);
  const postureMonitorTimerRef = useRef(null);
  const livePostureSamplesRef = useRef([]);
  const endInterviewLockRef = useRef(false);
  const endInterviewTimerRef = useRef(null);
  const startInterviewLockRef = useRef(false);
  const faceDetectionCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const totalQuestions = Math.min(Math.max(Number(interviewConfig.questionCount) || 5, 3), 10);
  const hasAiQuestion = messages.some((message) => message.sender === "ai");
  const displayedQuestionNumber = hasAiQuestion
    ? Math.min(Math.max(currentQuestion + 1, 1), totalQuestions)
    : 0;
  const progressPercent = totalQuestions > 0
    ? Math.min((displayedQuestionNumber / totalQuestions) * 100, 100)
    : 0;
  const roundedProgressPercent = Math.round(progressPercent);

  const latestAnalyzedEntry = useMemo(() => {
    for (let index = sessionAnalyses.length - 1; index >= 0; index -= 1) {
      if (sessionAnalyses[index]?.answer) return sessionAnalyses[index];
    }
    return null;
  }, [sessionAnalyses]);

  const speakingBoardText = useMemo(() => {
    return (liveTranscript || lastUserMessage || latestAnalyzedEntry?.answer || "").trim();
  }, [lastUserMessage, latestAnalyzedEntry, liveTranscript]);

  const correctedSpeakingText = useMemo(() => {
    return buildSpeechCorrection(speakingBoardText);
  }, [speakingBoardText]);

  const correctedWordDiff = useMemo(() => {
    if (!speakingBoardText || !correctedSpeakingText) return [];
    return buildCorrectedWordDiff(speakingBoardText, correctedSpeakingText);
  }, [correctedSpeakingText, speakingBoardText]);

  const latestGrammarHints = useMemo(() => {
    const issues = latestAnalyzedEntry?.grammarIssues || [];
    return issues
      .slice(0, 3)
      .map((issue) => issue?.rule)
      .filter(Boolean);
  }, [latestAnalyzedEntry]);

  const copyCorrectedText = useCallback(async () => {
    if (!correctedSpeakingText) return;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(correctedSpeakingText);
      } else {
        const tempArea = document.createElement("textarea");
        tempArea.value = correctedSpeakingText;
        tempArea.style.position = "fixed";
        tempArea.style.left = "-9999px";
        document.body.appendChild(tempArea);
        tempArea.focus();
        tempArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempArea);
      }
      setIsCorrectionCopied(true);
      window.setTimeout(() => setIsCorrectionCopied(false), 1400);
    } catch {
      setIsCorrectionCopied(false);
    }
  }, [correctedSpeakingText]);

  const selectedDomainName = planningSelections.domain?.name || "";
  const selectedDifficultyName = planningSelections.difficulty?.name || "";
  const selectedInterviewTypeName = planningSelections.type?.name || "";
  const embeddedAvatarRole = useMemo(() => {
    const mode = String(interviewConfig.mode || "").toLowerCase();
    const roleText = String(selectedAvatar?.role || "").toLowerCase();

    if (mode.includes("behavioral")) return "behavioral";
    if (mode.includes("system")) return "system-design";
    if (mode.includes("technical")) return "technical";
    if (/(architect|system\s*design)/i.test(roleText)) return "system-design";
    if (/(backend|frontend|engineer|tech|developer)/i.test(roleText)) return "technical";
    if (/(behavior|communication|culture|people)/i.test(roleText)) return "behavioral";

    return "hr";
  }, [interviewConfig.mode, selectedAvatar?.role]);

  const stopPostureStream = useCallback(() => {
    if (postureStreamRef.current) {
      postureStreamRef.current.getTracks().forEach((track) => track.stop());
      postureStreamRef.current = null;
    }
    if (postureVideoRef.current) {
      postureVideoRef.current.srcObject = null;
    }
  }, []);

  // Enhanced frame metrics with face detection
  const getFrameMetrics = useCallback(async (videoEl) => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return null;

    context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    let brightnessSum = 0;
    let edgeSum = 0;
    let leftEdge = 0;
    let centerEdge = 0;
    let rightEdge = 0;
    let topEdge = 0;
    let midEdge = 0;
    let bottomEdge = 0;

    for (let y = 1; y < canvas.height; y += 2) {
      for (let x = 1; x < canvas.width; x += 2) {
        const currentIndex = (y * canvas.width + x) * 4;
        const leftIndex = (y * canvas.width + (x - 1)) * 4;
        const topIndex = ((y - 1) * canvas.width + x) * 4;

        const luminance = 0.2126 * imageData[currentIndex] + 0.7152 * imageData[currentIndex + 1] + 0.0722 * imageData[currentIndex + 2];
        const luminanceLeft = 0.2126 * imageData[leftIndex] + 0.7152 * imageData[leftIndex + 1] + 0.0722 * imageData[leftIndex + 2];
        const luminanceTop = 0.2126 * imageData[topIndex] + 0.7152 * imageData[topIndex + 1] + 0.0722 * imageData[topIndex + 2];

        brightnessSum += luminance;
        const edgeValue = Math.abs(luminance - luminanceLeft) + Math.abs(luminance - luminanceTop);
        edgeSum += edgeValue;

        if (x < canvas.width / 3) leftEdge += edgeValue;
        else if (x < (2 * canvas.width) / 3) centerEdge += edgeValue;
        else rightEdge += edgeValue;

        if (y < canvas.height / 3) topEdge += edgeValue;
        else if (y < (2 * canvas.height) / 3) midEdge += edgeValue;
        else bottomEdge += edgeValue;
      }
    }

    const pixelCount = Math.floor((canvas.width - 1) * (canvas.height - 1) / 4);
    const avgBrightness = brightnessSum / pixelCount;
    const centerEdgeRatio = centerEdge / Math.max(edgeSum, 1);
    const horizontalBalance = Math.abs(leftEdge - rightEdge) / Math.max(leftEdge + rightEdge, 1);
    const topRatio = topEdge / Math.max(edgeSum, 1);
    const bottomRatio = bottomEdge / Math.max(edgeSum, 1);

    // Try to detect face using simple color-based detection
    let faceDetected = false;
    let faceSize = 0;
    
    const centerRegionSize = 100;
    const startX = Math.floor(canvas.width / 2 - centerRegionSize / 2);
    const startY = Math.floor(canvas.height / 2 - centerRegionSize / 2);
    let skinPixels = 0;
    
    for (let y = startY; y < startY + centerRegionSize && y < canvas.height; y += 4) {
      for (let x = startX; x < startX + centerRegionSize && x < canvas.width; x += 4) {
        const idx = (y * canvas.width + x) * 4;
        const r = imageData[idx];
        const g = imageData[idx + 1];
        const b = imageData[idx + 2];
        
        if (r > 60 && g > 40 && b > 20 && 
            r > g && r > b && 
            Math.abs(r - g) > 15) {
          skinPixels++;
        }
      }
    }
    
    const skinRatio = skinPixels / ((centerRegionSize / 4) * (centerRegionSize / 4));
    faceDetected = skinRatio > 0.3;
    faceSize = skinRatio;

    return {
      avgBrightness,
      centerEdgeRatio,
      horizontalBalance,
      topRatio,
      bottomRatio,
      hasDetail: edgeSum / pixelCount > 15,
      faceDetected,
      faceSize
    };
  }, []);

  // Function to generate dynamic questions using OpenAI
  const generateNextQuestion = useCallback(async (previousAnswers = []) => {
    if (!OPENAI_API_KEY) {
      console.warn("OpenAI API key not found. Using fallback questions.");
      return getFallbackQuestion();
    }

    setIsGeneratingQuestion(true);
    
    try {
      const domain = selectedDomainName || interviewConfig.targetRole || "general";
      const difficulty = interviewConfig.difficulty;
      const mode = interviewConfig.mode;
      
      // Build context from previous answers
      const previousContext = previousAnswers.length > 0 
        ? `Previous questions and answers:\n${previousAnswers.map((qa, idx) => 
            `Q${idx + 1}: ${qa.question}\nA: ${qa.answer.substring(0, 100)}...`
          ).join('\n')}`
        : "This is the first question.";

      const prompt = `You are an expert interviewer conducting a ${difficulty} level ${mode} interview for a ${domain} position.
      
      ${previousContext}
      
      Generate a relevant, challenging, and specific interview question that:
      1. Builds upon the previous answers (if any)
      2. Tests the candidate's knowledge of ${domain}
      3. Is appropriate for ${difficulty} level
      4. Encourages detailed, thoughtful responses
      5. Is unique and not repetitive
      
      The question should be professional, clear, and engaging. Return only the question text, no additional formatting or explanations.`;

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert technical interviewer. Generate professional, relevant interview questions."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 150,
          n: 1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const question = data.choices[0].message.content.trim();
      
      return question;
    } catch (error) {
      console.error("Error generating question:", error);
      return getFallbackQuestion();
    } finally {
      setIsGeneratingQuestion(false);
    }
  }, [selectedDomainName, interviewConfig.difficulty, interviewConfig.mode, interviewConfig.targetRole]);

  // Fallback questions in case API fails
  const getFallbackQuestion = useCallback(() => {
    const fallbackQuestions = {
      technical: [
        "Can you explain your experience with system design and architecture?",
        "How do you approach debugging complex issues in production?",
        "What's your experience with cloud platforms like AWS or Azure?",
        "How do you ensure code quality in your projects?",
        "Can you describe a challenging technical problem you solved?",
        "What's your approach to API design and documentation?",
        "How do you handle technical debt in your projects?",
        "Explain your experience with database optimization.",
        "How do you stay updated with new technologies?",
        "Describe your experience with agile methodologies."
      ],
      behavioral: [
        "Tell me about a time you had to handle a difficult team situation.",
        "How do you prioritize tasks when dealing with multiple deadlines?",
        "Describe a situation where you had to lead a project to success.",
        "How do you handle feedback and criticism?",
        "Tell me about a time you failed and what you learned.",
        "How do you collaborate with cross-functional teams?",
        "Describe your approach to mentoring junior team members.",
        "How do you handle conflicts in the workplace?",
        "Tell me about a time you had to make a difficult decision.",
        "How do you maintain work-life balance?"
      ],
      balanced: [
        "Can you describe your ideal work environment and why?",
        "What motivates you to perform at your best?",
        "Where do you see yourself in five years?",
        "Why are you interested in this role specifically?",
        "What's your greatest professional achievement?",
        "How do you handle stress and pressure?",
        "What are your career goals?",
        "Why should we hire you?",
        "What questions do you have for me?",
        "How do you define success in your role?"
      ]
    };

    const mode = interviewConfig.mode || "balanced";
    const questions = fallbackQuestions[mode] || fallbackQuestions.balanced;
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }, [interviewConfig.mode]);

  // Initialize questions at start of interview
  const initializeQuestions = useCallback(async () => {
    const initialQuestions = [];
    for (let i = 0; i < totalQuestions; i++) {
      const question = await generateNextQuestion(initialQuestions);
      initialQuestions.push(question);
    }
    setGeneratedQuestions(initialQuestions);
    return initialQuestions;
  }, [generateNextQuestion, totalQuestions]);

  const getVoiceProfile = useCallback((avatar) => {
    const isAnimalAvatar = avatar?.species === "animal";

    if (isAnimalAvatar) {
      return { rate: 1.04, pitch: 1.2 };
    }

    if (avatar?.gender === "female") {
      return { rate: 1.0, pitch: 1.12 };
    }

    return { rate: 0.97, pitch: 0.95 };
  }, []);

  const selectBestVoice = useCallback((avatar) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return null;
    }

    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const lowerName = (avatar?.name || "").toLowerCase();
    const preferredFemale = avatar?.gender === "female";

    const byName = voices.find((voice) => voice.name.toLowerCase().includes(lowerName));
    if (byName) return byName;

    if (preferredFemale) {
      return (
        voices.find((voice) => /female|samantha|aria|zira|serena|victoria/i.test(voice.name))
        || voices.find((voice) => /en/i.test(voice.lang))
        || voices[0]
      );
    }

    return voices.find((voice) => /en/i.test(voice.lang)) || voices[0];
  }, []);

  const speakAiMessage = useCallback((text, avatar) => {
    if (!aiVoiceEnabled || !text?.trim()) return;
    if (isListeningUser) return;
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = selectBestVoice(avatar);
    const profile = getVoiceProfile(avatar);

    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice?.lang || "en-US";
    utterance.rate = profile.rate;
    utterance.pitch = profile.pitch;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [aiVoiceEnabled, getVoiceProfile, isListeningUser, selectBestVoice]);

  const avatars = useMemo(() => enhancedAvatars, []);

  const renderAvatarChip = useCallback((avatar, className, sizeClass = "") => {
    if (avatarPackStyle === "premium" && avatar?.image) {
      return (
        <div className={`${className} premium-avatar-chip ${sizeClass}`.trim()}>
          <img
            src={avatar.image}
            alt={avatar.name}
            className="premium-avatar-image"
            loading="lazy"
          />
        </div>
      );
    }

    if (avatarPackStyle === "photo" && avatar?.image) {
      return (
        <img
          src={avatar.image}
          alt={`${avatar.name} profile`}
          className={`${className} ${sizeClass}`.trim()}
          loading="lazy"
        />
      );
    }

    if (avatarPackStyle === "illustrated") {
      return (
        <span className={`${className} avatar-illustrated-chip ${sizeClass}`.trim()} aria-hidden="true">
          🎨
        </span>
      );
    }

    return (
      <span className={className} aria-hidden="true">
        {avatar?.avatar || "🧑‍💼"}
      </span>
    );
  }, [avatarPackStyle]);

  const renderAvatarPreview = useCallback((avatar) => {
    if (avatarPackStyle === "premium" && avatar?.image) {
      return (
        <div className="premium-avatar-container">
          <img
            src={avatar.image}
            alt={avatar.name}
            className="premium-avatar-image-large"
            loading="lazy"
          />
          <div className="premium-avatar-glow"></div>
        </div>
      );
    }

    if (avatarPackStyle === "photo" && avatar?.image) {
      return (
        <img
          src={avatar.image}
          alt={`${avatar.name} avatar`}
          className="avatar-photo"
          loading="lazy"
        />
      );
    }

    if (avatarPackStyle === "emoji") {
      return (
        <span className="avatar-emoji-preview" aria-hidden="true">
          {avatar?.avatar || "🧑‍💼"}
        </span>
      );
    }

    return (
      <AvatarFigure
        avatar={avatar}
        isSpeaking={hoveredAvatarId === avatar?.id}
        posture={hoveredAvatarId === avatar?.id ? "speaking" : "idle"}
      />
    );
  }, [avatarPackStyle, hoveredAvatarId]);

  const renderInterviewerPanelAvatar = useCallback(() => {
    if (!selectedAvatar) return null;

    const canUseEmbeddedIframe = avatarPackStyle === "illustrated"
      && !(typeof process !== "undefined" && process.env?.NODE_ENV === "test");

    if (canUseEmbeddedIframe) {
      return (
        <iframe
          ref={avatarModuleFrameRef}
          key={`${selectedAvatar?.id}-${embeddedAvatarRole}`}
          title={`${selectedAvatar.name} 3D interviewer`}
          src={`/avatar-system/index.html?embed=1&role=${encodeURIComponent(embeddedAvatarRole)}`}
          className="ai-panel-3d-frame"
        />
      );
    }

    if (avatarPackStyle === "premium" && selectedAvatar.image) {
      return (
        <div className="premium-interviewer-container">
          <img
            src={selectedAvatar.image}
            alt={selectedAvatar.name}
            className={`premium-interviewer-image ${isSpeaking ? 'speaking' : ''} ${isAiTyping ? 'thinking' : ''}`}
            loading="lazy"
          />
          <div className="premium-interviewer-glow"></div>
          {isSpeaking && <div className="speaking-wave"></div>}
          {isAiTyping && <div className="thinking-dots"></div>}
        </div>
      );
    }

    if (avatarPackStyle === "photo" && selectedAvatar.image) {
      return (
        <img
          src={selectedAvatar.image}
          alt={`${selectedAvatar.name} avatar`}
          className="ai-panel-photo"
          loading="lazy"
        />
      );
    }

    if (avatarPackStyle === "emoji") {
      return (
        <div className="ai-panel-emoji" aria-hidden="true">
          {selectedAvatar.avatar || "🧑‍💼"}
        </div>
      );
    }

    return <AvatarFigure avatar={selectedAvatar} isSpeaking={isSpeaking} posture={avatarPosture} />;
  }, [avatarPackStyle, avatarPosture, embeddedAvatarRole, isAiTyping, isSpeaking, selectedAvatar]);

  const latestAiMessage = useMemo(
    () => messages.filter((m) => m.sender === "ai").slice(-1)[0]?.message || "",
    [messages]
  );

  const featureFlags = useMemo(() => getFeatureFlags(), []);

  // REMOVED: useEffect that used getAuthToken and API call
  // The avatar pack style sync effect is kept
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncAvatarPackFromStorage = () => {
      try {
        setAvatarPackStyle(normalizeAvatarPackStyle(localStorage.getItem(AVATAR_PACK_STORAGE_KEY)));
      } catch {
        setAvatarPackStyle("premium");
      }
    };

    syncAvatarPackFromStorage();
    window.addEventListener("storage", syncAvatarPackFromStorage);

    return () => {
      window.removeEventListener("storage", syncAvatarPackFromStorage);
    };
  }, []);

  useEffect(() => {
    if (avatarPackStyle !== "illustrated") return;
    const frameWindow = avatarModuleFrameRef.current?.contentWindow;
    if (!frameWindow) return;

    frameWindow.postMessage({ type: "SET_ROLE", role: embeddedAvatarRole }, "*");
  }, [avatarPackStyle, embeddedAvatarRole]);

  useEffect(() => {
    if (avatarPackStyle !== "illustrated") return;
    const frameWindow = avatarModuleFrameRef.current?.contentWindow;
    if (!frameWindow) return;

    const emotion = isAiTyping || avatarPosture === "thinking"
      ? "strict"
      : avatarPosture === "nodding"
        ? "impressed"
        : isSpeaking
          ? "friendly"
          : "neutral";

    frameWindow.postMessage({ type: "SET_EMOTION", emotion }, "*");
  }, [avatarPackStyle, avatarPosture, isAiTyping, isSpeaking]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("aiVoiceEnabled", String(aiVoiceEnabled));
    } catch {
      // ignore localStorage failures in private mode
    }

    if (!aiVoiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [aiVoiceEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem("autoVoiceInputEnabled", String(autoVoiceInputEnabled));
    } catch {
      // ignore localStorage failures
    }
  }, [autoVoiceInputEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem("autoPlayEnabled", String(autoPlayEnabled));
    } catch {
      // ignore localStorage failures
    }
  }, [autoPlayEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem("postureTuning", JSON.stringify(normalizePostureTuning(postureTuning)));
    } catch {
      // ignore localStorage failures
    }
  }, [postureTuning]);

  const createMessage = useCallback((sender, message, idOffset = 0) => ({
    id: Date.now() + idOffset,
    sender,
    message,
    timestamp: new Date().toLocaleTimeString()
  }), []);

  useEffect(() => {
    if (!showAvatarSelect) return;
    if (!planningSelections || Object.keys(planningSelections).length === 0) return;

    const selectedRole = planningSelections.role;
    const selectedDifficulty = planningSelections.difficulty?.name;
    const selectedType = planningSelections.type?.name;

    const difficultyMap = {
      Beginner: "beginner",
      Intermediate: "intermediate",
      Advanced: "advanced",
      Expert: "advanced",
    };

    const modeMap = {
      Technical: "technical",
      "System Design": "technical",
      Behavioral: "behavioral",
      Mixed: "balanced",
    };

    setInterviewConfig((prev) => ({
      ...prev,
      mode: modeMap[selectedType] || prev.mode,
      difficulty: difficultyMap[selectedDifficulty] || prev.difficulty,
      questionCount: selectedType === "Mixed" ? 7 : prev.questionCount,
      targetRole: selectedRole || prev.targetRole,
    }));
  }, [planningSelections, showAvatarSelect]);

  useEffect(() => {
    return () => {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (postureMonitorTimerRef.current) {
        clearInterval(postureMonitorTimerRef.current);
        postureMonitorTimerRef.current = null;
      }
      if (endInterviewTimerRef.current) {
        clearTimeout(endInterviewTimerRef.current);
        endInterviewTimerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopPostureStream();
    };
  }, [stopPostureStream]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Timer
  useEffect(() => {
    if (interviewActive) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [interviewActive]);

  const triggerSpeak = useCallback((durationMs = 3000) => {
    setAvatarPosture("speaking");
    setIsSpeaking(true);
    clearTimeout(speakTimerRef.current);
    speakTimerRef.current = setTimeout(() => {
      setIsSpeaking(false);
      setAvatarPosture("listening");
    }, durationMs);
  }, []);

  const triggerThinking = useCallback(() => {
    setAvatarPosture("thinking");
    setIsSpeaking(false);
  }, []);

  const appendSessionAnalysis = useCallback((entry) => {
    setSessionAnalyses((prev) => {
      const next = [...prev, entry];
      sessionAnalysesRef.current = next;
      return next;
    });
  }, []);

  const updateSessionAnalysis = useCallback((entryId, patch) => {
    setSessionAnalyses((prev) => {
      const next = prev.map((entry) => (
        entry.id === entryId
          ? { ...entry, ...patch }
          : entry
      ));
      sessionAnalysesRef.current = next;
      return next;
    });
  }, []);

  const triggerNod = useCallback(() => {
    setAvatarPosture("nodding");
    setTimeout(() => setAvatarPosture("listening"), 2000);
  }, []);

  const requestPermissions = async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setUseChat(true);
      return false;
    }

    const permissionTimeoutMs = 4500;

    try {
      const stream = await Promise.race([
        navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            aspectRatio: { ideal: 16 / 9 }
          },
          audio: true
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("permission-timeout")), permissionTimeoutMs))
      ]);

      if (videoRef.current) videoRef.current.srcObject = stream;
      setUseChat(false);
      return true;
    } catch {
      setUseChat(true);
      return false;
    }
  };

  // Modified startInterview to generate dynamic questions
  const startInterview = async (avatar) => {
    if (isStartingInterview || startInterviewLockRef.current) return;

    const safeAvatar = avatar || avatars[0] || null;
    if (!safeAvatar) {
      setStartError("No interviewers are available right now. Please refresh and try again.");
      return;
    }

    startInterviewLockRef.current = true;
    const interviewerName = String(safeAvatar?.name || "Interviewer").trim() || "Interviewer";
    const interviewerRole = String(safeAvatar?.role || "AI Interview Coach").trim() || "AI Interview Coach";

    setStartError("");
    setChatError("");
    setCurrentQuestion(0);
    setSessionAnalyses([]);
    sessionAnalysesRef.current = [];
    setLatestVerification(null);
    setSpeechMetrics(null);
    setLivePostureStatus({
      level: "pending",
      message: "Posture monitor starting…"
    });
    endInterviewLockRef.current = false;
    if (endInterviewTimerRef.current) {
      clearTimeout(endInterviewTimerRef.current);
      endInterviewTimerRef.current = null;
    }
    setLivePostureScore(null);
    setIsStartingInterview(true);

    try {
      setSelectedAvatar(safeAvatar);
      setShowAvatarSelect(false);

      const hasMediaAccess = await requestPermissions();
      if (!hasMediaAccess) {
        setStartError("Started in chat mode because camera/microphone access is unavailable.");
      }
      
      // Generate dynamic questions before starting
      const questions = await initializeQuestions();
      
      setInterviewActive(true);
      triggerThinking();

      try {
        const response = await API.post("/interview/start", {
          avatar: { name: interviewerName },
          role: interviewerRole,
          config: interviewConfig,
          selections: planningSelections,
          industry: userProfile?.industry || "",
          promptMode: featureFlags.experimentalPrompts ? "experimental" : "standard"
        });
        
        // Use first generated question instead of static greeting
        const firstQuestion = questions[0] || response.data.message || `Hello! I'm ${interviewerName}, your ${interviewerRole}. Let's begin. ${getFallbackQuestion()}`;
        setMessages([createMessage("ai", firstQuestion)]);
        speakAiMessage(firstQuestion, safeAvatar);
        const greetingDuration = Math.max(3000, Math.min(firstQuestion.length * 70, 8000));
        triggerSpeak(greetingDuration);
        setTimeout(() => setPendingAutoVoiceStart(true), greetingDuration + 500);
      } catch {
        setStartError("Connected in fallback mode. Some AI features may be limited right now.");
        const firstQuestion = questions[0] || `Hello! I'm ${interviewerName}, your ${interviewerRole}. Let's begin. ${getFallbackQuestion()}`;
        setMessages([createMessage("ai", firstQuestion)]);
        speakAiMessage(firstQuestion, safeAvatar);
        const greetingDuration = Math.max(3000, Math.min(firstQuestion.length * 70, 8000));
        triggerSpeak(greetingDuration);
        setTimeout(() => setPendingAutoVoiceStart(true), greetingDuration + 500);
      }
    } catch {
      setStartError("Could not start interview right now. Please try again.");
      setShowAvatarSelect(true);
      setInterviewActive(false);
    } finally {
      setIsStartingInterview(false);
      startInterviewLockRef.current = false;
    }
  };

  const scheduleInterviewEnd = (delayMs = 3200) => {
    if (endInterviewLockRef.current) return;
    if (endInterviewTimerRef.current) {
      clearTimeout(endInterviewTimerRef.current);
    }

    endInterviewTimerRef.current = setTimeout(() => {
      endInterviewTimerRef.current = null;
      endInterview();
    }, delayMs);
  };

  // Modified submitMessage to use generated questions
  const submitMessage = async (messageText, metadata = {}) => {
    const trimmedMessage = (messageText || "").trim();
    if (!trimmedMessage || !selectedAvatar) return;
    if (currentQuestion >= totalQuestions) {
      setChatError("Interview question limit reached. Finishing session…");
      scheduleInterviewEnd(1200);
      return;
    }
    const latestQuestion = latestAiMessage;
    const analysisId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setChatError("");

    const userMsg = createMessage("user", trimmedMessage);
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setLastUserMessage(trimmedMessage);
    setAnalysisTrigger((prev) => prev + 1);

    // Store answer for context in next question generation
    const currentAnswer = {
      question: latestQuestion,
      answer: trimmedMessage
    };

    appendSessionAnalysis({
      id: analysisId,
      question: latestQuestion,
      answer: trimmedMessage,
      verification: null,
      grammarIssues: [],
      improvements: [],
      topics: [],
      stats: null,
      speechMetrics: metadata.speechMetrics || null,
      inputSource: metadata.source || "text",
      createdAt: new Date().toISOString(),
      pendingAnalysis: true,
    });

    API.post("/interview/analyze", {
      message: trimmedMessage,
      question: latestQuestion
    })
      .then((analysisRes) => {
        const payload = analysisRes.data || {};
        if (payload.verification) {
          setLatestVerification(payload.verification);
        }

        updateSessionAnalysis(analysisId, {
          verification: payload.verification || null,
          grammarIssues: payload.grammarIssues || [],
          improvements: payload.improvements || [],
          topics: payload.topics || [],
          stats: payload.stats || null,
          pendingAnalysis: false,
        });
      })
      .catch(() => {
        updateSessionAnalysis(analysisId, {
          verification: null,
          grammarIssues: [],
          improvements: [],
          topics: [],
          stats: null,
          pendingAnalysis: false,
        });
      });

    triggerThinking();
    setIsAiTyping(true);

    try {
      // Get next question from generated questions or generate new one
      let nextQuestion;
      if (currentQuestion + 1 < generatedQuestions.length) {
        nextQuestion = generatedQuestions[currentQuestion + 1];
      } else {
        // Generate new question based on previous answers
        const previousAnswers = sessionAnalysesRef.current.map(a => ({
          question: a.question,
          answer: a.answer
        }));
        nextQuestion = await generateNextQuestion(previousAnswers);
        setGeneratedQuestions(prev => [...prev, nextQuestion]);
      }

      // Use API response but override with our dynamic question
      const response = await API.post("/interview/chat", {
        message: trimmedMessage,
        avatar: { name: selectedAvatar.name },
        role: selectedAvatar.role,
        questionCount: Math.min(currentQuestion + 1, totalQuestions),
        config: interviewConfig,
        selections: planningSelections,
        industry: userProfile?.industry || "",
        promptMode: featureFlags.experimentalPrompts ? "experimental" : "standard"
      });

      const aiMsg = createMessage("ai", nextQuestion || response.data.response, 1);
      setMessages(prev => [...prev, aiMsg]);
      setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions));
      speakAiMessage(nextQuestion || response.data.response, selectedAvatar);

      triggerNod();
      const speakDuration = Math.max(2000, Math.min((nextQuestion || response.data.response).length * 70, 8000));
      setTimeout(() => triggerSpeak(speakDuration), 800);
      
      setTimeout(() => setPendingAutoVoiceStart(true), speakDuration + 500);

      if (response.data.isComplete || currentQuestion + 1 >= totalQuestions) {
        scheduleInterviewEnd(3500);
      }

      if (autoPlayEnabled && questionsAutoPlayed < autoPlayQuestionsCount && currentQuestion + 1 < totalQuestions) {
        const autoPlayDelayMs = 3500 + speakDuration;
        setTimeout(async () => {
          setQuestionsAutoPlayed((prev) => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 300));
          await requestNextQuestion();
        }, autoPlayDelayMs);
      }
    } catch {
      setChatError("Network issue detected. Responses may be delayed.");
      const fallback = createMessage("ai", "I'm having a little trouble. Please continue.", 1);
      setMessages(prev => [...prev, fallback]);
      speakAiMessage(fallback.message, selectedAvatar);
      triggerSpeak(2500);
      setTimeout(() => setPendingAutoVoiceStart(true), 3000);
    } finally {
      setIsAiTyping(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await submitMessage(inputMessage);
  };

  // Modified requestNextQuestion to use generated questions
  const requestNextQuestion = async () => {
    if (isAiTyping || isFetchingNextQuestion || !selectedAvatar) return;
    if (currentQuestion >= totalQuestions) {
      setChatError("You have reached the configured number of questions.");
      scheduleInterviewEnd(1200);
      return;
    }

    setChatError("");
    setIsFetchingNextQuestion(true);
    setIsAiTyping(true);
    triggerThinking();

    const skipLabel = {
      "too hard": "Too hard",
      clarification: "Need clarification",
      repeated: "Already answered",
      timing: "Time management"
    }[skipReason] || "Need to skip";

    const userPrompt = createMessage("user", `Skip current question (${skipLabel}). Next question, please.`);
    setMessages((prev) => [...prev, userPrompt]);

    try {
      // Get next question from generated questions or generate new one
      let nextQuestion;
      if (currentQuestion + 1 < generatedQuestions.length) {
        nextQuestion = generatedQuestions[currentQuestion + 1];
      } else {
        const previousAnswers = sessionAnalysesRef.current.map(a => ({
          question: a.question,
          answer: a.answer
        }));
        nextQuestion = await generateNextQuestion(previousAnswers);
        setGeneratedQuestions(prev => [...prev, nextQuestion]);
      }

      const response = await API.post("/interview/chat", {
        message: `next question please. reason: ${skipReason}`,
        avatar: { name: selectedAvatar.name },
        role: selectedAvatar.role,
        questionCount: Math.min(currentQuestion + 1, totalQuestions),
        config: interviewConfig,
        selections: planningSelections,
        industry: userProfile?.industry || "",
        promptMode: featureFlags.experimentalPrompts ? "experimental" : "standard"
      });

      const aiMsg = createMessage("ai", nextQuestion || response.data.response, 1);
      setMessages((prev) => [...prev, aiMsg]);
      setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions));
      speakAiMessage(nextQuestion || response.data.response, selectedAvatar);
      triggerNod();
      const speakDuration = Math.max(2000, Math.min((nextQuestion || response.data.response).length * 70, 8000));
      setTimeout(() => triggerSpeak(speakDuration), 700);
      setTimeout(() => setPendingAutoVoiceStart(true), speakDuration + 500);

      if (response.data.isComplete || currentQuestion + 1 >= totalQuestions) {
        scheduleInterviewEnd(3200);
      }
    } catch {
      setChatError("Could not fetch the next question. Please try again.");
    } finally {
      setIsAiTyping(false);
      setIsFetchingNextQuestion(false);
    }
  };

  const endInterview = useCallback(() => {
    if (endInterviewLockRef.current) return;
    endInterviewLockRef.current = true;

    setInterviewActive(false);
    clearInterval(timerRef.current);
    clearTimeout(speakTimerRef.current);
    if (endInterviewTimerRef.current) {
      clearTimeout(endInterviewTimerRef.current);
      endInterviewTimerRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListeningUser(false);
    }
    setIsSpeaking(false);
    setAvatarPosture("idle");
    if (postureMonitorTimerRef.current) {
      clearInterval(postureMonitorTimerRef.current);
      postureMonitorTimerRef.current = null;
    }

    let summaryPayload = null;
    let reportPayload = null;

    try {
      const finalAnalyses = sessionAnalysesRef.current.length ? sessionAnalysesRef.current : sessionAnalyses;
      const report = buildInterviewReport(finalAnalyses, timeElapsed, totalQuestions);
      const summary = {
        sessionId: `${Date.now()}`,
        completedAt: new Date().toISOString(),
        interviewer: selectedAvatar?.name,
        role: selectedAvatar?.role,
        mode: useChat ? "Chat" : "Video",
        durationSeconds: timeElapsed,
        questionsAnswered: finalAnalyses.length,
        config: interviewConfig,
        industry: userProfile?.industry || ""
      };

      localStorage.setItem("latestInterviewSummary", JSON.stringify(summary));
      localStorage.setItem("latestInterviewReport", JSON.stringify(report));

      summaryPayload = summary;
      reportPayload = report;
    } catch {
      // ignore localStorage failures
    }

    const persistPromise = summaryPayload && reportPayload
      ? API.post("/interview/session", {
          summary: summaryPayload,
          report: reportPayload,
          selections: planningSelections,
        })
          .then(() => "saved")
          .catch(() => "failed")
      : Promise.resolve("failed");

    persistPromise.then((dbSaveStatus) => {
      try {
        localStorage.setItem("latestInterviewDbSaveStatus", dbSaveStatus);
      } catch {
        // ignore localStorage failures
      }

      navigate("/results", {
        state: {
          dbSaveStatus,
        },
      });
    });
  }, [
    planningSelections,
    interviewConfig,
    navigate,
    selectedAvatar?.name,
    selectedAvatar?.role,
    sessionAnalyses,
    timeElapsed,
    totalQuestions,
    useChat,
    userProfile?.industry,
  ]);

  const toggleMute = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getAudioTracks();
      tracks.forEach(t => (t.enabled = isMuted));
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getVideoTracks();
      tracks.forEach(t => (t.enabled = isVideoOff));
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleAiVoice = () => {
    setAiVoiceEnabled((prev) => !prev);
  };

  const toggleAutoVoiceInput = () => {
    setAutoVoiceInputEnabled((prev) => !prev);
  };

  const analyzeSpeechDelivery = useCallback((text, elapsedSeconds) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const minutes = Math.max(elapsedSeconds / 60, 0.15);
    const wordsPerMinute = Math.round(wordCount / minutes);
    const fillerMatches = text.match(/\b(um|uh|like|you know|actually|basically)\b/gi) || [];
    const pauseCount = (text.match(/[,;:]/g) || []).length;

    const nextMetrics = {
      wordsPerMinute,
      fillerCount: fillerMatches.length,
      pauseCount,
      tip: deriveSpeechTip(wordsPerMinute, fillerMatches.length, pauseCount)
    };

    setSpeechMetrics(nextMetrics);
    return nextMetrics;
  }, []);

  const toggleVoiceInput = (options = {}) => {
    const { switchToChat = false } = options;

    if (switchToChat && !useChat) {
      setUseChat(true);
    }

    if (typeof window === "undefined") {
      setChatError("Voice input is not supported in this browser.");
      return;
    }

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setChatError("Speech recognition is unavailable. Try Chrome or Edge.");
      return;
    }

    if (isListeningUser) {
      speechRecognitionRef.current?.stop();
      setIsListeningUser(false);
      setLiveTranscript("");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    speechStartTimeRef.current = Date.now();
    recognitionFinalTranscriptRef.current = "";
    recognitionLatestTranscriptRef.current = "";
    setChatError("");

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    recognition.onstart = () => {
      setIsListeningUser(true);
      setLiveTranscript("");
      setAvatarPosture("listening");
      setIsSpeaking(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const text = event.results[index][0]?.transcript || "";
        if (event.results[index].isFinal) {
          recognitionFinalTranscriptRef.current = `${recognitionFinalTranscriptRef.current} ${text}`.trim();
        } else {
          interimTranscript += text;
        }
      }

      const mergedTranscript = `${recognitionFinalTranscriptRef.current} ${interimTranscript}`.trim();
      recognitionLatestTranscriptRef.current = mergedTranscript;
      setLiveTranscript(mergedTranscript);
      setInputMessage(mergedTranscript);
    };

    recognition.onerror = (event) => {
      setIsListeningUser(false);
      setLiveTranscript("");
      const errorCode = event?.error;
      if (errorCode === "not-allowed" || errorCode === "service-not-allowed") {
        setChatError("Microphone access is blocked. Allow mic permission and try again.");
        return;
      }
      if (errorCode === "no-speech") {
        setChatError("No speech detected. Speak clearly and try again.");
        return;
      }
      setChatError("Voice capture failed. Please try speaking again.");
    };

    recognition.onend = () => {
      setIsListeningUser(false);
      const elapsedSeconds = Math.max((Date.now() - speechStartTimeRef.current) / 1000, 1);
      const finalTranscript = (
        recognitionFinalTranscriptRef.current.trim()
        || recognitionLatestTranscriptRef.current.trim()
        || inputMessage.trim()
      );

      if (!finalTranscript) {
        setLiveTranscript("");
        setChatError("No speech captured. Tap Speak and try again in a quieter environment.");
        return;
      }

      setInputMessage(finalTranscript);
      setLiveTranscript(finalTranscript);
      const liveSpeechMetrics = analyzeSpeechDelivery(finalTranscript, elapsedSeconds);

      if (interviewActive && !isAiTyping && !isVoiceSubmittingRef.current) {
        isVoiceSubmittingRef.current = true;
        submitMessage(finalTranscript, { source: "speech", speechMetrics: liveSpeechMetrics }).finally(() => {
          isVoiceSubmittingRef.current = false;
          setLiveTranscript("");
        });
      }
    };

    speechRecognitionRef.current = recognition;
    recognition.start();

    if (navigator.permissions?.query) {
      navigator.permissions.query({ name: "microphone" })
        .then((status) => {
          if (status?.state === "denied") {
            setChatError("Microphone access is blocked. Allow mic permission and try again.");
            recognition.stop();
          }
        })
        .catch(() => {
          // ignore permissions API read failures
        });
    }
  };

  useEffect(() => {
    if (!autoVoiceInputEnabled || !pendingAutoVoiceStart) return;
    if (!interviewActive || isAiTyping || isSpeaking || isListeningUser || isStartingInterview) return;

    const autoVoiceTimer = setTimeout(() => {
      setPendingAutoVoiceStart(false);
      toggleVoiceInput({ switchToChat: false });
    }, 800);

    return () => clearTimeout(autoVoiceTimer);
  }, [
    autoVoiceInputEnabled,
    pendingAutoVoiceStart,
    interviewActive,
    isAiTyping,
    isSpeaking,
    isListeningUser,
    isStartingInterview,
  ]);

  // Enhanced posture check with better detection
  const runPostureCheck = async () => {
    setIsPostureChecking(true);
    setPostureFeedback({ 
      status: "checking", 
      tips: ["Checking camera framing and posture..."], 
      score: null, 
      statusMessage: "Analyzing posture..." 
    });
    setPostureDebug({
      confidence: null,
      source: "analyzing",
      avgBrightness: null,
      centerEdgeRatio: null,
      horizontalBalance: null,
      hasDetail: null,
      faceDetected: null,
      faceSize: null
    });

    const updateDebugSnapshot = (source, metrics, confidence) => {
      setPostureDebug({
        confidence: Number.isFinite(confidence) ? Math.round(confidence) : null,
        source,
        avgBrightness: Number.isFinite(metrics?.avgBrightness) ? Math.round(metrics.avgBrightness) : null,
        centerEdgeRatio: Number.isFinite(metrics?.centerEdgeRatio) ? Number(metrics.centerEdgeRatio.toFixed(2)) : null,
        horizontalBalance: Number.isFinite(metrics?.horizontalBalance) ? Number(metrics.horizontalBalance.toFixed(2)) : null,
        hasDetail: typeof metrics?.hasDetail === "boolean" ? metrics.hasDetail : null,
        faceDetected: typeof metrics?.faceDetected === "boolean" ? metrics.faceDetected : null,
        faceSize: typeof metrics?.faceSize === "number" ? Number(metrics.faceSize.toFixed(2)) : null
      });
    };

    const evaluateFramePresence = async () => {
      const videoEl = postureVideoRef.current;
      const videoWidth = videoEl?.videoWidth || 0;
      const videoHeight = videoEl?.videoHeight || 0;
      
      if (!videoEl || videoWidth < 40 || videoHeight < 40) {
        return { metrics: null, personLikely: false, confidenceScore: 0 };
      }

      let metrics = null;
      try {
        metrics = await getFrameMetrics(videoEl);
      } catch {
        metrics = null;
      }

      if (!metrics) {
        return { metrics: null, personLikely: false, confidenceScore: 0 };
      }

      const brightnessConfidence = 1 - Math.min(Math.abs(metrics.avgBrightness - 130) / 130, 1);
      const centerConfidence = Math.min(metrics.centerEdgeRatio / 0.28, 1);
      const balanceConfidence = 1 - Math.min(metrics.horizontalBalance / 0.6, 1);
      const detailConfidence = metrics.hasDetail ? 1 : 0;
      const faceConfidence = metrics.faceDetected ? 0.8 : 0.2;
      const faceSizeConfidence = metrics.faceSize ? 
        Math.min(metrics.faceSize / 0.4, 1) : 0.3;

      const confidenceScore = (
        detailConfidence * 0.25 +
        brightnessConfidence * 0.15 +
        centerConfidence * 0.2 +
        balanceConfidence * 0.15 +
        faceConfidence * 0.15 +
        faceSizeConfidence * 0.1
      ) * 100;

      const confidenceBuffer = Math.max(6, Math.min(10, Math.round((100 - postureTuning.confidenceMin) * 0.2)));
      const brightnessWithinRange =
        metrics.avgBrightness > postureTuning.brightnessMin &&
        metrics.avgBrightness < postureTuning.brightnessMax;
      const centeredEnough = metrics.centerEdgeRatio >= postureTuning.centerMin;
      const balancedEnough = metrics.horizontalBalance <= postureTuning.balanceMax;
      const faceVisible = metrics.faceDetected;

      const personLikely =
        confidenceScore >= (postureTuning.confidenceMin - confidenceBuffer) &&
        (metrics.hasDetail || faceVisible) &&
        brightnessWithinRange &&
        centeredEnough &&
        balancedEnough;

      return { metrics, personLikely, confidenceScore };
    };

    try {
      stopPostureStream();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 16 / 9 }
        },
        audio: false
      });
      
      postureStreamRef.current = stream;
      if (postureVideoRef.current) {
        postureVideoRef.current.srcObject = stream;
        try {
          await postureVideoRef.current.play();
        } catch {
          console.debug("Posture video autoplay encountered permission delay");
        }
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const tips = [];
      let posturePenalty = 0;
      
      const { metrics, personLikely, confidenceScore } = await evaluateFramePresence();
      updateDebugSnapshot(personLikely ? "frame-detected" : "frame-miss", metrics, confidenceScore);

      if (!metrics) {
        tips.push("Unable to analyze camera feed. Ensure webcam is working properly.");
        posturePenalty += 25;
      } else {
        if (!metrics.faceDetected) {
          tips.push("Position your face clearly in the camera frame for better posture detection.");
          posturePenalty += 20;
        }

        if (metrics.avgBrightness < postureTuning.brightnessMin) {
          tips.push("Increase lighting on your face for better visibility.");
          posturePenalty += 15;
        } else if (metrics.avgBrightness > postureTuning.brightnessMax) {
          tips.push("Reduce harsh lighting or move away from direct light sources.");
          posturePenalty += 10;
        }

        if (metrics.centerEdgeRatio < postureTuning.centerMin) {
          tips.push("Center your face in the frame for optimal eye contact.");
          posturePenalty += 15;
        }

        if (metrics.horizontalBalance > postureTuning.balanceMax) {
          tips.push("Straighten your position - you're leaning to one side.");
          posturePenalty += 12;
        }

        if (metrics.topRatio > 0.48) {
          tips.push("Lower your camera slightly - it's too high.");
          posturePenalty += 8;
        } else if (metrics.bottomRatio > 0.46) {
          tips.push("Raise your camera to eye level for better posture.");
          posturePenalty += 8;
        }

        if (metrics.faceSize < 0.15) {
          tips.push("Move closer to the camera so your face is clearly visible.");
          posturePenalty += 15;
        } else if (metrics.faceSize > 0.45) {
          tips.push("Move slightly back - you're too close to the camera.");
          posturePenalty += 8;
        }
      }

      if (tips.length === 0) {
        tips.push("Excellent posture! Keep your shoulders relaxed and back straight.");
        tips.push("Maintain this setup throughout the interview.");
      } else {
        tips.push("Sit up straight with shoulders relaxed.");
        tips.push("Keep your chin parallel to the floor.");
        if (tips.length < 3) {
          tips.push("Place both feet flat on the floor for stability.");
        }
      }

      const postureScore = Math.max(40, 100 - posturePenalty);
      const statusMessage = postureScore >= 85
        ? "✅ Excellent posture! You're interview-ready."
        : postureScore >= 70
          ? "👍 Good posture. Apply the quick fixes below for best impact."
          : "⚠️ Posture needs improvement. Re-check after adjusting your setup.";

      setPostureFeedback({ 
        status: "ready", 
        tips: tips.slice(0, 5), 
        score: postureScore, 
        statusMessage 
      });
      
    } catch (error) {
      console.error("Posture check error:", error);
      setPostureDebug({
        confidence: 0,
        source: "error",
        avgBrightness: null,
        centerEdgeRatio: null,
        horizontalBalance: null,
        hasDetail: null,
        faceDetected: null,
        faceSize: null
      });
      setPostureFeedback({
        status: "error",
        score: 0,
        statusMessage: "Could not assess posture automatically. Please check camera permissions.",
        tips: [
          "Ensure your camera is connected and permissions are granted.",
          "Sit upright with shoulders back and face clearly visible.",
          "Position camera at eye level with good lighting.",
          "Click 'Check My Posture' again once setup is complete."
        ]
      });
    } finally {
      setIsPostureChecking(false);
      stopPostureStream();
    }
  };

  useEffect(() => {
    if (!interviewActive) {
      setLivePostureStatus({
        level: "idle",
        message: "Waiting for interview to start posture monitoring."
      });
      setLivePostureScore(null);
      livePostureSamplesRef.current = [];
      return;
    }

    if (useChat) {
      setLivePostureStatus({
        level: "paused",
        message: "Posture monitoring is paused in chat mode."
      });
      setLivePostureScore(null);
      return;
    }

    if (isVideoOff) {
      setLivePostureStatus({
        level: "paused",
        message: "Turn camera on to continue posture monitoring."
      });
      setLivePostureScore(null);
      return;
    }

    const evaluateLivePosture = async () => {
      const videoEl = videoRef.current;
      if (!videoEl || !videoEl.srcObject || videoEl.videoWidth < 40 || videoEl.videoHeight < 40) {
        setLivePostureStatus({
          level: "pending",
          message: "Waiting for camera feed to stabilize."
        });
        setLivePostureScore(null);
        return;
      }

      const metrics = await getFrameMetrics(videoEl);
      if (!metrics) {
        setLivePostureStatus({
          level: "pending",
          message: "Collecting posture data…"
        });
        setLivePostureScore(null);
        return;
      }

      livePostureSamplesRef.current = [...livePostureSamplesRef.current, metrics].slice(-3);
      const sampleCount = livePostureSamplesRef.current.length;
      const averaged = livePostureSamplesRef.current.reduce((acc, sample) => ({
        avgBrightness: acc.avgBrightness + sample.avgBrightness,
        centerEdgeRatio: acc.centerEdgeRatio + sample.centerEdgeRatio,
        horizontalBalance: acc.horizontalBalance + sample.horizontalBalance,
        topRatio: acc.topRatio + sample.topRatio,
        bottomRatio: acc.bottomRatio + sample.bottomRatio,
        hasDetailVotes: acc.hasDetailVotes + (sample.hasDetail ? 1 : 0),
        faceDetectedVotes: acc.faceDetectedVotes + (sample.faceDetected ? 1 : 0),
        faceSize: acc.faceSize + sample.faceSize,
      }), {
        avgBrightness: 0,
        centerEdgeRatio: 0,
        horizontalBalance: 0,
        topRatio: 0,
        bottomRatio: 0,
        hasDetailVotes: 0,
        faceDetectedVotes: 0,
        faceSize: 0
      });

      const stabilizedMetrics = {
        avgBrightness: averaged.avgBrightness / sampleCount,
        centerEdgeRatio: averaged.centerEdgeRatio / sampleCount,
        horizontalBalance: averaged.horizontalBalance / sampleCount,
        topRatio: averaged.topRatio / sampleCount,
        bottomRatio: averaged.bottomRatio / sampleCount,
        hasDetail: averaged.hasDetailVotes >= Math.ceil(sampleCount / 2),
        faceDetected: averaged.faceDetectedVotes >= Math.ceil(sampleCount / 2),
        faceSize: averaged.faceSize / sampleCount
      };

      const inRangeBrightness = stabilizedMetrics.avgBrightness > postureTuning.brightnessMin && 
                               stabilizedMetrics.avgBrightness < postureTuning.brightnessMax;
      const centered = stabilizedMetrics.centerEdgeRatio >= postureTuning.centerMin;
      const balanced = stabilizedMetrics.horizontalBalance <= postureTuning.balanceMax;
      const cameraLow = stabilizedMetrics.bottomRatio > 0.46;
      const cameraHigh = stabilizedMetrics.topRatio > 0.48;
      const faceVisible = stabilizedMetrics.faceDetected;
      const faceSizeGood = stabilizedMetrics.faceSize >= 0.15 && stabilizedMetrics.faceSize <= 0.45;

      const centerGap = centered
        ? 0
        : Math.min((postureTuning.centerMin - stabilizedMetrics.centerEdgeRatio) / Math.max(postureTuning.centerMin, 0.01), 1);
      const balanceGap = balanced
        ? 0
        : Math.min((stabilizedMetrics.horizontalBalance - postureTuning.balanceMax) / 0.4, 1);

      const penalties = [
        !stabilizedMetrics.hasDetail ? 12 : 0,
        !inRangeBrightness ? 15 : 0,
        !faceVisible ? 20 : 0,
        !faceSizeGood ? 12 : 0,
        Math.round(centerGap * 18),
        Math.round(balanceGap * 14),
        cameraLow ? 8 : 0,
        cameraHigh ? 8 : 0,
      ];

      const score = clampScore(100 - penalties.reduce((sum, value) => sum + value, 0), 20, 100);
      setLivePostureScore(score);

      const goodPosture = stabilizedMetrics.hasDetail && 
                          inRangeBrightness && 
                          centered && 
                          balanced && 
                          !cameraLow && 
                          !cameraHigh &&
                          faceVisible &&
                          faceSizeGood;

      if (goodPosture) {
        setLivePostureStatus({
          level: "good",
          message: "Great posture and framing. Keep this setup."
        });
        return;
      }

      let message = "Adjust posture for better interview framing.";
      if (!faceVisible) message = "Position your face clearly in the camera frame.";
      else if (!inRangeBrightness) message = "Adjust lighting for clearer visibility.";
      else if (!centered) message = "Center your face in the camera frame.";
      else if (!balanced) message = "Align yourself straight in front of the camera.";
      else if (!faceSizeGood) message = "Adjust your distance from the camera.";
      else if (cameraLow) message = "Raise your camera to eye level for better posture.";
      else if (cameraHigh) message = "Lower your camera slightly to eye level.";
      else if (!stabilizedMetrics.hasDetail) message = "Increase lighting or clean camera lens for sharper detail.";

      setLivePostureStatus({ level: "warning", message });
    };

    evaluateLivePosture();
    postureMonitorTimerRef.current = setInterval(evaluateLivePosture, 3500);

    return () => {
      if (postureMonitorTimerRef.current) {
        clearInterval(postureMonitorTimerRef.current);
        postureMonitorTimerRef.current = null;
      }
    };
  }, [getFrameMetrics, interviewActive, isVideoOff, postureTuning, useChat]);

  return (
    <div className="interview-page">
      {/* Background */}
      <div className="interview-bg">
        <div className="bg-grid"></div>
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
      </div>

      <div className="interview-container">
        {/* Header */}
        <div className="interview-header">
          <Link to="/dashboard" className="back-link">
            <span className="back-icon">←</span>
            Back to Dashboard
          </Link>
          <h1>AI Mock Interview</h1>
          {interviewActive && (
            <div className="interview-timer" aria-live="polite" aria-label={`Interview timer ${formatTime(timeElapsed)}`}>
              <span className="timer-icon">⏱️</span>
              <span className="timer-text">{formatTime(timeElapsed)}</span>
            </div>
          )}
        </div>

        {showAvatarSelect ? (
          /* ===== AVATAR SELECTION ===== */
          <div className="avatar-selection">
            <h2>Choose Your Interviewer</h2>
            <p className="selection-subtitle">
              {userProfile?.industry
                ? `Personalized for ${userProfile.industry}`
                : "Select your AI interviewer and start practicing"}
            </p>
            
            <div className="avatar-pack-selector">
              <span className="pack-label">Style:</span>
              <button
                className={`pack-btn ${avatarPackStyle === 'premium' ? 'active' : ''}`}
                onClick={() => setAvatarPackStyle('premium')}
              >
                Premium
              </button>
              <button
                className={`pack-btn ${avatarPackStyle === 'illustrated' ? 'active' : ''}`}
                onClick={() => setAvatarPackStyle('illustrated')}
              >
                Illustrated
              </button>
              <button
                className={`pack-btn ${avatarPackStyle === 'emoji' ? 'active' : ''}`}
                onClick={() => setAvatarPackStyle('emoji')}
              >
                Emoji
              </button>
            </div>

            {featureFlags.experimentalPrompts && (
              <p className="feature-flag-note" role="status">
                ⚡ Experimental prompt mode is enabled for this session
              </p>
            )}

            {startError && (
              <p className="state-banner error" role="status" aria-live="polite">
                {startError}
              </p>
            )}

            <div className="interview-config-panel">
              <div className="config-grid">
                <div className="config-item">
                  <label htmlFor="configMode">Interview Focus</label>
                  <select
                    id="configMode"
                    value={interviewConfig.mode}
                    onChange={(e) => setInterviewConfig((prev) => ({ ...prev, mode: e.target.value }))}
                  >
                    <option value="balanced">Balanced</option>
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="communication">Communication</option>
                  </select>
                </div>

                <div className="config-item">
                  <label htmlFor="configDifficulty">Difficulty</label>
                  <select
                    id="configDifficulty"
                    value={interviewConfig.difficulty}
                    onChange={(e) => setInterviewConfig((prev) => ({ ...prev, difficulty: e.target.value }))}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="config-item">
                  <label htmlFor="configCount">Questions</label>
                  <input
                    id="configCount"
                    type="number"
                    min="3"
                    max="10"
                    value={interviewConfig.questionCount}
                    onChange={(e) => setInterviewConfig((prev) => ({ ...prev, questionCount: Number(e.target.value) || 5 }))}
                  />
                </div>

                <div className="config-item">
                  <label htmlFor="configRole">Target Role</label>
                  <input
                    id="configRole"
                    type="text"
                    value={interviewConfig.targetRole}
                    onChange={(e) => setInterviewConfig((prev) => ({ ...prev, targetRole: e.target.value || "Software Engineer" }))}
                  />
                </div>
              </div>
            </div>

            <SilentErrorBoundary
              fallback={(
                <p className="state-banner" role="status" aria-live="polite">
                  Posture checker is unavailable on this browser right now. You can continue with interview mode.
                </p>
              )}
            >
              <PostureChecker
                postureFeedback={postureFeedback}
                postureDebug={postureDebug}
                postureTuning={postureTuning}
                isPostureChecking={isPostureChecking}
                postureVideoRef={postureVideoRef}
                onRunPostureCheck={runPostureCheck}
                onSetPostureTuning={setPostureTuning}
                onResetPostureTuning={() => setPostureTuning(defaultPostureTuning)}
              />
            </SilentErrorBoundary>

            <div className="avatars-grid premium-avatars-grid">
              {avatars.length === 0 && (
                <div className="state-empty" role="status" aria-live="polite">
                  <h3>No interviewers available</h3>
                  <p>Try refreshing your profile from the dashboard and come back.</p>
                </div>
              )}
              {avatars.map(avatar => (
                <div
                  key={avatar.id}
                  className={`avatar-card premium-avatar-card ${hoveredAvatarId === avatar.id ? "avatar-card-hovered" : ""}`}
                  onClick={() => startInterview(avatar)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      startInterview(avatar);
                    }
                  }}
                  onMouseEnter={() => setHoveredAvatarId(avatar.id)}
                  onMouseLeave={() => setHoveredAvatarId(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Start interview with ${avatar.name}, ${avatar.role}`}
                  aria-disabled={isStartingInterview}
                  style={{ background: avatar.bgColor }}
                >
                  <div className="avatar-preview premium-avatar-preview">
                    {renderAvatarPreview(avatar)}
                  </div>

                  <div className="avatar-info">
                    <h3>{avatar.name}</h3>
                    <p className="avatar-role">{avatar.role}</p>
                    <p className="avatar-description">{avatar.description}</p>
                  </div>

                  <button
                    className="select-avatar-btn premium-select-btn"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      startInterview(avatar);
                    }}
                    disabled={isStartingInterview}
                  >
                    {isStartingInterview ? "Starting..." : "Start Interview →"}
                  </button>
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* ===== ACTIVE INTERVIEW SESSION ===== */
          <div className="interview-session">
            {isStartingInterview && (
              <p className="state-banner" role="status" aria-live="polite">
                Starting your session...
              </p>
            )}
            
            {/* Interview Header */}
            <div className="interview-header-session">
              <div className="header-left">
                <h2 className="interview-title">{selectedAvatar?.name}</h2>
                <span className="interview-role-badge">{selectedAvatar?.role}</span>
              </div>
              <button
                type="button"
                className="details-icon-btn"
                onClick={() => setDetailsOpen(!detailsOpen)}
                aria-label={detailsOpen ? "Collapse interview details" : "Expand interview details"}
                aria-expanded={detailsOpen}
                title="Toggle interview details"
              >
                ℹ️
              </button>
            </div>
            
            <div className="interview-main">
              {/* Left: AI avatar panel + user video */}
              <div className="interview-area">
                {/* AI Avatar Panel */}
                <div className="ai-avatar-panel premium-ai-panel">
                  <div className="panel-bg-lines"></div>
                  <div className="panel-glow"></div>

                  {renderInterviewerPanelAvatar()}

                  <div className="ai-panel-name">{selectedAvatar?.name}</div>
                  <div className="ai-panel-role">{selectedAvatar?.role}</div>
                  <div className="ai-panel-status" aria-live="polite">
                    <span className={`status-dot ${isAiTyping ? 'thinking' : isSpeaking ? 'speaking' : 'listening'}`}></span>
                    <span>{isAiTyping ? "Thinking..." : isSpeaking ? "Speaking..." : "Listening"}</span>
                  </div>

                  <div className="ai-controls">
                    <button
                      type="button"
                      className="control-btn-small"
                      onClick={toggleAiVoice}
                      aria-pressed={aiVoiceEnabled}
                      aria-label={aiVoiceEnabled ? "Disable AI voice" : "Enable AI voice"}
                      title={aiVoiceEnabled ? "AI Voice On" : "AI Voice Off"}
                    >
                      {aiVoiceEnabled ? "🔊" : "🔈"}
                    </button>

                    <button
                      type="button"
                      className="control-btn-small"
                      onClick={toggleAutoVoiceInput}
                      aria-pressed={autoVoiceInputEnabled}
                      aria-label={autoVoiceInputEnabled ? "Disable auto voice input" : "Enable auto voice input"}
                      title={autoVoiceInputEnabled ? "Auto Listen On" : "Auto Listen Off"}
                    >
                      {autoVoiceInputEnabled ? "🎙️" : "🎤"}
                    </button>

                    <button
                      type="button"
                      className="control-btn-small"
                      onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                      aria-pressed={autoPlayEnabled}
                      aria-label={autoPlayEnabled ? "Disable auto-play" : "Enable auto-play"}
                      title={autoPlayEnabled ? "Auto-Play On" : "Auto-Play Off"}
                    >
                      {autoPlayEnabled ? "⚡" : "⏸️"}
                    </button>
                  </div>

                  <div className="panel-desk"></div>
                </div>

                {/* User video / chat toggle */}
                {!useChat ? (
                  <div className="video-container video-container-user pip-camera">
                    <video ref={videoRef} autoPlay playsInline muted={isMuted} className={isVideoOff ? "video-off" : ""} />
                    <div className="self-video-badge">You</div>
                    {isVideoOff && (
                      <div className="video-off-placeholder">
                        <span className="video-off-icon">📹</span>
                        <p>Camera is off</p>
                      </div>
                    )}
                    <div className="video-controls">
                      <button className={`control-btn ${isMuted ? "active" : ""}`} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} aria-pressed={isMuted}>
                        {isMuted ? "🔇" : "🎤"}
                      </button>
                      <button className={`control-btn ${isVideoOff ? "active" : ""}`} onClick={toggleVideo} aria-label={isVideoOff ? "Camera on" : "Camera off"} aria-pressed={isVideoOff}>
                        {isVideoOff ? "📷" : "🎥"}
                      </button>
                      <button
                        className={`control-btn ${isListeningUser ? "active" : ""}`}
                        onClick={toggleVoiceInput}
                        aria-label={isListeningUser ? "Stop voice" : "Start voice"}
                        aria-pressed={isListeningUser}
                        title={isListeningUser ? "Stop speech-to-text" : "Speak to transcribe"}
                      >
                        {isListeningUser ? "⏹️" : "🎙️"}
                      </button>
                      <button className="control-btn settings" onClick={() => setUseChat(true)} aria-label="Switch to chat" title="Switch to chat mode">
                        💬
                      </button>
                    </div>
                    {(isListeningUser || liveTranscript) && (
                      <div className="live-transcript" aria-live="polite">
                        {liveTranscript || "Listening... speak now"}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Chat mode */
                  <div className="chat-container premium-chat">
                    <div className="chat-header">
                      <div className="chat-avatar">
                          {renderAvatarChip(selectedAvatar, "chat-avatar-icon premium")}
                        <div>
                          <h3>{selectedAvatar?.name}</h3>
                          <p>{selectedAvatar?.role}</p>
                        </div>
                      </div>
                      <button className="switch-video-btn" onClick={() => setUseChat(false)} aria-label="Switch to video">
                        📹 Video
                      </button>
                    </div>

                    <div className="chat-messages" ref={chatContainerRef} role="log" aria-live="polite" aria-relevant="additions text" aria-busy={isAiTyping || isStartingInterview}>
                      {messages.length === 0 && !isAiTyping && (
                        <div className="state-empty state-empty-chat" role="status">
                          <h3>Preparing your interview</h3>
                          <p>{isStartingInterview ? "Starting your session..." : "Waiting for the first question..."}</p>
                        </div>
                      )}
                      {messages.map(msg => (
                        <div key={msg.id} className={`message ${msg.sender === "user" ? "user-message" : "ai-message"}`}>
                          <div className="message-avatar">
                            {msg.sender === "user" ? "👤" : renderAvatarChip(selectedAvatar, "message-avatar-icon premium")}
                          </div>
                          <div className="message-content">
                            <div className="message-header">
                              <span className="message-sender">
                                {msg.sender === "user" ? "You" : selectedAvatar?.name}
                              </span>
                              <span className="message-time">{msg.timestamp}</span>
                            </div>
                            <p className="message-text">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                      {isAiTyping && (
                        <div className="message ai-message">
                          <div className="message-avatar">{renderAvatarChip(selectedAvatar, "message-avatar-icon premium")}</div>
                          <div className="message-content">
                            <div className="typing-indicator" aria-label="AI is typing" role="status">
                              <span></span><span></span><span></span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {chatError && (
                      <p className="state-banner" role="alert">
                        {chatError}
                      </p>
                    )}

                    <form onSubmit={sendMessage} className="chat-input-form">
                      <label htmlFor="chatInput" className="sr-only">Your response</label>
                      <input
                        id="chatInput"
                        type="text"
                        value={inputMessage}
                        onChange={e => setInputMessage(e.target.value)}
                        placeholder="Type your response..."
                        className="chat-input"
                        aria-label="Type your response"
                        disabled={isAiTyping}
                      />
                      <button type="submit" className="send-btn" disabled={isAiTyping || !inputMessage.trim()}>
                        Send →
                      </button>
                      <button
                        type="button"
                        className={`send-btn voice-input-btn ${isListeningUser ? "listening" : ""}`}
                        onClick={toggleVoiceInput}
                        aria-pressed={isListeningUser}
                        aria-label={isListeningUser ? "Stop voice" : "Start voice"}
                      >
                        {isListeningUser ? "⏹️" : "🎙️"}
                      </button>
                    </form>
                    <p className="voice-input-hint">Voice mode auto-sends when listening stops</p>
                    {(isListeningUser || liveTranscript) && (
                      <p className="voice-input-hint voice-live-text" aria-live="polite">
                        {liveTranscript || "Listening... speak now"}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Feedback Sidebar */}
              <SilentErrorBoundary
                fallback={(
                  <div className="interview-info" role="status" aria-live="polite">
                    <h3>Feedback</h3>
                    <p className="voice-input-hint">Feedback panel unavailable. Interview can continue normally.</p>
                  </div>
                )}
              >
                <FeedbackSidebar
                  lastUserMessage={lastUserMessage}
                  currentQuestionText={latestAiMessage}
                  isOpen={feedbackOpen}
                  onToggle={() => setFeedbackOpen(o => !o)}
                  speechMetrics={speechMetrics}
                  analysisTrigger={analysisTrigger}
                />
              </SilentErrorBoundary>

              {/* Right Interview Detail Sidebar */}
              <div className="interview-sidebar premium-sidebar">
                {/* Live Posture Monitor */}
                <div className={`posture-monitor-card ${livePostureStatus.level}`}>
                  <div className="posture-header">
                    <span className="posture-icon">🧘</span>
                    <h4>Posture Monitor</h4>
                  </div>
                  <div className="posture-score">
                    {livePostureScore !== null ? (
                      <>
                        <span className="score-value">{livePostureScore}</span>
                        <span className="score-max">/100</span>
                      </>
                    ) : (
                      <span className="score-value">--</span>
                    )}
                  </div>
                  <p className="posture-message">{livePostureStatus.message}</p>
                </div>

                {/* Interview Details */}
                {detailsOpen && (
                  <div className="interview-details-grid">
                    <div className="detail-item">
                      <span className="detail-icon">👤</span>
                      <div className="detail-content">
                        <span className="detail-label">Interviewer</span>
                        <span className="detail-value">{selectedAvatar?.name}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <span className="detail-icon">💼</span>
                      <div className="detail-content">
                        <span className="detail-label">Role</span>
                        <span className="detail-value">{selectedAvatar?.role}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <span className="detail-icon">{useChat ? '💬' : '📹'}</span>
                      <div className="detail-content">
                        <span className="detail-label">Mode</span>
                        <span className="detail-value">{useChat ? "Chat" : "Video"}</span>
                      </div>
                    </div>
                    
                    {selectedDomainName && (
                      <div className="detail-item">
                        <span className="detail-icon">📚</span>
                        <div className="detail-content">
                          <span className="detail-label">Domain</span>
                          <span className="detail-value">{selectedDomainName}</span>
                        </div>
                      </div>
                    )}
                    
                    {selectedDifficultyName && (
                      <div className="detail-item">
                        <span className="detail-icon">⚡</span>
                        <div className="detail-content">
                          <span className="detail-label">Difficulty</span>
                          <span className="detail-value">{selectedDifficultyName}</span>
                        </div>
                      </div>
                    )}
                    
                    {selectedInterviewTypeName && (
                      <div className="detail-item">
                        <span className="detail-icon">🎯</span>
                        <div className="detail-content">
                          <span className="detail-label">Type</span>
                          <span className="detail-value">{selectedInterviewTypeName}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <div className="detail-content">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{formatTime(timeElapsed)}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <span className="detail-icon">
                        {isAiTyping ? '🤔' : isSpeaking ? '🗣️' : '👂'}
                      </span>
                      <div className="detail-content">
                        <span className="detail-label">AI Status</span>
                        <span className="detail-value" style={{ 
                          color: isSpeaking ? "#10b981" : isAiTyping ? "#f59e0b" : "#3b82f6" 
                        }}>
                          {isAiTyping ? "Thinking" : isSpeaking ? "Speaking" : "Listening"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="current-question premium-question">
                  <h3>Interview Progress</h3>
                  <div className="progress-inline-row">
                    <span className="progress-counter">Q {displayedQuestionNumber}/{totalQuestions}</span>
                    <div className="progress-bar compact-progress inline-progress">
                      <div
                        className="progress-fill"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="progress-percent">{roundedProgressPercent}%</span>
                  </div>
                  
                  <div className="question-box premium-question-box">
                    <p className="question-preview-text">{latestAiMessage || "Waiting for interview to start..."}</p>
                  </div>
                  
                  <div className="progress-actions-row">
                    <button
                      type="button"
                      className="next-question-btn compact premium-btn"
                      onClick={requestNextQuestion}
                      disabled={isAiTyping || isFetchingNextQuestion}
                    >
                      {isFetchingNextQuestion ? "Loading..." : "Next Question →"}
                    </button>

                    <div className="skip-reason-wrap compact">
                      <label htmlFor="skipReasonSelect">Skip reason</label>
                      <select
                        id="skipReasonSelect"
                        value={skipReason}
                        onChange={(event) => setSkipReason(event.target.value)}
                        disabled={isAiTyping || isFetchingNextQuestion}
                      >
                        <option value="too hard">Too difficult</option>
                        <option value="clarification">Need clarification</option>
                        <option value="repeated">Already covered</option>
                        <option value="timing">Time constraint</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="speaking-board premium-speaking-board">
                  <div className="speech-board-head">
                    <h3>Speaking Display</h3>
                    <button
                      type="button"
                      className="speech-copy-btn"
                      onClick={copyCorrectedText}
                      disabled={!correctedSpeakingText}
                    >
                      {isCorrectionCopied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  
                  <div className="speech-section">
                    <p className="speech-board-label">Your speech</p>
                    <div className="speech-board-text original">
                      {speakingBoardText || "Start speaking to see your transcript here."}
                    </div>
                  </div>
                  
                  <div className="speech-section">
                    <p className="speech-board-label">Corrected version</p>
                    <div className="speech-board-text corrected">
                      {speakingBoardText
                        ? correctedWordDiff.map((entry, index) => (
                          <span
                            key={`${entry.word}-${index}`}
                            className={entry.changed ? "speech-word speech-word-changed" : "speech-word"}
                          >
                            {entry.word}{index < correctedWordDiff.length - 1 ? " " : ""}
                          </span>
                        ))
                        : "Corrections will appear based on your speech."}
                    </div>
                  </div>
                  
                  <p className="speech-board-legend">Highlighted words = corrected for grammar/clarity</p>
                  
                  {latestGrammarHints.length > 0 && (
                    <ul className="speech-board-hints">
                      {latestGrammarHints.map((hint, index) => (
                        <li key={`${hint}-${index}`}>📝 {hint}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="interview-tips premium-tips">
                  <h3>Quick Tips</h3>
                  <ul>
                    <li>✓ Speak clearly and confidently</li>
                    <li>✓ Use the STAR method (Situation, Task, Action, Result)</li>
                    <li>✓ Take a moment to think before answering</li>
                    <li>✓ Maintain eye contact with the camera</li>
                    <li>✓ Keep answers concise but detailed</li>
                  </ul>
                  
                  {latestVerification && (
                    <div className="latest-feedback">
                      <p className="voice-input-hint" aria-live="polite">
                        <span className={`feedback-badge ${latestVerification.correctnessLabel}`}>
                          {latestVerification.correctnessLabel === "correct" ? "✅" : 
                           latestVerification.correctnessLabel === "partially-correct" ? "⚠️" : "❌"}
                        </span>
                        {latestVerification.correctnessLabel === "correct" ? "Correct" : 
                         latestVerification.correctnessLabel === "partially-correct" ? "Partially correct" : "Needs improvement"}
                        {" "}({latestVerification.overallScore}/100)
                      </p>
                    </div>
                  )}
                </div>

                <button className="end-interview-btn premium-end-btn" onClick={endInterview} aria-label="End interview">
                  End Interview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}