import React, { useContext, useLayoutEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Button, Image, Input } from "../components";
import { logout, getCurrentUser, updateUserPhoto } from "../utils/firebase";
import { UserContext, ProgressContext } from "../contexts";
import { Alert, ScrollView } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  };

  const _handlePhotoChange = async (url) => {
    try {
      spinner.start();
      const updatedUser = await updateUserPhoto(url);
      setPhotoUrl(updatedUser.photoUrl);
    } catch (e) {
      Alert.alert("Photo Error", e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <ScrollView>
      <Container>
        <Image
          url={photoUrl}
          onChangeImage={_handlePhotoChange}
          showButton
          rounded
        />
        <Input label="나의 학기 수" value={user.name} disabled />
        <Input label="신앙 및 세계관" value="성경의 이해" disabled />
        <Input label="인성 및 리더십" value="한동인성교육" disabled />
        <Input label="영어1" value="English Foundation" disabled />
        <Input label="자연과학" value="Calculus 1" disabled />
        <Input label="ICT 융합 기초" value="ICT 응용 입문" disabled />
        <Input label="전문교양" value="경영학 입문" disabled />
        <Input label="자유선택(교양)" value="일본어 1" disabled />
        <Input label="전공" value="컴퓨터 구조" disabled />
        <Button
          title="정보 수정하기"
          onPress={_handleLogoutButtonPress}
          containerStyle={{
            marginTop: 30,
            backgroundColor: theme.buttonLogout,
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default Profile;
