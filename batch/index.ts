import { supabase } from "../src/lib/supabase";


async function deleteUserData() {
  const startedYesterday = new Date();
  startedYesterday.setDate(startedYesterday.getDate());
  startedYesterday.setUTCHours(0, 0, 0, 0);

  const endedYesterday = new Date();
  endedYesterday.setDate(endedYesterday.getDate());
  endedYesterday.setUTCHours(23, 59, 59, 999);

  const userDeleteResult = await supabase
    .from("users")
    .delete()
    .gte("created_at", startedYesterday.toISOString())
    .lte("created_at", endedYesterday.toISOString());
  console.log("startedYesterday:", startedYesterday);
  console.log("endedYesterday:", endedYesterday);

  console.log("ユーザーデータを削除しました:", userDeleteResult);

  const skillDeleteResult = await supabase
    .from("user_skill")
    .delete()
    .gte("created_at", startedYesterday.toISOString())
    .lte("created_at", endedYesterday.toISOString());

  console.log("スキルデータを削除しました:", skillDeleteResult);
}

deleteUserData()
  .then(() => console.log("削除の実行が完了しました。"))
  .catch((error) => console.error("削除の処理中にエラーが発生しました→", error));