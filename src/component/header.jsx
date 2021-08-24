import React from 'react';
import logo from '../assets/images/images 1.png'
 const Header=()=>{
   return(
     <header className="header">
     <nav>
       <div className="logo">
        <img src={logo} alt="todoimage"></img>
       </div>
     </nav>

     </header>
   )
 }

export default Header;