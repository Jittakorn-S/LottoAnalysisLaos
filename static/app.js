document.addEventListener('DOMContentLoaded', () => {
    let scrapedResultsData = []; 

    const scrapeBtn = document.getElementById('scrape-btn');
    const progressContainer = document.getElementById('progress-container');
    const tableContainer = document.getElementById('table-container'); 
    const resultsHead = document.getElementById('results-head');
    const resultsBody = document.getElementById('results-body');
    let scrapeStatusInterval;

    const analysisSection = document.getElementById('analysis-section');
    const numberInput = document.getElementById('number-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const analysisResultsContainer = document.getElementById('analysis-results-container');
    const predictFirstPrizeRadio = document.getElementById('predict-first-prize');
    const predictSecondPrizeRadio = document.getElementById('predict-second-prize');

    scrapeBtn.addEventListener('click', async () => {
        const selectedType = document.querySelector('input[name="lotto_type"]:checked').value;
        scrapeBtn.disabled = true;
        scrapeBtn.textContent = 'กำลังดึงข้อมูล...';
        progressContainer.style.display = 'block';
        tableContainer.style.display = 'none'; 
        
        resultsBody.innerHTML = '';
        resultsHead.innerHTML = '';
        analysisSection.style.display = 'none';
        analysisResultsContainer.innerHTML = '';
        try {
            const response = await fetch('/start-scrape', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lotto_type: selectedType }) });
            if (!response.ok) { throw new Error(`Failed to start scraper (status: ${response.status}).`); }
            scrapeStatusInterval = setInterval(checkScrapeStatus, 2000);
        } catch (error) {
            progressContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
            resetScraperUI();
        }
    });

    async function checkScrapeStatus() {
        try {
            const response = await fetch('/status');
            const data = await response.json();
            progressContainer.innerHTML = data.progress.join('<br>');
            progressContainer.scrollTop = progressContainer.scrollHeight;
            if (!data.is_running) {
                clearInterval(scrapeStatusInterval);
                displayScrapeResults(data.results);
                resetScraperUI();
            }
        } catch (error) {
            progressContainer.innerHTML += `<br><p style="color: red;">Error checking status: ${error.message}</p>`;
            clearInterval(scrapeStatusInterval);
            resetScraperUI();
        }
    }
    
    function displayScrapeResults(results) {
        if (!results || results.length === 0) {
            progressContainer.innerHTML += '<br>ไม่พบข้อมูลจากการดึงข้อมูล';
            return;
        }

        scrapedResultsData = results; 
        tableContainer.style.display = 'block'; 
        progressContainer.style.display = 'none';
        
        // Updated table headers for Laos Lottery
        resultsHead.innerHTML = `<tr><th>Draw Date</th><th>First Prize (3 Digits)</th><th>Second Prize (2 Digits)</th></tr>`;
        
        results.forEach(result => {
            const row = resultsBody.insertRow();
            row.insertCell(0).textContent = result['Draw Date'];
            row.insertCell(1).innerHTML = `<strong>${result['First Prize (3 Digits)'] || ''}</strong>`;
            row.insertCell(2).innerHTML = `<strong>${result['Second Prize (2 Digits)'] || ''}</strong>`;
        });

        analysisSection.style.display = 'block';
        predictFirstPrizeRadio.checked = true;
        updateAnalysisInput('first_prize');
    }

    function resetScraperUI() {
        scrapeBtn.disabled = false;
        scrapeBtn.textContent = 'เริ่มดึงข้อมูล';
    }

    function updateAnalysisInput(type) {
        if (scrapedResultsData.length === 0) return;
        let numbersForAnalysis = [];
        const prizeKey = type === 'first_prize' ? 'First Prize (3 Digits)' : 'Second Prize (2 Digits)';

        scrapedResultsData.forEach(result => {
            const prize = result[prizeKey];
            if (prize) {
                numbersForAnalysis.push(prize.replace(/[^0-9]/g, ''));
            }
        });
        numberInput.value = numbersForAnalysis.join(', ');
        analysisResultsContainer.innerHTML = '';
    }

    predictFirstPrizeRadio.addEventListener('change', () => { updateAnalysisInput('first_prize'); });
    predictSecondPrizeRadio.addEventListener('change', () => { updateAnalysisInput('second_prize'); });

    analyzeBtn.addEventListener('click', async () => {
        const numbersText = numberInput.value;
        if (!numbersText.trim()) {
            alert('กรุณาใส่ชุดตัวเลขสำหรับวิเคราะห์');
            return;
        }
        const numbersArray = numbersText.split(',').map(s => s.trim()).filter(s => s);
        
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'กำลังวิเคราะห์...';
        analysisResultsContainer.innerHTML = '<p style="text-align:center;">🧠 AI กำลังประมวลผลข้อมูล... กรุณารอสักครู่</p>';
        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numbers: numbersArray })
            });
            const resultData = await response.json();
            if (resultData.error) { throw new Error(resultData.error); }
            displayAnalysisResults(resultData);
        } catch (error) {
            analysisResultsContainer.innerHTML = `<p style="color: red; text-align:center;">เกิดข้อผิดพลาด: ${error.message}</p>`;
        } finally {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'เริ่มการวิเคราะห์';
        }
    });

    function displayAnalysisResults(data) {
        const { statistical_summary, pattern_analysis, prediction_output, detailed_explanation } = data;

        const predictionHtml = `
            <div class="result-block prediction">
                <h3>🔮 PREDICTION</h3>
                <div class="prediction-value">${prediction_output.PREDICTION}</div>
                <div class="confidence">📊 CONFIDENCE: ${prediction_output.CONFIDENCE}</div>
                <small>🧠 METHOD: ${prediction_output.METHOD}</small>
            </div>
            <div class="result-block">
                <h3>⚡ Alternative Predictions</h3>
                <p>${prediction_output.ALTERNATIVE_PREDICTIONS.join(', ') || 'N/A'}</p>
            </div>`;

        const createListHtml = (title, dataObj) => {
            const items = Object.entries(dataObj)
                .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join('<br>') : value}</li>`)
                .join('');
            return `<div class="result-block"><h3>${title}</h3><ul>${items}</ul></div>`;
        };

        const createParagraphHtml = (title, dataObj) => {
             const items = Object.entries(dataObj)
                .map(([key, value]) => `<h4>${key}</h4><p>${value}</p>`)
                .join('');
            return `<div class="result-block"><h3>${title}</h3>${items}</div>`;
        }

        const statsHtml = createListHtml('📈 Statistical Summary', statistical_summary);
        const patternsHtml = createListHtml('🔁 Pattern Analysis', pattern_analysis);
        const explanationHtml = createParagraphHtml('📝 Detailed Explanation', detailed_explanation);
        
        analysisResultsContainer.innerHTML = predictionHtml + statsHtml + patternsHtml + explanationHtml;
    }
});