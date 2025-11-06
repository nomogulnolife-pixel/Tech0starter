Step3-1　宿題パッケージstarterの課題対応後アプリです

Next.js の起動
　npm rn dev

  仮想環境有効化　source venv/bin/activate
  (
    http://localhost:3000
  )

FastAPIの起動
　uvicon app:app -reload
  (
    http://127.0.0.1:8000
  )

##  TECH0 3-1 課題
　UI の実装は以下
　frontend/"src/app"/page.jsx
　処理ごとの関数定義　
　バックエンド呼び出し処理

  フロントエンドから呼び出された各処理が記述されている
　backend/app.py

 ①
以下
3つのコンポーネントがローカル環境で正常に動くようNext.js、
FastAPIを立ち上げてください
✓GETリクエストを送信→”サーバーからのGET応答〜“確認
✓数値を2倍するリクエストを送信→2倍された数値が表示されることを確認
✓POSTリクエストを送信→送信したメッセージがechoされることを確認
rontend/"src/app"/page.jsx にて実装


②
GETリクエストを送信のメッセージを変更
Hello World byFastAPI→Hello!氏名になるようコードを修正してください
app.pyにて実装

③
「数値を2で割るリクエストを送信」コンポーネントを追加してください
rontend/"src/app"/page.jsx にGET追加
app.pyにて処理部実装