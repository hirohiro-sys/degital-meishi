import { Skill } from './../domain/meishi';
import { User } from "../domain/meishi";
import {supabase}  from "../lib/supabase"


// 該当ユーザーIDのデータを取得する関数
export const getUserData = async (userId: string) => {
    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();
        
    return data;
};
