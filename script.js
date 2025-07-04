const translations = {
    ja: {
        // Header
        headerTitle: "負担限度額認定チェッカー",
        headerSubtitle: "いくつかの簡単な質問に答えるだけで、介護保険の負担限度額認定がどの段階に該当するかをチェックできます。",
        headerCaution: "【ご注意】本ツールはあくまで簡易的な判定です。正確な情報は、必ずお住まいの市区町村の窓口でご確認ください。",
        languageLabel: "言語:",
        languageJa: "日本語",
        languageEn: "English",
        languageZh: "中文",
        languageKo: "한국어",

        // Questions
        qTaxStatus: "あなたは市民税非課税世帯ですか？",
        qPensionStatus: "老齢福祉年金を受給していますか？",
        qIncome: "年間の合計所得金額はいくらですか？",
        qSpouse: "配偶者はいますか？",
        qSavingsSpouse: "預貯金の合計金額はいくらですか？（本人＋配偶者）",
        qSavingsSingle: "預貯金の合計金額はいくらですか？",
        qTaxInfo: "簡易的な見分け方を紹介します。",

        // Options
        yes: "はい",
        no: "いいえ",
        unknown: "わからない",
        income80: "80万円以下",
        income120: "80万円超120万円以下",
        income120plus: "120万円超",
        savings1500: "1500万円以下",
        savings1550: "1550万円以下",
        savings1650: "1650万円以下",
        savingsOver1650: "1650万円超",
        savings500: "500万円以下",
        savings550: "550万円以下",
        savings650: "650万円以下",
        savingsOver650: "650万円超",
        back: "戻る",

        // Tax Info Details
        taxInfoMethod1: "方法①：住民税決定通知書（市区町村から届く）を確認する",
        taxInfoMethod1Detail1: "「所得割」「均等割」の両方が0円 → 非課税世帯（本人が非課税）",
        taxInfoMethod1Detail2: "どちらかでも金額が記載されている → 課税世帯",
        taxInfoMethod2: "方法②：介護保険料の通知や、国保の通知書を確認する",
        taxInfoMethod2Detail: "非課税である場合「住民税非課税」と記載されています。",
        taxInfoSeparator: "________________________________________",
        taxInfoEstimateTitle: "〇世帯全体で判断する目安（ざっくりとした基準です）",
        taxInfoEstimateSingle: "単身世帯：年金収入のみで年間約158万円以下であれば非課税の可能性大（65歳以上）",
        taxInfoEstimateCouple: "2人世帯（例：夫婦）：年金収入のみで 合計約211万円以下 であれば非課税の可能性",
        taxInfoEstimateNote: "※扶養の有無や障害者控除などにより、正確な基準は多少前後します。",

        // Results
        resultFirst: "あなたは第1段階に該当する可能性があります",
        resultFirstExplanation: "非課税世帯で老齢福祉年金受給者の場合です。",
        resultSecond: "あなたは第2段階に該当する可能性があります",
        resultSecondExplanation: "年間収入80万円以下かつ預貯金要件（本人のみ650万円以下・配偶者合計1,650万円以下）を満たす非課税世帯の場合です。",
        resultThird1: "あなたは第3段階①に該当する可能性があります",
        resultThird1Explanation: "年間収入80万円超120万円以下かつ預貯金要件（本人のみ550万円以下・配偶者合計1,550万円以下）を満たす非課税世帯の場合です。",
        resultThird2: "あなたは第3段階②に該当する可能性があります",
        resultThird2Explanation: "年間収入120万円超かつ預貯金要件（本人のみ500万円以下・配偶者合計1,500万円以下）を満たす非課税世帯の場合です。",
        resultNotEligible: "負担限度額認定の対象外の可能性があります",
        resultNotEligibleExplanation: "課税世帯、または条件を満たさない場合です。",

        // Result Actions
        printResult: "結果を印刷",
        saveAsText: "結果をテキストで保存",
        diagnoseAgain: "もう一度診断する",
        answerHistoryTitle: "あなたの回答履歴",

        // Footer
        disclaimer: "免責事項",
        privacyPolicy: "プライバシーポリシー",
        copyright: "著作権・クレジット",
        siteName: "負担限度額認定チェッカー",
        developer: "Shinji Tanaka",
        printDisclaimer: "実際の介護保険負担限度額認定における認否、認定段階においては、市区町村等への確認を必ず行ってください。",
        saveTextDisclaimer: "※この結果は簡易的なものです。最終的な認定可否は市区町村窓口でご確認ください。",
        diagnoseResult: "診断結果"
    },
    en: {
        // Header
        headerTitle: "Long-Term Care Cost Reduction Checker",
        headerSubtitle: "Answer a few simple questions to check which stage of long-term care cost reduction you may be eligible for.",
        headerCaution: "【Caution】This tool provides a simplified assessment. For accurate information, please consult your local municipal office.",
        languageLabel: "Language:",
        languageJa: "Japanese",
        languageEn: "English",
        languageZh: "Chinese",
        languageKo: "Korean",

        // Questions
        qTaxStatus: "Are you a tax-exempt household?",
        qPensionStatus: "Do you receive the Old-Age Welfare Pension?",
        qIncome: "What is your total annual income?",
        qSpouse: "Do you have a spouse?",
        qSavingsSpouse: "What is the total amount of your savings? (Self + Spouse)",
        qSavingsSingle: "What is the total amount of your savings?",
        qTaxInfo: "Here's a simple way to check.",

        // Options
        yes: "Yes",
        no: "No",
        unknown: "Unsure",
        income80: "800,000 JPY or less",
        income120: "Over 800,000 JPY to 1,200,000 JPY",
        income120plus: "Over 1,200,000 JPY",
        savings1500: "15,000,000 JPY or less",
        savings1550: "15,500,000 JPY or less",
        savings1650: "16,500,000 JPY or less",
        savingsOver1650: "Over 16,500,000 JPY",
        savings500: "5,000,000 JPY or less",
        savings550: "5,500,000 JPY or less",
        savings650: "6,500,000 JPY or less",
        savingsOver650: "Over 6,500,000 JPY",
        back: "Back",

        // Tax Info Details
        taxInfoMethod1: "Method ①: Check your Resident Tax Decision Notice (received from your municipality)",
        taxInfoMethod1Detail1: "If both "Income-based tax" and "Per capita tax" are 0 JPY → Tax-exempt household (individual is tax-exempt)",
        taxInfoMethod1Detail2: "If either has an amount listed → Taxable household",
        taxInfoMethod2: "Method ②: Check your Long-Term Care Insurance premium notice or National Health Insurance notice",
        taxInfoMethod2Detail: "If you are tax-exempt, it will state "Resident Tax Exempt".",
        taxInfoSeparator: "________________________________________",
        taxInfoEstimateTitle: "〇 Household-wide assessment (rough criteria)",
        taxInfoEstimateSingle: "Single household: If annual pension income is approx. 1,580,000 JPY or less, likely tax-exempt (65 years or older)",
        taxInfoEstimateCouple: "Two-person household (e.g., couple): If total annual pension income is approx. 2,110,000 JPY or less, likely tax-exempt",
        taxInfoEstimateNote: "※Exact criteria may vary slightly depending on dependents, disability deductions, etc.",

        // Results
        resultFirst: "You may be eligible for Stage 1",
        resultFirstExplanation: "This applies to tax-exempt households receiving the Old-Age Welfare Pension.",
        resultSecond: "You may be eligible for Stage 2",
        resultSecondExplanation: "This applies to tax-exempt households with annual income of 800,000 JPY or less and meeting the savings requirements (5,000,000 JPY or less for single, 16,500,000 JPY or less total for couple).",
        resultThird1: "You may be eligible for Stage 3-①",
        resultThird1Explanation: "This applies to tax-exempt households with annual income over 800,000 JPY to 1,200,000 JPY and meeting the savings requirements (5,500,000 JPY or less for single, 15,500,000 JPY or less total for couple).",
        resultThird2: "You may be eligible for Stage 3-②",
        resultThird2Explanation: "This applies to tax-exempt households with annual income over 1,200,000 JPY and meeting the savings requirements (5,000,000 JPY or less for single, 15,000,000 JPY or less total for couple).",
        resultNotEligible: "You may not be eligible for long-term care cost reduction",
        resultNotEligibleExplanation: "This applies to taxable households or those not meeting the conditions.",

        // Result Actions
        printResult: "Print Result",
        saveAsText: "Save Result as Text",
        diagnoseAgain: "Diagnose Again",
        answerHistoryTitle: "Your Answer History",

        // Footer
        disclaimer: "Disclaimer",
        privacyPolicy: "Privacy Policy",
        copyright: "Copyright & Credits",
        siteName: "Long-Term Care Cost Reduction Checker",
        developer: "Shinji Tanaka",
        printDisclaimer: "For actual approval and stage determination of long-term care cost reduction, please always confirm with your municipal office.",
        saveTextDisclaimer: "※This result is a simplified assessment. For final approval, please confirm with your municipal office.",
        diagnoseResult: "Diagnosis Result"
    },
    zh: {
        // Header
        headerTitle: "护理保险费用减免查询器",
        headerSubtitle: "只需回答几个简单问题，即可查询您可能符合的护理保险费用减免阶段。",
        headerCaution: "【注意】本工具仅提供简易评估。如需准确信息，请务必咨询您所在地的市政府办公室。",
        languageLabel: "语言:",
        languageJa: "日语",
        languageEn: "英语",
        languageZh: "中文",
        languageKo: "韩语",

        // Questions
        qTaxStatus: "您是免税家庭吗？",
        qPensionStatus: "您是否领取老年福利年金？",
        qIncome: "您的年度总收入是多少？",
        qSpouse: "您有配偶吗？",
        qSavingsSpouse: "您的储蓄总额是多少？（本人+配偶）",
        qSavingsSingle: "您的储蓄总额是多少？",
        qTaxInfo: "这里有一个简单的检查方法。",

        // Options
        yes: "是",
        no: "否",
        unknown: "不确定",
        income80: "80万日元以下",
        income120: "80万日元以上至120万日元",
        income120plus: "120万日元以上",
        savings1500: "1500万日元以下",
        savings1550: "1550万日元以下",
        savings1650: "1650万日元以下",
        savingsOver1650: "1650万日元以上",
        savings500: "500万日元以下",
        savings550: "550万日元以下",
        savings650: "650万日元以下",
        savingsOver650: "650万日元以上",
        back: "返回",

        // Tax Info Details
        taxInfoMethod1: "方法①：查看您的居民税决定通知书（由市政府寄送）",
        taxInfoMethod1Detail1: "如果“所得割”和“均等割”均为0日元 → 免税家庭（个人免税）",
        taxInfoMethod1Detail2: "如果其中任何一项有金额列出 → 应税家庭",
        taxInfoMethod2: "方法②：查看您的护理保险费通知或国民健康保险通知",
        taxInfoMethod2Detail: "如果您是免税的，将注明“居民税非课税”。",
        taxInfoSeparator: "________________________________________",
        taxInfoEstimateTitle: "〇 家庭整体评估（大致标准）",
        taxInfoEstimateSingle: "单身家庭：如果年金收入每年约158万日元或以下，很可能免税（65岁以上）",
        taxInfoEstimateCouple: "两人家庭（例如：夫妻）：如果年金总收入每年约211万日元或以下，很可能免税",
        taxInfoEstimateNote: "※具体标准可能因抚养情况、残疾人扣除等略有不同。",

        // Results
        resultFirst: "您可能符合第一阶段",
        resultFirstExplanation: "适用于领取老年福利年金的免税家庭。",
        resultSecond: "您可能符合第二阶段",
        resultSecondExplanation: "适用于年收入80万日元或以下，并符合储蓄要求（单身500万日元或以下，夫妻总计1650万日元或以下）的免税家庭。",
        resultThird1: "您可能符合第三阶段①",
        resultThird1Explanation: "适用于年收入80万日元以上至120万日元，并符合储蓄要求（单身550万日元或以下，夫妻总计1550万日元或以下）的免税家庭。",
        resultThird2: "您可能符合第三阶段②",
        resultThird2Explanation: "适用于年收入120万日元以上，并符合储蓄要求（单身500万日元或以下，夫妻总计1500万日元或以下）的免税家庭。",
        resultNotEligible: "您可能不符合护理保险费用减免条件",
        resultNotEligibleExplanation: "适用于应税家庭或不符合条件的家庭。",

        // Result Actions
        printResult: "打印结果",
        saveAsText: "保存结果为文本",
        diagnoseAgain: "再次诊断",
        answerHistoryTitle: "您的回答历史",

        // Footer
        disclaimer: "免责声明",
        privacyPolicy: "隐私政策",
        copyright: "版权与鸣谢",
        siteName: "护理保险费用减免查询器",
        developer: "Shinji Tanaka",
        printDisclaimer: "关于护理保险费用减免的实际批准和阶段确定，请务必咨询您所在地的市政府办公室。",
        saveTextDisclaimer: "※此结果为简易评估。最终批准请咨询市政府办公室。",
        diagnoseResult: "诊断结果"
    },
    ko: {
        // Header
        headerTitle: "개호보험 부담한도액 인정 확인기",
        headerSubtitle: "몇 가지 간단한 질문에 답하여 개호보험 부담한도액 인정의 어느 단계에 해당하는지 확인할 수 있습니다.",
        headerCaution: "【주의】본 도구는 어디까지나 간이적인 판정입니다. 정확한 정보는 반드시 거주하시는 시정촌 창구에서 확인해 주십시오.",
        languageLabel: "언어:",
        languageJa: "일본어",
        languageEn: "영어",
        languageZh: "중국어",
        languageKo: "한국어",

        // Questions
        qTaxStatus: "귀하는 시민세 비과세 세대입니까?",
        qPensionStatus: "노령복지연금을 수령하고 있습니까?",
        qIncome: "연간 총 소득 금액은 얼마입니까?",
        qSpouse: "배우자가 있습니까?",
        qSavingsSpouse: "예금 총액은 얼마입니까? (본인 + 배우자)",
        qSavingsSingle: "예금 총액은 얼마입니까?",
        qTaxInfo: "간단한 확인 방법을 소개합니다.",

        // Options
        yes: "예",
        no: "아니오",
        unknown: "모르겠습니다",
        income80: "80만 엔 이하",
        income120: "80만 엔 초과 120만 엔 이하",
        income120plus: "120만 엔 초과",
        savings1500: "1500만 엔 이하",
        savings1550: "1550만 엔 이하",
        savings1650: "1650만 엔 이하",
        savingsOver1650: "1650만 엔 초과",
        savings500: "500만 엔 이하",
        savings550: "550만 엔 이하",
        savings650: "650만 엔 이하",
        savingsOver650: "650만 엔 초과",
        back: "뒤로",

        // Tax Info Details
        taxInfoMethod1: "방법①: 주민세 결정 통지서(시정촌에서 발송)를 확인하십시오",
        taxInfoMethod1Detail1: "“소득할”과 “균등할” 모두 0엔 → 비과세 세대(본인 비과세)",
        taxInfoMethod1Detail2: "어느 한쪽이라도 금액이 기재되어 있는 경우 → 과세 세대",
        taxInfoMethod2: "방법②: 개호보험료 통지 또는 국민건강보험 통지서를 확인하십시오",
        taxInfoMethod2Detail: "비과세인 경우 “주민세 비과세”라고 기재되어 있습니다.",
        taxInfoSeparator: "________________________________________",
        taxInfoEstimateTitle: "〇 세대 전체 판단 기준(대략적인 기준입니다)",
        taxInfoEstimateSingle: "단신 세대: 연금 수입만으로 연간 약 158만 엔 이하이면 비과세 가능성 높음(65세 이상)",
        taxInfoEstimateCouple: "2인 세대(예: 부부): 연금 수입만으로 합계 약 211만 엔 이하이면 비과세 가능성",
        taxInfoEstimateNote: "※부양 유무나 장애인 공제 등에 따라 정확한 기준은 다소 달라질 수 있습니다.",

        // Results
        resultFirst: "귀하는 제1단계에 해당할 가능성이 있습니다",
        resultFirstExplanation: "비과세 세대이며 노령복지연금 수령자인 경우입니다.",
        resultSecond: "귀하는 제2단계에 해당할 가능성이 있습니다",
        resultSecondExplanation: "연간 수입 80만 엔 이하이며 예금 요건(본인만 650만 엔 이하·배우자 합계 1,650만 엔 이하)을 충족하는 비과세 세대인 경우입니다.",
        resultThird1: "귀하는 제3단계①에 해당할 가능성이 있습니다",
        resultThird1Explanation: "연간 수입 80만 엔 초과 120만 엔 이하이며 예금 요건(본인만 550만 엔 이하·배우자 합계 1,550만 엔 이하)을 충족하는 비과세 세대인 경우입니다.",
        resultThird2: "귀하는 제3단계②에 해당할 가능성이 있습니다",
        resultThird2Explanation: "연간 수입 120만 엔 초과이며 예금 요건(본인만 500만 엔 이하·배우자 합계 1,500만 엔 이하)을 충족하는 비과세 세대인 경우입니다.",
        resultNotEligible: "부담한도액 인정 대상이 아닐 가능성이 있습니다",
        resultNotEligibleExplanation: "과세 세대이거나 조건을 충족하지 않는 경우입니다.",

        // Result Actions
        printResult: "결과 인쇄",
        saveAsText: "결과를 텍스트로 저장",
        diagnoseAgain: "다시 진단하기",
        answerHistoryTitle: "귀하의 답변 기록",

        // Footer
        disclaimer: "면책 조항",
        privacyPolicy: "개인정보처리방침",
        copyright: "저작권 및 크레딧",
        siteName: "개호보험 부담한도액 인정 확인기",
        developer: "Shinji Tanaka",
        printDisclaimer: "실제 개호보험 부담한도액 인정 여부 및 인정 단계는 반드시 시정촌 창구에서 확인해 주십시오.",
        saveTextDisclaimer: "※이 결과는 간이적인 것입니다. 최종 승인은 시정촌 사무소에 확인하십시오."
    }
};

