import { useEffect } from 'react';
import usePostPutPatchDelete from '../../hooks/usePostPutPatchDelete';
import AuthService from '../../utils/Auth';

const DeleteAccount: React.FC<{ token: string }> = ({ token }) => {
  const { data, error, loading, sendRequest } = usePostPutPatchDelete<
    undefined, // No body for DELETE
    { message: string }
  >('user', 'DELETE', { Authorization: `Bearer ${token}` });

  // Automatically redirect 2.5s after successful deletion
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => AuthService.logout(), 2500);
      return () => clearTimeout(timer); // Cleanup in case the component unmounts early
    }
  }, [data]);

  return (
    <>
      <h3>DANGER ZONE</h3>
      {/* No body for DELETE */}
      <button type='button' onClick={() => sendRequest(undefined)}>
        Delete account
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to delete account: {error.message}</p>}
      {data && <p>Successfully deleted account, redirecting...</p>}
    </>
  );
};

export default DeleteAccount;
