import React from 'react';
import LoginCard from '../components/LoginCard';

const Home = () => {
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
          onLogin={() => console.log('Student Login')}
          registerPath="/register/student"
        />
        <LoginCard
          title="Faculty Login"
          role="faculty"
          onLogin={() => console.log('Faculty Login')}
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
