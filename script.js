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
        if (index < 0 || index >= this.questions.length) {
            console.error("Invalid question index:", index);
            this.currentQuestionIndex = 0;
            index = 0;
        }

        const question = this.questions[index];
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
        // 結果エリアと連絡先メッセージを隠す
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

        let completeOptionsHTML = '';
        const optionsArray = optionsHTML.match(/<div class="option".*?<\/div>/gs);
        if (optionsArray) {
            completeOptionsHTML = optionsArray.join('');
        } else if (question.type === 'taxInfo') {
             const taxInfoContent = question.info.filter(item => item.trim()).map(item => `<p class="mb-1">${item}</p>`).join('');
             const backButton = `<div class="option mt-4" onclick="handleAnswer('back', '${question.id}')">確認したので戻る</div>`;
             completeOptionsHTML = `<div class="tax-info bg-gray-100 p-4 rounded-md text-sm">${taxInfoContent}</div>${backButton}`;
        } else {
            completeOptionsHTML = optionsHTML;
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
                    if (savingsSpouseAmount <= 1500) {
                        this.showResult('first');
                    } else if (savingsSpouseAmount <= 1550) {
                        this.showResult('second');
                    } else if (savingsSpouseAmount <= 1650) {
                        this.showResult('third');
                    } else {
                        this.showResult('fourth');
                    }
                } else if (income === '120' || income === '120+') {
                    if (savingsSpouseAmount <= 1500) {
                        this.showResult('second');
                    } else if (savingsSpouseAmount <= 1550) {
                        this.showResult('third');
                    } else if (savingsSpouseAmount <= 1650) {
                        this.showResult('fourth');
                    } else {
                        this.showResult('fourth');
                    }
                } else {
                    this.showResult('fourth');
                }
            } else {
                let savingsValue = a['savings'];
                const savingsAmount = savingsValue === 'over_650' ? Infinity : parseInt(savingsValue);

                if (income === '80') {
                    if (savingsAmount <= 500) {
                        this.showResult('first');
                    } else if (savingsAmount <= 550) {
                        this.showResult('second');
                    } else if (savingsAmount <= 650) {
                        this.showResult('third');
                    } else {
                        this.showResult('fourth');
                    }
                } else if (income === '120' || income === '120+') {
                    if (savingsAmount <= 500) {
                        this.showResult('second');
                    } else if (savingsAmount <= 550) {
                        this.showResult('third');
                    } else if (savingsAmount <= 650) {
                        this.showResult('fourth');
                    } else {
                        this.showResult('fourth');
                    }
                } else {
                    this.showResult('fourth');
                }
            }
        } else {
            this.showResult('unknown');
        }
    }

    showResult(rank) {
        const resultArea = document.getElementById('resultArea');
        const questionArea = document.getElementById('questionArea');
        const contactMessage = document.getElementById('contactMessage');
        if (!resultArea || !questionArea || !contactMessage) {
            console.error("結果表示領域が見つかりません。");
            return;
        }
        questionArea.classList.add('hidden');
        resultArea.classList.remove('hidden');

        const rankTexts = {
            first: "第1段階の負担限度額（最も軽い）",
            second: "第2段階の負担限度額",
            third: "第3段階の負担限度額",
            fourth: "第4段階の負担限度額（最も重い）",
            not_eligible: "非該当（市民税課税世帯）",
            unknown: "判定不能。お問い合わせください。"
        };
        resultArea.innerHTML = `
            <div class="result p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-2xl font-bold mb-4">負担限度額の判定結果</h2>
                <p class="text-lg mb-4">${rankTexts[rank] || "結果不明"}</p>
                <button onclick="goToTop()" class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out">最初の質問に戻る</button>
            </div>
        `;

        // 必要に応じて連絡先メッセージを表示
        if (rank === 'unknown' || rank === 'not_eligible') {
            contactMessage.textContent = "ご不明な点はケアマネジャーにお問い合わせください。";
            contactMessage.classList.remove('hidden');
        } else {
            contactMessage.classList.add('hidden');
            contactMessage.textContent = "";
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
        // 「非課税要件説明」から戻るボタン押下時
        const targetIndex = questionnaire.questions.findIndex(q => q.id === currentQuestion.next);
        if (targetIndex !== -1) {
            questionnaire.showQuestion(targetIndex);
        } else {
            console.error("handleAnswer: Next question ID not found for taxInfo back:", currentQuestion.next);
        }
        return;
    }

    // 回答を保存
    questionnaire.answers[questionId] = answer;

    // 次の質問ID決定
    let nextQuestionId = null;
    if (answer === 'yes' && currentQuestion.yes) nextQuestionId = currentQuestion.yes;
    else if (answer === 'no' && currentQuestion.no) nextQuestionId = currentQuestion.no;
    else if (answer === 'unknown' && currentQuestion.unknown) nextQuestionId = currentQuestion.unknown;
    else if (currentQuestion.next) nextQuestionId = currentQuestion.next;

    if (nextQuestionId === 'result') {
        questionnaire.determineResult();
    } else {
        const nextIndex = questionnaire.questions.findIndex(q => q.id === nextQuestionId);
        if (nextIndex !== -1) {
            questionnaire.showQuestion(nextIndex);
        } else {
            console.error("handleAnswer: Next question ID not found:", nextQuestionId);
        }
    }
};

function goToTop() {
    questionnaire.showQuestion(0);
    const resultAreaEl = document.getElementById('resultArea');
    if (resultAreaEl) resultAreaEl.classList.add('hidden');
    const questionAreaEl = document.getElementById('questionArea');
    if (questionAreaEl) questionAreaEl.classList.remove('hidden');
    const contactMsgEl = document.getElementById('contactMessage');
    if (contactMsgEl) {
        contactMsgEl.classList.add('hidden');
        contactMsgEl.textContent = '';
    }
}

// 初期表示
window.onload = () => {
    questionnaire.showQuestion(0);
};
