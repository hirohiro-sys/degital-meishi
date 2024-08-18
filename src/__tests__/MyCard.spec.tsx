import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MyCard from "../components/MyCard";
import userEvent from "@testing-library/user-event";

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("トップページのテスト", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/cards/sample-id']}>
        <Routes>
          <Route path="/cards/:id" element={<MyCard />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test("名前が表示されていること", async () => {
    const userName = await screen.findByTestId("user-name");
    expect(userName).toBeInTheDocument();
  });

  test("自己紹介が表示されていること", async () => {
    const userDescription = await screen.findByTestId("user-description");
    expect(userDescription).toBeInTheDocument();
  });

  test("スキルが表示されていること", async () => {
    const userSkill = await screen.findByTestId("user-skill");
    expect(userSkill).toBeInTheDocument();
  });

  test("githubのアイコンが表示されていること", async () => {
    const githubIcon = await screen.findByTestId("github-icon");
    expect(githubIcon).toBeInTheDocument();
  });

  test("qiitaのアイコンが表示されていること", async () => {
    const qiitaIcon = await screen.findByTestId("qiita-icon");
    expect(qiitaIcon).toBeInTheDocument();
  });

  test("xのアイコンが表示されていること", async () => {
    const xIcon = await screen.findByTestId("x-icon");
    expect(xIcon).toBeInTheDocument();
  });

  test("戻るボタンを押すとトップページに遷移すること", async () => {
    const backButton = await screen.findByTestId("back-button");
    await userEvent.click(backButton);
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
