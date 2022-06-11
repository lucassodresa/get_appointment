import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedUserInfoState } from 'recoil/user';

import { StyledAvatar, StyledAvatarContainer, StyledName } from './styles';

const AvatarContainer = () => {
  const userInfo = useRecoilValue(loggedUserInfoState);

  return (
    <StyledAvatarContainer>
      {userInfo?.avatar ? (
        <StyledAvatar size={75} src={userInfo?.avatar} />
      ) : (
        <StyledAvatar size={75}>{userInfo?.name?.[0]}</StyledAvatar>
      )}

      <StyledName>{userInfo?.name}</StyledName>
      <Link to="/profile">Profile</Link>
    </StyledAvatarContainer>
  );
};

export default AvatarContainer;
