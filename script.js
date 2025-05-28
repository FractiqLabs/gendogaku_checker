class Questionnaire {
    constructor() {
        this.questions = [
            {
                text: "あなたは市民税非課税世帯ですか？",
                type: "yesno_unknown",
                id: "taxStatus",
                yes: "pensionStatus",
                no: "result", // 市民税課税世帯なら即結果へ
                unknown: "taxInfo"
            },
            {
                text: "老齢福祉年金を受給していますか？",
                id: "pensionStatus",
                type: "yesno",
                yes: "result", // 老齢福祉年金受給なら即結果へ
                no: "income"
            },
            {
                text: "年間の合計所得金額はいくらですか？",
                id: "income",
                type: "income",
                next: "spouse"
            },
            {
                text: "配偶者はいますか？",
                id: "spouse",
                type: "yesno",
                yes: "savings_spouse",
                no: "savings"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人のみ）",
                id: "savings",
                type: "savings",
                next: "result"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人＋配偶者）",
                id: "savings_spouse",
                type: "savings_spouse",
                next: "result"
            },
            {
                text: "住民税の非課税要件についてご説明します。",
                id: "taxInfo",
                type: "taxInfo",
                info: [
                    "1. 均等割と所得割がともに非課税とされる方",
                    "（1）生活保護法の規定による生活扶助を受けている方",
                    "（2）障害者、未成年者、寡婦又はひとり親で前年の合計所得金額が135万円以下の方",
                    "",
                    "2. 均等割が非課税とされる方",
                    "前年の合計所得金額が以下の基準以下の方：",
                    "1級地：35万円×世帯人数 + 10万円 + 21万円",
                    "2級地：31.5万円×世帯人数 + 10万円 + 18.9万円",
                    "3級地：28万円×世帯人数 + 10万円 + 16.8万円",
                    "",
                    "3. 所得割が非課税とされる方",
                    "35万円×世帯人数 + 10万円 + 32万円 以下の方",
                    "*加算要件等の詳細は市町村の条例に準じます。"
                ],
                next: "taxStatus" // 説明後、最初の質問に戻る
            }
        ];
        this.answers = {}; // 回答を保存するオブジェクト
        this.currentQuestionIndex = 0; // 現在の質問のインデックス
    }

    showQuestion(index) {
        const question = this.questions.find(q => q.id === this.questions[index].id);
        if (!question) {
            console.error("Question not found for index:", index);
            return;
        }
        this.currentQuestionIndex = index;

        const questionArea = document.getElementById('questionArea');
        questionArea.innerHTML = `
            <div class="question bg-white p-6 rounded-lg shadow-md">
                <p class="text-xl font-semibold mb-4">${question.text}</p>
                <div class="options space-y-2">
                    ${this.getOptionsHTML(question)}
                </div>
                <button onclick="goToTop()" class="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out">最初の質問に戻る</button>
            </div>
        `;
        // 新しい質問が表示されるたびに、結果エリアと連絡先メッセージを隠す
        document.getElementById('resultArea').classList.add('hidden');
        const contactMsgEl = document.getElementById('contactMessage');
        if (contactMsgEl) {
            contactMsgEl.classList.add('hidden');
            contactMsgEl.textContent = '';
        }
    }

    getOptionsHTML(question) {
        let optionsHTML = '';
        switch (question.type) {
            case 'yesno':
                optionsHTML = `
                    <div class="option" onclick="handleAnswer('yes', '${question.id}')">はい</div>
                    <div class="option" onclick="handleAnswer('no', '${question.id}')">いいえ</div>
                `;
                break;
            case 'yesno_unknown':
                optionsHTML = `
                    <div class="option" onclick="handleAnswer('yes', '${question.id}')">はい</div>
                    <div class="option" onclick="handleAnswer('no', '${question.id}')">いいえ</div>
                    <div class="option" onclick="handleAnswer('unknown', '${question.id}')">わからない</div>
                `;
                break;
            case 'income':
                optionsHTML = `
                    <div class="option" onclick="handleAnswer('80', '${question.id}')">80万円以下</div>
                    <div class="option" onclick="handleAnswer('120', '${question.id}')">80万円超120万円以下</div>
                    <div class="option" onclick="handleAnswer('120+', '${question.id}')">120万円超</div>
                `;
                break;
            case 'savings':
                optionsHTML = `
                    <div class="option" onclick="handleAnswer('500', '${question.id}')">500万円以下</div>
                    <div class="option" onclick="handleAnswer('550', '${question.id}')">500万円超～550万円以下</div>
                    <div class="option" onclick="handleAnswer('650', '${question.id}')">550万円超～650万円以下</div>
                    <div class="option" onclick="handleAnswer('over_650', '${question.id}')">650万円超</div>
                `;
                break;
            case 'savings_spouse':
                optionsHTML = `
                    <div class="option" onclick="handleAnswer('1500', '${question.id}')">(配偶者合計)1500万円以下</div>
                    <div class="option" onclick="handleAnswer('1550', '${question.id}')">(配偶者合計)1500万円超～1550万円以下</div>
                    <div class="option" onclick="handleAnswer('1650', '${question.id}')">(配偶者合計)1550万円超～1650万円以下</div>
                    <div class="option" onclick="handleAnswer('over', '${question.id}')">(配偶者合計)1650万円超</div>
                `;
                break;
            case 'taxInfo':
                optionsHTML = `
                    <div class="tax-info bg-gray-100 p-4 rounded-md text-sm">
                        ${question.info.filter(item => item.trim()).map(item => `<p class="mb-1">${item}</p>`).join('')}
                    </div>
                    <div class="option mt-4" onclick="handleAnswer('back', '${question.id}')">確認したので戻る</div>
                `;
                break;
            default:
                optionsHTML = "<p>オプションタイプエラー</p>";
        }
        return optionsHTML.split('</div').map(s => s.trim() ? s + (s.includes('class="option') ? '" >' : '</div>') : '').join('');
    }

    determineResult() {
        const a = this.answers;

        if (a['taxStatus'] === 'no') {
            this.showResult('not_eligible');
            return;
        }

        if (a['taxStatus'] === 'yes') {
            if (a['pensionStatus'] === 'yes') {
                this.showResult('first');
                return;
            }

            const income = a['income'];
            const hasSpouse = a['spouse'] === 'yes';

            if (hasSpouse) {
                let savingsSpouseValue = a['savings_spouse'];
                const savingsSpouseAmount = savingsSpouseValue === 'over' ? Infinity : parseInt(savingsSpouseValue);

                if (income === '80') {
                    if (savingsSpouseAmount <= 1650) { this.showResult('second'); return; }
                } else if (income === '120') {
                    if (savingsSpouseAmount <= 1550) { this.showResult('third_1'); return; }
                } else if (income === '120+') {
                    if (savingsSpouseAmount <= 1500) { this.showResult('third_2'); return; }
                }
            } else {
                const savingsSelfValue = a['savings'];
                if (savingsSelfValue === 'over_650') {
                    this.showResult('not_eligible');
                    return;
                }
                const savingsAmount = parseInt(savingsSelfValue);
                if (income === '80') {
                    if (savingsAmount <= 650) { this.showResult('second'); return; }
                } else if (income === '120') {
                    if (savingsAmount <= 550) { this.showResult('third_1'); return; }
                } else if (income === '120+') {
                    if (savingsAmount <= 500) { this.showResult('third_2'); return; }
                }
            }
        }
        this.showResult('not_eligible');
    }

    showResult(resultKey) {
        const resultTextMap = {
            first: 'あなたは第1段階に該当する可能性があります。',
            second: 'あなたは第2段階に該当する可能性があります。',
            third_1: 'あなたは第3段階①に該当する可能性があります。',
            third_2: 'あなたは第3段階②に該当する可能性があります。',
            not_eligible: '負担限度額認定の対象外の可能性があります。'
        };

        const resultExplanationMap = {
            first: '利用者負担段階：第1段階<br>対象：生活保護等受給者、老齢福祉年金受給者で世帯全員が市民税非課税の方',
            second: '利用者負担段階：第2段階<br>対象：世帯全員が市民税非課税で、本人の合計所得金額と課税年金収入額の合計が80万円以下の方<br>（預貯金額等が単身で650万円以下、夫婦で1,650万円以下）',
            third_1: '利用者負担段階：第3段階①<br>対象：世帯全員が市民税非課税で、本人の合計所得金額と課税年金収入額の合計が80万円超120万円以下の方<br>（預貯金額等が単身で550万円以下、夫婦で1,550万円以下）',
            third_2: '利用者負担段階：第3段階②<br>対象：世帯全員が市民税非課税で、本人の合計所得金額と課税年金収入額の合計が120万円超の方<br>（預貯金額等が単身で500万円以下、夫婦で1,500万円以下）',
            not_eligible: '入力された情報に基づくと、負担限度額認定の対象外である可能性が高いです。詳細は市区町村の窓口にご確認ください。'
        };
        
        document.getElementById('questionArea').classList.add('hidden');
        const resultArea = document.getElementById('resultArea');
        resultArea.classList.remove('hidden');

        document.getElementById('resultText').textContent = resultTextMap[resultKey] || "結果不明";
        document.getElementById('resultExplanation').innerHTML = resultExplanationMap[resultKey] || "詳細な説明はありません。";
        
        // 連絡先メッセージエリアをクリアして隠す
        const contactMsgEl = document.getElementById('contactMessage');
        if (contactMsgEl) {
            contactMsgEl.classList.add('hidden');
            contactMsgEl.textContent = '';
        }
    }
}