let currentLanguage = 'ja'; // Default language

function setLanguage(lang) {
    currentLanguage = lang;

    // Update header
    document.querySelector('h1').textContent = translations[lang].headerTitle;
    document.querySelector('header p:nth-of-type(1)').textContent = translations[lang].headerSubtitle;
    document.querySelector('header p:nth-of-type(2)').textContent = translations[lang].headerCaution;
    document.querySelector('.language-selector label').textContent = translations[lang].languageLabel;
    document.querySelector('#language-select option[value="ja"]').textContent = translations[lang].languageJa;
    document.querySelector('#language-select option[value="en"]').textContent = translations[lang].languageEn;
    document.querySelector('#language-select option[value="zh"]').textContent = translations[lang].languageZh;
    document.querySelector('#language-select option[value="ko"]').textContent = translations[lang].languageKo;


    // Update result actions
    document.querySelector('.result-actions button:nth-of-type(1)').textContent = translations[lang].printResult;
    document.querySelector('.result-actions button:nth-of-type(2)').textContent = translations[lang].saveAsText;
    document.querySelector('#resultArea > button').textContent = translations[lang].diagnoseAgain;

    // Update footer
    document.querySelector('footer nav ul li:nth-of-type(1) a').textContent = translations[lang].disclaimer;
    document.querySelector('footer nav ul li:nth-of-type(2) a').textContent = translations[lang].privacyPolicy;
    document.querySelector('footer nav ul li:nth-of-type(3) a').textContent = translations[lang].copyright;
    document.querySelector('.print-footer p:nth-of-type(1)').textContent = translations[lang].siteName;
    document.querySelector('.print-footer p:nth-of-type(3)').textContent = translations[lang].developer;
    document.querySelector('.print-footer .print-disclaimer').textContent = translations[lang].printDisclaimer;


    // Re-render current question or result to apply new language
    if (!document.getElementById('questionArea').classList.contains('hidden')) {
        questionnaire.showQuestion(questionnaire.questions.findIndex(q => q.id === questionnaire.currentQuestionId));
    } else if (!document.getElementById('resultArea').classList.contains('hidden')) {
        questionnaire.showResult(questionnaire.lastResult);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('language-select');
    langSelect.value = currentLanguage; // Set initial selection
    langSelect.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });
    setLanguage(currentLanguage); // Apply default language on load
});

