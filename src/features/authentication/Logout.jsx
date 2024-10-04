import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useMutateData from "../../hooks/useMutateData";
import { logoutApi } from "../../services/apiAuth";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Logout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: logout } = useMutateData(
    logoutApi,
    "Logged out successfully",
    ["user"]
  );

  function handleLogout() {
    logout(
      {},
      {
        onSuccess: () => {
          queryClient.removeQueries();
          navigate("/login", { replace: true });
        },
      }
    );
  }

  return (
    <ButtonIcon onClick={handleLogout} aria-label="logout button">
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
