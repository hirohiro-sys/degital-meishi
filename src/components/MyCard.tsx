import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Skill, User } from "../domain/meishi";
import {
  getUserData,
  getSkillId,
  getSkillData,
} from "../lib/supabasefunctions";
import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";

function MyCard() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [skill, setSkill] = useState<Skill | null>(null);

  // ユーザー情報を取得する処理
  useEffect(() => {
    const getUserAllData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      const userData = await getUserData(id);
      setUser(userData);
      const skillId = await getSkillId(id);
      if (skillId !== null) {
        const skillData = await getSkillData(skillId[0].skill_id);
        setSkill(skillData);
      }
      setIsLoading(false);
    };

    getUserAllData();
  }, [id]);

  if (isLoading)
    return (
      <Center height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  if (!user) return <p>ユーザーが存在しません。user_idを確認してください。</p>;

  return (
    <>
      <Card maxW="sm" m="auto" mt="15%" data-testid="card">
        <CardBody m="auto">
          <Text
            fontWeight="bold"
            fontSize="2xl"
            mb="20px"
            data-testid="user-name"
          >
            {user.name}
          </Text>
          <Text fontWeight="bold">自己紹介</Text>
          <div
            dangerouslySetInnerHTML={{ __html: user.description }}
            data-testid="user-description"
          />
          <Text fontWeight="bold" mt="20px">
            好きな技術
          </Text>
          <Text data-testid="user-skill">
            {skill ? skill.name : "スキルが見つかりませんでした。"}
          </Text>
          <Flex gap="9" mt="20px">
            <Text fontSize="3xl">
              {user.github_id && (
                <a
                  href={`https://github.com/${user.github_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub data-testid="github-icon" />
                </a>
              )}
            </Text>
            <Text fontSize="3xl">
              {user.qiita_id && (
                <a
                  href={`https://qiita.com/${user.qiita_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiQiita data-testid="qiita-icon" />
                </a>
              )}
            </Text>
            <Text fontSize="3xl">
              {user.x_id && (
                <a
                  href={`https://x.com/${user.x_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSquareXTwitter data-testid="x-icon" />
                </a>
              )}
            </Text>
          </Flex>
        </CardBody>
      </Card>
      <Center>
        <Button
          colorScheme="teal"
          mt="10px"
          onClick={() => navigate("/")}
          data-testid="back-button"
        >
          戻る
        </Button>
      </Center>
    </>
  );
}

export default MyCard;
