# げんどがくチェッカー

## 概要
げんどがくチェッカーは、負担限度額認定の段階を判定するWebツールです。いくつかの質問に答えることで、介護保険負担限度額認定のどの段階に該当するかを簡易的に判定することができます。

## 主な機能
- 負担限度額認定段階の簡易判定
- 質問形式による直感的な入力インターフェース
- すぐに結果が分かる即座判定
- シンプルで使いやすいWebアプリケーション

## 使用方法

### アクセス方法
Webブラウザで以下のURLにアクセスしてください：
https://fractiqlabs.github.io/gendogaku_checker/

### ローカル開発環境での実行
```bash
# リポジトリをクローン
git clone https://github.com/FractiqLabs/gengakuhantei.git
cd gengakuhantei

# ローカルサーバーを起動（Pythonの場合）
python -m http.server 8000
# または（Node.jsの場合）
npx serve .
```

### 使い方
1. Webページにアクセス
2. 表示される質問に順番に回答
3. 全ての質問に答えると判定結果が表示されます
4. 判定結果から負担限度額認定の段階を確認

## 対応している判定項目
- **負担限度額認定段階の判定**:

## 技術仕様
- フロントエンド: HTML, CSS, JavaScript
- ホスティング: GitHub Pages
- レスポンシブデザイン対応

## ライセンス
MIT License

## 貢献
プルリクエストやイシューの報告を歓迎します。詳細は[CONTRIBUTING.md](CONTRIBUTING.md)をご覧ください。

## 注意事項
- **本ツールは簡易的な判定を目的としており、最終的な認定可否の判断については、必ずお住まいの市区町村窓口にてご確認ください**
- **本ツールの利用により生じたいかなる損害についても、当方では一切の責任を負いかねますので、あらかじめご了承ください**
- 判定結果は参考値として活用してください
- 制度の変更により判定基準が変更される可能性があります

## お問い合わせ
- 開発者: FractiqLabs
- Email: shinjitanaka.s@gmail.com
- Issues: [GitHub Issues](https://github.com/FractiqLabs/gengakuhantei/issues)

## 更新履歴
### v1.0.0 (2025-06-06)
- 初回リリース
- 負担限度額認定段階判定機能を実装
- GitHub Pagesでの公開開始
- レスポンシブデザインに対応
