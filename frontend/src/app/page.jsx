'use client';
import { useState } from 'react';

export default function Home() {
  // useStateを使った値（状態）管理
  const [getMessage, setGetMessage] = useState('');
  const [multiplyNumber, setMultiplyNumber] = useState('');
  const [multiplyResult, setMultiplyResult] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [postResult, setPostResult] = useState('');

  // Must課題②:割り算用のuseState関数を追加
  const [multiplyNumber2, setMultiplyNumber2] = useState('');
  const [multiplyResult2, setMultiplyResult2] = useState('');

  // Want課題①:文字列カウント用のuseStateを追加
 const [multiplyCount, setMultiplyCount] = useState('');
 const [multiplyResult3, setMultiplyResult3] = useState('');


  // FastAPIのエンドポイント設定
  const handleGetRequest = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hello');
      const data = await response.json();
      setGetMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMultiplyRequest = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/multiply/${multiplyNumber}`);
      const data = await response.json();
      setMultiplyResult(data.doubled_value.toString());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Must課題②:割り算用の関数追加
  
  const handleMultiplyRequest2 = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/multiply2/${multiplyNumber2}`);
      const data = await response.json();
      setMultiplyResult2(data.halfed_value.toString());
    } catch (error) {
      console.error('Error:', error);
    }
  };



　// Want課題①:文字列カウント用の関数を追加
  const handleMultiplyRequest3 = async () => {
    if (!multiplyCount) {
    console.warn("⚠️ multiplyCount が未入力のため、リクエストを送信しません。");
    return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/count/${multiplyCount}`);
      const data = await response.json();
        setMultiplyResult3(data.text_length.toString());
     } catch (error) {
      console.error('Error:', error);
      }
    };



  const handlePostRequest = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/echo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: postMessage }),
      });
      const data = await response.json();
      setPostResult(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ユーザーインターフェースの構築
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Next.jsとFastAPIの連携アプリ</h1>
      <div className="space-y-8">
        {/* GETリクエスト */}

        {/* Must課題①-2:
          　・変更前：サーバーからのGET応答: Hello World by FastAPI
          　・変更後：サーバーからのGET応答: Hello レゴ（自身の氏名）*/}
        <section>
          <h2 className="text-xl font-bold mb-4">GETリクエストを送信</h2>
          <button
            onClick={handleGetRequest}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            GETリクエストを送信
          </button>
          {getMessage && (
            <p className="mt-2">サーバーからのGET応答: {getMessage}</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">IDを指定してGETリクエストを送信 2をかける</h2>
          <div className="flex gap-2">
            <input
              type="number"
              value={multiplyNumber}
              onChange={(e) => setMultiplyNumber(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleMultiplyRequest}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              送信
            </button>
          </div>
          {multiplyResult && (
            <p className="mt-2">FastAPIからの応答 ID*2: {multiplyResult}</p>
          )}
        </section>

        {/* Must課題②-2:
          上記の「数値を2倍にするリクエストを送信」を参考に、「数値を2で割るリクエストを送信」を作成してください
          「Must課題②-1で作成したエンドポイント(app.py)」へリクエストを送り、2で割った数値を受け取り、表示するようにしてください
          なお、上段にuseState関数を追加し、「数値を半分にするリクエストを送信」を押した後に、レスポンスが表示されるようにしてください
        {/*【注意！】この課題は生成AIを使わずにトライください！（上記の既存関数をアレンジして呼び出してください）*/}
        <section>
           <h2 className="text-xl font-bold mb-4">IDを指定してGETリクエストを送信 2で割る</h2>
          <div className="flex gap-2">
            <input
              type="number"
              value={multiplyNumber2}
              onChange={(e) => setMultiplyNumber2(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleMultiplyRequest2}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              送信
            </button>
          </div>
          {multiplyResult2 && (
            <p className="mt-2">FastAPIからの応答 ID/2: {multiplyResult2}</p>
          )}
        </section>

        {/* POSTリクエスト */}
        <section>
          <h2 className="text-xl font-bold mb-4">POSTリクエストを送信</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handlePostRequest}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              送信
            </button>
          </div>
          {postResult && (
            <p className="mt-2">FastAPIからのPOST応答: {postResult}</p>
          )}
        </section>

        {/* Want課題①-2:
          「文字数をカウントするリクエストを送信」を作成してください
          app.pyの「Want課題①-1で自作したエンドポイント」へリクエストを送り、文字数を受け取り、表示するようにしてください
          useState関数を追加し、「文字数をカウントするリクエストを送信」を押した後にレスポンスが表示されるようにしてください
        {/*【注意！】この課題は生成AIを使わずにトライください！（上記の既存関数をアレンジして呼び出してください）*/}
        <section>
            <h2 className="text-xl font-bold mb-4">文字数をカウントする</h2>
          <div className="flex gap-2">
             <input
              type="text"
              value={multiplyCount}
              onChange={(e) => setMultiplyCount(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleMultiplyRequest3}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              送信
            </button>
          </div>
          {multiplyResult3 && (
            <p className="mt-2">FastAPIからの応答 文字数: {multiplyResult3}</p>
          )}
        </section>

      </div>
    </div>
  );
}