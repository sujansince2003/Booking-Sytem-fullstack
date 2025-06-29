import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../apiClient";

export type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: registerAPI,
    onSuccess: async () => {
      console.log("registered");
      showToast({ toastmsg: "Registered Successfully", type: "SUCCESS" });
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
    <form onSubmit={onSubmit} className="flex flex-col gap-5" action="">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded-xl w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "First Name is required" })}
            type="text"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            {...register("lastName", { required: "LastName is required" })}
            className="border rounded-xl w-full py-1 px-2 font-normal"
            type="text"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName?.message}</p>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        E-mail
        <input
          {...register("email", { required: "Email is required" })}
          className="border rounded-xl w-full py-1 px-2 font-normal"
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
          className="border rounded-xl w-full py-1 px-2 font-normal"
          type="text"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Passwords do not match";
              }
            },
          })}
          className="border rounded-xl w-full py-1 px-2 font-normal"
          type="text"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create account
        </button>
      </span>
    </form>
  );
};

export default Register;
