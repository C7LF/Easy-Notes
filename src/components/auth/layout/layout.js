import React from 'react'
import Waves from '../../../static/waves.svg'

import "../layout/layout.scss"

const Layout = ({ children }) => (
    <>
        {children}
        <div className="waves" />
    </>
)

export default Layout