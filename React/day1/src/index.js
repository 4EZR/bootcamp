import React from 'react';
import ReactDOM from 'react-dom';


const Navbar = () => {
  const navbarStyles = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#333',
  };

  const liStyles = {
    float: 'left',
  };

  const linkStyles = {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
  };

  const hoverStyles = {
    backgroundColor: '#111',
  };

  return (
    <ul style={navbarStyles}>
      <li style={liStyles}>
        <a href="#home" style={linkStyles} className="active">
          Home
        </a>
      </li>
      <li style={liStyles}>
        <a href="#news" style={linkStyles}>
          News
        </a>
      </li>
      <li style={liStyles}>
        <a href="#contact" style={linkStyles}>
          Contact
        </a>
      </li>
      <li style={liStyles}>
        <a href="#about" style={{ ...linkStyles, ...hoverStyles }}>
          About
        </a>
      </li>
    </ul>
  );
};


const Content = () => {


  return (
    <div >
      <h1>Welcome to My React App</h1>
      <p>This is some sample content for your React application.</p>
    </div>
  );
};


const App = () => {
  const style = {
    margin: 0,
    padding: 0,
  };
  return (
    <section style={style}>
      <Navbar />
      <Content />
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));