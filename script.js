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
                // thresholds: [80, 120], // このthresholdsはHTML生成には直接使われていない
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
                // thresholds: [500, 550, 650], // このthresholdsはHTML生成には直接使われていない
                next: "result"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人＋配偶者）",
                id: "savings_spouse",
                type: "savings_spouse",
                // thresholds: [1500, 1550, 1650], // このthresholdsはHTML生成には直接使われていない
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
        // 質問データを questions 配列から取得
        const question = this.questions.find(q => q.id === this.questions[index].id);
        if (!question) {
            console.error("Question not found for index:", index);
            return;
        }
        this.currentQuestionIndex = index; // 現在の質問インデックスを更新

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
            case 'savings': // ★修正箇所: 「本人のみ」の預貯金
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
        // 各オプションにスタイルを適用するためのラッパーを追加
        return optionsHTML.split('</div').map(s => s.trim() ? s + (s.includes('class="option') ? '" >' : '</div>') : '').join('');
    }

    determineResult() {
        const a = this.answers; // 保存された回答

        // 市民税課税世帯の場合、または最初の質問で「いいえ」を選んだ場合
        if (a['taxStatus'] === 'no') {
            this.showResult('not_eligible');
            return;
        }

        // 市民税非課税世帯の場合
        if (a['taxStatus'] === 'yes') {
            // 老齢福祉年金受給者の場合
            if (a['pensionStatus'] === 'yes') {
                this.showResult('first'); // 第1段階
                return;
            }

            // 老齢福祉年金非受給者の場合
            const income = a['income']; // '80', '120', '120+'
            const hasSpouse = a['spouse'] === 'yes';

            if (hasSpouse) { // 配偶者がいる場合
                let savingsSpouseValue = a['savings_spouse']; // '1500', '1550', '1650', 'over'
                const savingsSpouseAmount = savingsSpouseValue === 'over' ? Infinity : parseInt(savingsSpouseValue);

                if (income === '80') { // 年間収入80万円以下
                    if (savingsSpouseAmount <= 1650) { this.showResult('second'); return; } // 第2段階
                } else if (income === '120') { // 年間収入80万円超120万円以下
                    if (savingsSpouseAmount <= 1550) { this.showResult('third_1'); return; } // 第3段階①
                } else if (income === '120+') { // 年間収入120万円超
                    if (savingsSpouseAmount <= 1500) { this.showResult('third_2'); return; } // 第3段階②
                }
            } else { // 配偶者がいない場合
                const savingsSelfValue = a['savings']; // '500', '550', '650', 'over_650'

                // ★修正箇所: 「650万円超」を選んだ場合は対象外
                if (savingsSelfValue === 'over_650') {
                    this.showResult('not_eligible');
                    return;
                }

                const savingsAmount = parseInt(savingsSelfValue); // '500', '550', '650' のいずれか

                if (income === '80') { // 年間収入80万円以下
                    if (savingsAmount <= 650) { this.showResult('second'); return; } // 第2段階
                } else if (income === '120') { // 年間収入80万円超120万円以下
                    if (savingsAmount <= 550) { this.showResult('third_1'); return; } // 第3段階①
                } else if (income === '120+') { // 年間収入120万円超
                    if (savingsAmount <= 500) { this.showResult('third_2'); return; } // 第3段階②
                }
            }
        }
        // 上記のいずれの条件にも当てはまらない場合は対象外
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
        // 結果表示エリアを表示し、質問エリアを非表示にする
        document.getElementById('questionArea').classList.add('hidden');
        const resultArea = document.getElementById('resultArea');
        resultArea.classList.remove('hidden');

        document.getElementById('resultText').innerHTML = `<h2 class="text-2xl font-bold mb-2">${resultTextMap[resultKey] || "結果不明"}</h2>`;
        document.getElementById('resultExplanation').innerHTML = `<p class="text-md">${resultExplanationMap[resultKey] || "詳細な説明はありません。"}</p>`;
    }
}

// ページ読み込み時に最初の質問を表示
const questionnaire = new Questionnaire();
// HTML側に<body onload="startQuestionnaire()">などを追加するか、
// scriptをbodyの最後に配置する場合は直接呼び出し
// window.onload = () => questionnaire.showQuestion(0); // 最初の質問(id: taxStatus)のインデックスは0

