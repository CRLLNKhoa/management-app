import Alert from "@/components/appComponents/Alert";
import { supabase } from "@/supabaseClient";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Auth } from "@/contexts/authContext";
import { toast } from "react-toastify";

function Register() {
    const router = useRouter()
    const [error, setError] = useState(false);
    const [errorMessage, seterrorMessage] = useState("")
    const {setAuth} = useContext(Auth)
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });
  
    const mutation = useMutation({
      mutationFn: (newTodo) => {
        return supabase
        .from('user')
        .insert(
          { email:account.email, password: account.password },
        ).select("id")
      },
    });
    const handleLogin = () => {
      mutation.mutate();
    };
  
    const { data, isLoading,isError } = mutation;

    useEffect(() => {
        if(data?.data?.length > 0){
            toast.success("Register success!")
            router.push("/login")
        }
        if(data?.status === 409){
            toast.error("Email already exist!")
        }
    }, [data]);
  return (
    <div className="hero h-full">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
          a id nisi.
        </p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              className="input input-bordered"
              value={account.email}
              onChange={(e) => setAccount({...account,email: e.target.value})}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              value={account.password}
              onChange={(e) => setAccount({...account,password: e.target.value})}
            />
          </div>
          {error && <Alert text={errorMessage} />}
          <div className="form-control mt-6">
            <button
              disabled={isLoading}
              onClick={handleLogin}
              className="btn btn-primary"
            >
              {isLoading && (
                <span className="loading loading-infinity loading-md"></span>
              )}
              {isLoading ? "Creating..." : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register