const questionnaire = new Questionnaire();

window.handleAnswer = function(answer, questionId) {
    const currentQuestion = questionnaire.questions.find(q => q.id === questionId);
    if (!currentQuestion) return;

    if (questionId === 'taxInfo' && answer === 'back') {
        const targetIndex = questionnaire.questions.findIndex(q => q.id === currentQuestion.next);
        if (targetIndex !== -1) {
            questionnaire.showQuestion(targetIndex);
        }
        return;
    }

    questionnaire.answers[questionId] = answer;

    let nextQuestionId = null;
    if (answer === 'yes' && currentQuestion.yes) nextQuestionId = currentQuestion.yes;
    else if (answer === 'no' && currentQuestion.no) nextQuestionId = currentQuestion.no;
    else if (answer === 'unknown' && currentQuestion.unknown) nextQuestionId = currentQuestion.unknown;
    else if (currentQuestion.next) nextQuestionId = currentQuestion.next;

    if (nextQuestionId === 'result') {
        questionnaire.determineResult();
    } else if (nextQuestionId) {
        const nextIndex = questionnaire.questions.findIndex(q => q.id === nextQuestionId);
        if (nextIndex !== -1) {
            questionnaire.showQuestion(nextIndex);
        } else {
            console.error("Next question ID not found:", nextQuestionId);
            questionnaire.determineResult();
        }
    } else {
        console.warn("No specific next question or result determined for:", questionId, "with answer:", answer);
        questionnaire.determineResult();
    }
}

