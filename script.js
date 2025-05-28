// script.js（修正後）

class Questionnaire {
    constructor() {
        this.questions = [
            {
                text: "あなたは市民税非課税世帯ですか？",
                type: "yesno_unknown",
                id: "taxStatus",
                yes: "pensionStatus",
                no: "result_not_eligible",
                unknown: "taxInfo"
            },
            {
                text: "老齢福祉年金を受給していますか？",
                id: "pensionStatus",
                type: "yesno",
                yes: "result_first",
                no: "income"
            },
            {
                text: "年間の合計所得金額はいくらですか？",
                id: "income",
                type: "income",
                thresholds: [80, 120],
                next: "hasSpouse"
            },
            {
                text: "配偶者はいますか？",
                id: "hasSpouse",
                type: "yesno",
                yes: "savingsWithSpouse",
                no: "savingsAlone"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人のみ）",
                id: "savingsAlone",
                type: "savingsAlone",
                next: "result"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人＋配偶者）",
                id: "savingsWithSpouse",
                type: "savingsWithSpouse",
                next: "result"
            },
            {
                text: "住民税の非課税要件についてご説明します。以下のいずれかに該当する場合は非課税となります：",
                id: "taxInfo",
                type: "taxInfo",
                info: [
                    "1. 均等割と所得割がともに非課税とされる方：",
                    "　- 生活保護を受けている方",
                    "　- 障害者、未成年、寡婦、ひとり親で所得135万円以下の方",
                    "",
                    "2. 均等割のみ非課税：",
                    "　- 所得が一定基準以下の方（基準は地域や世帯構成による）",
                    "",
                    "3. 所得割のみ非課税：",
                    "　- 総所得が35万円×世帯人数+10万円+32万円以下の方",
                    "",
                    "※ 詳細は自治体窓口でご確認ください。"
                ],
                next: "taxStatus"
            }
        ];
        this.answers = {};
    }

    showQuestion(index) {
        const question = this.questions[index];
        const questionArea = document.getElementById('questionArea');
        questionArea.innerHTML = `
            <div class="question">
                <p>${question.text}</p>
                <div class="options">
                    ${this.getOptionsHTML(question)}
                </div>
                <button onclick="goToTop()" class="back-to-top">TOP画面に戻る</button>
            </div>
        `;
    }

    getOptionsHTML(question) {
        switch (question.type) {
            case 'yesno':
                return `
                    <div class="option" onclick="handleAnswer('yes', '${question.id}')">はい</div>
                    <div class="option" onclick="handleAnswer('no', '${question.id}')">いいえ</div>
                `;
            case 'yesno_unknown':
                return `
                    <div class="option" onclick="handleAnswer('yes', '${question.id}')">はい</div>
                    <div class="option" onclick="handleAnswer('no', '${question.id}')">いいえ</div>
                    <div class="option" onclick="handleAnswer('unknown', '${question.id}')">わからない</div>
                `;
            case 'income':
                return `
                    <div class="option" onclick="handleAnswer('80', '${question.id}')">80万円以下</div>
                    <div class="option" onclick="handleAnswer('120', '${question.id}')">80万円超120万円以下</div>
                    <div class="option" onclick="handleAnswer('120+', '${question.id}')">120万円超</div>
                `;
            case 'savingsAlone':
                return `
                    <div class="option" onclick="handleAnswer('500', '${question.id}')">500万円以下</div>
                    <div class="option" onclick="handleAnswer('550', '${question.id}')">550万円以下</div>
                    <div class="option" onclick="handleAnswer('650', '${question.id}')">650万円以下</div>
                    <div class="option" onclick="handleAnswer('over', '${question.id}')">650万円超</div>
                `;
            case 'savingsWithSpouse':
                return `
                    <div class="option" onclick="handleAnswer('1500', '${question.id}')">(配偶者合計)1500万円以下</div>
                    <div class="option" onclick="handleAnswer('1550', '${question.id}')">(配偶者合計)1550万円以下</div>
                    <div class="option" onclick="handleAnswer('1650', '${question.id}')">(配偶者合計)1650万円以下</div>
                    <div class="option" onclick="handleAnswer('over', '${question.id}')">(配偶者合計)1650万円超</div>
                `;
            case 'taxInfo':
                return `
                    <div class="tax-info">
                        ${question.info.map(item => `<p>${item}</p>`).join('')}
                    </div>
                    <div class="option" onclick="handleAnswer('back', '${question.id}')">戻る</div>
                `;
        }
    }

