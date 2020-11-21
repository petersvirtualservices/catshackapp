import React from 'react';
import axios from 'axios';
import Footer from './partials/Footer';
import Navbar from './partials/Navbar';
import Quiz from './routes/Quiz';
import QuizEnded from './routes/QuizEnded';
import Welcome from './routes/Welcome';
import Login from './routes/Login';
import AnimalCards from './routes/AnimalCards'
import Register from './routes/Register';
import { server, questions, personalityLabels, getUserPersonality } from '../lib'
import '../assets/App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'home',
      form: {},
      answers: [],
      animals: [],
      warnings: [],
    }
    this.saveQuizAnswer = this.saveQuizAnswer.bind(this)
    this.setRoute = this.setRoute.bind(this)
    this.setField = this.setField.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.setWarnings = this.setWarnings.bind(this)
  }

  componentDidMount(){
    const self=this;
    axios.get(server + '/api/getPets')
    .then(response => {
      self.setState({
        animals: response.data.animals,
      })
    })
  }

  setRoute(route) {
    if (route === 'home') {
      this.setState({ route: route, answers: [], warnings: [] });
    } else {
      this.setState({ route: route, warnings: [] });
    }
  }

  setField(field, str) {
    const form = Object.assign({}, this.state.form, {
      [field]: str,
    });
    this.setState({form: form});
  }

  register() {
    const self = this;
    if (this.setWarnings().length) return;
    axios.post(server + '/api/register', this.state.form)
      .then(response => {
        self.setRoute('login');
      })
      .catch(err => {
        console.log(err)
      })
  }

  login() {
    const self = this;
    if (this.setWarnings().length) return;
    axios.post(server + '/api/login', this.state.form)
      .then(response => {
        if (response.data.success) self.setRoute('quiz');
        else self.setState({warnings: ['Please check your credentials']});
      })
      .catch(err => {
        console.log(err)
      })
  }

  setWarnings() {
    let warnings = [];
    const form = this.state.form;
    if (!form.email) warnings.push('Email cannot be blank');
    if (!form.password) warnings.push('Password cannot be blank');
    this.setState({warnings: warnings});
    return warnings;
  }

  saveQuizAnswer(val) {
    const self = this;
    const answers = this.state.answers;
    const username = this.state.username;
    answers.push(val);
    this.setState({ answers: answers });
    if (this.state.answers.length === questions.length) {
      const personalityIndex = getUserPersonality(answers);
      const personalityLabel = personalityLabels[personalityIndex];
      axios.post(server + '/setUserPersonality', {
        username: username,
        catpersonality: personalityLabel,
      })
        .then(function (response) {
          self.setRoute('quiz-ended')
        })
        .catch(function (error) {
          self.setRoute('quiz-ended')
        });
    }
  };

  render() {
    return (
      <div id='container'>
        <div className='App'>
          <Navbar setRoute={this.setRoute} />

          {this.state.route === 'register'
            ? <Register
                setField={this.setField}
                register={this.register}
                warnings={this.state.warnings} />
            : null
          }

          {this.state.route === 'login'
            ? <Login
                setField={this.setField}
                setRoute={this.setRoute}
                login={this.login}
                warnings={this.state.warnings} />
            : null
          }

          {this.state.route === 'home'
            ? <Welcome
                setRoute={this.setRoute} />
            : null
          }

          {this.state.route === 'quiz' && this.state.answers.length < questions.length
            ? <Quiz
                saveQuizAnswer={this.saveQuizAnswer}
                questionIndex={this.state.answers.length} />
            : null
          }

          {this.state.route === 'quiz-ended'
            ? <QuizEnded
                answers={this.state.answers}
                username={this.state.username}
                setRoute={this.setRoute}
                form={this.state.form} />
            : null
          }

          {this.state.route === 'animals'
            ? <AnimalCards
                results = {this.state.animals} />
            : null
          }
        </div>
        <Footer
          setRoute={this.setRoute} />
      </div>
    );
  }
}

export default App;