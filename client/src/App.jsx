import { useMutation, useQuery } from "@apollo/client";
import { UserForm } from "./components/user-form";
import { GET_USERS, GET_USER, DELETE_USER } from "./gql";

function App() {
    const { data, loading, error } = useQuery(GET_USERS)
    const {
      data: userData,
      loading: userLoading,
      error: userError
    } = useQuery(GET_USER, {
      variables: { id: "1" }
    })
    const [onDelete, { loading: loadingDelete, error: deleteError, data: deletedUser }] = useMutation(DELETE_USER, {
      refetchQueries: [GET_USERS]
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if (userLoading) return <p>Loading...</p>
    if (userError) return <p>Error: {userError.message}</p>

    return (
      <>
        {loadingDelete && <p>Loading...</p>}
        {deleteError && <p>Error: {deleteError.message}</p>}
        {deletedUser && <p>Deleted: {deletedUser.deleteUser.name}</p>}
        <h1>Users</h1>
        <ul>
          {data.users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.age}
              <button onClick={() => onDelete({ variables: { id: user.id } })}>Delete</button>
            </li>
          ))}
        </ul>

        <h1>Choose User</h1>
        <p>{userData.user.name}</p>
        <p>{userData.user.email}</p>
        <p>{userData.user.age}</p>

        <h2>Add User</h2>
        <UserForm />
      </>
    )
}

export default App
