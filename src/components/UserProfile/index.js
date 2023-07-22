import React from 'react'
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const username = useSelector(state => state.profile.username);
  return (
    <>
    <div className=''>userprofile</div>
    <div>Username: {username}</div> {/* Display the username */}
    </>
  )
}

export default UserProfile