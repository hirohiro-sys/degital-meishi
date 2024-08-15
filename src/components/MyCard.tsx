import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skill, User } from "../domain/meishi";
import {
  getUserData,
  getSkillId,
  getSkillData
} from "../lib/supabasefunctions";

function MyCard() {
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
        const skillData = await getSkillData(Number(skillId));
        setSkill(skillData);
      }

      setIsLoading(false);
    }
    
    getUserAllData();
  }, [id]);

  if (isLoading) return <p>loading...</p>;
  if (!user) return <p>ユーザーが存在しません。user_idを確認してください。</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.description}</h2>
      <h3>{user.github_id}</h3>
      <h3>{user.qiita_id}</h3>
      <h3>{user.x_id}</h3>
      <h3>{skill ? skill.name : "スキルが見つかりませんでした。"}</h3>
    </div>
  );
}

export default MyCard;