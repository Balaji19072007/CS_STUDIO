const { chromium } = require('playwright');
const problemData = require('../backend/util/problemData.json');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write']
  });
  const page = await context.newPage();
  
  // Capture browser console logs
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
        console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });

  page.on('request', request => {
    if (request.url().includes('/run-tests') && request.method() === 'POST') {
      console.log(`[NETWORK] Request payload to /run-tests:`, request.postData());
    }
  });

  page.on('response', async response => {
    if (response.url().includes('/run-tests')) {
      const body = await response.json().catch(() => ({}));
      console.log(`[NETWORK] Response from /run-tests:`, JSON.stringify(body));
    }
  });
  
  const loginAndSetToken = async (page) => {
    console.log("Logging in via backend API to refresh token...");
    const loginResponse = await page.request.post('http://localhost:5000/api/auth/session/login', {
      data: {
        email: 'csstudio39@gmail.com',
        password: 'Admin123!'
      }
    });
    
    if (!loginResponse.ok()) {
      throw new Error(`Login API failed with status ${loginResponse.status()}`);
    }
    
    const loginData = await loginResponse.json();
    if (!loginData.success) {
      throw new Error(`Login failed: ${loginData.msg}`);
    }
    
    // Go to root to set localStorage on the correct origin
    await page.goto('http://localhost:5173/');
    await page.evaluate((token) => {
      localStorage.setItem('token', token);
    }, loginData.token);
    
    console.log("Token set successfully.");
  };

  await loginAndSetToken(page);
  console.log("Starting problem verification loop...");

  let successCount = 0;
  let failCount = 0;

  const failedIds = [100,101,112,113,114,115,122,123,124,128,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,152,154,155,156,157,158,166,181,182,183,184,185,190,199,205,208,209,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,234,241,243,245,251,255,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298];

  for (let idx = 0; idx < failedIds.length; idx++) {
    const pId = failedIds[idx];
    if (idx > 0 && idx % 30 === 0) {
        await loginAndSetToken(page);
    }

    const problem = problemData.find(p => p.id === pId);
    if (!problem) continue;
    console.log(`\n--- Processing Problem ${problem.id}: ${problem.title} (${problem.language}) ---`);
    
    try {
      await page.goto(`http://localhost:5173/solve?problemId=${problem.id}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // Wait for editor to load
      try {
        await page.waitForSelector('.monaco-editor', { state: 'visible', timeout: 15000 });
      } catch (e) {
        console.log(`Timeout waiting for editor! Taking screenshot of problem ${problem.id}...`);
        await page.screenshot({ path: `editor_timeout_${problem.id}.png` });
        throw e;
      }

      // Click the language dropdown to ensure the right language is selected
      // But the problem page auto-selects based on problem data, so we don't strictly need to if the app works right.

      // We need to inject the solution code. Monaco editor can be tricky to type into.
      // Easiest way is to evaluate script in page context.
      const solutionCode = problem.solution?.code || '';
      if (!solutionCode) {
        console.log(`[SKIP] No solution code provided for problem ${problem.id}`);
        continue;
      }

      // Inject code directly into Monaco editor's model using window.monaco
      await page.evaluate((code) => {
        if (window.monaco && window.monaco.editor) {
            const models = window.monaco.editor.getModels();
            if (models.length > 0) {
                models[0].setValue(code);
            }
        }
      }, solutionCode);
      
      // Wait a moment for Monaco to parse
      await page.waitForTimeout(500);

      // Trigger a manual React onChange by focusing the editor and typing a space then backspace
      await page.click('.monaco-editor');
      await page.keyboard.press('End');
      await page.keyboard.type(' ');
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(200);

      // Switch to Test Cases tab first because the button is conditionally rendered
      await page.evaluate(() => {
        const tabBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Test Cases');
        if (tabBtn) tabBtn.click();
      });
      await page.waitForTimeout(500);

      // Click "Run Test Cases"
      console.log('Running test cases...');
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Run Test Cases'));
        if (btn) btn.click();
      });
      console.log('Clicked Run Test Cases button, waiting for results...');

      // Wait for success notification or result text
      try {
        await page.waitForSelector('text=All Test Cases Passed', { state: 'visible', timeout: 20000 });
        console.log(`[SUCCESS] Problem ${problem.id} test cases passed!`);
      } catch (waitErr) {
        // If it fails, let's see what the DOM actually says at the bottom (notifications)
        const textContent = await page.evaluate(() => document.body.innerText);
        console.log('DOM Text around Test Cases (End):', textContent.slice(-1000));
        throw waitErr;
      }

      // Click Submit
      console.log('Submitting...');
      
      const [submitResponse] = await Promise.all([
        page.waitForResponse(response => response.url().includes('/submit') && response.status() === 200, { timeout: 30000 }),
        page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Submit Solution' || b.textContent.trim() === 'Submit');
          if (btn) btn.click();
          else console.log('Submit button NOT found!');
        })
      ]);

      const submitData = await submitResponse.json();
      if (submitData.isSolved || submitData.success) {
          console.log(`[SUCCESS] Problem ${problem.id} submitted and solved!`);
          successCount++;
      } else {
          throw new Error('Submit API returned false for isSolved: ' + JSON.stringify(submitData));
      }

    } catch (err) {
      console.log(`[ERROR] Verification failed for problem ${problem.id}:`, err.message);
      await page.screenshot({ path: `error_prob_${problem.id}.png` });
      failCount++;
    }
  }

  console.log(`\nVerification Complete! Passed: ${successCount}, Failed Verification: ${failCount}`);
  await browser.close();
})();
