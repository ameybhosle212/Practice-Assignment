import './App.css';

function App() {
  function LogOut() {
    localStorage.clear()
    window.location = "/login"
  }
  return (
    <div className="App">
      <h3>Welcome to User</h3>
      <h4>Logout Here</h4>
      <button onClick={LogOut}>Log Out</button>
    </div>
  );
}

export default App;
