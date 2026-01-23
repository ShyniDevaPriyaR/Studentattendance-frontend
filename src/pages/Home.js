import React from 'react';
import LoginCard from '../components/LoginCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = async (role, credentials) => {
    if (!credentials.username || !credentials.password) {
      alert('Please enter username and password');
      return;
    }

    try {
      let endpoint = '';
      let body = {};

      if (role === 'student') {
        endpoint = 'http://localhost:6010/login';
        body = {
          email: credentials.username, // Backend checks email OR username with this field
          password: credentials.password
        };
      } else if (role === 'faculty') {
        endpoint = 'http://localhost:6010/faculty-login';
        body = {
          username: credentials.username,
          password: credentials.password
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();

        // Login Success
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        sessionStorage.setItem('token', data.token); // Store token separately if needed
        sessionStorage.setItem('userRole', role);

        if (role === 'student') {
          navigate('/studentinfo');
        } else {
          navigate('/facultypanel');
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Invalid Credentials!');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
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
    minHeight: 'calc(100vh - 100px)', // Adjust based on navbar height (100px)
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
