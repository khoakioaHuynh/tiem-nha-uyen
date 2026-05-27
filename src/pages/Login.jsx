import { useState } from "react"

import {

  signInWithEmailAndPassword

} from "firebase/auth"

import { auth } from "../firebase"

import { useNavigate } from "react-router-dom"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      await signInWithEmailAndPassword(

        auth,
        email,
        password

      )

      navigate("/admin")

    }

    catch (error) {

      alert("Sai tài khoản hoặc mật khẩu")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#F5F1EC]">

      <div className="bg-white p-8 rounded-3xl w-[350px]">

        <h1 className="text-3xl font-black text-[#7A3200] mb-6 text-center">

          Admin Login

        </h1>

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

          className="w-full p-4 rounded-2xl bg-[#F5F1EC] outline-none mb-4"

        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) => setPassword(e.target.value)}

          className="w-full p-4 rounded-2xl bg-[#F5F1EC] outline-none mb-4"

        />

        <button

          onClick={handleLogin}

          className="w-full bg-[#FF6B35] text-white py-4 rounded-2xl font-bold"

        >

          Đăng nhập

        </button>

      </div>

    </div>

  )

}

export default Login