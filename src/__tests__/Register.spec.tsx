import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Register } from "../components/Register";

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  // Navigatorモック
  useNavigate: () => mockedNavigator
}));

jest.mock("../lib/supabasefunctions", () => {
    return {
    // DBに影響を与えないようにモック化
    addUser: jest.fn(),
    addUserSkill: jest.fn(),
    };
  });

describe("名刺登録ページのテスト", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  });

  test("タイトルが表示されていること", () => {
    expect(screen.getByTestId("title-registerpage")).toBeInTheDocument();
  });

  test("必須フィールドのバリデーションテスト", async () => {
    await userEvent.click(screen.getByTestId("register-button"));
    expect(
      await screen.findByText("⚠️英単語は必須入力項目です。")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("⚠️お名前は必須入力項目です。")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("⚠️自己紹介は必須入力項目です。")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("⚠️スキルは必須入力項目です。")
    ).toBeInTheDocument();
  });

  test("全項目を入力して登録ボタンを押すと、/に遷移すること", async () => {
    await userEvent.type(screen.getByTestId("input-tango"), "test");
    await userEvent.type(screen.getByTestId("input-name"), "test");
    await userEvent.type(screen.getByTestId("input-description"), "test");
    await userEvent.selectOptions(
      screen.getByTestId("input-skill"),
      screen.getByRole("option", { name: "React" })
    );    
    await userEvent.type(screen.getByTestId("input-githubId"), "test");
    await userEvent.type(screen.getByTestId("input-qiitaId"), "test");
    await userEvent.type(screen.getByTestId("input-xId"), "test");
    await userEvent.click(screen.getByTestId("register-button"));
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });

  test("オプションを入力しなくても登録できる", async () => {
    await userEvent.type(screen.getByTestId("input-tango"), "test");
    await userEvent.type(screen.getByTestId("input-name"), "test");
    await userEvent.type(screen.getByTestId("input-description"), "test");
    await userEvent.selectOptions(
      screen.getByTestId("input-skill"),
      screen.getByRole("option", { name: "React" })
    );
    await userEvent.click(screen.getByTestId("register-button"));
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
