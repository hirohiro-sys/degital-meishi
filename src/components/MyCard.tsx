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
      console.log(skillId);
      if (skillId !== null) {
        const skillData = await getSkillData(skillId[0].skill_id);
        console.log(skillData);
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
      <h1>{user.description}</h1>
      <h1>{skill ? skill.name : "スキルが見つかりませんでした。"}</h1>
      <h1>{user.github_id}</h1>
      <h1>{user.qiita_id}</h1>
      <h1>{user.x_id}</h1>
    </div>
  );
}

export default MyCard;