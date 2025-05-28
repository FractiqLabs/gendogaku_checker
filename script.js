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
                yes: "savingsSpouse",
                no: "savings"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人のみ）",
                id: "savings",
                type: "savings",
                options: [
                    { value: "500", label: "500万円以下" },
                    { value: "550", label: "550万円以下" },
                    { value: "650", label: "650万円以下" }
                ],
                next: "result"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人＋配偶者）",
                id: "savingsSpouse",
                type: "savings",
                options: [
                    { value: "1500", label: "(配偶者合計)1500万円以下" },
                    { value: "1550", label: "(配偶者合計)1550万円以下" },
                    { value: "1650", label: "(配偶者合計)1650万円以下" }
                ],
                next: "result"
            },
            {
                text: "住民税の非課税要件についてご説明します。",
                id: "taxInfo",
                type: "taxInfo",
                info: [ /* ...既存の説明文... */ ],
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
            case 'savings':
                return question.options.map(opt =>
                    `<div class="option" onclick="handleAnswer('${opt.value}', '${question.id}')">${opt.label}</div>`
                ).join('');
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
        const { taxStatus, pensionStatus, income, hasSpouse, savings, savingsSpouse } = this.answers;
        let result = '';

        if (taxStatus !== 'yes') {
            result = 'not_eligible';
        } else if (pensionStatus === 'yes') {
            result = 'first';
        } else {
            const incomeValue = income;
            const savingsValue = parseInt(hasSpouse === 'yes' ? savingsSpouse : savings);

            if (incomeValue === '80') {
                if ((hasSpouse === 'yes' && savingsValue <= 1650) || (hasSpouse === 'no' && savingsValue <= 650)) {
                    result = 'second';
                } else {
                    result = 'not_eligible';
                }
            } else if (incomeValue === '120') {
                if ((hasSpouse === 'yes' && savingsValue <= 1550) || (hasSpouse === 'no' && savingsValue <= 550)) {
                    result = 'third_1';
                } else {
                    result = 'not_eligible';
                }
            } else if (incomeValue === '120+') {
                if ((hasSpouse === 'yes' && savingsValue <= 1500) || (hasSpouse === 'no' && savingsValue <= 500)) {
                    result = 'third_2';
                } else {
                    result = 'not_eligible';
                }
            } else {
                result = 'not_eligible';
            }
        }

        this.showResult(result);
    }

    showResult(result) {
        const resultText = document.getElementById('resultText');
        const resultExplanation = document.getElementById('resultExplanation');
        const resultArea = document.getElementById('resultArea');

        let text = '';
        let explanation = '';

        switch (result) {
            case 'first':
                text = 'あなたは第1段階に該当する可能性があります';
                explanation = '非課税世帯で老齢福祉年金受給者の場合です。';
                break;
            case 'second':
                text = 'あなたは第2段階に該当する可能性があります';
                explanation = '収入80万円以下で、預貯金が条件を満たす非課税世帯の場合です。';
                break;
            case 'third_1':
                text = 'あなたは第3段階①に該当する可能性があります';
                explanation = '収入80万円超120万円以下で、預貯金が条件を満たす非課税世帯の場合です。';
                break;
            case 'third_2':
                text = 'あなたは第3段階②に該当する可能性があります';
                explanation = '収入120万円超で、預貯金が条件を満たす非課税世帯の場合です。';
                break;
            default:
                text = '負担限度額認定の対象外の可能性があります';
                explanation = '市民税課税世帯または条件を満たさない場合です。';
        }

        resultText.textContent = text;
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

    if (nextId === 'result') {
        questionnaire.determineResult();
        return;
    }

    const nextIndex = questionnaire.questions.findIndex(q => q.id === nextId);
    if (nextIndex !== -1) {
        questionnaire.showQuestion(nextIndex);
    }
}
