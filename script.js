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
        // questions 配列の範囲外のインデックスが指定された場合のエラーハンドリング
        if (index < 0 || index >= this.questions.length) {
            console.error("Invalid question index:", index);
            // 最初の質問を表示するなどのフォールバック処理
            this.currentQuestionIndex = 0;
            index = 0;
            // return; // ここで処理を中断すると何も表示されなくなる可能性
        }

        const question = this.questions[index]; // questions[index] を直接使用
        if (!question) {
            console.error("Question not found for index:", index);
            return;
        }
        this.currentQuestionIndex = index;

        const questionArea = document.getElementById('questionArea');
        if (!questionArea) {
            console.error("#questionArea not found in HTML.");
            return;
        }
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
        const resultAreaEl = document.getElementById('resultArea');
        if (resultAreaEl) {
            resultAreaEl.classList.add('hidden');
        }
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
        // 各オプションにスタイルを適用するためのラッパーを追加
        // この部分は意図通りに動作しているか確認が必要。div要素が正しく閉じられているかなど。
        // 元のコードでは、 </div の後が > で終わるべきところで " > となっていたり、
        // class="option" がない場合に </div> が追加されたりする可能性があった。
        // より安全な方法としては、各選択肢を個別のdivで囲むことを推奨。
        // 例: return question.options.map(opt => `<div class="option" onclick="...">${opt.text}</div>`).join('');
        // 現在の optionsHTML の生成方法だと、最後の </div> が不足する可能性がある。
        // 修正案：各選択肢を完全なHTML文字列として生成する。
        let completeOptionsHTML = '';
        const optionsArray = optionsHTML.match(/<div class="option".*?<\/div>/g);
        if (optionsArray) {
            completeOptionsHTML = optionsArray.join('');
        } else if (question.type === 'taxInfo') { // taxInfoの場合は特殊なので別途処理
             const taxInfoContent = question.info.filter(item => item.trim()).map(item => `<p class="mb-1">${item}</p>`).join('');
             const backButton = `<div class="option mt-4" onclick="handleAnswer('back', '${question.id}')">確認したので戻る</div>`;
             completeOptionsHTML = `<div class="tax-info bg-gray-100 p-4 rounded-md text-sm">${taxInfoContent}</div>${backButton}`;
        } else {
            completeOptionsHTML = optionsHTML; // エラーケースやその他のタイプ
        }
        return completeOptionsHTML;

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
        
        const questionAreaEl = document.getElementById('questionArea');
        if (questionAreaEl) {
            questionAreaEl.classList.add('hidden');
        }
        const resultAreaEl = document.getElementById('resultArea');
        if (resultAreaEl) {
            resultAreaEl.classList.remove('hidden');
        }
        
        const resultTextEl = document.getElementById('resultText');
        if (resultTextEl) {
            resultTextEl.textContent = resultTextMap[resultKey] || "結果不明";
        }
        const resultExplanationEl = document.getElementById('resultExplanation');
        if (resultExplanationEl) {
            resultExplanationEl.innerHTML = resultExplanationMap[resultKey] || "詳細な説明はありません。";
        }
        
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
    if (!currentQuestion) {
        console.error("handleAnswer: Question not found for ID:", questionId);
        return;
    }

    if (questionId === 'taxInfo' && answer === 'back') {
        const targetIndex = questionnaire.questions.findIndex(q => q.id === currentQuestion.next);
        if (targetIndex !== -1) {
            questionnaire.showQuestion(targetIndex);
        } else {
            console.error("handleAnswer: Next question ID not found for taxInfo back:", currentQuestion.next);
        }
        return;
    }

    questionnaire.answers[questionId] = answer;

    let nextQuestionId = null;
    if (answer === 'yes' && currentQuestion.yes) nextQuestionId = currentQuestion.yes;
    else if (answer === 'no' && currentQuestion.no) nextQuestionId = currentQuestion.no;
    else if (answer === 'unknown' && currentQuestion.unknown) nextQuestionId = currentQuestion.unknown;
    else if (currentQuestion.next) nextQuestionId = currentQuestion.next; // income, savings などはこちら

    if (nextQuestionId === 'result') {
        questionnaire.determineResult();
    } else if (nextQuestionId) {
        const nextIndex = questionnaire.questions.findIndex(q => q.id === nextQuestionId);
        if (nextIndex !== -1) {
            questionnaire.showQuestion(nextIndex);
        } else {
            console.error("handleAnswer: Next question ID not found in questions array:", nextQuestionId);
            questionnaire.determineResult(); // フォールバック
        }
    } else {
        // nextQuestionId が決定されなかった場合（通常は分岐条件の漏れ）
        console.warn("handleAnswer: No specific next question or result determined for question ID:", questionId, "with answer:", answer);
        questionnaire.determineResult(); // 安全策として結果表示
    }
}

window.goToTop = function() {
    window.location.reload();
}

window.showContactMessage = function() {
    const contactMessageDiv = document.getElementById('contactMessage');
    if (contactMessageDiv) {
        contactMessageDiv.textContent = 'お住まいの市区町村の窓口へ直接お問い合わせください。このツールはあくまで簡易判定です。';
        contactMessageDiv.classList.remove('hidden');
    } else {
        console.error("#contactMessage element not found.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // questionnaireインスタンスが正しく生成されていることを確認
    if (questionnaire && typeof questionnaire.showQuestion === 'function') {
        questionnaire.showQuestion(0);
    } else {
        console.error("Questionnaire object not initialized correctly.");
    }
});
