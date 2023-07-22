import React from 'react'
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const username = useSelector(state => state.profile.username);
  const website_link = useSelector(state => state.profile.user_website);
  return (
    <>
    <div className=''>userprofile</div>
    <div>Username: {username}</div> {/* Display the username */}
    <div>link: {website_link}</div> {/* Display the username */}
    </>
  )
}

export default UserProfile