window.goToTop = function() {
    window.location.reload();
}

// ★追加: 市区町村への問い合わせメッセージを表示する関数
window.showContactMessage = function() {
    const contactMessageDiv = document.getElementById('contactMessage');
    if (contactMessageDiv) {
        contactMessageDiv.textContent = 'お住まいの市区町村の窓口へ直接お問い合わせください。このツールはあくまで簡易判定です。';
        contactMessageDiv.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    questionnaire.showQuestion(0);
});
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>限額判定くん｜介護保険負担限度額認定の簡易チェックツール</title>
    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
    
    <link rel="apple-touch-icon" href="[https://placehold.co/180x180/3b82f6/ffffff?text=判定くん](https://placehold.co/180x180/3b82f6/ffffff?text=判定くん)" sizes="180x180">
    <link rel="icon" href="[https://placehold.co/512x512/3b82f6/ffffff?text=判定くん](https://placehold.co/512x512/3b82f6/ffffff?text=判定くん)" sizes="512x512">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#ffffff">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8; /* bg-slate-100 */
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 2rem 1rem; /* 上下左右にパディングを追加 */
            box-sizing: border-box;
        }
        .container {
            background-color: #ffffff; /* bg-white */
            padding: 1.5rem; /* p-6 */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
            width: 100%;
            max-width: 600px;
        }
        @media (min-width: 640px) { /* sm breakpoint */
            .container {
                padding: 2rem; /* p-8 on larger screens */
            }
        }
        .question p, #resultArea h2 { /* #resultText h2 から #resultArea h2 に変更 */
            color: #1e293b; /* text-slate-800 */
            font-weight: 600; /* font-semibold */
        }
        .option {
            background-color: #3b82f6; /* bg-blue-500 */
            color: white;
            padding: 0.75rem 1.5rem; /* py-3 px-6 */
            border-radius: 0.5rem; /* rounded-lg */
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
            text-align: center;
            font-weight: 500; /* font-medium */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        }
        .option:hover {
            background-color: #2563eb; /* bg-blue-600 */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
        }
        .tax-info p {
            margin-bottom: 0.5rem; /* mb-2 */
            color: #475569; /* text-slate-600 */
        }
        .hidden {
            display: none;
        }
        #resultArea { /* スタイル調整 */
            border: 1px solid #e2e8f0; /* border-slate-200 */
            padding: 1.5rem; /* p-6 */
            border-radius: 0.5rem; /* rounded-lg */
            background-color: #f8fafc; /* bg-slate-50 */
        }
        #resultExplanation { /* <p>タグに直接スタイルを適用するので、クラスは不要な場合も */
            color: #334155; /* text-slate-700 */
            line-height: 1.6; /* leading-relaxed */
            font-size: 0.875rem; /* text-sm */
        }
        #resultText { /* 結果テキストのスタイル */
            font-size: 1.25rem; /* text-xl */
            font-weight: 600; /* font-semibold */
            color: #1e293b; /* text-slate-800 */
            margin-bottom: 0.5rem; /* mb-2 */
        }
        button.action-button { /* 共通ボタンスタイル */
            color: white;
            font-bold: 600; /* font-bold */
            padding: 0.625rem 1rem; /* py-2.5 px-4 */
            border-radius: 0.375rem; /* rounded-md */
            transition: background-color 0.15s ease-in-out;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            width: 100%; /* 幅を100%に */
        }
        button.action-button:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
        }
        /* ★追加: 免責事項のスタイル */
        .disclaimer {
            background-color: #fefce8; /* bg-yellow-50 */
            border: 1px solid #fef08a; /* border-yellow-200 */
            color: #ca8a04; /* text-yellow-700 */
            padding: 0.75rem; /* p-3 */
            border-radius: 0.375rem; /* rounded-md */
            font-size: 0.875rem; /* text-sm */
            margin-bottom: 1.5rem; /* mb-6 */
        }
        .disclaimer p {
            margin-bottom: 0.25rem; /* mb-1 */
        }
        /* ★追加: 結果エリアのボタンスタイル */
        .result-buttons {
            margin-top: 1.5rem; /* mt-6 */
            display: flex;
            flex-direction: column; /* ボタンを縦に並べる */
            gap: 0.75rem; /* space-y-3相当 */
        }
        @media (min-width: 640px) { /* sm breakpoint */
            .result-buttons {
                flex-direction: row; /* 横並びに戻す */
                gap: 1rem; /* space-x-4相当 */
            }
            button.action-button {
                 width: auto; /* 幅を自動に */
            }
        }
        /* ★追加: 問い合わせメッセージのスタイル */
        #contactMessage {
            margin-top: 1rem; /* mt-4 */
            padding: 0.75rem; /* p-3 */
            background-color: #eff6ff; /* bg-blue-50 */
            color: #1d4ed8; /* text-blue-700 */
            border: 1px solid #bfdbfe; /* border-blue-200 */
            border-radius: 0.375rem; /* rounded-md */
            font-size: 0.875rem; /* text-sm */
        }
    </style>
    <link href="[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap)" rel="stylesheet">
