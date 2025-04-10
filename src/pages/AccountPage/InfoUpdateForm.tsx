import { useEffect, useState } from 'react';
import usePostPutPatchDelete from '../../hooks/usePostPutPatchDelete';
import { UserInfoField, UserSignupUpdateResponse } from '../../types';
import AuthService from '../../utils/Auth';

type InfoUpdateFormProps = {
  field: UserInfoField;
  setUpdatingInfo: (updatingInfo: UserInfoField | null) => void;
  token: string;
};

const InfoUpdateForm: React.FC<InfoUpdateFormProps> = ({ field, setUpdatingInfo, token }) => {
  const [newInfo, setNewInfo] = useState('');
  const { data, error, loading, sendRequest } = usePostPutPatchDelete<
    Record<UserInfoField, string>,
    UserSignupUpdateResponse
  >('user', 'PATCH', { Authorization: `Bearer ${token}` });

  // Automatically log out 2.5s after successful update (causes redirect)
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => AuthService.logout(), 2500);
      return () => clearTimeout(timer); // Cleanup in case the component unmounts early
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Determining this is type safe because field is constrained to be a non-null UserInfoField
    sendRequest({ [field]: newInfo } as Record<UserInfoField, string>);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          New {field}:{' '}
          <input
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
            type={field === 'email' || field === 'password' ? field : 'text'}
            required
            autoFocus
          />
        </label>
        <br />
        <button type='submit'>Submit</button>
        <button type='button' onClick={() => setUpdatingInfo(null)}>
          Cancel
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to update info: {error.message}</p>}
      {data && <p>Successfully updated {field}, redirecting...</p>}
      <br />
    </>
  );
};

export default InfoUpdateForm;
