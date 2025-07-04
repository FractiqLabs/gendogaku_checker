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
                next: "spouse"
            },
            {
                text: "配偶者はいますか？",
                id: "spouse",
                type: "yesno",
                yes: "savings_spouse",
                no: "savings_single"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人＋配偶者）",
                id: "savings_spouse",
                type: "savings_spouse",
                next: "result"
            },
            {
                text: "預貯金の合計金額はいくらですか？",
                id: "savings_single",
                type: "savings_single",
                next: "result"
            },
            {
                text: "簡易的な見分け方を紹介します。",
                id: "taxInfo",
                type: "taxInfo",
                info: [
                    "方法①：住民税決定通知書（市区町村から届く）を確認する",
                    "「所得割」「均等割」の両方が0円 → 非課税世帯（本人が非課税）",
                    "どちらかでも金額が記載されている → 課税世帯",
                    "方法②：介護保険料の通知や、国保の通知書を確認する",
                    "非課税である場合「住民税非課税」と記載されています。",
                    "________________________________________",
                    "〇世帯全体で判断する目安（ざっくりとした基準です）",
                    "単身世帯：年金収入のみで年間約158万円以下であれば非課税の可能性大（65歳以上）",
                    "2人世帯（例：夫婦）：年金収入のみで 合計約211万円以下 であれば非課税の可能性",
                    "※扶養の有無や障害者控除などにより、正確な基準は多少前後します。"
                ],
                next: "taxStatus",
                prev: "taxStatus"
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
            case 'savings_spouse':
                return `
                    <div class="option" onclick="handleAnswer('1500', '${question.id}')">1500万円以下</div>
                    <div class="option" onclick="handleAnswer('1550', '${question.id}')">1550万円以下</div>
                    <div class="option" onclick="handleAnswer('1650', '${question.id}')">1650万円以下</div>
                    <div class="option" onclick="handleAnswer('over1650', '${question.id}')">1650万円超</div>
                `;
            case 'savings_single':
                return `
                    <div class="option" onclick="handleAnswer('500', '${question.id}')">500万円以下</div>
                    <div class="option" onclick="handleAnswer('550', '${question.id}')">550万円以下</div>
                    <div class="option" onclick="handleAnswer('650', '${question.id}')">650万円以下</div>
                    <div class="option" onclick="handleAnswer('over650', '${question.id}')">650万円超</div>
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
        const a = this.answers;
        if (a['taxStatus'] !== 'yes') {
            this.showResult('not_eligible');
            return;
        }

        if (a['pensionStatus'] === 'yes') {
            this.showResult('first');
            return;
        }

        const income = a['income'];
        const hasSpouse = a['spouse'] === 'yes';

        if (hasSpouse) {
            const savingsAnswer = a['savings_spouse'];
            if (income === '80' && savingsAnswer !== 'over1650') {
                this.showResult('second');
                return;
            }
            if (income === '120' && (savingsAnswer === '1500' || savingsAnswer === '1550')) {
                this.showResult('third_1');
                return;
            }
            if (income === '120+' && savingsAnswer === '1500') {
                this.showResult('third_2');
                return;
            }
        } else {
            const savingsAnswer = a['savings_single'];
            if (income === '80' && savingsAnswer !== 'over650') {
                this.showResult('second');
                return;
            }
            if (income === '120' && (savingsAnswer === '500' || savingsAnswer === '550')) {
                this.showResult('third_1');
                return;
            }
            if (income === '120+' && savingsAnswer === '500') {
                this.showResult('third_2');
                return;
            }
        }

        this.showResult('not_eligible');
    }

    showResult(result) {
        const resultText = document.getElementById('resultText');
        const resultExplanation = document.getElementById('resultExplanation');
        const resultArea = document.getElementById('resultArea');
        let text = '', explanation = '';

        switch (result) {
            case 'first':
                text = 'あなたは第1段階に該当する可能性があります';
                explanation = '非課税世帯で老齢福祉年金受給者の場合です。';
                break;
            case 'second':
                text = 'あなたは第2段階に該当する可能性があります';
                explanation = '年間収入80万円以下かつ預貯金要件（本人のみ650万円以下・配偶者合計1,650万円以下）を満たす非課税世帯の場合です。';
                break;
            case 'third_1':
                text = 'あなたは第3段階①に該当する可能性があります';
                explanation = '年間収入80万円超120万円以下かつ預貯金要件（本人のみ550万円以下・配偶者合計1,550万円以下）を満たす非課税世帯の場合です。';
                break;
            case 'third_2':
                text = 'あなたは第3段階②に該当する可能性があります';
                explanation = '年間収入120万円超かつ預貯金要件（本人のみ500万円以下・配偶者合計1,500万円以下）を満たす非課税世帯の場合です。';
                break;
            case 'not_eligible':
                text = '負担限度額認定の対象外の可能性があります';
                explanation = '課税世帯、または条件を満たさない場合です。';
                break;
        }

        resultText.textContent = text;
        resultExplanation.textContent = explanation;
        resultArea.classList.remove('hidden');
    }
}

const questionnaire = new Questionnaire();

function handleAnswer(answer, questionId) {
    if (answer === 'back') {
        const currentQuestion = questionnaire.questions.find(q => q.id === questionId);
        const prevId = currentQuestion.prev;
        if (prevId) {
            const prevIndex = questionnaire.questions.findIndex(q => q.id === prevId);
            questionnaire.showQuestion(prevIndex);
        } else {
            const currentIndex = questionnaire.questions.findIndex(q => q.id === questionId);
            questionnaire.showQuestion(currentIndex - 1);
        }
        return;
    }

    questionnaire.answers[questionId] = answer;
    const current = questionnaire.questions.find(q => q.id === questionId);

    let nextId = current.next || current[answer];
    if (nextId?.startsWith('result_')) {
        questionnaire.showResult(nextId.replace('result_', ''));
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

function goToTop() {
    questionnaire.answers = {};
    document.getElementById('resultArea').classList.add('hidden');
    questionnaire.showQuestion(0);
}

// 初期表示
window.onload = () => {
    questionnaire.showQuestion(0);
};
