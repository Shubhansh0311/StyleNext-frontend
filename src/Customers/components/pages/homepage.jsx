import React from 'react'
import MainCarousel from '../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../homeSectionCarousel/HomeSectionCarousel'
import { mens, womens } from '../homeSectionCarousel/homeCarouselData'
import Footer from '../Footer/Footer'


const Homepage = () => {
    const men=mens
    const women=womens
  return (
    <div className="">

  <MainCarousel/>
  <div className="space-y-10 py-10 flex flex-col justify-center lg:px-3 px-3">
    <HomeSectionCarousel  sectionName="Men's" data={men}/>
    <HomeSectionCarousel sectionName="Women's" data={women}/>
    {/* <HomeSectionCarousel sectionName="kid's wear"/> */}
  </div>
  <Footer/>
    </div>

  
  )
}

export default Homepage