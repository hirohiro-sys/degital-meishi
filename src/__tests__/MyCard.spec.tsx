import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MyCard from "../components/MyCard";
import { getSkillData, getSkillId, getUserData } from "../lib/supabasefunctions";
import userEvent from "@testing-library/user-event";

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

// モックデータの作成
const mockUser = {
  id: "123",
  name: "テストユーザー",
  description: "テストユーザーの自己紹介",
  github_id: "test-github",
  qiita_id: "test-qiita",
  x_id: "test-x"
};

const mockSkill = {
  skill_id: "1",
  name: "テストスキル"
};

// モック関数の設定
jest.mock("../lib/supabasefunctions", () => ({
  getUserData: jest.fn(),
  getSkillId: jest.fn(),
  getSkillData: jest.fn()
}));

describe("トップページのテスト", () => {
  beforeEach(() => {
    (getUserData as jest.Mock).mockResolvedValue(mockUser);
    (getSkillId as jest.Mock).mockResolvedValue([{ skill_id: "1" }]);
    (getSkillData as jest.Mock).mockResolvedValue(mockSkill);
    render(
      <MemoryRouter initialEntries={['/cards/sample-id']}>
        <Routes>
          <Route path="/cards/:id" element={<MyCard />} />
        </Routes>
      </MemoryRouter>
    );
  });
  

  test("名前が表示されていること", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toBeInTheDocument();
    });
  });

  test("自己紹介が表示されていること", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("user-description")).toBeInTheDocument();
    });
  });

  test("スキルが表示されていること", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("user-skill")).toBeInTheDocument();
    });
  });

  test("githubのアイコンが表示されていること", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("github-icon")).toBeInTheDocument();
    });
  });

  test("qiitaのアイコンが表示されていること", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("qiita-icon")).toBeInTheDocument();
    });
  });

  test("xのアイコンが表示されていること", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
    });
  });

  test("戻るボタンを押すとトップページに遷移すること", async () => {
    const backButton = await screen.findByTestId("back-button");
    await userEvent.click(backButton);
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
