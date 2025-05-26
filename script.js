class Questionnaire {
    constructor() {
        this.questions = [
            {
                text: "あなたは市民税非課税世帯ですか？",
                type: "yesno_unknown",
                id: "taxStatus",
                yes: "pensionStatus",
                no: "income",
                unknown: "taxInfo"
            },
            {
                text: "老齢福祉年金を受給していますか？",
                id: "pensionStatus",
                type: "yesno",
                yes: "result_first",  // 結果画面へ
                no: "income"
            },
            {
                text: "年間の合計所得金額はいくらですか？",
                id: "income",
                type: "income",
                thresholds: [80, 120],
                next: "savings"
            },
            {
                text: "預貯金の合計金額はいくらですか？",
                id: "savings",
                type: "savings",
                thresholds: [500, 550, 650],
                next: "result"
            },
            {
                text: "住民税の非課税要件についてご説明します。以下のいずれかに該当する場合は非課税となります：",
                id: "taxInfo",
                type: "taxInfo",
                info: [
                    "1. 均等割と所得割がともに非課税とされる方",
                    "（1）生活保護法の規定による生活扶助を受けている方",
                    "（2）障害者、未成年者、寡婦又はひとり親で前年の合計所得金額が135万円以下の方",
                    "",
                    "2. 均等割が非課税とされる方",
                    "均等割のみを課される方のうち、前年の合計所得金額が一定の基準に伴い市町村の条例で定める金額以下の方",
                    "一定の基準＝(3)×本人、同一生計配偶者及び扶養親族の合計数+10万円+(4)",
                    "生活保護基準の級地区分の1級地の場合…(3)＝35万円、(4)＝21.0万円",
                    "生活保護基準の級地区分の2級地の場合…(3)＝31.5万円、(4)＝18.9万円",
                    "生活保護基準の級地区分の3級地の場合…(3)＝28万円、(4)＝16.8万円",
                    "",
                    "3. 所得割が非課税とされる方",
                    "所得割を課される方のうち、前年の総所得金額等の合計額が以下の金額以下の方",
                    "35万円×本人、同一生計配偶者及び扶養親族の合計数+10万円+32万円",
                    "*（4）及び（5）の金額は、同一生計配偶者又は扶養親族を有する場合に加算する金額です。"
                ],
                next: "taxStatus"
            }
        ];
        this.currentQuestionIndex = 0;
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
                return `
                    <div class="option" onclick="handleAnswer('500', '${question.id}')">500万円以下</div>
                    <div class="option" onclick="handleAnswer('550', '${question.id}')">550万円以下</div>
                    <div class="option" onclick="handleAnswer('650', '${question.id}')">650万円以下</div>
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
        const answers = this.answers;
        let result = '';

        if (answers['taxStatus'] === 'yes') {
            if (answers['pensionStatus'] === 'yes') {
                result = 'first';
            } else {
                const income = parseInt(answers['income']);
                const savings = parseInt(answers['savings']);

                if (income <= 80 && savings <= 650) {
                    result = 'second';
                } else if (income <= 120 && savings <= 550) {
                    result = 'third_1';
                } else if (income > 120 && savings <= 500) {
                    result = 'third_2';
                } else {
                    result = 'not_eligible';
                }
            }
        } else {
            result = 'not_eligible';
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
                explanation = '年間収入80万円以下で預貯金650万円以下の非課税世帯の場合です。';
                break;
            case 'third_1':
                text = 'あなたは第3段階①に該当する可能性があります';
                explanation = '年間収入80万円超120万円以下で預貯金550万円以下の非課税世帯の場合です。';
                break;
            case 'third_2':
                text = 'あなたは第3段階②に該当する可能性があります';
                explanation = '年間収入120万円超で預貯金500万円以下の非課税世帯の場合です。';
                break;
            case 'not_eligible':
                text = '負担限度額認定の対象外の可能性があります';
                explanation = '市民税課税世帯または条件を満たさない場合です。';
                break;
        }

        resultText.textContent = text;
        resultExplanation.textContent = explanation;
        resultArea.classList.remove('hidden');
    }
}

// TOP画面に戻る関数
function goToTop() {
    window.location.reload();
}

// 初期化
const questionnaire = new Questionnaire();
questionnaire.showQuestion(0);

// 回答処理
function handleAnswer(answer, questionId) {
    if (answer === 'back') {
        const currentIndex = questionnaire.questions.findIndex(q => q.id === questionId);
        questionnaire.showQuestion(currentIndex - 1);
        return;
    }

    questionnaire.answers[questionId] = answer;

    const currentQuestionIndex = questionnaire.questions.findIndex(q => q.id === questionId);
    const currentQuestion = questionnaire.questions[currentQuestionIndex];

    let nextId = null;

    if (answer === 'yes') {
        nextId = currentQuestion.yes;
    } else if (answer === 'no') {
        nextId = currentQuestion.no;
    } else if (answer === 'unknown') {
        nextId = currentQuestion.unknown;
    }

    if (!nextId && currentQuestion.next) {
        nextId = currentQuestion.next;
    }

    // 結果表示に遷移する場合
    if (nextId && nextId.startsWith('result_')) {
        questionnaire.showResult(nextId.replace('result_', ''));
        return;
    }

    if (nextId === 'result') {
        questionnaire.determineResult();
        return;
    }

    const nextQuestionIndex = questionnaire.questions.findIndex(q => q.id === nextId);
    if (nextQuestionIndex !== -1) {
        questionnaire.showQuestion(nextQuestionIndex);
    }
}
