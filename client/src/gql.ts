import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query Users {
    users {
      id
      name
      email
      age
    }
  }
`

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      age
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
    }
  }
`

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $age: Int!) {
    user(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`