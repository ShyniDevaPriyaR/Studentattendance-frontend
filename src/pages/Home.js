import React from 'react';
import LoginCard from '../components/LoginCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = (role, credentials) => {
    console.log(`${role} login attempt:`, credentials);

    // Check if input is not empty
    if (!credentials.username || !credentials.password) {
      alert('Please enter username and password');
      return;
    }

    // Determine storage key based on role
    const storageKey = role === 'student' ? 'students' : 'faculty';
    const storedUsers = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Find matching user
    const user = storedUsers.find(u => u.username === credentials.username && u.password === credentials.password);

    if (user) {
      // Login Success
      // Store current user session
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      sessionStorage.setItem('userRole', role);

      if (role === 'student') {
        navigate('/studentinfo');
      } else {
        navigate('/facultypanel');
      }
    } else {
      // Login Failed
      alert('Invalid Credentials! Please register or check your username/password.');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          Welcome to <span className="text-gradient">Student Portal</span>
        </h1>
        <p style={styles.subtitle}>
          Manage your academic journey with ease. Please select your role to continue.
        </p>
      </header>

      <div style={styles.grid}>
        <LoginCard
          title="Student Login"
          role="student"
          onLogin={(creds) => handleLogin('student', creds)}
          registerPath="/register/student"
        />
        <LoginCard
          title="Faculty Login"
          role="faculty"
          onLogin={(creds) => handleLogin('faculty', creds)}
          registerPath="/register/faculty"
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)', // Adjust based on navbar height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 1rem',
    background: 'var(--bg-light)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'var(--text-dark)',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#718096',
    maxWidth: '600px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '900px',
    justifyItems: 'center',
  }
};

export default Home;
