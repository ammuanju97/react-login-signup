import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useHistory } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';


class Login extends Component {
  //  navigate = useNavigate();
  state = {
    credentials: { username: '', password: '' }
  }

  showError = false
  errorMsg = ""

  login = event => {
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.credentials)
    })
      .then(data =>data.json())
      .then(
        data => {
          // this.props.userLogin(data.token);
          // console.log(data.json().token)
          
          localStorage.setItem('authtoken', data.token)
          window.location.href = "/home";
        }
      )
      .catch(error => console.error(error))
  }

  register = event => {

    if (!this.state.credentials.username.trim()) {
      this.errorMsg = "username cannot be empty"
      this.showError = true
      this.forceUpdate()

      return
    }
    else if (!this.state.credentials.password.trim()) {
      this.errorMsg = "password cannot be empty"
      this.showError = true

      this.forceUpdate()
      return
    }
    this.showError = false
    this.forceUpdate()


    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.credentials)
    })
      .then(data => {
        NotificationManager.success('User created sucessfully', 'Sucess');
        // alert('sucess')
        //  toast('User created sucessfully')
        data.json()
        return data
      }
      )
      .then(
        data => {
          console.log(data.token, data);
        }
      )
      .catch(error => console.error(error))
  }
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  }

  render() {
    let style = { display: 'none' }
    if (this.showError) {
      style = {}
    }
    return (
      <div>
        <h1>Login user form</h1>
        <form>
          <label>
            Username:

            <input type="text" name="username"
              value={this.state.credentials.username}
              onChange={this.inputChanged} autoComplete="username" />

          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password"
              value={this.state.credentials.password}
              onChange={this.inputChanged} autoComplete="current-password" />
          </label>
          <br />

          <label style={style}>
            {this.errorMsg}
          </label>
          <br />
          <button type="button" onClick={this.login}>Login</button>
          <button type="button" onClick={this.register}>Register</button>
        </form>

      </div>

    );
  }
}

export default Login;