
class Questionnaire {
    constructor() {
        this.questions = [
            {
                text: "あなたは市民税非課税世帯ですか？",
                type: "yesno_unknown",
                id: "taxStatus",
                yes: "pensionStatus",
                no: "result",
                unknown: "taxInfo"
            },
            {
                text: "老齢福祉年金を受給していますか？",
                id: "pensionStatus",
                type: "yesno",
                yes: "result",
                no: "income"
            },
            {
                text: "年間の合計所得金額はいくらですか？",
                id: "income",
                type: "income",
                thresholds: [80, 120],
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
                thresholds: [500, 550, 650],
                next: "result"
            },
            {
                text: "預貯金の合計金額はいくらですか？（本人＋配偶者）",
                id: "savings_spouse",
                type: "savings_spouse",
                thresholds: [1500, 1550, 1650],
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
                return `
                    <div class="option" onclick="handleAnswer('500', '${question.id}')">500万円以下</div>
                    <div class="option" onclick="handleAnswer('550', '${question.id}')">550万円以下</div>
                    <div class="option" onclick="handleAnswer('650', '${question.id}')">650万円以下</div>
                `;
            case 'savings_spouse':
                return `
                    <div class="option" onclick="handleAnswer('1500', '${question.id}')">(配偶者合計)1500万円以下</div>
                    <div class="option" onclick="handleAnswer('1550', '${question.id}')">(配偶者合計)1550万円以下</div>
                    <div class="option" onclick="handleAnswer('1650', '${question.id}')">(配偶者合計)1650万円以下</div>
                    <div class="option" onclick="handleAnswer('over', '${question.id}')">(配偶者合計)1650万円以上</div>
                `;
            case 'taxInfo':
                return `
                    <div class="tax-info">
                        ${question.info.filter(item => item.trim()).map(item => `<p>${item}</p>`).join('')}
                    </div>
                    <div class="option" onclick="handleAnswer('back', '${question.id}')">戻る</div>
                `;
        }
    }

    determineResult() {
        const a = this.answers;
        if (a['taxStatus'] === 'yes') {
            if (a['pensionStatus'] === 'yes') {
                this.showResult('first');
                return;
            }

            const income = a['income'];
            const hasSpouse = a['spouse'] === 'yes';

            let savings = a[hasSpouse ? 'savings_spouse' : 'savings'];
            savings = savings === 'over' ? Infinity : parseInt(savings);

            if (income === '80') {
                if ((hasSpouse && savings <= 1650) || (!hasSpouse && savings <= 650)) {
                    this.showResult('second'); return;
                }
            } else if (income === '120') {
                if ((hasSpouse && savings <= 1550) || (!hasSpouse && savings <= 550)) {
                    this.showResult('third_1'); return;
                }
            } else if (income === '120+') {
                if ((hasSpouse && savings <= 1500) || (!hasSpouse && savings <= 500)) {
                    this.showResult('third_2'); return;
                }
            }
        }
        this.showResult('not_eligible');
    }

    showResult(result) {
        const textMap = {
            first: 'あなたは第1段階に該当する可能性があります',
            second: 'あなたは第2段階に該当する可能性があります',
            third_1: 'あなたは第3段階①に該当する可能性があります',
            third_2: 'あなたは第3段階②に該当する可能性があります',
            not_eligible: '負担限度額認定の対象外の可能性があります'
        };

        const explanationMap = {
            first: '非課税世帯で老齢福祉年金受給者の場合です。',
            second: '年間収入80万円以下で預貯金が所定の範囲内の非課税世帯の場合です。',
            third_1: '年間収入80万円超120万円以下で預貯金が所定の範囲内の非課税世帯の場合です。',
            third_2: '年間収入120万円超で預貯金が所定の範囲内の非課税世帯の場合です。',
            not_eligible: '市民税課税世帯または条件を満たさない場合です。'
        };

        document.getElementById('resultText').textContent = textMap[result];
        document.getElementById('resultExplanation').textContent = explanationMap[result];
        document.getElementById('resultArea').classList.remove('hidden');
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
