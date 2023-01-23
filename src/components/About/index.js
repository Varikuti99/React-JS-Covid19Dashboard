import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FaqList from '../FaqList'
import FactsList from '../FactsList'

import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    faqData: {},
    factsData: {},
  }

  // STEP 1:
  componentDidMount() {
    this.getAllAboutData()
  }

  renderLoadingView = () => (
    <>
      <div className="loader-container" testid="aboutRouteLoader">
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </>
  )

  // STEP 2: Here we going to fetch data from url and we going to update state
  getAllAboutData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updateFactoidsData = data.factoids.map(each => ({
        banner: each.banner,
        id: each.id,
      }))
      const updateFaqsData = data.faq.map(each => ({
        answer: each.answer,
        category: each.category,
        qno: each.qno,
        question: each.question,
      }))
      this.setState({
        faqData: updateFaqsData,
        factsData: updateFactoidsData,
        isLoading: false,
      })
    } else {
      console.log('data not available')
    }
  }

  // STEP 3: Here we are sending props to create faq,facts as resuable component
  renderAllData = () => {
    const {faqData, factsData} = this.state
    return (
      <>
        <ul testid="faqsUnorderedList" className="fact-list">
          {faqData.map(each => (
            <FaqList
              key={each.qno}
              answer={each.answer}
              question={each.question}
            />
          ))}
        </ul>

        <h1 className="about-vaccine-title">Facts</h1>
        <ul className="fact-list">
          {factsData.map(each => (
            <FactsList key={each.id} banner={each.banner} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="about-main-container">
          {isLoading ? (
            this.renderLoadingView()
          ) : (
            <div className="about-content-container">
              <h1 className="about-title">About</h1>
              <p className="about-description">
                Last update on march 28th 2021.
              </p>
              <p className="about-vaccine-title">
                COVID-19 vaccines be ready for distribution
              </p>
              <div className="fact-list">{this.renderAllData()}</div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default About
