import React from 'react'

function HeaderLayout({ children }) {
  return (
    // <div className="relative min-h-screen overflow-y-auto antialiased inset-0 bg-fixed bg-img2 bg-center bg-cover">
    //   <div className="inset-0 bg-fixed bg-center bg-cover bg-img min-h-screen ">
    <div>
      {children}
    </div>
    //   </div>
    // </div>
  )
}

export default HeaderLayout