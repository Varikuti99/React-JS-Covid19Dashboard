import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import StateWiseCovidCases from './components/StateWiseCovidCases'

import './App.css'

const App = () => {
  document.title = 'Covid19Dashboard'
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:stateCode" component={StateWiseCovidCases} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
