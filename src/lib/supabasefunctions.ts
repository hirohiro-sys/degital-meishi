// import { Skill } from './../domain/meishi';
// import { User } from "../domain/meishi";
import { supabase }  from "../lib/supabase"


// 該当ユーザーIDのデータを取得する関数
export const getUserData = async (id: string) => {
    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
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
export const getSkillData = async (skill_id: number) => {
    const { data } = await supabase
        .from("skils")
        .select("*")
        .eq("id",skill_id)
        .single()
    return data;
}
