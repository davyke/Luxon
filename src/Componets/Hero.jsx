import React from 'react'

const Hero = () => {
  return (
   <div>
     <section className="intro" data-scroll-section>
        <h1>This is the Introduction section</h1>
    </section>
    <section className="contents" data-scroll-section>
        <h1>I Love React</h1>
    </section>
    <section className="footer" data-scroll-section>
        <h1>Let's end the application with this Footer</h1>
    </section>    

   </div>
  )
}

export default Hero