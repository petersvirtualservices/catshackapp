import React from 'react';

class Welcome extends React.Component {
  render() {
    return (
      <div id='welcome'>
        <h2>Where Fur Pals Can Get Together</h2>
        <p>We joke about how cats love us when we are needed elsewhere, but in truth, we would not trade that type of demanding behavior for anything in the world; in fact, even when that truth has been stereotypically ingrained in our rationale, we still run to local animal shelters and pet stores to buy these lovable creatures. </p>
        <p>The Cat Shack is designed to help make that transition smoother. After you take our in-depth, under-utilizing scientific quiz, you will be paired with a cat personality that will help guide you through your decision.</p>
        <div className='center space'>
          <button id='startQuiz' onClick={() => {this.props.setRoute('login')}}>Start The Quiz</button>
        </div>
      </div>
    )
  }
}

export default Welcome