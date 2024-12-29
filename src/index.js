import React, { useState } from 'react';
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
  const events = [
    { date: '2024-01-02', title: 'Lesson: Cardiovascular System' },
    { date: '2024-01-04', title: 'Test Deadline: Anatomy' },
    { date: '2024-01-06', title: 'Live Class: Respiratory System' },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());

  
  const parsedEvents = events.map((event) => ({
    ...event,
    date: new Date(event.date),
  }));

  
  const getEventsForDate = (date) =>
    parsedEvents.filter((event) => event.date.toDateString() === date.toDateString());

  
  const renderCalendar = () => {
    const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const calendarDays = [];

    for (let i = 1; i <= endDate.getDate(); i++) {
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const eventsForDay = getEventsForDate(currentDate);

      calendarDays.push(
        <div
          key={i}
          className={`calendar-day ${isToday ? 'today' : ''} ${eventsForDay.length ? 'has-event' : ''}`}
          onClick={() => setSelectedDate(currentDate)}
        >
          <span>{i}</span>
          {eventsForDay.length > 0 && <div className="event-dot"></div>}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <section id="calendar">
      <h2>Calendar</h2>
      <div className="calendar-container">
        <div className="calendar-grid">{renderCalendar()}</div>
        <div className="event-details">
          <h3>Events for {selectedDate.toDateString()}:</h3>
          <ul>
            {getEventsForDate(selectedDate).length > 0 ? (
              getEventsForDate(selectedDate).map((event, index) => (
                <li key={index}>{event.title}</li>
              ))
            ) : (
              <li>No events for this day.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
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
  return (
    <section id="qbanks">
      <h2>Qbanks</h2>
      <p>Access a library of questions and explanations.</p>
    </section>
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