class Questionnaire {
    constructor() {
        this.questions = [
            {
                textKey: "qTaxStatus",
                type: "yesno_unknown",
                id: "taxStatus",
                yes: "pensionStatus",
                no: "result_not_eligible",
                unknown: "taxInfo"
            },
            {
                textKey: "qPensionStatus",
                id: "pensionStatus",
                type: "yesno",
                yes: "result_first",
                no: "income"
            },
            {
                textKey: "qIncome",
                id: "income",
                type: "income",
                next: "spouse"
            },
            {
                textKey: "qSpouse",
                id: "spouse",
                type: "yesno",
                yes: "savings_spouse",
                no: "savings_single"
            },
            {
                textKey: "qSavingsSpouse",
                id: "savings_spouse",
                type: "savings_spouse",
                next: "result"
            },
            {
                textKey: "qSavingsSingle",
                id: "savings_single",
                type: "savings_single",
                next: "result"
            },
            {
                textKey: "qTaxInfo",
                id: "taxInfo",
                type: "taxInfo",
                infoKeys: [
                    "taxInfoMethod1",
                    "taxInfoMethod1Detail1",
                    "taxInfoMethod1Detail2",
                    "taxInfoMethod2",
                    "taxInfoMethod2Detail",
                    "taxInfoSeparator",
                    "taxInfoEstimateTitle",
                    "taxInfoEstimateSingle",
                    "taxInfoEstimateCouple",
                    "taxInfoEstimateNote"
                ],
                next: "taxStatus",
                prev: "taxStatus"
            }
        ];
        this.answers = {};
        this.currentQuestionId = null; // Track current question for language switch
        this.lastResult = null; // Track last result for language switch
    }

