import {
  // Alert,
  // AlertIcon,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  // useDisclosure,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { addUser, addUserSkill } from "../lib/supabasefunctions";
import { useNavigate } from "react-router-dom";

type formInputs = {
  tango: string;
  name: string;
  description: string;
  skill: string;
  githubId?: string;
  qiitaId?: string;
  xId?: string;
};

export const Register = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>();

  // 登録処理
  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    await addUser(
      data.tango,
      data.name,
      data.description,
      data.githubId ?? "",
      data.qiitaId ?? "",
      data.xId ?? ""
    );
    await addUserSkill(data.tango, Number(data.skill));
    // onOpen();
    // setTimeout(() => {
      navigate("/");
    //   onClose();
    // }, 2000);
  };

  return (
    <>
      {/* {isOpen && (
        <Alert status="success" mb="4" maxW="400px" mx="auto">
          <AlertIcon />
          登録が成功しました！
        </Alert>
      )} */}
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize="3xl"
        mt="30px"
        data-testid="title-registerpage"
      >
        新規名刺登録
      </Text>
      <Card maxW="sm" m="auto">
        <CardBody m="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.tango)}>
              <FormLabel htmlFor="tango" fontWeight="bold">
                好きな英単語(ユーザーID) *
              </FormLabel>
              <Input
                id="tango"
                placeholder="好きな英単語を入力してください。"
                data-testid="input-tango"
                {...register("tango", {
                  required: "⚠️英単語は必須入力項目です。",
                  validate: {
                    isEnglish: (value) =>
                      /^[a-zA-Z]+$/.test(value) ||
                      "⚠️英語の単語を入力してください。",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.tango && errors.tango?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="name" fontWeight="bold" mt="15px">
                お名前 *
              </FormLabel>
              <Input
                id="name"
                data-testid="input-name"
                placeholder="お名前を入力してください。"
                {...register("name", {
                  required: "⚠️お名前は必須入力項目です。",
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor="description" fontWeight="bold" mt="15px">
                自己紹介 *
              </FormLabel>
              <Textarea
                id="description"
                placeholder="<h1>htmlタグも使えます</h1>"
                data-testid="input-description"
                {...register("description", {
                  required: "⚠️自己紹介は必須入力項目です。",
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.skill)}>
              <FormLabel htmlFor="skill" fontWeight="bold" mt="15px">
                好きな技術 *
              </FormLabel>
              <Select
                variant="outline"
                placeholder="好きな技術を選んでください"
                data-testid="input-skill"
                {...register("skill", {
                  required: "⚠️スキルは必須入力項目です。",
                })}
              >
                <option value="1">React</option>
                <option value="2">TypeScript</option>
                <option value="3">Github</option>
              </Select>
              <FormErrorMessage>
                {errors.skill && errors.skill.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="github-id" fontWeight="bold" mt="15px">
                Github ID
              </FormLabel>
              <Input
                id="github-id"
                {...register("githubId")}
                data-testid="input-githubId"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="qiita-id" fontWeight="bold" mt="15px">
                Qiita ID
              </FormLabel>
              <Input
                id="qiita-id"
                {...register("qiitaId")}
                data-testid="input-qiitaId"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="x-id" fontWeight="bold" mt="15px">
                X ID
              </FormLabel>
              <Input id="x-id" {...register("xId")} data-testid="input-xId" />
            </FormControl>

            <Text>*は必須入力項目です。</Text>
            <Button
              colorScheme="blue"
              ml="35%"
              mt="5px"
              type="submit"
              data-testid="register-button"
            >
              登録
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};
