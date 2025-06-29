import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_USER, GET_USERS } from "../gql"

export const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  })

  const [addUser, { loading, error, data }] = useMutation(ADD_USER, {
    refetchQueries: [GET_USERS]
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, age } = formData
    addUser({
      variables: {
        name,
        email,
        age: parseInt(age, 10)
      }
    })
  }
  
  console.log(data)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange}/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
        <input type="number" name="age" placeholder="Age" onChange={handleChange}/>
        <button type="submit">Add User</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Success: {data.user.name}</p>}
    </div>
  )
}