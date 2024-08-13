import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className=" text-center text-lg-start">
  {/* <!-- Copyright --> */}
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © 2024 Copyright: {"  "}
    <a className="text-body" target='_blank' href="https://techverzsolutions.com">Techverz</a>
  </div>
  {/* <!-- Copyright --> */}
</footer>
    </>
  )
}

export default Footer