</head>
<body>
    <noscript>
        <div style="padding: 1em; background-color: #ffdddd; color: #900; text-align: center; border: 1px solid #900; margin: 1em;">
            このツールを利用するにはJavaScriptを有効にしてください。
        </div>
    </noscript>

    <div class="container">
        <header class="text-center mb-6">
            <h1 class="text-3xl font-bold text-slate-700">限額判定くん</h1>
            </header>

        <div class="disclaimer">
            <p><strong>【ご確認ください】</strong></p>
            <p>このツールは介護保険の負担限度額認定に関する簡易的な判定を行うものです。</p>
            <p>最終的な認定結果や詳細については、必ずお住まいの市区町村の担当窓口にご確認ください。</p>
            <p>本ツールの利用により生じたいかなる損害についても、作成者は一切の責任を負いかねますので、あらかじめご了承ください。</p>
        </div>

        <div id="questionArea">
            </div>

        <div id="resultArea" class="hidden">
            <h2 class="text-2xl font-bold text-slate-800 mb-3">判定結果</h2>
            <p id="resultText"></p>
            <p id="resultExplanation" class="mt-2"></p>
            
            <div class="result-buttons">
                <button onclick="goToTop()" class="action-button bg-gray-500 hover:bg-gray-600 back-to-top">最初の質問に戻る</button>
                <button onclick="showContactMessage()" class="action-button bg-blue-500 hover:bg-blue-600 contact-button">市区町村窓口について</button>
            </div>
            <div id="contactMessage" class="hidden">
                </div>
        </div>
    </div>
    </body>
</html>
