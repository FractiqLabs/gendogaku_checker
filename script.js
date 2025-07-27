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
                no: "income",
                tooltip: "老齢福祉年金について：<br>老齢福祉年金は、国民年金制度が始まる前（昭和36年以前）から高齢だった方への救済措置として設けられた年金です。<br>受給条件は明治44年～大正5年生まれの方で、現在の受給者は109歳以上となります。制度としては新規受給者はなく、受給者数は年々減少しています。<br>負担限度額認定の第1段階要件として制度上残されているため、確認項目としていますが、現在ではほとんどの方が「いいえ」を選択することになります。"
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
        this.currentQuestionIndex = 0;
        this.questionHistory = [];
    }

    showQuestion(index) {
        this.currentQuestionIndex = index;
        const question = this.questions[index];
        const questionArea = document.getElementById('questionArea');
        const tooltipHTML = question.tooltip ? 
            `<span class="help-icon" data-tooltip="${question.tooltip.replace(/"/g, '&quot;')}">?</span>` : '';
        
        // 進捗表示
        const totalQuestions = this.getTotalQuestions();
        const currentStep = index + 1;
        const progressHTML = `
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(currentStep / totalQuestions) * 100}%"></div>
                </div>
                <div class="progress-text">${currentStep} / ${totalQuestions}</div>
            </div>
        `;
        
        // 戻るボタン
        const backButtonHTML = this.questionHistory.length > 0 ? 
            `<button class="back-button" onclick="questionnaire.goBackToPreviousQuestion()">← 前の質問に戻る</button>` : '';
        
        questionArea.innerHTML = `
            ${progressHTML}
            <div class="question">
                <p>${question.text} ${tooltipHTML}</p>
                <div class="options">
                    ${this.getOptionsHTML(question)}
                </div>
                ${backButtonHTML}
            </div>
        `;
        
        // ツールチップの初期化
        this.initTooltips();
    }

    getTotalQuestions() {
        // taxInfoは説明ページなので除外
        return this.questions.filter(q => q.type !== 'taxInfo').length;
    }

    goBackToPreviousQuestion() {
        if (this.questionHistory.length > 0) {
            const previousState = this.questionHistory.pop();
            this.currentQuestionIndex = previousState.questionIndex;
            
            // 最後の回答を削除
            if (previousState.answeredQuestionId) {
                delete this.answers[previousState.answeredQuestionId];
            }
            
            this.showQuestion(this.currentQuestionIndex);
        }
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
                    <div class="option" onclick="handleAnswer('80.9', '${question.id}')">80.9万円以下</div>
                    <div class="option" onclick="handleAnswer('120', '${question.id}')">80.9万円超120万円以下</div>
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
            if (income === '80.9' && savingsAnswer !== 'over1650') {
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
            if (income === '80.9' && savingsAnswer !== 'over650') {
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
        const answerHistory = document.getElementById('answerHistory');
        let text = '', explanation = '';

        switch (result) {
            case 'first':
                text = 'あなたは第1段階に該当する可能性があります';
                explanation = '非課税世帯で老齢福祉年金受給者の場合です。';
                break;
            case 'second':
                text = 'あなたは第2段階に該当する可能性があります';
                explanation = '年間収入80.9万円以下かつ預貯金要件（本人のみ650万円以下・配偶者合計1,650万円以下）を満たす非課税世帯の場合です。';
                break;
            case 'third_1':
                text = 'あなたは第3段階①に該当する可能性があります';
                explanation = '年間収入80.9万円超120万円以下かつ預貯金要件（本人のみ550万円以下・配偶者合計1,550万円以下）を満たす非課税世帯の場合です。';
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

        // 回答履歴の表示
        let historyHTML = '<h3>あなたの回答履歴</h3><ul>';
        for (const qId in this.answers) {
            const question = this.questions.find(q => q.id === qId);
            if (question) {
                let answerText = this.answers[qId];
                // 回答の表示をより分かりやすくする
                if (question.type === 'yesno' || question.type === 'yesno_unknown') {
                    answerText = (answerText === 'yes') ? 'はい' : (answerText === 'no') ? 'いいえ' : 'わからない';
                } else if (question.type === 'income') {
                    if (answerText === '80.9') answerText = '80.9万円以下';
                    else if (answerText === '120') answerText = '80.9万円超120万円以下';
                    else if (answerText === '120+') answerText = '120万円超';
                } else if (question.type === 'savings_spouse') {
                    if (answerText === '1500') answerText = '1500万円以下';
                    else if (answerText === '1550') answerText = '1550万円以下';
                    else if (answerText === '1650') answerText = '1650万円以下';
                    else if (answerText === 'over1650') answerText = '1650万円超';
                } else if (question.type === 'savings_single') {
                    if (answerText === '500') answerText = '500万円以下';
                    else if (answerText === '550') answerText = '550万円以下';
                    else if (answerText === '650') answerText = '650万円以下';
                    else if (answerText === 'over650') answerText = '650万円超';
                }
                historyHTML += `<li><strong>${question.text}</strong>: ${answerText}</li>`;
            }
        }
        historyHTML += '</ul>';
        answerHistory.innerHTML = historyHTML;

        resultArea.classList.remove('hidden');
        document.getElementById('questionArea').classList.add('hidden'); // 質問エリアを非表示にする
    }

    initTooltips() {
        const helpIcons = document.querySelectorAll('.help-icon');
        helpIcons.forEach(icon => {
            // マウスオーバー/アウトイベント
            icon.addEventListener('mouseenter', this.showTooltip.bind(this));
            icon.addEventListener('mouseleave', this.hideTooltip.bind(this));
            
            // タッチ対応
            icon.addEventListener('touchstart', this.toggleTooltip.bind(this));
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // 外側クリックでツールチップを閉じる
        document.addEventListener('click', this.hideAllTooltips.bind(this));
    }

    showTooltip(event) {
        this.hideAllTooltips();
        const icon = event.target;
        const tooltipText = icon.getAttribute('data-tooltip');
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = icon.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // 初期位置設定（上側に表示）
        let tooltipLeft = rect.left + scrollLeft - tooltip.offsetWidth / 2 + rect.width / 2;
        let tooltipTop = rect.top + scrollTop - tooltip.offsetHeight - 10;
        let showBelow = false;
        
        // 画面上端チェック
        if (tooltipTop < scrollTop + 10) {
            tooltipTop = rect.bottom + scrollTop + 10;
            showBelow = true;
            tooltip.classList.add('below');
        }
        
        // 画面左右端チェック
        if (tooltipLeft < scrollLeft + 10) {
            tooltipLeft = scrollLeft + 10;
        } else if (tooltipLeft + tooltip.offsetWidth > scrollLeft + window.innerWidth - 10) {
            tooltipLeft = scrollLeft + window.innerWidth - tooltip.offsetWidth - 10;
        }
        
        tooltip.style.left = tooltipLeft + 'px';
        tooltip.style.top = tooltipTop + 'px';
    }

    hideTooltip() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
    }

    toggleTooltip(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const existingTooltip = document.querySelector('.tooltip');
        if (existingTooltip) {
            this.hideTooltip();
        } else {
            this.showTooltip(event);
        }
    }

    hideAllTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
    }
}

const questionnaire = new Questionnaire();

function handleAnswer(answer, questionId) {
    // タップ後のフォーカスをクリア
    if (document.activeElement) {
        document.activeElement.blur();
    }
    
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

    // 履歴に現在の状態を保存
    questionnaire.questionHistory.push({
        questionIndex: questionnaire.currentQuestionIndex,
        answeredQuestionId: questionId
    });

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
    questionnaire.questionHistory = [];
    questionnaire.currentQuestionIndex = 0;
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

    const content = `負担限度額認定チェッカー 診断結果\n\n${resultText}\n${resultExplanation}\n\n${answerHistory}\n\n※この結果は簡易的なものです。最終的な認定可否は市区町村窓口でご確認ください。`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '負担限度額認定診断結果.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

function generateQRCode() {
    console.log('generateQRCode関数が呼び出されました');
    alert('QRコード生成が開始されました');
    const qrContainer = document.getElementById('qrCodeContainer');
    
    // QRコードが既に表示されている場合は非表示にする
    if (!qrContainer.classList.contains('hidden')) {
        qrContainer.classList.add('hidden');
        return;
    }
    
    // 診断結果の詳細情報を含むURLパラメータを作成
    const resultText = document.getElementById('resultText').textContent;
    const resultExplanation = document.getElementById('resultExplanation').textContent;
    const answerHistory = document.getElementById('answerHistory').innerHTML;
    const currentUrl = window.location.href.split('?')[0]; // クエリパラメータを除去
    
    console.log('生成されるURL情報:');
    console.log('resultText:', resultText);
    console.log('resultExplanation:', resultExplanation);
    console.log('answerHistory:', answerHistory);
    console.log('currentUrl:', currentUrl);
    
    // 結果情報をURLパラメータとして追加
    const params = new URLSearchParams({
        result: resultText,
        explanation: resultExplanation,
        history: answerHistory,
        shared: 'true'
    });
    
    const shareUrl = `${currentUrl}?${params.toString()}`;
    console.log('共有URL:', shareUrl);
    
    // QRコード生成（QR Server APIを使用）
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
    
    qrContainer.innerHTML = `
        <div class="qr-content">
            <h3>診断結果を共有</h3>
            <img src="${qrCodeUrl}" alt="QRコード" class="qr-image">
            <p class="qr-description">このQRコードをスキャンすると診断結果が表示されます</p>
            <button onclick="document.getElementById('qrCodeContainer').classList.add('hidden')" class="qr-close-btn">閉じる</button>
        </div>
    `;
    
    qrContainer.classList.remove('hidden');
}

// URLパラメータから共有された結果を表示
function checkSharedResult() {
    console.log('checkSharedResult実行開始');
    const urlParams = new URLSearchParams(window.location.search);
    console.log('現在のURL:', window.location.href);
    console.log('URLパラメータ:', window.location.search);
    console.log('shared パラメータ:', urlParams.get('shared'));
    
    if (urlParams.get('shared') === 'true') {
        const result = urlParams.get('result');
        const explanation = urlParams.get('explanation');
        const history = urlParams.get('history');
        
        console.log('result パラメータ:', result);
        console.log('explanation パラメータ:', explanation);
        console.log('history パラメータ:', history);
        
        if (result && explanation) {
            console.log('共有結果を表示します');
            alert('共有された診断結果を表示します');
            
            // URLデコードして正しい日本語テキストに変換
            const decodedResult = decodeURIComponent(result);
            const decodedExplanation = decodeURIComponent(explanation);
            const decodedHistory = history ? decodeURIComponent(history) : '<h3>あなたの回答履歴</h3><p>回答履歴が取得できませんでした。</p>';
            
            console.log('デコード後 result:', decodedResult);
            console.log('デコード後 explanation:', decodedExplanation);
            console.log('デコード後 history:', decodedHistory);
            
            // 結果エリアに共有された内容を表示
            document.getElementById('resultText').textContent = decodedResult;
            document.getElementById('resultExplanation').textContent = decodedExplanation;
            document.getElementById('answerHistory').innerHTML = decodedHistory;
            
            // 結果エリアを表示、質問エリアを非表示
            document.getElementById('resultArea').classList.remove('hidden');
            document.getElementById('questionArea').classList.add('hidden');
            return true;
        } else {
            console.log('result または explanation が空です');
        }
    } else {
        console.log('shared パラメータが true ではありません');
    }
    return false;
}

// 初期表示
window.onload = () => {
    console.log('ページが読み込まれました');
    // 共有された結果があるかチェック
    try {
        if (!checkSharedResult()) {
            // 通常の診断開始
            console.log('通常の診断を開始します');
            questionnaire.showQuestion(0);
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('エラー: ' + error.message);
    }
};

// DOMContentLoaded でも試す
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded実行');
});
