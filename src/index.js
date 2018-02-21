import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'




const Statistiikka = () => {
  console.log(store.getState())

  const statistics = store.getState()
  const palautteita = statistics.good + statistics.ok + statistics.bad

  const keskiarvo = (statistics.good - statistics.bad) / palautteita
  const positiivisia = statistics.good / palautteita * 100

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{statistics.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{statistics.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{statistics.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

const store = createStore(reducer)

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
