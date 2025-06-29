import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useAppContext } from "../contexts/AppContext";
import { LoginAPI } from "../apiClient";
import { useNavigate } from "react-router-dom";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormData>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: LoginAPI,
    onSuccess: async () => {
      showToast({
        toastmsg: "Logged In Successfully",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error.message);
      showToast({ toastmsg: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex items-center  flex-col gap-5">
      <h2 className="text-3xl font-bold">Login</h2>
      <div className=" flex flex-col gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          E-mail
          <input
            {...register("email", { required: "Email is required" })}
            className="border  w-full py-1 px-2 font-normal"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 6,
                message: "password length should be atleast 6",
              },
            })}
            className="border  w-full py-1 px-2 font-normal"
            type="text"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </label>
        <span>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </span>
      </div>
    </form>
  );
};

export default Login;
