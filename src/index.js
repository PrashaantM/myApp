import React, { useState,useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('login');
  const [users, setUsers] = useState([{ email: 'user@example.com', password: 'password' }]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const addUser = (user) => setUsers([...users, user]);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setActiveSection('login');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'login':
        return <Login setActiveSection={setActiveSection} users={users} handleLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <Signup setActiveSection={setActiveSection} addUser={addUser} />;
        case 'calendar':
        return <Calendar />;
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'tests':
        return <Tests />;
      case 'analysis':
        return <Analysis />;
      case 'notifications':
        return <Notifications />;
      case 'notes':
        return <Notes />;
      case 'profile':
        return <Profile loggedInUser={loggedInUser} />;
      case 'qbanks':
        return <Qbanks />;
      case 'video-recordings':
        return <VideoRecordings />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      {loggedInUser && <Header setActiveSection={setActiveSection} handleLogout={handleLogout} />}
      {renderSection()}
    </div>
  );
}

function Header({ setActiveSection, handleLogout }) {
  return (
    <header className="header">
      <h1>Medico Learning Platform</h1>
      <nav>
        <ul>
          <li><a href="#dashboard" onClick={() => setActiveSection('dashboard')}>Dashboard</a></li>
          <li><a href="#calendar" onClick={() => setActiveSection('calendar')}>Calendar</a></li>
          <li><a href="#courses" onClick={() => setActiveSection('courses')}>Courses</a></li>
          <li><a href="#tests" onClick={() => setActiveSection('tests')}>Tests</a></li>
          <li><a href="#analysis" onClick={() => setActiveSection('analysis')}>Analysis</a></li>
          <li><a href="#notifications" onClick={() => setActiveSection('notifications')}>Notifications</a></li>
          <li><a href="#notes" onClick={() => setActiveSection('notes')}>Notes</a></li>
          <li><a href="#profile" onClick={() => setActiveSection('profile')}>Profile</a></li>
          <li><a href="#qbanks" onClick={() => setActiveSection('qbanks')}>Qbanks</a></li>
          <li><a href="#video-recordings" onClick={() => setActiveSection('video-recordings')}>Video Recordings</a></li>
          <li><a href="#feedback" onClick={() => setActiveSection('feedback')}>Feedback</a></li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

function Login({ setActiveSection, users, handleLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if the entered email and password match any user in the users array
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      handleLoginSuccess(user); // Pass the logged-in user to setLoggedInUser and navigate to the dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don't have an account? <a href="#" onClick={() => setActiveSection('signup')}>Sign Up</a>
      </p>
    </div>
  );
}


function Signup({ setActiveSection, addUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Add new user to the list (assuming a simple users array or a state update)
      addUser({ email, password });
      setActiveSection('login'); // After successful signup, redirect to login page
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Already have an account? <a href="#" onClick={() => setActiveSection('login')}>Login</a>
      </p>
    </div>
  );
}

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    noteDate: "",
    noteText: "",
    noteType: "Lesson", // Default type
    noteTime: "",
    noteDetails: "",
    notifyBefore: "1 day", // Default notification timing
  });

  useEffect(() => {
    checkNotificationPermission();
    const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(savedReminders);
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
    handleNotifications();
  }, [reminders]);

  const checkNotificationPermission = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const handleAddReminder = () => {
    const { noteDate, noteText, noteType, noteTime, noteDetails, notifyBefore } = form;
    if (noteDate && noteText) {
      const newReminder = {
        date: noteDate,
        text: noteText,
        type: noteType,
        time: noteTime,
        details: noteDetails,
        notifyBefore,
      };
      setReminders([...reminders, newReminder]);
      setForm({
        noteDate: "",
        noteText: "",
        noteType: "Lesson",
        noteTime: "",
        noteDetails: "",
        notifyBefore: "1 day",
      });
    }
  };

  const getRemindersForDate = (selectedDate) => {
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    return reminders.filter((reminder) => reminder.date === selectedDateString);
  };

  const handleNotifications = () => {
    reminders.forEach((reminder) => {
      const now = new Date();
      const reminderTime = new Date(`${reminder.date}T${reminder.time || "00:00:00"}`);
      const notifyBefore = reminder.notifyBefore === "1 hour" ? 3600000 : 86400000;

      if (reminderTime - now <= notifyBefore && reminderTime > now) {
        new Notification(`Upcoming ${reminder.type}`, {
          body: `${reminder.text} - ${reminder.details}`,
        });
      }
    });
  };

  const filteredReminders = filter === "All" 
    ? reminders 
    : reminders.filter((reminder) => reminder.type === filter);

  return (
    <div className="calendar-app">
      {/* Sidebar */}
      <div className="calendar-sidebar">
        <h3>Reminders</h3>
        <div className="filter-buttons">
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Lesson")}>Lessons</button>
          <button onClick={() => setFilter("Test")}>Tests</button>
        </div>
        <ul className="reminders-list">
          {filteredReminders.map((reminder, index) => (
            <li key={index}>
              <strong>{reminder.type}:</strong> {reminder.text} - {reminder.date} at {reminder.time || "All Day"}
              <br />
              <small>{reminder.details}</small>
              <button
                className="delete-button"
                onClick={() => setReminders(reminders.filter((_, i) => i !== index))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="add-reminder">
          <h4>Add Reminder</h4>
          <input
            type="date"
            value={form.noteDate}
            onChange={(e) => setForm({ ...form, noteDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title"
            value={form.noteText}
            onChange={(e) => setForm({ ...form, noteText: e.target.value })}
          />
          <select
            value={form.noteType}
            onChange={(e) => setForm({ ...form, noteType: e.target.value })}
          >
            <option value="Lesson">Lesson</option>
            <option value="Test">Test</option>
          </select>
          <input
            type="time"
            value={form.noteTime}
            onChange={(e) => setForm({ ...form, noteTime: e.target.value })}
          />
          <textarea
            placeholder="Details (optional)"
            value={form.noteDetails}
            onChange={(e) => setForm({ ...form, noteDetails: e.target.value })}
          />
          <select
            value={form.notifyBefore}
            onChange={(e) => setForm({ ...form, notifyBefore: e.target.value })}
          >
            <option value="1 day">1 Day Before</option>
            <option value="1 hour">1 Hour Before</option>
          </select>
          <button onClick={handleAddReminder}>Add</button>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date }) =>
            getRemindersForDate(date).length > 0 && <div className="event-dot"></div>
          }
        />
        <div className="selected-date-reminders">
          <h3>Reminders for {date.toDateString()}</h3>
          <ul>
            {getRemindersForDate(date).length > 0 ? (
              getRemindersForDate(date).map((reminder, index) => (
                <li key={index}>
                  <strong>{reminder.type}:</strong> {reminder.text} - {reminder.time || "All Day"}
                  <br />
                  <small>{reminder.details}</small>
                </li>
              ))
            ) : (
              <li>No reminders for today</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <section id="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to your personalized dashboard. Access your learning materials, track progress, and stay updated.</p>
      <ul>
        <li>Track your daily progress</li>
        <li>View upcoming exams and deadlines</li>
        <li>Access quick links to your courses and tests</li>
      </ul>
    </section>
  );
}

function Courses() {
  return (
    <section id="courses">
      <h2>Courses</h2>
      <div className="course-grid">
        <div className="course">
          <h3>Anatomy</h3>
          <p>Comprehensive video lectures and notes.</p>
        </div>
        <div className="course">
          <h3>Physiology</h3>
          <p>Detailed explanations with quizzes.</p>
        </div>
        <div className="course">
          <h3>Pathology</h3>
          <p>Master key concepts with interactive modules.</p>
        </div>
        <div className="course">
          <h3>Pharmacology</h3>
          <p>Learn drug mechanisms with interactive diagrams.</p>
        </div>
      </div>
    </section>
  );
}


function Tests() {
  return (
    <section id="tests">
      <h2>Tests</h2>
      <p>Evaluate your knowledge with quizzes and exams tailored to your courses.</p>
      <ul>
        <li>Practice MCQs for each subject</li>
        <li>Simulate mock exams with timed tests</li>
        <li>View detailed solutions and explanations</li>
      </ul>
    </section>
  );
}


function Analysis() {
  return (
    <section id="analysis">
      <h2>Analysis</h2>
      <p>Analyze your performance and progress through detailed insights.</p>
      <ul>
        <li>View subject-wise performance trends</li>
        <li>Identify strengths and weaknesses</li>
        <li>Access performance heatmaps for better focus</li>
      </ul>
    </section>
  );
}


function Notifications() {
  return (
    <section id="notifications">
      <h2>Notifications</h2>
      <p>Stay updated with the latest announcements and reminders.</p>
      <ul>
        <li>Exam schedules and changes</li>
        <li>Course updates and new content</li>
        <li>Important platform notifications</li>
      </ul>
    </section>
  );
}

function Notes() {
  return (
    <section id="notes">
      <h2>Notes</h2>
      <p>Access your saved notes and organize your learning resources.</p>
      <ul>
        <li>View subject-wise notes</li>
        <li>Add new notes with rich formatting options</li>
        <li>Organize notes with tags and folders</li>
      </ul>
    </section>
  );
}

function Profile({ loggedInUser }) {
  return (
    <section id="profile">
      <h2>Profile</h2>
      <p>Email: {loggedInUser?.email}</p>
    </section>
  );
}

function Qbanks() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [leaderboard, setLeaderboard] = useState(
    JSON.parse(localStorage.getItem('leaderboard')) || []
  );

  const questionBanks = [
    {
      topic: 'Anatomy',
      subtopics: {
        'General Anatomy': [
          { question: 'What is a ligament?', answer: 'A ligament connects bones to other bones.' },
          { question: 'Name the types of cartilage.', answer: 'Hyaline, Fibrocartilage, Elastic.' },
        ],
        'Neuroanatomy': [
          { question: 'What is the function of the thalamus?', answer: 'Relay sensory and motor signals to the cerebral cortex.' },
          { question: 'Define cranial nerves.', answer: 'The nerves that emerge directly from the brain.' },
        ],
      },
    },
    {
      topic: 'Physiology',
      subtopics: {
        'Cardiovascular System': [
          { question: 'What is cardiac output?', answer: 'The volume of blood pumped by the heart per minute.' },
          { question: 'Define blood pressure.', answer: 'The pressure exerted by circulating blood upon the walls of blood vessels.' },
        ],
        'Nervous System': [
          { question: 'What is an action potential?', answer: 'A rapid rise and fall in electrical potential across a cell membrane.' },
          { question: 'Define synapse.', answer: 'A junction between two nerve cells where impulses pass by diffusion of neurotransmitters.' },
        ],
      },
    },
  ];

  useEffect(() => {
    if (selectedSubtopic) setStartTime(new Date());
  }, [selectedSubtopic]);

  const handleAnswerSubmit = () => {
  if (!selectedTopic || !selectedSubtopic) return;

  const currentQuestion =
    questionBanks
      .find((bank) => bank.topic === selectedTopic.topic)
      ?.subtopics[selectedSubtopic]?.[currentQuestionIndex];

  if (!currentQuestion) return;

  if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
    setScore(score + 1);
  }

    setUserAnswer('');
    if (currentQuestionIndex + 1 < questionBanks.find((bank) => bank.topic === selectedTopic.topic).subtopics[selectedSubtopic].length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const endTime = new Date();
      setTimeSpent((endTime - startTime) / 1000);
      saveLeaderboardEntry();
      setShowResult(true);
    }
  };

  const saveLeaderboardEntry = () => {
    const accuracy = (
      (score /
        questionBanks
          .find((bank) => bank.topic === selectedTopic.topic)
          .subtopics[selectedSubtopic].length) *
      100
    ).toFixed(2);

    const entry = {
      topic: selectedTopic.topic,
      subtopic: selectedSubtopic,
      score,
      accuracy,
      timeSpent,
    };

    const updatedLeaderboard = [...leaderboard, entry];
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
  };

  const renderLeaderboard = () => (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Subtopic</th>
            <th>Score</th>
            <th>Accuracy</th>
            <th>Time Spent (s)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr
              key={index}
              className={index === 0 ? 'top-performer' : ''}
            >
              <td>{entry.topic}</td>
              <td>{entry.subtopic}</td>
              <td>{entry.score}</td>
              <td>{entry.accuracy}%</td>
              <td>{entry.timeSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderReviewMode = () => (
    <div className="review-container">
      <h3>Review Questions</h3>
      {questionBanks
        .find((bank) => bank.topic === selectedTopic.topic)
        .subtopics[selectedSubtopic].map((item, index) => (
          <div
            key={index}
            className={`review-item ${
              userAnswer.toLowerCase() === item.answer.toLowerCase() ? 'correct' : 'incorrect'
            }`}
          >
            <p>
              <strong>Q:</strong> {item.question}
            </p>
            <p>
              <strong>Your Answer:</strong> {item.answer}
            </p>
            <p>
              <strong>Correct Answer:</strong> {item.answer}
            </p>
          </div>
        ))}
      <button
        onClick={() => {
          setReviewMode(false);
          setSelectedSubtopic(null);
          setSelectedTopic(null);
        }}
      >
        Back to Topics
      </button>
    </div>
  );

  return (
    <div className="qbanks">
      <h2>Question Banks</h2>
      <p>Select a topic and subtopic to practice questions.</p>

      {/* Leaderboard */}
      {renderLeaderboard()}

      {reviewMode ? (
        renderReviewMode()
      ) : (
        <>
          {!selectedTopic && (
            <div className="topics">
              {questionBanks.map((bank, index) => (
                <div
                  key={index}
                  className="topic-card"
                  onClick={() => setSelectedTopic(bank)}
                >
                  <h3>{bank.topic}</h3>
                  <p>{Object.keys(bank.subtopics).join(', ')}</p>
                </div>
              ))}
            </div>
          )}

          {selectedTopic && !selectedSubtopic && (
            <div className="subtopics">
              <h3>{selectedTopic.topic} Subtopics</h3>
              <ul>
                {Object.keys(selectedTopic.subtopics).map((subtopic, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedSubtopic(subtopic)}
                    className="subtopic-item"
                  >
                    {subtopic}
                  </li>
                ))}
              </ul>
              <button onClick={() => setSelectedTopic(null)}>Back to Topics</button>
            </div>
          )}

          {selectedTopic && selectedSubtopic && !showResult && (
  <div className="questions">
              <h3>
                {selectedTopic.topic} - {selectedSubtopic}
              </h3>
              <p>
                Question {currentQuestionIndex + 1} of{' '}
                {questionBanks
                  .find((bank) => bank.topic === selectedTopic.topic)
                  .subtopics[selectedSubtopic].length}
              </p>
              <div className="question">
                <p>
                  <strong>Q:</strong>{' '}
                  {
                    questionBanks
                      .find((bank) => bank.topic === selectedTopic.topic)
                      .subtopics[selectedSubtopic][currentQuestionIndex].question
                  }
                </p>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here"
                />
                <button onClick={handleAnswerSubmit}>Submit Answer</button>
              </div>
            </div>
          )}

          {showResult && (
            <div className="result">
              <h3>Quiz Results</h3>
              <p>
                You scored {score} out of{' '}
                {questionBanks
                  .find((bank) => bank.topic === selectedTopic.topic)
                  .subtopics[selectedSubtopic].length}.
              </p>
              <p>
                Accuracy:{' '}
                {(
                  (score /
                    questionBanks
                      .find((bank) => bank.topic === selectedTopic.topic)
                      .subtopics[selectedSubtopic].length) *
                  100
                ).toFixed(2)}
                %
              </p>
              <p>Time Spent: {timeSpent} seconds</p>
              <button onClick={() => setReviewMode(true)}>Review Questions</button>
              <button
                onClick={() => {
                  setSelectedSubtopic(null);
                  setSelectedTopic(null);
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setShowResult(false);
                }}
              >
                Back to Topics
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}


function VideoRecordings() {
  return (
    <section id="video-recordings">
      <h2>Video Recordings</h2>
      <p>Watch recorded video lectures and tutorials.</p>
    </section>
  );
}

function Feedback() {
  return (
    <section id="feedback">
      <h2>Feedback</h2>
      <form>
        <textarea placeholder="Share your feedback..." required></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Medico Learning Platform. All rights reserved.</p>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);