import { render, screen, waitFor } from "@testing-library/react";
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
    await waitFor(()=>expect(screen.getByTestId("user-name")).toBeInTheDocument());
  });

  test("自己紹介が表示されていること", async () => {
    await waitFor(()=>expect(screen.getByTestId("user-description")).toBeInTheDocument());
  })

  test("スキルが表示されていること", async () => {
    await waitFor(()=>expect(screen.getByTestId("user-skill")).toBeInTheDocument());
  })

  test("githubのアイコンが表示されていること", async () => {
    await waitFor(()=>expect(screen.getByTestId("github-icon")).toBeInTheDocument());
  })
  test("qiitaのアイコンが表示されていること", async () => { 
    await waitFor(()=>expect(screen.getByTestId("qiita-icon")).toBeInTheDocument());
  })
  test("xのアイコンが表示されていること", async () => { 
    await waitFor(()=>expect(screen.getByTestId("x-icon")).toBeInTheDocument());
  })
  test("戻るボタンを押すとトップページに遷移すること", async () => {
    await waitFor(() => screen.getByTestId("back-button"));
    await userEvent.click(screen.getByTestId("back-button"));
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
