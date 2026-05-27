import {

  onAuthStateChanged

} from "firebase/auth"

import { auth } from "../firebase"

import {

  useEffect,
  useState

} from "react"

import {

  Navigate

} from "react-router-dom"

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState(null)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      (currentUser) => {

        setUser(currentUser)

        setLoading(false)

      }

    )

    return () => unsubscribe()

  }, [])

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    )

  }

  if (!user) {

    return <Navigate to="/login" />

  }

  return children

}

export default ProtectedRoute