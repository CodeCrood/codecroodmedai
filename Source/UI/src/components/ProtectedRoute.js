import React from "react";
import { useUser } from "@clerk/clerk-react";
import LoginModal from "./CardModal"; // Import the LoginModal

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoaded, user } = useUser();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded && !user) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [isLoaded, user]);

  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <>
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      {user ? element : null} {/* Render element if authenticated */}
    </>
  );
};

export default ProtectedRoute;