// グローバルスコープに関数を配置
window.handleAnswer = function(answer, questionId) {
    const currentQuestion = questionnaire.questions.find(q => q.id === questionId);
    if (!currentQuestion) return;

    if (questionId === 'taxInfo' && answer === 'back') {
        // taxInfoから戻る場合は、taxStatusの質問を表示する
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
            questionnaire.determineResult(); // フォールバックとして結果表示を試みる
        }
    } else {
         // nextQuestionId が null だが、結果でもない場合 (通常は income, savings, savings_spouse の後)
         // これらの質問タイプは 'next' プロパティで次の質問IDを指定しているはず
         // もし 'next' が 'result' 以外で、かつ yes/no/unknown にも該当しない場合、
         // 'next' が指定されていればそれに従う。
         // ここに来るケースは、主に income, savings, savings_spouse の選択肢を選んだ時。
         // これらの質問は 'next' プロパティで次の遷移先を指定している。
         // その 'next' が 'result' であれば、上で処理される。
         // もし、特定の回答によって遷移先を変えない質問タイプで、'next' も 'result' でない場合は、
         // ここで determineResult を呼ぶか、エラー処理が必要。
         // 現状の定義では、income, savings, savings_spouse は next: "result" または next: "次の質問ID" を持つ。
         // よって、ここに来ることは基本的にはないはず。
        console.warn("No specific next question or result determined for:", questionId, "with answer:", answer);
        questionnaire.determineResult(); // 安全策として結果表示
    }
}

window.goToTop = function() {
    // ページをリロードするか、最初の質問を再表示する
    // questionnaire.answers = {}; // 回答をリセット
    // questionnaire.showQuestion(0);
    // document.getElementById('resultArea').classList.add('hidden');
    // document.getElementById('questionArea').classList.remove('hidden');
    window.location.reload(); // 簡単なリセット方法としてリロード
}

// HTMLが完全に読み込まれてから実行
document.addEventListener('DOMContentLoaded', () => {
    questionnaire.showQuestion(0); // 最初の質問を表示
});
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>介護保険負担限度額認定 簡易判定</title>
    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8; /* Tailwindのbg-slate-100に近い */
            display: flex;
            justify-content: center;
            align-items: flex-start; /* 上寄せに変更 */
            min-height: 100vh;
            padding-top: 2rem; /* 上部に余白を追加 */
            padding-bottom: 2rem; /* 下部に余白を追加 */
        }
        .container {
            background-color: #ffffff; /* Tailwindのbg-white */
            padding: 2rem; /* Tailwindのp-8 */
            border-radius: 0.75rem; /* Tailwindのrounded-xl */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Tailwindのshadow-xl */
            width: 100%;
            max-width: 600px; /* コンテナの最大幅 */
        }
        .question p, #resultText h2 {
            color: #1e293b; /* Tailwindのtext-slate-800 */
            font-weight: 600; /* Tailwindのfont-semibold */
        }
        .option {
            background-color: #3b82f6; /* Tailwindのbg-blue-500 */
            color: white;
            padding: 0.75rem 1.5rem; /* Tailwindのpy-3 px-6 */
            border-radius: 0.5rem; /* Tailwindのrounded-lg */
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
            text-align: center;
            font-weight: 500; /* Tailwindのfont-medium */
        }
        .option:hover {
            background-color: #2563eb; /* Tailwindのbg-blue-600 */
        }
        .tax-info p {
            margin-bottom: 0.5rem; /* Tailwindのmb-2 */
            color: #475569; /* Tailwindのtext-slate-600 */
        }
        .hidden {
            display: none;
        }
        #resultArea {
            border: 1px solid #e2e8f0; /* Tailwindのborder-slate-200 */
            padding: 1.5rem; /* Tailwindのp-6 */
            border-radius: 0.5rem; /* Tailwindのrounded-lg */
            background-color: #f8fafc; /* Tailwindのbg-slate-50 */
        }
        #resultExplanation p {
            color: #334155; /* Tailwindのtext-slate-700 */
            line-height: 1.6; /* Tailwindのleading-relaxed */
        }
         /* ボタン共通スタイル */
        button, .option {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Tailwindのshadow-md */
        }
        button:hover, .option:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Tailwindのshadow-lg */
        }
    </style>
    <link href="[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap)" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header class="text-center mb-8">
            <h1 class="text-3xl font-bold text-slate-700">介護保険負担限度額認定</h1>
            <p class="text-md text-slate-500">簡易判定シミュレーション</p>
        </header>
        <div id="questionArea">
            </div>
        <div id="resultArea" class="hidden mt-6">
            <div id="resultText" class="mb-4"></div>
            <div id="resultExplanation" class="text-sm"></div>
            <button onclick="goToTop()" class="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out">もう一度判定する</button>
        </div>
    </div>
    </body>
</html>
