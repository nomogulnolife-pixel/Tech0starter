```mermaid
flowchart TD

%% 改行を有効にするクラス
classDef wrap white-space: pre-wrap;

%% === ブラウザ側（フロントエンド） ===
subgraph Frontend[" Next.js フロントエンド"]
    A1["① ユーザーが『GETリクエストを送信』ボタンをクリック"]:::wrap --> B1["バックエンドの処理にむけてfetch('http://localhost:8000/api/hello')実行"]:::wrap
    A2["② ユーザーが『IDを指定して送信』ボタンをクリック"]:::wrap --> B2["バックエンドの処理にむけて指定したID（引数）を入れてfetch('http://localhost:8000/api/multiply/{id}')実行"]:::wrap
    A3["③ ユーザーが『POSTリクエストを送信』ボタンをクリック"]:::wrap --> B3["バックエンドの処理にむけて指定したID（引数）を入れてfetch('http://localhost:8000/api/echo', { method:'POST', body: JSON.stringify({message}) })実行"]:::wrap
end

%% === バックエンド側（FastAPI） ===
subgraph Backend[" FastAPI バックエンド"]
    C1["フロントエンドから呼び出された/api/hello エンドポイントから処理実行"]:::wrap --> D1["GETからのメッセージを返すreturn {'message': 'Hello World by FastAPI'}"]:::wrap
    C2["フロントエンドから呼び出された/api/multiply/{id} エンドポイントから処理実行"]:::wrap --> D2["引数から計算を行い、結果を返すdoubled_value = id * 2 → return {'doubled_value': doubled_value}"]:::wrap
    C3["フロントエンドから呼び出された/api/echo エンドポイントから処理実行"]:::wrap --> D3["Postされたメッセージを返すreturn {'message': f'echo: {message}'}"]:::wrap
end

%% === 通信の流れ ===
B1 -->|HTTP GET| C1
D1 -->|JSON 応答| E1["Next.js が setGetMessage に格納 → 画面表示"]:::wrap

B2 -->|HTTP GET| C2
D2 -->|JSON 応答| E2["Next.js が setMultiplyResult に格納 → 画面表示"]:::wrap

B3 -->|HTTP POST| C3
D3 -->|JSON 応答| E3["Next.js が setPostResult に格納 → 画面表示"]:::wrap

