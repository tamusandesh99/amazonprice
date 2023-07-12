import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Register } from '../../actions/auth'

const Register = () => {
    const [formData, setFormData] = setState({
        usernamme: '',
        password: '',
        email: ''
    })

    const {username, password, email} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})


    const onSubmit = e => {
        e.preventDefaut()
        
    } 

  return (
    <div>index</div>
  )
}

export default connect(null)(Register)