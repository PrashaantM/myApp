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
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) handleLoginSuccess(user);
    else setError('Invalid email or password');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
    if (password !== confirmPassword) setError('Passwords do not match');
    else {
      addUser({ email, password });
      setActiveSection('login');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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

  return (
    <section id="calendar">
      <h2>Calendar</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.date}</strong>: {event.title}
          </li>
        ))}
      </ul>
      <p>Reminder notifications will be sent before events.</p>
    </section>
  );
}

function Dashboard() {
  return (
    <section id="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to your personalized dashboard. Access your learning materials, track progress, and stay updated.</p>
    </section>
  );
}

function Courses() {
  return (
    <section id="courses">
      <h2>Courses</h2>
      <p>Explore and access detailed course materials.</p>
    </section>
  );
}

function Tests() {
  return (
    <section id="tests">
      <h2>Tests</h2>
      <p>Evaluate your knowledge through interactive tests.</p>
    </section>
  );
}

function Analysis() {
  return (
    <section id="analysis">
      <h2>Analysis</h2>
      <p>Analyze your progress with performance insights.</p>
    </section>
  );
}

function Notifications() {
  return (
    <section id="notifications">
      <h2>Notifications</h2>
      <p>Stay updated with the latest alerts and announcements.</p>
    </section>
  );
}

function Notes() {
  return (
    <section id="notes">
      <h2>Notes</h2>
      <p>Access and manage your study notes efficiently.</p>
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
