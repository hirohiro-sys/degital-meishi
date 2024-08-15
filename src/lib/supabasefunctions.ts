// import { Skill } from './../domain/meishi';
// import { User } from "../domain/meishi";
import { supabase }  from "../lib/supabase"


// 該当ユーザーIDのデータを取得する関数
export const getUserData = async (id:string) => {
    const { data,error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

        if (error) {
            if (error.code === 'PGRST116') { // エラーコードが特定のものか確認
                throw new Error('ユーザーIDがデータベースに存在しないか、同一のユーザーIDが存在します。');
            } else {
                console.error('ユーザーIDが取得できていません。', error);
                throw new Error('ユーザー情報の取得中にエラーが発生しました。');
            }
        }
    return data;
};

// 中間テーブルをuser_idで検索して、ユーザーに紐づいているskill_idを取得する関数
export const getSkillId = async (userId: string) => {
    const { data } = await supabase
        .from("user_skill")
        .select("skill_id")
        .eq("user_id",userId)
    return data;
}

// skill_idを元にskillテーブルからスキルを取得する関数
export const getSkillData = async (skill_id:number) => {
    const { data,error } = await supabase
        .from("skills")
        .select("*")
        .eq("id",skill_id)
        .single()
        if (error) {
            console.error('スキル情報が取得できていません。', error);
            throw new Error('スキル情報の取得中にエラーが発生しました。');
        }
    return data;

}
