// OPIc Master App Logic
// State Management, TTS, STT, MediaRecorder, Gemini API, Mock Test & Random Mode

class OpicApp {
  constructor() {
    this.currentMode = 'random'; // 'random' | 'mock' | 'survey' | 'review'
    this.currentQuestion = null;
    this.replayCount = 0; // max 1 replay per question like real OPIc
    this.isReplayAllowed = true;
    
    // Recording & STT State
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;
    this.isRecording = false;
    this.recognition = null;
    this.finalTranscript = '';
    this.timerInterval = null;
    this.timeRemaining = 120; // 2 minutes (120s)
    
    // Mock Test State
    this.mockState = {
      active: false,
      currentIndex: 0,
      questions: [],
      results: []
    };

    // User Settings & Survey
    this.settings = this.loadSettings();
    this.survey = this.loadSurvey();
    this.history = this.loadHistory();

    // TTS
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.availableVoices = [];

    this.init();
  }

  init() {
    this.initVoices();
    this.initSpeechRecognition();
    this.setupEventListeners();
    this.renderSurveyList();
    this.renderHistory();
    this.switchMode('random');
    this.loadNextRandomQuestion();
  }

  // --- Storage ---
  loadSettings() {
    const defaultSettings = {
      apiKey: '',
      targetLevel: 'IM',
      speechRate: 1.0,
      voiceName: '',
      timerDuration: 120
    };
    try {
      const saved = localStorage.getItem('opic_settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  }

  saveSettings() {
    localStorage.setItem('opic_settings', JSON.stringify(this.settings));
  }

  loadSurvey() {
    try {
      const saved = localStorage.getItem('opic_survey_hobbies');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default Golden Survey
    const initial = {};
    SURVEY_OPTIONS.hobbies.forEach(h => {
      initial[h.topic] = h.checked;
    });
    return initial;
  }

  saveSurvey() {
    localStorage.setItem('opic_survey_hobbies', JSON.stringify(this.survey));
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('opic_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory(item) {
    this.history.unshift(item);
    if (this.history.length > 50) this.history.pop();
    try {
      localStorage.setItem('opic_history', JSON.stringify(this.history));
    } catch (e) {}
    this.renderHistory();
  }

  // --- TTS (Ava Voice) ---
  initVoices() {
    const updateVoices = () => {
      if (!this.synth) return;
      this.availableVoices = this.synth.getVoices().filter(v => v.lang.startsWith('en'));
      const voiceSelect = document.getElementById('setting-voice');
      if (voiceSelect && this.availableVoices.length > 0) {
        voiceSelect.innerHTML = this.availableVoices.map(v => 
          `<option value="${v.name}">${v.name} (${v.lang})</option>`
        ).join('');
        if (this.settings.voiceName) {
          voiceSelect.value = this.settings.voiceName;
        }
      }
    };
    updateVoices();
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  speakQuestion(isReplay = false) {
    if (!this.synth || !this.currentQuestion) return;

    if (isReplay) {
      if (this.replayCount >= 1) {
        alert("실제 오픽 시험에서는 질문을 1회만 다시 들을 수 있습니다!");
        return;
      }
      this.replayCount++;
    }

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(this.currentQuestion.questionEn);
    utterance.lang = 'en-US';
    utterance.rate = parseFloat(this.settings.speechRate) || 1.0;

    // Pick best English voice
    if (this.settings.voiceName) {
      const chosen = this.availableVoices.find(v => v.name === this.settings.voiceName);
      if (chosen) utterance.voice = chosen;
    } else if (this.availableVoices.length > 0) {
      // Prefer female US voice (like Ava)
      const avaVoice = this.availableVoices.find(v => 
        v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English') || v.name.includes('Female')
      ) || this.availableVoices[0];
      utterance.voice = avaVoice;
    }

    const avaAvatar = document.getElementById('ava-avatar');
    const avaStatus = document.getElementById('ava-status');

    utterance.onstart = () => {
      if (avaAvatar) avaAvatar.classList.add('animate-pulse', 'ring-4', 'ring-indigo-400');
      if (avaStatus) avaStatus.innerHTML = '<span class="inline-block w-2.5 h-2.5 mr-1.5 rounded-full bg-emerald-500 animate-ping"></span>Ava가 질문을 읽고 있습니다...';
    };

    utterance.onend = () => {
      if (avaAvatar) avaAvatar.classList.remove('animate-pulse', 'ring-4', 'ring-indigo-400');
      if (avaStatus) avaStatus.innerHTML = '질문 듣기 완료. 답변을 시작하세요!';
      this.updateReplayButton();
    };

    utterance.onerror = () => {
      if (avaAvatar) avaAvatar.classList.remove('animate-pulse', 'ring-4', 'ring-indigo-400');
      if (avaStatus) avaStatus.innerText = '음성 재생에 문제가 발생했습니다.';
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }

  updateReplayButton() {
    const replayBtn = document.getElementById('btn-replay-question');
    if (!replayBtn) return;
    if (this.replayCount >= 1) {
      replayBtn.disabled = true;
      replayBtn.classList.add('opacity-40', 'cursor-not-allowed');
      replayBtn.title = "1회 다시 듣기 완료";
    } else {
      replayBtn.disabled = false;
      replayBtn.classList.remove('opacity-40', 'cursor-not-allowed');
      replayBtn.title = "질문 1회 다시 듣기";
    }
  }

  // --- STT (Speech-to-Text) & Recording ---
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.finalTranscript += (this.finalTranscript ? ' ' : '') + transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      const answerInput = document.getElementById('user-answer-input');
      if (answerInput) {
        answerInput.value = this.finalTranscript + (interimTranscript ? ' ' + interimTranscript : '');
        this.updateWordCount();
      }
    };

    this.recognition.onerror = (event) => {
      console.error("STT Error:", event.error);
    };
  }

  async startRecording() {
    this.finalTranscript = '';
    const answerInput = document.getElementById('user-answer-input');
    if (answerInput) answerInput.value = '';

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        const myAudio = document.getElementById('my-audio-player');
        if (myAudio) {
          myAudio.src = this.audioUrl;
          document.getElementById('my-audio-container').classList.remove('hidden');
        }
      };

      this.mediaRecorder.start();
      this.isRecording = true;

      // Start STT
      if (this.recognition) {
        try { this.recognition.start(); } catch (e) {}
      }

      // UI Update
      this.updateRecordingUI(true);
      this.startTimer();

    } catch (err) {
      console.error("Microphone access error:", err);
      alert("마이크 접근 권한이 필요합니다. 브라우저 설정에서 마이크를 허용해주세요. 텍스트 입력창으로 직접 답변을 작성하실 수도 있습니다.");
      this.updateRecordingUI(false);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    this.isRecording = false;
    this.stopTimer();
    this.updateRecordingUI(false);
  }

  updateRecordingUI(isRecording) {
    const recordBtn = document.getElementById('btn-record-toggle');
    const recordStatus = document.getElementById('record-status');
    const recordWave = document.getElementById('record-wave');

    if (isRecording) {
      recordBtn.innerHTML = `
        <span class="flex items-center justify-center space-x-2 text-white">
          <span class="w-3.5 h-3.5 rounded-sm bg-white animate-pulse"></span>
          <span>답변 완료 (녹음 중지)</span>
        </span>`;
      recordBtn.className = "w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 font-bold shadow-lg shadow-rose-500/25 transition-all transform active:scale-95";
      recordStatus.innerText = "녹음 중입니다... 편안하게 답변을 말해보세요.";
      if (recordWave) recordWave.classList.remove('hidden');
    } else {
      recordBtn.innerHTML = `
        <span class="flex items-center justify-center space-x-2 text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 02-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          <span>답변 녹음 시작 (START)</span>
        </span>`;
      recordBtn.className = "w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 font-bold shadow-lg shadow-indigo-600/25 transition-all transform active:scale-95";
      recordStatus.innerText = "마이크 버튼을 누르고 답변하거나, 아래 텍스트를 직접 수정하세요.";
      if (recordWave) recordWave.classList.add('hidden');
    }
  }

  startTimer() {
    this.timeRemaining = parseInt(this.settings.timerDuration) || 120;
    this.updateTimerDisplay();
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();
      if (this.timeRemaining <= 0) {
        this.stopRecording();
        alert("권장 답변 시간(2분)이 종료되었습니다. 피드백을 확인해보세요!");
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  updateTimerDisplay() {
    const timerElem = document.getElementById('timer-display');
    const timerBar = document.getElementById('timer-progress-bar');
    if (!timerElem) return;

    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    timerElem.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    if (timerBar) {
      const percent = (this.timeRemaining / (this.settings.timerDuration || 120)) * 100;
      timerBar.style.width = `${percent}%`;
      if (this.timeRemaining < 20) {
        timerBar.className = "h-full bg-rose-500 transition-all duration-300";
      } else if (this.timeRemaining < 60) {
        timerBar.className = "h-full bg-amber-400 transition-all duration-300";
      } else {
        timerBar.className = "h-full bg-indigo-500 transition-all duration-300";
      }
    }
  }

  updateWordCount() {
    const text = document.getElementById('user-answer-input').value.trim();
    const count = text ? text.split(/\s+/).length : 0;
    const badge = document.getElementById('word-count-badge');
    if (badge) {
      badge.innerText = `${count} 단어`;
      if (count >= 50) {
        badge.className = "text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
      } else {
        badge.className = "text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
      }
    }
  }

  // --- Question Loading ---
  loadNextRandomQuestion() {
    this.stopSpeaking();
    this.stopRecording();
    this.replayCount = 0;
    this.updateReplayButton();

    // Reset UI
    document.getElementById('user-answer-input').value = '';
    document.getElementById('feedback-container').classList.add('hidden');
    document.getElementById('my-audio-container').classList.add('hidden');
    this.timeRemaining = this.settings.timerDuration || 120;
    this.updateTimerDisplay();
    this.updateWordCount();

    // Filter questions by active survey topics or unexpected/roleplay
    const activeTopics = Object.keys(this.survey).filter(k => this.survey[k]);
    const eligible = OPIC_QUESTIONS.filter(q => {
      if (q.category === 'survey') return activeTopics.includes(q.topic);
      return true; // unexpected, roleplay, self_intro, advanced are always eligible
    });

    const pool = eligible.length > 0 ? eligible : OPIC_QUESTIONS;
    // Don't repeat the exact same question immediately if possible
    let nextQ;
    do {
      nextQ = pool[Math.floor(Math.random() * pool.length)];
    } while (pool.length > 1 && this.currentQuestion && nextQ.id === this.currentQuestion.id);

    this.currentQuestion = nextQ;
    this.renderCurrentQuestion();
    
    // Auto speak question
    setTimeout(() => {
      this.speakQuestion(false);
    }, 400);
  }

  renderCurrentQuestion() {
    const q = this.currentQuestion;
    if (!q) return;

    // Badges
    const categoryBadge = document.getElementById('question-category-badge');
    const comboBadge = document.getElementById('question-combo-badge');
    if (categoryBadge) {
      categoryBadge.innerText = q.topicName;
    }
    if (comboBadge) {
      comboBadge.innerText = q.comboTypeName;
    }

    // Texts
    document.getElementById('question-en-text').innerText = q.questionEn;
    document.getElementById('question-ko-text').innerText = q.questionKo;
    document.getElementById('question-tip-text').innerText = q.tips;

    // Reset hidden script view
    const scriptBox = document.getElementById('question-script-box');
    const toggleBtn = document.getElementById('btn-toggle-script');
    if (scriptBox && toggleBtn) {
      scriptBox.classList.add('hidden');
      toggleBtn.innerText = "질문 텍스트 보기 👁️";
    }

    // Model answer preview inside feedback
    document.getElementById('model-answer-im').innerText = q.sampleAnswerIM;
  }

  // --- Mock Test Mode (15 Questions) ---
  startMockTest(type = 'mansur') {
    this.mockState.active = true;
    this.mockState.currentIndex = 0;
    this.mockState.results = [];
    this.mockState.questions = this.buildMockTestQuestions(type);

    this.currentMode = 'mock';
    this.updateModeUI();
    this.loadMockStep(0);
  }

  buildMockTestQuestions(type = 'mansur') {
    // 1. 최신 기출 실전 세트 (오픽만수르 15문항 실전 기출)
    if (type === 'mansur' && typeof REAL_MANSUR_SET_IDS !== 'undefined') {
      const realSet = REAL_MANSUR_SET_IDS.map(id => OPIC_QUESTIONS.find(q => q.id === id)).filter(Boolean);
      if (realSet.length === 15) return realSet;
    }

    // 2. 내 서베이 기반 랜덤 조합
    const list = [];
    // Q1: Self Intro
    const introQ = OPIC_QUESTIONS.find(q => q.category === 'self_intro') || OPIC_QUESTIONS[0];
    list.push(introQ);

    // Pick 2 active survey topics
    const activeSurveyTopics = Object.keys(this.survey).filter(k => this.survey[k]);
    const shuffledTopics = [...activeSurveyTopics].sort(() => 0.5 - Math.random());
    const topic1 = shuffledTopics[0] || 'park';
    const topic2 = shuffledTopics[1] || 'music';

    // Q2-Q4: Survey Topic 1 3-combo
    const set1 = OPIC_QUESTIONS.filter(q => q.topic === topic1);
    list.push(...this.pickComboSet(set1, ['description', 'routine', 'past_experience']));

    // Q5-Q7: Survey Topic 2 3-combo
    const set2 = OPIC_QUESTIONS.filter(q => q.topic === topic2);
    list.push(...this.pickComboSet(set2, ['description', 'routine', 'past_experience']));

    // Q8-Q10: Unexpected Topic 3-combo
    const unexpectedTopics = ['bank', 'recycling', 'hotel', 'weather'];
    const randomUnexpected = unexpectedTopics[Math.floor(Math.random() * unexpectedTopics.length)];
    const setUnexp = OPIC_QUESTIONS.filter(q => q.topic === randomUnexpected);
    list.push(...this.pickComboSet(setUnexp, ['description', 'routine', 'past_experience']));

    // Q11-Q13: Roleplay 3-combo
    const rpTopics = ['roleplay_device', 'roleplay_ticket'];
    const chosenRp = rpTopics[Math.floor(Math.random() * rpTopics.length)];
    const setRp = OPIC_QUESTIONS.filter(q => q.topic === chosenRp);
    list.push(...this.pickComboSet(setRp, ['roleplay_question', 'roleplay_problem', 'past_experience']));

    // Q14-Q15: Advanced
    const adv14 = OPIC_QUESTIONS.find(q => q.comboType === 'comparison') || OPIC_QUESTIONS[OPIC_QUESTIONS.length - 2];
    const adv15 = OPIC_QUESTIONS.find(q => q.comboType === 'issue') || OPIC_QUESTIONS[OPIC_QUESTIONS.length - 1];
    list.push(adv14, adv15);

    // Pad to 15 if needed
    while (list.length < 15) {
      list.push(OPIC_QUESTIONS[Math.floor(Math.random() * OPIC_QUESTIONS.length)]);
    }
    return list.slice(0, 15);
  }

  pickComboSet(items, types) {
    const result = [];
    types.forEach(t => {
      const match = items.find(q => q.comboType === t);
      if (match) result.push(match);
      else if (items.length > 0) result.push(items[0]);
    });
    return result;
  }

  loadMockStep(index) {
    if (index >= this.mockState.questions.length) {
      this.finishMockTest();
      return;
    }
    this.mockState.currentIndex = index;
    this.currentQuestion = this.mockState.questions[index];

    // Update Step UI
    document.getElementById('mock-progress-badge').innerText = `Question ${index + 1} / 15`;
    const progressPercent = ((index + 1) / 15) * 100;
    document.getElementById('mock-step-progress-bar').style.width = `${progressPercent}%`;

    this.renderCurrentQuestion();
    this.replayCount = 0;
    this.updateReplayButton();
    document.getElementById('user-answer-input').value = '';
    document.getElementById('feedback-container').classList.add('hidden');
    document.getElementById('my-audio-container').classList.add('hidden');

    setTimeout(() => {
      this.speakQuestion(false);
    }, 400);
  }

  finishMockTest() {
    alert("축하합니다! 15문항 실전 모의고사를 모두 마쳤습니다. 학습 기록에서 결과를 확인해보세요!");
    this.switchMode('review');
  }

  // --- Gemini AI Feedback & Evaluation ---
  async getAiFeedback() {
    const answerText = document.getElementById('user-answer-input').value.trim();
    if (!answerText) {
      alert("답변을 녹음하거나 텍스트를 입력한 후 피드백을 요청해주세요.");
      return;
    }

    const feedbackContainer = document.getElementById('feedback-container');
    const loadingElem = document.getElementById('feedback-loading');
    const contentElem = document.getElementById('feedback-content');

    feedbackContainer.classList.remove('hidden');
    loadingElem.classList.remove('hidden');
    contentElem.classList.add('hidden');
    feedbackContainer.scrollIntoView({ behavior: 'smooth' });

    let feedbackResult = null;

    if (this.settings.apiKey) {
      try {
        feedbackResult = await this.callGeminiApi(answerText, this.currentQuestion);
      } catch (err) {
        console.error("Gemini API Call Failed:", err);
        alert(`Gemini API 통신 중 오류가 발생했습니다: ${err.message}\n로컬 스마트 채점 결과로 대체합니다.`);
        feedbackResult = this.generateLocalFallbackFeedback(answerText, this.currentQuestion);
      }
    } else {
      // Offline / Local Smart Feedback
      feedbackResult = this.generateLocalFallbackFeedback(answerText, this.currentQuestion);
    }

    loadingElem.classList.add('hidden');
    contentElem.classList.remove('hidden');
    this.renderFeedbackResult(feedbackResult, answerText);

    // Save to History
    this.saveHistory({
      id: Date.now(),
      date: new Date().toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      questionEn: this.currentQuestion.questionEn,
      questionKo: this.currentQuestion.questionKo,
      topicName: this.currentQuestion.topicName,
      comboTypeName: this.currentQuestion.comboTypeName,
      userAnswer: answerText,
      grade: feedbackResult.estimatedGrade,
      feedback: feedbackResult
    });
  }

  async callGeminiApi(userAnswer, question) {
    const prompt = `
당신은 오픽(OPIc) 수석 채점관이자 영어 스피킹 전문 코치입니다.
학생의 목표 등급은 **${this.settings.targetLevel || 'IM'} (Intermediate Mid)**입니다.

[오픽 출제 질문]
카테고리: ${question.topicName} (${question.comboTypeName})
질문: "${question.questionEn}"

[학생의 발화 답변 (STT 또는 텍스트)]
"${userAnswer}"

반드시 아래 JSON 형식으로만 응답해 주세요 (코드블럭 없이 순수 JSON만 반환):
{
  "estimatedGrade": "IM2", // IL, IM1, IM2, IM3, IH, AL 중 하나
  "overallSummary": "답변 전반에 대한 2~3문장의 따뜻하고 명확한 총평 (한국어)",
  "pastTenseCheck": "과거 경험 질문인 경우 과거 시제(went, played, felt 등) 사용 여부 및 교정할 부분 (한국어)",
  "grammarCorrections": [
    {"original": "학생이 틀린 원문 표현", "corrected": "자연스럽게 교정된 표현", "reason": "교정 이유 (한국어)"}
  ],
  "fillerSuggestions": ["You know", "Actually", "What I mean is"], // 답변 흐름을 자연스럽게 살려줄 추천 필러 표현
  "upgradedModelAnswer": "학생의 원래 아이디어를 살려서, IM 수준에서 입에 착 붙게 외울 수 있는 5~7문장의 자연스러운 모범 스크립트 (영어)"
}
`;

    // Try available Gemini models (gemini-1.5-flash or gemini-2.0-flash)
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    let lastError = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.settings.apiKey.trim()}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1200
            }
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("Empty response from AI");

        // Parse JSON
        const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return JSON.parse(cleaned);
      } catch (e) {
        lastError = e;
        console.warn(`Model ${model} failed, trying fallback...`, e);
      }
    }

    throw lastError;
  }

  generateLocalFallbackFeedback(userAnswer, question) {
    const words = userAnswer.trim().split(/\s+/);
    const count = words.length;
    
    // Simple heuristic for IM
    let grade = "IM1";
    if (count < 25) grade = "IL";
    else if (count >= 70) grade = "IM3";
    else if (count >= 40) grade = "IM2";

    // Past tense check if comboType is past_experience
    let pastTenseNote = "현재 질문은 묘사/루틴 질문으로 현재 시제가 적절히 사용되었습니다.";
    if (question.comboType === 'past_experience') {
      const hasPastVerbs = /\b(went|was|were|had|did|felt|saw|visited|enjoyed|bought|lost|found|came)\b/i.test(userAnswer);
      if (hasPastVerbs) {
        pastTenseNote = "과거 시제 동사(went, was, had 등)를 잘 활용하셨습니다! 지속적으로 시제 일치를 신경써주세요.";
      } else {
        pastTenseNote = "★주의: 과거 경험 질문인데 현재 시제 동사가 많이 보입니다! go -> went, is -> was, have -> had 처럼 과거 시제로 바꿔 말해야 IM 감점을 피할 수 있습니다.";
      }
    }

    return {
      estimatedGrade: grade,
      overallSummary: `발화량은 약 ${count}단어로, ${count >= 40 ? 'IM 목표에 적절한 분량입니다.' : '조금 더 문장을 덧붙여 40단어 이상 발화하시면 더 안정적인 점수를 받으실 수 있습니다.'} 자신감 있게 계속 연습해보세요!`,
      pastTenseCheck: pastTenseNote,
      grammarCorrections: [
        {
          original: "I like to go park",
          corrected: "I like to go to the park",
          reason: "장소 명사 앞에는 전치사 to the를 함께 붙여주는 것이 자연스럽습니다."
        }
      ],
      fillerSuggestions: ["Well, you know", "Actually", "To be honest", "I mean"],
      upgradedModelAnswer: question.sampleAnswerIM || "In my opinion, I really enjoy this activity because it helps me relieve stress. It is my favorite thing to do."
    };
  }

  renderFeedbackResult(result, userAnswer) {
    // Grade Badge
    const gradeBadge = document.getElementById('fb-grade-badge');
    gradeBadge.innerText = result.estimatedGrade;
    if (result.estimatedGrade.startsWith('IM')) {
      gradeBadge.className = "text-xl font-black px-4 py-1.5 rounded-xl bg-indigo-500 text-white shadow-md";
    } else if (result.estimatedGrade === 'IH' || result.estimatedGrade === 'AL') {
      gradeBadge.className = "text-xl font-black px-4 py-1.5 rounded-xl bg-emerald-500 text-white shadow-md";
    } else {
      gradeBadge.className = "text-xl font-black px-4 py-1.5 rounded-xl bg-amber-500 text-white shadow-md";
    }

    // Overall summary
    document.getElementById('fb-summary-text').innerText = result.overallSummary;

    // Past tense check
    document.getElementById('fb-past-tense-text').innerText = result.pastTenseCheck;

    // Corrections list
    const corrContainer = document.getElementById('fb-corrections-list');
    corrContainer.innerHTML = '';
    if (result.grammarCorrections && result.grammarCorrections.length > 0) {
      result.grammarCorrections.forEach(c => {
        const item = document.createElement('div');
        item.className = "p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm";
        item.innerHTML = `
          <div class="flex items-center space-x-2 text-rose-500 dark:text-rose-400 font-medium">
            <span class="line-through">${c.original}</span>
            <span>➔</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold">${c.corrected}</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${c.reason}</p>
        `;
        corrContainer.appendChild(item);
      });
    } else {
      corrContainer.innerHTML = '<p class="text-xs text-slate-400">특별한 문법 오류 없이 매끄럽게 답변하셨습니다!</p>';
    }

    // Fillers
    const fillerContainer = document.getElementById('fb-fillers-tags');
    fillerContainer.innerHTML = '';
    if (result.fillerSuggestions && result.fillerSuggestions.length > 0) {
      result.fillerSuggestions.forEach(f => {
        const span = document.createElement('span');
        span.className = "text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-200 dark:border-indigo-800";
        span.innerText = `"${f}"`;
        fillerContainer.appendChild(span);
      });
    }

    // Upgraded Model answer
    document.getElementById('model-answer-im').innerText = result.upgradedModelAnswer;
  }

  // --- Survey UI & Logic ---
  renderSurveyList() {
    const container = document.getElementById('survey-checkbox-list');
    if (!container) return;

    container.innerHTML = '';
    SURVEY_OPTIONS.hobbies.forEach(item => {
      const isChecked = this.survey[item.topic] !== undefined ? this.survey[item.topic] : item.checked;
      const div = document.createElement('label');
      div.className = `flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
        isChecked 
          ? 'bg-indigo-50/70 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-700' 
          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
      }`;
      div.innerHTML = `
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="survey-checkbox w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" 
            data-topic="${item.topic}" ${isChecked ? 'checked' : ''}>
          <div>
            <span class="font-medium text-slate-800 dark:text-slate-200 text-sm">${item.name}</span>
            <span class="text-[11px] text-slate-400 ml-1.5">[${item.category}]</span>
          </div>
        </div>
        ${item.golden ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold">황금추천</span>' : ''}
      `;

      div.querySelector('input').addEventListener('change', (e) => {
        this.survey[item.topic] = e.target.checked;
        this.saveSurvey();
        this.renderSurveyList();
        this.updateSurveyCounter();
      });

      container.appendChild(div);
    });

    this.updateSurveyCounter();
  }

  applyGoldenSurvey() {
    SURVEY_OPTIONS.hobbies.forEach(h => {
      this.survey[h.topic] = h.golden;
    });
    this.saveSurvey();
    this.renderSurveyList();
    alert("오픽 강사 추천 '황금 12개 서베이 조합'이 적용되었습니다!");
  }

  updateSurveyCounter() {
    const selectedCount = Object.values(this.survey).filter(Boolean).length;
    const badge = document.getElementById('survey-count-badge');
    if (badge) {
      badge.innerText = `${selectedCount}개 선택됨 (최소 12개 권장)`;
      badge.className = selectedCount >= 12 
        ? "text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
        : "text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    }
  }

  // --- History UI ---
  renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;

    if (this.history.length === 0) {
      list.innerHTML = `
        <div class="text-center py-12 text-slate-400">
          <p class="text-4xl mb-2">📖</p>
          <p class="text-sm">아직 저장된 학습 기록이 없습니다.<br>랜덤 질문에 답변하고 AI 피드백을 받아보세요!</p>
        </div>`;
      return;
    }

    list.innerHTML = this.history.map(item => `
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-xs px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold">${item.topicName}</span>
            <span class="text-xs text-slate-400">${item.date}</span>
          </div>
          <span class="text-xs font-black px-2.5 py-1 rounded-lg ${
            item.grade?.startsWith('IM') ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
          }">${item.grade || 'IM'}</span>
        </div>
        <p class="text-xs font-medium text-slate-700 dark:text-slate-300">Q: ${item.questionEn}</p>
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-400">
          <p class="font-semibold text-slate-500 mb-0.5">내 답변:</p>
          <p class="italic">"${item.userAnswer}"</p>
        </div>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 mt-1">💡 ${item.feedback?.overallSummary || '학습 완료'}</p>
      </div>
    `).join('');
  }

  // --- UI Event Listeners ---
  setupEventListeners() {
    // Mode Navigation Tabs
    document.querySelectorAll('[data-nav-mode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-nav-mode');
        this.switchMode(mode);
      });
    });

    // Audio Question Play
    document.getElementById('btn-play-question')?.addEventListener('click', () => {
      this.speakQuestion(false);
    });

    // Audio Question Replay (1 time limit)
    document.getElementById('btn-replay-question')?.addEventListener('click', () => {
      this.speakQuestion(true);
    });

    // Toggle Script Visibility
    document.getElementById('btn-toggle-script')?.addEventListener('click', () => {
      const box = document.getElementById('question-script-box');
      const btn = document.getElementById('btn-toggle-script');
      if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        btn.innerText = "질문 텍스트 숨기기 🙈";
      } else {
        box.classList.add('hidden');
        btn.innerText = "질문 텍스트 보기 👁️";
      }
    });

    // Next Random Question Button
    document.getElementById('btn-next-question')?.addEventListener('click', () => {
      if (this.currentMode === 'mock') {
        this.loadMockStep(this.mockState.currentIndex + 1);
      } else {
        this.loadNextRandomQuestion();
      }
    });

    // Record Toggle Button
    document.getElementById('btn-record-toggle')?.addEventListener('click', () => {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    });

    // Get Feedback Button
    document.getElementById('btn-get-feedback')?.addEventListener('click', () => {
      this.getAiFeedback();
    });

    // Read Model Answer Aloud
    document.getElementById('btn-speak-model-answer')?.addEventListener('click', () => {
      const text = document.getElementById('model-answer-im').innerText;
      if (!text || !this.synth) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.9;
      this.synth.speak(u);
    });

    // Input text change listener
    document.getElementById('user-answer-input')?.addEventListener('input', () => {
      this.updateWordCount();
    });

    // Survey Golden Combo Button
    document.getElementById('btn-golden-survey')?.addEventListener('click', () => {
      this.applyGoldenSurvey();
    });

    // Start Mock Test Button
    document.getElementById('btn-start-mock')?.addEventListener('click', () => {
      this.startMockTest();
    });

    // Settings Modal Open/Close
    const modal = document.getElementById('settings-modal');
    document.getElementById('btn-open-settings')?.addEventListener('click', () => {
      document.getElementById('setting-api-key').value = this.settings.apiKey || '';
      document.getElementById('setting-target-level').value = this.settings.targetLevel || 'IM';
      document.getElementById('setting-speech-rate').value = this.settings.speechRate || 1.0;
      modal.classList.remove('hidden');
    });

    document.getElementById('btn-close-settings')?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    document.getElementById('btn-save-settings')?.addEventListener('click', () => {
      this.settings.apiKey = document.getElementById('setting-api-key').value.trim();
      this.settings.targetLevel = document.getElementById('setting-target-level').value;
      this.settings.speechRate = parseFloat(document.getElementById('setting-speech-rate').value) || 1.0;
      this.settings.voiceName = document.getElementById('setting-voice')?.value || '';
      this.saveSettings();
      modal.classList.add('hidden');
      alert("설정이 저장되었습니다!");
    });
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.updateModeUI();

    // Mode-specific initialization
    if (mode === 'random') {
      document.getElementById('mock-header-banner')?.classList.add('hidden');
      document.getElementById('mode-practice-view')?.classList.remove('hidden');
      document.getElementById('mode-survey-view')?.classList.add('hidden');
      document.getElementById('mode-review-view')?.classList.add('hidden');
      if (!this.currentQuestion) this.loadNextRandomQuestion();
    } else if (mode === 'mock') {
      document.getElementById('mock-header-banner')?.classList.remove('hidden');
      document.getElementById('mode-practice-view')?.classList.remove('hidden');
      document.getElementById('mode-survey-view')?.classList.add('hidden');
      document.getElementById('mode-review-view')?.classList.add('hidden');
      if (!this.mockState.active) {
        this.startMockTest();
      }
    } else if (mode === 'survey') {
      document.getElementById('mode-practice-view')?.classList.add('hidden');
      document.getElementById('mode-survey-view')?.classList.remove('hidden');
      document.getElementById('mode-review-view')?.classList.add('hidden');
      this.renderSurveyList();
    } else if (mode === 'review') {
      document.getElementById('mode-practice-view')?.classList.add('hidden');
      document.getElementById('mode-survey-view')?.classList.add('hidden');
      document.getElementById('mode-review-view')?.classList.remove('hidden');
      this.renderHistory();
    }
  }

  updateModeUI() {
    document.querySelectorAll('[data-nav-mode]').forEach(btn => {
      const target = btn.getAttribute('data-nav-mode');
      if (target === this.currentMode) {
        btn.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
        btn.classList.add('text-slate-400');
      }
    });
  }
}

// Launch App when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.opicApp = new OpicApp();
});
