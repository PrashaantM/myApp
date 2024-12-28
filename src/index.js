import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Header setActiveSection={setActiveSection} />
      <main>
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
}

function Header({ setActiveSection }) {
  return (
    <header className="header">
      <h1>Medico Learning Platform</h1>
      <nav>
        <ul>
          <li><a href="#dashboard" onClick={() => setActiveSection('dashboard')}>Dashboard</a></li>
          <li><a href="#courses" onClick={() => setActiveSection('courses')}>Courses</a></li>
          <li><a href="#tests" onClick={() => setActiveSection('tests')}>Tests</a></li>
          <li><a href="#analysis" onClick={() => setActiveSection('analysis')}>Analysis</a></li>
          <li><a href="#notifications" onClick={() => setActiveSection('notifications')}>Notifications</a></li>
          <li><a href="#notes" onClick={() => setActiveSection('notes')}>Notes</a></li>
        </ul>
      </nav>
    </header>
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