    showQuestion(index) {
        const question = this.questions[index];
        this.currentQuestionId = question.id; // Update current question ID
        const questionArea = document.getElementById('questionArea');
        questionArea.innerHTML = `
            <div class="question">
                <p>${translations[currentLanguage][question.textKey]}</p>
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
                    <div class="option" onclick="handleAnswer('yes', '${question.id}')">${translations[currentLanguage].yes}</div>
                    <div class="option" onclick="handleAnswer('no', '${question.id}')">${translations[currentLanguage].no}</div>
                `;
            case 'yesno_unknown':
                return `
                    <div class="option" onclick="handleAnswer('yes', '${question.id}')">${translations[currentLanguage].yes}</div>
                    <div class="option" onclick="handleAnswer('no', '${question.id}')">${translations[currentLanguage].no}</div>
                    <div class="option" onclick="handleAnswer('unknown', '${question.id}')">${translations[currentLanguage].unknown}</div>
                `;
            case 'income':
                return `
                    <div class="option" onclick="handleAnswer('80', '${question.id}')">${translations[currentLanguage].income80}</div>
                    <div class="option" onclick="handleAnswer('120', '${question.id}')">${translations[currentLanguage].income120}</div>
                    <div class="option" onclick="handleAnswer('120+', '${question.id}')">${translations[currentLanguage].income120plus}</div>
                `;
            case 'savings_spouse':
                return `
                    <div class="option" onclick="handleAnswer('1500', '${question.id}')">${translations[currentLanguage].savings1500}</div>
                    <div class="option" onclick="handleAnswer('1550', '${question.id}')">${translations[currentLanguage].savings1550}</div>
                    <div class="option" onclick="handleAnswer('1650', '${question.id}')">${translations[currentLanguage].savings1650}</div>
                    <div class="option" onclick="handleAnswer('over1650', '${question.id}')">${translations[currentLanguage].savingsOver1650}</div>
                `;
            case 'savings_single':
                return `
                    <div class="option" onclick="handleAnswer('500', '${question.id}')">${translations[currentLanguage].savings500}</div>
                    <div class="option" onclick="handleAnswer('550', '${question.id}')">${translations[currentLanguage].savings550}</div>
                    <div class="option" onclick="handleAnswer('650', '${question.id}')">${translations[currentLanguage].savings650}</div>
                    <div class="option" onclick="handleAnswer('over650', '${question.id}')">${translations[currentLanguage].savingsOver650}</div>
                `;
            case 'taxInfo':
                return `
                    <div class="tax-info">
                        ${question.infoKeys.map(key => `<p>${translations[currentLanguage][key]}</p>`).join('')}
                    </div>
                    <div class="option" onclick="handleAnswer('back', '${question.id}')">${translations[currentLanguage].back}</div>
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
        this.lastResult = result; // Update last result
        const resultText = document.getElementById('resultText');
        const resultExplanation = document.getElementById('resultExplanation');
        const resultArea = document.getElementById('resultArea');
        const answerHistory = document.getElementById('answerHistory');
        let textKey = '', explanationKey = '';

        switch (result) {
            case 'first':
                textKey = 'resultFirst';
                explanationKey = 'resultFirstExplanation';
                break;
            case 'second':
                textKey = 'resultSecond';
                explanationKey = 'resultSecondExplanation';
                break;
            case 'third_1':
                textKey = 'resultThird1';
                explanationKey = 'resultThird1Explanation';
                break;
            case 'third_2':
                textKey = 'resultThird2';
                explanationKey = 'resultThird2Explanation';
                break;
            case 'not_eligible':
                textKey = 'resultNotEligible';
                explanationKey = 'resultNotEligibleExplanation';
                break;
        }

        resultText.textContent = translations[currentLanguage][textKey];
        resultExplanation.textContent = translations[currentLanguage][explanationKey];

        // 回答履歴の表示
        let historyHTML = `<h3>${translations[currentLanguage].answerHistoryTitle}</h3><ul>`;
        for (const qId in this.answers) {
            const question = this.questions.find(q => q.id === qId);
            if (question) {
                let answerText = this.answers[qId];
                let answerTextKey = '';
                // 回答の表示をより分かりやすくする
                if (question.type === 'yesno' || question.type === 'yesno_unknown') {
                    answerTextKey = (answerText === 'yes') ? 'yes' : (answerText === 'no') ? 'no' : 'unknown';
                } else if (question.type === 'income') {
                    if (answerText === '80') answerTextKey = 'income80';
                    else if (answerText === '120') answerTextKey = 'income120';
                    else if (answerText === '120+') answerTextKey = 'income120plus';
                } else if (question.type === 'savings_spouse') {
                    if (answerText === '1500') answerTextKey = 'savings1500';
                    else if (answerText === '1550') answerTextKey = 'savings1550';
                    else if (answerText === '1650') answerTextKey = 'savings1650';
                    else if (answerText === 'over1650') answerTextKey = 'savingsOver1650';
                } else if (question.type === 'savings_single') {
                    if (answerText === '500') answerTextKey = 'savings500';
                    else if (answerText === '550') answerTextKey = 'savings550';
                    else if (answerText === '650') answerTextKey = 'savings650';
                    else if (answerText === 'over650') answerTextKey = 'savingsOver650';
                }
                historyHTML += `<li><strong>${translations[currentLanguage][question.textKey]}</strong>: ${translations[currentLanguage][answerTextKey]}</li>`;
            }
        }
        historyHTML += '</ul>';
        answerHistory.innerHTML = historyHTML;

        resultArea.classList.remove('hidden');
        document.getElementById('questionArea').classList.add('hidden'); // 質問エリアを非表示にする
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
    document.getElementById('questionArea').classList.remove('hidden'); // 質問エリアを再表示
    questionnaire.showQuestion(0);
}

function printResult() {
    document.getElementById('printUrl').textContent = window.location.href;
    window.print();
}

function saveAsText() {
    const resultText = document.getElementById('resultText').textContent;
    const resultExplanation = document.getElementById('resultExplanation').textContent;
    const answerHistory = document.getElementById('answerHistory').innerText; // innerTextで整形されたテキストを取得

    const content = `${translations[currentLanguage].siteName} ${translations[currentLanguage].diagnoseResult}\n\n${resultText}\n${resultExplanation}\n\n${answerHistory}\n\n${translations[currentLanguage].saveTextDisclaimer}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${translations[currentLanguage].siteName} ${translations[currentLanguage].diagnoseResult}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

// 初期表示
window.onload = () => {
    setLanguage(currentLanguage); // Apply default language on load
    questionnaire.showQuestion(0);
};
