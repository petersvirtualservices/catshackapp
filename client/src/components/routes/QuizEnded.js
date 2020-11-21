import React from 'react';
import { personalities, personalityLabels, getUserPersonality } from '../../lib';

class QuizEnded extends React.Component {
  render() {
    const maxKey = getUserPersonality(this.props.answers);
    return (
      <div id='final-screen'>
        <h2 id='results'>{this.props.form.name ? this.props.form.name + ', ' : ''}your quiz results identify you as personality type:
          <br />
          {personalityLabels[maxKey]}</h2>
        <img alt='User Personality Cat' src={personalities[maxKey]} />
        <br />
        <button onClick={() => { this.props.setRoute('animals') }}>Find similar cats in a shelter near you</button>
        <br />
        <h2> Want to try again?</h2>
        <button onClick={() => { this.props.setRoute('home') }}>Start The Quiz</button>
      </div>
    )
  }
}


export default QuizEnded