import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "../components/Home";
import { MemoryRouter } from "react-router-dom";

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  // Navigatorモック
  useNavigate: () => mockedNavigator,
  // useParamsモック
  useParams: () => ({ loginID: "test" }),
}));

describe("トップページのテスト", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  test("タイトルが表示されること", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("title")).toBeInTheDocument()
    );
  });

  test("IDを入力してボタンを押すと/cards/testに遷移する", async () => {
    await userEvent.type(screen.getByTestId("id-input"), "test");
    await userEvent.click(screen.getByTestId("searchButton"));
    expect(mockedNavigator).toHaveBeenCalledWith("/cards/test");
  });

  test("idを入力しないで検索ボタンを押すとエラーメッセージが表示されること", async () => {
    await waitFor(() => {
      screen.getByTestId("searchButton").click();
      expect(
        // ここはstateでエラーメッセージを管理しているためgetByTextで取得
        screen.getByText("⚠️ユーザーIDを入力してください。")
      ).toBeInTheDocument();
    });
  });

  test("新規登録するボタンを押すと/cards/registerに遷移する", async () => {
    await userEvent.click(screen.getByTestId("toRegisterPageButton"));
    expect(mockedNavigator).toHaveBeenCalledWith("/cards/register");
  });
});