    determineResult() {
        const { taxStatus, pensionStatus, income, hasSpouse, savingsAlone, savingsWithSpouse } = this.answers;

        if (taxStatus === 'no') {
            this.showResult('not_eligible');
            return;
        }

        if (pensionStatus === 'yes') {
            this.showResult('first');
            return;
        }

        if (income === '80') {
            if (hasSpouse === 'yes') {
                if (savingsWithSpouse === '1650') {
                    this.showResult('second');
                } else if (savingsWithSpouse === 'over') {
                    this.showResult('not_eligible');
                } else {
                    this.showResult('not_eligible');
                }
            } else {
                if (savingsAlone <= 650) {
                    this.showResult('second');
                } else {
                    this.showResult('not_eligible');
                }
            }
        } else if (income === '120') {
            if (hasSpouse === 'yes') {
                if (savingsWithSpouse === '1550') {
                    this.showResult('third_1');
                } else {
                    this.showResult('not_eligible');
                }
            } else {
                if (savingsAlone <= 550) {
                    this.showResult('third_1');
                } else {
                    this.showResult('not_eligible');
                }
            }
        } else if (income === '120+') {
            if (hasSpouse === 'yes') {
                if (savingsWithSpouse === '1500') {
                    this.showResult('third_2');
                } else {
                    this.showResult('not_eligible');
                }
            } else {
                if (savingsAlone <= 500) {
                    this.showResult('third_2');
                } else {
                    this.showResult('not_eligible');
                }
            }
        } else {
            this.showResult('not_eligible');
        }
    }

    showResult(result) {
        const resultText = document.getElementById('resultText');
        const resultExplanation = document.getElementById('resultExplanation');
        const resultArea = document.getElementById('resultArea');

        const results = {
            first: ['あなたは第1段階に該当する可能性があります', '非課税世帯かつ老齢福祉年金受給者です。'],
            second: ['あなたは第2段階に該当する可能性があります', '非課税世帯かつ収入80万円以下で預貯金基準以下です。'],
            third_1: ['あなたは第3段階①に該当する可能性があります', '収入80万円超120万円以下かつ預貯金基準以下の非課税世帯です。'],
            third_2: ['あなたは第3段階②に該当する可能性があります', '収入120万円超かつ預貯金基準以下の非課税世帯です。'],
            not_eligible: ['限度額認定の対象外の可能性があります', '条件に該当しないため、自治体にご相談ください。']
        };

        const [title, explanation] = results[result] || results['not_eligible'];

        resultText.textContent = title;
        resultExplanation.textContent = explanation;
        resultArea.classList.remove('hidden');
    }
}

function goToTop() {
    window.location.reload();
}

const questionnaire = new Questionnaire();
questionnaire.showQuestion(0);

function handleAnswer(answer, questionId) {
    if (answer === 'back') {
        const currentIndex = questionnaire.questions.findIndex(q => q.id === questionId);
        questionnaire.showQuestion(currentIndex - 1);
        return;
    }

    questionnaire.answers[questionId] = answer;
    const question = questionnaire.questions.find(q => q.id === questionId);

    let nextId = null;
    if (answer === 'yes') nextId = question.yes;
    else if (answer === 'no') nextId = question.no;
    else if (answer === 'unknown') nextId = question.unknown;
    else if (question.next) nextId = question.next;

    if (nextId && nextId.startsWith('result_')) {
        const resultKey = nextId.replace('result_', '');
        questionnaire.showResult(resultKey);
        return;
    }

    if (nextId === 'result') {
        questionnaire.determineResult();
        return;
    }

    const nextIndex = questionnaire.questions.findIndex(q => q.id === nextId);
    if (nextIndex !== -1) {
        questionnaire.showQuestion(nextIndex);
    }
}
