import React from 'react';
import {FaInbox,FaCalendarAlt,FaRegCalendar} from 'react-icons/fa';
 const SideBar=({selectedTab, setSelectedTab})=>{
   console.log({selectedTab});
   return(
     <div className="sidebar">
      <div className={"active"} onClick={()=>setSelectedTab("INBOX")}><FaInbox className="icon"/>
      Inbox
      </div>
      <div onClick={()=>setSelectedTab("TODAY")}><FaCalendarAlt className="icon"/>Today</div>
      <div onClick={()=>setSelectedTab("NEXT_7")}><FaRegCalendar className="icon"/>Next 7 days</div>
      
     </div>
   )
 }

export default SideBar;