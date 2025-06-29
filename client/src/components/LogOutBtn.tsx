import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutAPI } from "../apiClient/logout-api-client";
import { useAppContext } from "../contexts/AppContext";

const LogOutBtn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: LogoutAPI,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ toastmsg: "Logged Out Successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ toastmsg: "Error Logging Out", type: "ERROR" });
    },
  });
  function handleLogout() {
    mutation.mutate();
  }
  return (
    <button
      onClick={handleLogout}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      LogOut
    </button>
  );
};

export default LogOutBtn;
