import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../domain/meishi";
import {
  getUserData,
} from "../lib/supabasefunctions";

function MyCard() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const getUserAllData = async () => {
      if (!id) return;
      setIsLoading(true);
      const userData = await getUserData(id);
      setUser(userData);
      setIsLoading(false);
    };
    getUserAllData();
  }, [id]);

  if (isLoading) return <p>loading...</p>;
  if (!user) return <p>ユーザーが存在しません。user_idを確認してください。</p>;

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          <h1>{user.name}</h1>
          <h1>{user.description}</h1>
          <h1>{user.github_id}</h1>
          <h1>{user.qiita_id}</h1>
          <h1>{user.x_id}</h1>
        </div>
      )}
    </>
  );
}

export default MyCard;
