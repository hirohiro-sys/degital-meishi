import { Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [userId, setUserId] = useState<string>("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const onClickFindUser = () => {
    if (userId === "") {
      setErrorText("⚠️ユーザーIDを入力してください。");
      return;
    }
    navigate("/cards/" + userId);
  };

  const onClickToRegisterPage = () => {
    navigate("/cards/register");
  };

  return (
    <>
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize="3xl"
        mb="-250px"
        mt="250px"
        data-testid="title"
      >
        デジタル名刺アプリ
      </Text>
      <Card maxW="sm" m="auto" mt="15%">
        <CardBody>
          <Text fontWeight="bold">id</Text>
          <Input
            placeholder="ユーザーIDを入力してください。"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            data-testid="id-input"
          />
          {errorText && (
            <Text color="red.500" mt="2">
              {errorText}
            </Text>
          )}
        </CardBody>
        <Button
          w="80%"
          ml="35px"
          colorScheme="teal"
          onClick={onClickFindUser}
          data-testid="searchButton"
        >
          名刺を見る
        </Button>
        <Button
          w="80%"
          ml="35px"
          colorScheme="white"
          color="teal"
          border="2px solid teal"
          mt="10px"
          mb="10px"
          onClick={onClickToRegisterPage}
          data-testid="toRegisterPageButton"
        >
          新規登録する
        </Button>
      </Card>
    </>
  );
};
