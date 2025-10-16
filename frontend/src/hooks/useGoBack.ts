import { useNavigate } from "react-router-dom";

function useGoBack() {
    const navigate = useNavigate();
    return () => navigate(-1);
}

export default useGoBack;