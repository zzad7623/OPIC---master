// OPIc Question Database
// Categories: self_intro, survey, unexpected, roleplay, advanced
// ComboTypes: description, routine, past_experience, roleplay_question, roleplay_problem, comparison, issue

const OPIC_QUESTIONS = [
  // 1. 자기소개 (고정 1번)
  {
    id: "q_intro_1",
    category: "self_intro",
    topic: "intro",
    topicName: "자기소개",
    comboType: "description",
    comboTypeName: "자기소개",
    questionEn: "Let's start the interview now. Tell me a little bit about yourself.",
    questionKo: "인터뷰를 시작하겠습니다. 본인에 대해 간단히 소개해 주세요.",
    tips: "이름, 나이, 사는 곳, 가족 구성원, 취미 1~2가지를 4~6문장으로 편안하게 말해보세요. 첫 문제이므로 긴장을 푸는 것이 중요합니다.",
    sampleAnswerIM: "Hello Ava, nice to meet you. My name is Taejun and I am in my twenties. I live in an apartment in Seoul with my family. In my free time, I really enjoy listening to music and going to the park near my house. It helps me relieve stress. I am so excited to take this test today. Thank you!",
    keywords: ["nice to meet you", "in my free time", "relieve stress", "apartment", "excited"],
    level: "IM"
  },

  // 2. 공원 가기 (Park)
  {
    id: "q_park_desc",
    category: "survey",
    topic: "park",
    topicName: "공원 가기",
    comboType: "description",
    comboTypeName: "장소 묘사",
    questionEn: "You indicated in the survey that you like to go to parks. Tell me about the park you frequently visit. Where is it located and what does it look like?",
    questionKo: "자주 가는 공원에 대해 말해주세요. 어디에 있고 어떻게 생겼나요?",
    tips: "집에서 얼마나 걸리는지, 공원에 무엇이 있는지(산책로, 나무, 호수, 벤치 등)를 현재 시제로 묘사하세요.",
    sampleAnswerIM: "Well, there is a big park called Hangang Park near my home. It takes about 10 minutes on foot. The park is very large and beautiful. There are many tall trees, green grass, and a nice walking trail. Also, there are many benches where people can sit and rest. I love the fresh air there.",
    keywords: ["near my home", "takes about 10 minutes", "walking trail", "fresh air", "benches"],
    level: "IM"
  },
  {
    id: "q_park_routine",
    category: "survey",
    topic: "park",
    topicName: "공원 가기",
    comboType: "routine",
    comboTypeName: "일상 루틴",
    questionEn: "What do you usually do when you go to the park? Who do you go with, and what is your typical routine there?",
    questionKo: "공원에 가면 보통 무엇을 하나요? 누구와 가고 어떤 활동을 하나요?",
    tips: "도착해서 산책하고, 음악 듣고, 커피 마시는 순서대로 First, Next, Finally 연결어를 써서 말해보세요.",
    sampleAnswerIM: "Usually, I go to the park on weekends with my best friend or sometimes alone. First, I put on comfortable running shoes and listen to music. Next, I walk along the trail for about an hour. After walking, I usually sit on a bench and drink an iced coffee. It is my favorite way to relax.",
    keywords: ["on weekends", "put on comfortable shoes", "walk along the trail", "iced coffee", "relax"],
    level: "IM"
  },
  {
    id: "q_park_exp",
    category: "survey",
    topic: "park",
    topicName: "공원 가기",
    comboType: "past_experience",
    comboTypeName: "과거 특별한 경험",
    questionEn: "Tell me about a memorable experience you had at a park. When was it, what happened, and why was it so memorable?",
    questionKo: "공원에서 있었던 기억에 남는 경험에 대해 말해주세요. 무슨 일이 있었나요?",
    tips: "★과거 시제 필수! (went, saw, was, lost, found 등 과거형 동사를 틀리지 않고 쓰는 것이 IM 핵심입니다.)",
    sampleAnswerIM: "I remember a memorable day last spring. I went to the park to ride a bicycle. While riding, I suddenly saw a cute puppy that was lost. It looked scared, so my friend and I stayed with the puppy. Fortunately, the owner came back and thanked us so much. I felt very happy and proud that day.",
    keywords: ["last spring", "went to the park", "cute puppy", "fortunately", "felt proud"],
    level: "IM"
  },

  // 3. 음악 감상 (Music)
  {
    id: "q_music_desc",
    category: "survey",
    topic: "music",
    topicName: "음악 감상",
    comboType: "description",
    comboTypeName: "선호 및 묘사",
    questionEn: "You mentioned that you enjoy listening to music. What kind of music do you like to listen to, and who is your favorite singer or musician?",
    questionKo: "어떤 종류의 음악을 좋아하고, 가장 좋아하는 가수나 음악가는 누구인가요?",
    tips: "좋아하는 장르(K-pop, Pop, Hip-hop 등)와 최애 가수, 그 가수를 좋아하는 이유(가창력, 멜로디)를 설명하세요.",
    sampleAnswerIM: "I really love listening to K-pop and acoustic music. My favorite singer is IU. She has an amazing and sweet voice. When I listen to her songs, I feel very peaceful and calm. Her lyrics are also very touching. I listen to her new album almost every single day.",
    keywords: ["acoustic music", "favorite singer", "sweet voice", "peaceful and calm", "touching lyrics"],
    level: "IM"
  },
  {
    id: "q_music_routine",
    category: "survey",
    topic: "music",
    topicName: "음악 감상",
    comboType: "routine",
    comboTypeName: "음악 듣는 루틴",
    questionEn: "When and where do you usually listen to music? What device do you use to listen to your favorite songs?",
    questionKo: "언제 어디서 음악을 주로 듣나요? 어떤 기기를 사용하나요?",
    tips: "통학/출퇴근길, 스마트폰, 무선 이어폰(AirPods/Buds) 등의 키워드를 활용해 일상적인 패턴을 설명하세요.",
    sampleAnswerIM: "I usually listen to music on my smartphone with wireless earbuds. I listen to music mostly when I commute on the subway or when I do house chores. Also, before going to sleep, I put on soft music to fall asleep easily. Music is always a big part of my daily life.",
    keywords: ["wireless earbuds", "on my smartphone", "commute on the subway", "house chores", "fall asleep"],
    level: "IM"
  },
  {
    id: "q_music_exp",
    category: "survey",
    topic: "music",
    topicName: "음악 감상",
    comboType: "past_experience",
    comboTypeName: "과거 음악 경험",
    questionEn: "Tell me about how you first became interested in music. When was it, and how did your taste in music change over time?",
    questionKo: "처음 음악에 관심을 갖게 된 계기와, 시간이 지나면서 음악 취향이 어떻게 바뀌었는지 말해주세요.",
    tips: "어릴 때 처음 들었던 음악과 지금 좋아하는 음악을 비교하며 과거 시제와 현재 시제를 섞어서 말해보세요.",
    sampleAnswerIM: "When I was in middle school, my older brother played rock music in his room. At first, I thought it was too noisy, but soon I fell in love with guitar sounds. As time went by, my taste changed. Now, I prefer quiet and soothing music like acoustic or indie pop.",
    keywords: ["when I was in middle school", "fell in love with", "as time went by", "my taste changed", "soothing music"],
    level: "IM"
  },

  // 4. 영화 보기 (Movies)
  {
    id: "q_movie_desc",
    category: "survey",
    topic: "movie",
    topicName: "영화 보기",
    comboType: "description",
    comboTypeName: "영화관 묘사",
    questionEn: "Tell me about the movie theater you usually go to. What does it look like, and what facilities does it have?",
    questionKo: "자주 가는 영화관에 대해 말해주세요. 어떻게 생겼고 어떤 시설이 있나요?",
    tips: "CGV나 롯데시네마 같은 영화관 이름, 매점(popcorn, soda), 편안한 좌석(comfortable seats)을 묘사하세요.",
    sampleAnswerIM: "I usually go to a CGV movie theater near my local subway station. It is located inside a big shopping mall. The theater is very modern and clean. The seats are very comfortable and spacious. In the lobby, there is a snack bar where they sell hot popcorn and soda. I really like this cinema.",
    keywords: ["near local subway station", "modern and clean", "comfortable seats", "snack bar", "popcorn and soda"],
    level: "IM"
  },
  {
    id: "q_movie_routine",
    category: "survey",
    topic: "movie",
    topicName: "영화 보기",
    comboType: "routine",
    comboTypeName: "영화 보기 전후 루틴",
    questionEn: "What do you do before and after going to the movies? Describe your typical day when you watch a movie.",
    questionKo: "영화를 보러 가기 전과 보고 난 후에 보통 무엇을 하나요?",
    tips: "모바일 앱으로 예매(booking tickets), 팝콘 구매, 영화 관람 후 맛있는 밥 먹기 순서로 진행하세요.",
    sampleAnswerIM: "Before going to the theater, I always book movie tickets using a smartphone app. Then I arrive 15 minutes early and buy some caramel popcorn. While watching the movie, I eat popcorn and focus on the screen. After the movie ends, I usually go to a nearby restaurant with my friends to have dinner and talk about the movie.",
    keywords: ["book movie tickets", "smartphone app", "caramel popcorn", "nearby restaurant", "talk about the movie"],
    level: "IM"
  },
  {
    id: "q_movie_exp",
    category: "survey",
    topic: "movie",
    topicName: "영화 보기",
    comboType: "past_experience",
    comboTypeName: "인상 깊었던 영화",
    questionEn: "Tell me about a movie that you saw recently. What was the movie about, who was the main character, and what made it so memorable?",
    questionKo: "최근에 본 영화에 대해 말해주세요. 줄거리가 무엇이었고 왜 기억에 남나요?",
    tips: "과거 시제(watched, was, played, enjoyed)를 지키며 감상평 위주로 쉽게 말하세요.",
    sampleAnswerIM: "A few weeks ago, I watched an animation movie called 'Inside Out 2'. The story was about emotions inside a teenager's brain. The main character had to deal with new feelings like Anxiety. It was very funny but also very touching. I almost cried at the ending. It was definitely the best movie I have seen this year.",
    keywords: ["a few weeks ago", "watched an animation", "touching story", "almost cried", "best movie"],
    level: "IM"
  },

  // 5. 집에서 보내는 휴가 (Vacation at Home)
  {
    id: "q_homevac_desc",
    category: "survey",
    topic: "home_vacation",
    topicName: "집에서 보내는 휴가",
    comboType: "description",
    comboTypeName: "집 휴가 활동 묘사",
    questionEn: "You indicated that you like to spend vacations at home. What do you typically do when you have a vacation at home?",
    questionKo: "집에서 휴가를 보낼 때 주로 무엇을 하시나요?",
    tips: "늦잠 자기(sleep in), 넷플릭스 몰아보기(binge-watch Netflix), 배달 음식 시키기(order delivery food) 등 일상 단어를 쓰세요.",
    sampleAnswerIM: "When I spend my vacation at home, I love to sleep in without an alarm. In the afternoon, I usually binge-watch popular Netflix dramas on my sofa. I also order delicious delivery food, like pizza or fried chicken. It is the best way to recharge my energy without any stress.",
    keywords: ["sleep in without an alarm", "binge-watch Netflix", "order delivery food", "recharge my energy", "without stress"],
    level: "IM"
  },
  {
    id: "q_homevac_exp",
    category: "survey",
    topic: "home_vacation",
    topicName: "집에서 보내는 휴가",
    comboType: "past_experience",
    comboTypeName: "기억에 남는 집 휴가",
    questionEn: "Tell me about the last vacation you spent at home. What did you do, and why was it memorable?",
    questionKo: "가장 최근에 집에서 보낸 휴가에 대해 말해주세요. 무엇을 했고 왜 기억에 남나요?",
    tips: "지난 휴가 때 집 청소를 하거나 맛있는 요리를 만들어 먹었던 경험을 과거 시제로 말하세요.",
    sampleAnswerIM: "During my last summer vacation, I decided to stay home for three days. On the first day, I did a deep clean of my room and rearranged my furniture. Then, I cooked pasta for myself and watched movies all day long. Even though I didn't travel anywhere, I felt completely refreshed and peaceful.",
    keywords: ["last summer vacation", "stayed home", "did a deep clean", "rearranged furniture", "felt refreshed"],
    level: "IM"
  },

  // 6. 조깅 / 걷기 (Jogging / Walking)
  {
    id: "q_jogging_desc",
    category: "survey",
    topic: "jogging",
    topicName: "조깅 / 걷기",
    comboType: "description",
    comboTypeName: "장소 및 복장 묘사",
    questionEn: "Where do you usually go jogging or walking? What do you wear, and what do you bring with you?",
    questionKo: "조깅이나 걷기를 하러 주로 어디로 가나요? 어떤 옷을 입고 무엇을 챙겨가나요?",
    tips: "공원 산책로, 편한 운동복(comfortable sportswear), 운동화(sneakers), 물병(water bottle) 등을 묘사하세요.",
    sampleAnswerIM: "I usually go jogging along the stream near my house. When I go jogging, I wear comfortable sportswear and lightweight running shoes. I also bring my smartphone and a small bottle of water. Listening to upbeat songs while running keeps me energized and active.",
    keywords: ["along the stream", "comfortable sportswear", "running shoes", "upbeat songs", "keeps me energized"],
    level: "IM"
  },
  {
    id: "q_jogging_routine",
    category: "survey",
    topic: "jogging",
    topicName: "조깅 / 걷기",
    comboType: "routine",
    comboTypeName: "조깅 루틴",
    questionEn: "How often do you go jogging, and what is your routine before and after exercising?",
    questionKo: "얼마나 자주 조깅을 하며, 운동 전후 루틴은 어떻게 되나요?",
    tips: "일주일에 몇 번(2 or 3 times a week), 준비 운동(stretching), 운동 후 샤워(taking a shower)를 이야기하세요.",
    sampleAnswerIM: "I try to go jogging about two or three times a week, usually in the evening. Before I run, I always stretch my legs and arms for five minutes to prevent injuries. Then I jog for about 30 minutes. After coming back home, I take a warm shower and drink cold water. It feels really great.",
    keywords: ["two or three times a week", "stretch my legs", "prevent injuries", "take a warm shower", "feels great"],
    level: "IM"
  },

  // 7. 국내 / 해외 여행 (Travel)
  {
    id: "q_travel_desc",
    category: "survey",
    topic: "travel_domestic",
    topicName: "국내/해외 여행",
    comboType: "description",
    comboTypeName: "좋아하는 여행지 묘사",
    questionEn: "Tell me about a city or country you like to visit for travel. Where is it, and what makes it special?",
    questionKo: "좋아하는 여행지에 대해 말해주세요. 어디에 있고 무엇이 특별한가요?",
    tips: "국내라면 '제주도(Jeju Island)', 해외라면 '일본(Japan)'이나 '베트남(Vietnam)'처럼 말하기 쉬운 곳을 고르세요.",
    sampleAnswerIM: "My absolute favorite travel destination is Jeju Island in Korea. It is a beautiful island famous for clean beaches and fresh seafood. The ocean water is crystal clear and the scenery is breathtaking. Also, there are many unique cafes with wonderful ocean views. I want to visit there again soon.",
    keywords: ["favorite travel destination", "Jeju Island", "fresh seafood", "crystal clear", "breathtaking scenery"],
    level: "IM"
  },
  {
    id: "q_travel_exp",
    category: "survey",
    topic: "travel_domestic",
    topicName: "국내/해외 여행",
    comboType: "past_experience",
    comboTypeName: "기억에 남는 여행",
    questionEn: "Tell me about a memorable trip you took in the past. Where did you go, who did you go with, and what was the most unforgettable moment?",
    questionKo: "과거에 다녀온 기억에 남는 여행에 대해 말해주세요. 가장 잊지 못할 순간은 무엇이었나요?",
    tips: "누구와 갔고(with my friends), 무엇을 먹었고(ate local food), 날씨가 좋았던 점을 과거 시제로 풀어내세요.",
    sampleAnswerIM: "Last winter, I traveled to Busan with my close friends for two days. We took the KTX bullet train in the morning. When we arrived, we walked along Haeundae Beach and ate delicious raw fish at a traditional market. The ocean night view was so stunning. We took a lot of photos together and made great memories.",
    keywords: ["last winter", "bullet train", "walked along the beach", "traditional market", "made great memories"],
    level: "IM"
  },

  // 8. 거주지 / 집 (Housing & Furniture)
  {
    id: "q_housing_desc",
    category: "survey",
    topic: "housing",
    topicName: "집 / 거주지",
    comboType: "description",
    comboTypeName: "집 내부 묘사",
    questionEn: "Tell me about your home. What does it look like, how many rooms are there, and which room is your favorite?",
    questionKo: "당신의 집에 대해 말해주세요. 어떻게 생겼고 방은 몇 개이며, 가장 좋아하는 방은 어디인가요?",
    tips: "방 개수(living room, kitchen, three bedrooms), 내 방이 가장 좋은 이유(cozy, comfortable bed)를 설명하세요.",
    sampleAnswerIM: "I live in a cozy apartment with my family. Our home has three bedrooms, a living room, a kitchen, and two bathrooms. Among all the rooms, my bedroom is my favorite place. It has a comfortable bed, a desk with my laptop, and a big window. I feel most comfortable and relaxed in my room.",
    keywords: ["cozy apartment", "three bedrooms", "living room", "favorite place", "comfortable and relaxed"],
    level: "IM"
  },

  // 9. 돌발 주제 - 은행 (Bank)
  {
    id: "q_bank_desc",
    category: "unexpected",
    topic: "bank",
    topicName: "은행 (돌발)",
    comboType: "description",
    comboTypeName: "은행 묘사 및 업무",
    questionEn: "Tell me about the bank you usually visit. Where is it located, and what does it look like inside?",
    questionKo: "자주 가는 은행에 대해 말해주세요. 어디에 있고 내부는 어떻게 생겼나요?",
    tips: "돌발 질문 당황하지 마세요! ATM 기기, 번호표(waiting ticket), 친절한 직원(bank teller) 등을 묘사하면 됩니다.",
    sampleAnswerIM: "I usually visit a bank called KB Bank near my subway station. Inside the bank, there are several ATM machines near the entrance. In the middle, there is a ticket machine where you take a waiting number. The bank tellers are very kind and professional. The interior is very clean and bright.",
    keywords: ["near subway station", "ATM machines", "waiting number", "bank tellers", "clean and bright"],
    level: "IM"
  },
  {
    id: "q_bank_routine",
    category: "unexpected",
    topic: "bank",
    topicName: "은행 (돌발)",
    comboType: "routine",
    comboTypeName: "은행 방문 루틴",
    questionEn: "Why do you usually go to the bank, and what do you do there? How has online banking changed your banking habits?",
    questionKo: "보통 어떤 일로 은행에 가며, 모바일 뱅킹으로 인해 은행 습관이 어떻게 바뀌었나요?",
    tips: "요즘은 스마트폰 뱅킹 앱을 많이 써서 직접 은행 갈 일이 적어졌다는 점을 말해보세요.",
    sampleAnswerIM: "To be honest, these days I rarely go to the physical bank because I use a mobile banking app. On my smartphone, I can transfer money and check my balance in just a few seconds. However, when I need to make a new credit card or open a special account, I visit the bank in person.",
    keywords: ["rarely go to the bank", "mobile banking app", "transfer money", "check my balance", "open a new account"],
    level: "IM"
  },

  // 10. 돌발 주제 - 재활용 (Recycling)
  {
    id: "q_recycle_desc",
    category: "unexpected",
    topic: "recycling",
    topicName: "재활용 (돌발)",
    comboType: "description",
    comboTypeName: "재활용 시스템 묘사",
    questionEn: "People in Korea practice recycling thoroughly. How do people in your neighborhood recycle trash? What are the rules?",
    questionKo: "한국의 재활용 방식에 대해 설명해주세요. 동네에서 쓰레기를 어떻게 분리배출하나요?",
    tips: "종이(paper), 플라스틱(plastic), 캔(cans), 음식물 쓰레기(food waste)로 구분해서 버린다고 말하세요.",
    sampleAnswerIM: "In Korea, we have a very strict recycling system. In my apartment complex, there is a designated recycling area. We separate trash into different bins: plastic, paper, glass, and cans. We also have special bags for food waste. It can be a little annoying, but it is very important for the environment.",
    keywords: ["strict recycling system", "designated area", "separate trash", "plastic and paper", "for the environment"],
    level: "IM"
  },
  {
    id: "q_recycle_exp",
    category: "unexpected",
    topic: "recycling",
    topicName: "재활용 (돌발)",
    comboType: "past_experience",
    comboTypeName: "재활용 관련 기억",
    questionEn: "Tell me about a memorable experience or a mistake you made while recycling trash in the past.",
    questionKo: "과거에 재활용을 하다가 겪었던 기억에 남는 일이나 실수에 대해 말해주세요.",
    tips: "재활용 날짜를 착각했거나, 비닐 봉투가 찢어져서 쓰레기를 쏟았던 에피소드를 과거 시제로 말하세요.",
    sampleAnswerIM: "I remember an embarrassing experience a few months ago. I was carrying a heavy garbage bag down to the recycling area. Suddenly, the plastic bag ripped, and soda cans and bottles spilled all over the ground! It was very noisy. Fortunately, a kind neighbor helped me pick them up. It was so chaotic.",
    keywords: ["a few months ago", "heavy garbage bag", "bag ripped", "spilled all over", "kind neighbor helped"],
    level: "IM"
  },

  // 11. 롤플레이 3단 콤보 (Roleplay 11, 12, 13)
  // 세트 1: MP3/전자기기 빌리기 & 고장
  {
    id: "q_rp_11_device",
    category: "roleplay",
    topic: "roleplay_device",
    topicName: "롤플레이 - 기기 빌리기",
    comboType: "roleplay_question",
    comboTypeName: "11번: 질문 3~4가지 하기",
    questionEn: "I'd like to give you a situation and ask you to act it out. You want to borrow an MP3 player or an electronic gadget from your friend for a trip. Call your friend and ask three or four questions about borrowing it.",
    questionKo: "[롤플레이 11번] 친구에게 여행 갈 때 쓸 전자제품을 빌리기 위해 전화로 3~4가지 질문을 하세요.",
    tips: "인사로 시작(Hey, what's up?) -> 용건 말하기 -> 질문 3가지(빌려줄 수 있어? 충전기는 있어? 언제 받을까?) -> 감사로 마무리.",
    sampleAnswerIM: "Hi Minho, it's Taejun! How are you doing? Listen, I'm going on a trip this weekend, and I know you have a good bluetooth speaker. Can I borrow it for just two days? By the way, how long does the battery last? And do you have the charger cable too? If it's okay, when can I come by your place to pick it up? Thanks a lot, talk to you soon!",
    keywords: ["it's Taejun", "can I borrow it", "how long does it last", "charger cable", "pick it up"],
    level: "IM"
  },
  {
    id: "q_rp_12_device",
    category: "roleplay",
    topic: "roleplay_device",
    topicName: "롤플레이 - 기기 고장 문제해결",
    comboType: "roleplay_problem",
    comboTypeName: "12번: 문제 해결 및 대안 2가지 제시",
    questionEn: "I'm sorry, but there is a problem you need to resolve. While using your friend's gadget, you accidentally broke it. Call your friend, explain what happened, and offer two or three alternatives to solve the problem.",
    questionKo: "[롤플레이 12번] 친구의 기기를 쓰다가 실수로 고장 냈습니다. 친구에게 전화해서 상황을 설명하고 2~3가지 해결 대안을 제시하세요.",
    tips: "사과하기(I am so sorry) -> 고장 난 경위(I accidentally dropped it) -> 대안 1(수리센터 맡길게) -> 대안 2(새것으로 사줄게) 제시.",
    sampleAnswerIM: "Hey Minho, it's Taejun again. I am so sorry, but I have some bad news. While I was packing my bag, I accidentally dropped your bluetooth speaker on the floor. Now it won't turn on. I feel terrible about this. Here is what I can do. First, I can take it to the official repair center tomorrow and pay for the repair. Or, if it cannot be fixed, I will buy you a brand new one right away. Which option do you prefer? I am really sorry once again.",
    keywords: ["bad news", "accidentally dropped it", "won't turn on", "repair center", "buy you a brand new one"],
    level: "IM"
  },
  {
    id: "q_rp_13_device",
    category: "roleplay",
    topic: "roleplay_device",
    topicName: "롤플레이 - 기기 고장 과거 경험",
    comboType: "past_experience",
    comboTypeName: "13번: 과거 유사 경험",
    questionEn: "Have you ever experienced a situation where a piece of equipment or an electronic device broke or did not work properly? What happened, and how did you resolve the situation?",
    questionKo: "[롤플레이 13번] 실제로 전자기기나 물건이 고장 나서 곤란했던 과거 경험을 말해주세요.",
    tips: "실제 스마트폰을 떨어뜨려 액정이 깨졌거나 노트북이 멈췄던 경험을 과거 시제로 편하게 말하세요.",
    sampleAnswerIM: "Yes, I had a similar experience last year with my smartphone. I was rushing to catch the bus, and I dropped my phone on the concrete sidewalk. The screen completely cracked, and the touch didn't work. I had to go to the customer service center right after work. It took two hours and cost a lot of money to replace the screen. Since then, I always use a thick phone case.",
    keywords: ["last year", "rushing to catch the bus", "screen cracked", "customer service center", "replace the screen"],
    level: "IM"
  },

  // 12. 롤플레이 세트 2: 영화 티켓 예매 문의 및 문제
  {
    id: "q_rp_11_ticket",
    category: "roleplay",
    topic: "roleplay_ticket",
    topicName: "롤플레이 - 티켓 예매",
    comboType: "roleplay_question",
    comboTypeName: "11번: 티켓 부스 질문하기",
    questionEn: "You want to buy movie tickets at the theater. Ask the staff three or four questions about the movie schedule, tickets, and available seats.",
    questionKo: "[롤플레이 11번] 영화관 매표소 직원에게 상영 시간, 티켓, 좌석에 대해 3~4가지 질문을 하세요.",
    tips: "정중한 영어 질문(Excuse me, Could you tell me...)을 연습하세요.",
    sampleAnswerIM: "Hello, excuse me. I'd like to buy two tickets for the movie 'Avatar'. Do you have any seats available for the 7 PM show? If not, what time is the next show? Also, are there good seats in the middle? Lastly, do you offer any student discounts or credit card discounts? Thank you for your help.",
    keywords: ["excuse me", "two tickets for", "seats available", "next show", "student discounts"],
    level: "IM"
  },
  {
    id: "q_rp_12_ticket",
    category: "roleplay",
    topic: "roleplay_ticket",
    topicName: "롤플레이 - 티켓 예매 취소/대안",
    comboType: "roleplay_problem",
    comboTypeName: "12번: 친구에게 약속 취소 대안 제시",
    questionEn: "You promised to watch a movie with your friend, but an urgent matter came up and you cannot make it. Call your friend, apologize, and offer two alternative plans.",
    questionKo: "[롤플레이 12번] 친구와 영화 보기로 했는데 급한 일이 생겼습니다. 친구에게 사과하고 대안 2가지를 제시하세요.",
    tips: "솔직한 사과(I'm so sorry, something urgent came up) -> 대안 1(내일이나 주말에 보자) -> 대안 2(내가 밥 살게) 제시.",
    sampleAnswerIM: "Hey Sarah, I am so sorry, but I don't think I can make it to the movie tonight. A sudden family matter came up and I have to go home right now. I feel so bad because we planned this a week ago. How about we go watch the movie this Saturday afternoon instead? I will buy the tickets and delicious dinner for you. Let me know if that works for you. I'm really sorry!",
    keywords: ["don't think I can make it", "sudden family matter", "feel so bad", "this Saturday instead", "buy dinner for you"],
    level: "IM"
  },

  // 13. 14~15번 심화 문제 (Comparison & Issue)
  {
    id: "q_adv_14_music_compare",
    category: "advanced",
    topic: "music",
    topicName: "음악 기기 비교 (14번)",
    comboType: "comparison",
    comboTypeName: "14번: 과거와 현재 비교",
    questionEn: "How has the way people listen to music changed compared to the past? Compare the music devices and music services people used in the past with what they use today.",
    questionKo: "[14번 심화] 과거와 현재 음악을 듣는 방식의 변화를 비교해주세요.",
    tips: "과거(In the past, people used CD players or MP3 players) vs 현재(Today, everyone uses smartphones and streaming services)를 대조하세요.",
    sampleAnswerIM: "In the past, people listened to music using CD players or MP3 players. We had to download MP3 files to our computers and transfer them to our devices. But today, technology has changed a lot. We just use smartphones and music streaming apps like Spotify or YouTube Music. We can listen to millions of songs anytime, anywhere with internet. It is much more convenient than before.",
    keywords: ["in the past", "download MP3 files", "streaming apps", "anytime anywhere", "much more convenient"],
    level: "IM"
  },
  {
    id: "q_adv_15_tech_issue",
    category: "advanced",
    topic: "technology",
    topicName: "스마트폰 이슈 (15번)",
    comboType: "issue",
    comboTypeName: "15번: 최신 이슈 및 견해",
    questionEn: "Smartphones have become an essential part of our daily lives, but they also cause some problems. What are some of the current issues or concerns related to smartphone usage today?",
    questionKo: "[15번 심화] 스마트폰 사용과 관련된 사회적 문제나 우려 사항은 무엇인가요?",
    tips: "스마트폰 중독(smartphone addiction), 시력 저하, 대화 부족(lack of face-to-face communication) 등 쉬운 문제점을 언급하세요.",
    sampleAnswerIM: "Nowadays, smartphones are very useful, but they also cause some serious issues. The biggest problem is smartphone addiction. Many people, especially young students, spend too much time on social media and games. Because of this, people talk less face-to-face with their families and friends. Also, looking at screens for too long hurts our eyes and sleep quality. I think we need to balance our screen time.",
    keywords: ["smartphone addiction", "spend too much time", "face-to-face communication", "sleep quality", "balance screen time"],
    level: "IM"
  },

  // ========================================================
  // [실전 기출 15문항 세트 (오픽만수르 최신 기출 콤보)]
  // ========================================================
  // 1-1. 술집 (Bar) 묘사 [현재 시제]
  {
    id: "q_real_02_bar_desc",
    category: "survey",
    topic: "bar",
    topicName: "술집 / 바 (1-1)",
    comboType: "description",
    comboTypeName: "1-1: 장소 및 분위기 묘사 [현재 시제]",
    questionEn: "I'd like to know about the bar you often go to. Where is your favorite bar? What does it look like? Please describe everything about that bar in detail.",
    questionKo: "당신이 자주 가는 술집에 대해 알고 싶습니다. 가장 좋아하는 술집은 어디에 있나요? 어떻게 생겼나요? 그 술집에 대해 자세히 설명해주세요.",
    tips: "★[1-1 현재 시제] 위치(near my station), 분위기(cozy and warm), 조명(dim lighting), 파는 안주/맥주(craft beer, nachos)를 현재 시제로 묘사하세요.",
    sampleAnswerIM: "Well, my favorite bar is a small pub called 'Craft Beer House' near my subway station. It takes only 5 minutes on foot from my home. The interior is very cozy with warm wooden tables and dim lighting. They play soft indie music in the background, so it is a great place to chat with friends. They serve various kinds of draft beers and delicious French fries. I really love the relaxing vibe there.",
    keywords: ["favorite bar", "craft beer", "dim lighting", "wooden tables", "relaxing vibe"],
    level: "IM"
  },
  // 1-2. 술집 과거-현재 변화 비교 [현재 시제]
  {
    id: "q_real_03_bar_change",
    category: "survey",
    topic: "bar",
    topicName: "술집 / 바 (1-2)",
    comboType: "routine",
    comboTypeName: "1-2: 과거와 현재 변화 비교 [현재 시제]",
    questionEn: "How have bars changed over the last several years? What do you think about the changes? How were they in the past, and what about now? What are the differences and the similarities? Tell me all the changes in detail.",
    questionKo: "술집들은 최근 몇 년간 어떻게 변화했나요? 그 변화에 대해 어떻게 생각하시나요? 과거와 현재의 차이점과 공통점을 자세히 말해주세요.",
    tips: "★[1-2 현재 시제 위주] 과거(시끄럽고 담배 피우고 과음) vs 현재(분위기 좋은 곳에서 가볍게 하이볼/수제맥주 즐김)를 대조하세요.",
    sampleAnswerIM: "In the past, bars were very noisy and crowded, and people usually drank heavy liquor until very late at night. Also, people used to smoke inside bars. But now, things have changed completely. Nowadays, all bars are non-smoking and much cleaner. People prefer quiet and trendy bars where they can enjoy light drinks like highballs or craft beer with good food. I think this change is much healthier and more enjoyable.",
    keywords: ["in the past", "noisy and crowded", "non-smoking", "light drinks", "highballs", "much healthier"],
    level: "IM"
  },
  // 1-3. 술집 기억에 남는 사건 [★과거 시제 필수]
  {
    id: "q_real_04_bar_incident",
    category: "survey",
    topic: "bar",
    topicName: "술집 / 바 (1-3)",
    comboType: "past_experience",
    comboTypeName: "1-3: 기억에 남는 사건 [★과거 시제]",
    questionEn: "Tell me about a memorable incident that happened at a bar. What exactly happened, and why was it so special? How did you deal with it? Please tell me everything about that incident in detail.",
    questionKo: "술집에서 겪은 기억에 남는 사건에 대해 말해주세요. 정확히 무슨 일이 일어났고, 왜 특별했나요? 그 사건에 대해 자세히 말해주세요.",
    tips: "★[1-3 과거 시제 스위치 ON!] 생일 축하 깜짝 파티 또는 맥주를 쏟았던 해프닝을 과거 동사(went, celebrated, spilled, laughed)로 말하세요.",
    sampleAnswerIM: "I remember a memorable incident at a bar last year on my birthday. I went to a pub with three of my best friends. Suddenly, the pub owner turned off the main lights and played a happy birthday song loudly! My friends brought out a chocolate cake with candles. All the customers in the bar clapped and cheered for me. I was so surprised and touched. We shared the cake with other people. It was an unforgettable night.",
    keywords: ["last year on my birthday", "turned off the lights", "birthday song", "clapped and cheered", "unforgettable night"],
    level: "IM"
  },

  // 2-1. 대중교통 소개 및 선호 [현재 시제]
  {
    id: "q_real_05_transit_desc",
    category: "unexpected",
    topic: "transportation",
    topicName: "대중교통 (2-1)",
    comboType: "description",
    comboTypeName: "2-1: 대중교통 현황 및 선호 [현재 시제]",
    questionEn: "I would like to know about public transportation in your country. What kind of transportation do people use to get around? Do you use public transportation, or do you drive? Which one do you prefer to take and why?",
    questionKo: "당신 나라의 대중교통에 대해 알고 싶습니다. 사람들은 어떤 교통수단을 이용하나요? 당신은 대중교통을 타나요, 운전을 하나요? 어느 쪽을 선호하고 왜 그런가요?",
    tips: "★[2-1 현재 시제] 지하철(subway)과 버스(bus), 지하철을 선호하는 이유(on time, no traffic jams, cheap)를 현재 시제로 말하세요.",
    sampleAnswerIM: "In Korea, we have a very convenient public transportation system. Most people use subways and city buses every day. Between driving and taking public transit, I personally prefer taking the subway. It is always on time and there are never any traffic jams. Also, the trains are air-conditioned, clean, and very cheap. Driving a car in Seoul is too stressful because of heavy traffic and parking problems.",
    keywords: ["convenient public transportation", "subway and city bus", "always on time", "no traffic jams", "air-conditioned"],
    level: "IM"
  },
  // 2-2. 평소와 다른 교통수단 이용 경험 [과거 시제]
  {
    id: "q_real_06_transit_diff",
    category: "unexpected",
    topic: "transportation",
    topicName: "대중교통 (2-2)",
    comboType: "past_experience",
    comboTypeName: "2-2: 색다른 교통수단 이용 경험 [과거 시제]",
    questionEn: "When was the last time you took a different type of transportation than usual? What happened? Where were you going? Tell me about the memorable experience in detail.",
    questionKo: "마지막으로 평소에 타던 것과 다른 대중교통을 이용했던 것이 언제인가요? 무슨 일이 있었고 어디로 가고 있었나요?",
    tips: "★[2-2 과거 시제] KTX 고속열차나 공항철도, 또는 택시를 급하게 탔던 경험을 과거 시제로 말하세요.",
    sampleAnswerIM: "Usually, I only take the subway, but a few months ago, I took the KTX bullet train to Busan for a weekend trip. It was my very first time taking the bullet train. It was super fast, taking only two and a half hours from Seoul to Busan. The seats were very wide and comfortable, and I bought some snacks on the train. Looking at the beautiful countryside scenery outside the window was fantastic.",
    keywords: ["a few months ago", "bullet train", "weekend trip", "super fast", "comfortable seats"],
    level: "IM"
  },
  // 2-3. 대중교통 문제 및 해결 [과거 시제]
  {
    id: "q_real_07_transit_prob",
    category: "unexpected",
    topic: "transportation",
    topicName: "대중교통 (2-3)",
    comboType: "past_experience",
    comboTypeName: "2-3: 교통 문제 및 대처 [과거 시제]",
    questionEn: "Sometimes, riding the subway or bus can be uncomfortable. Have you ever had any problems related to transportation? Were there traffic jams, or did something uncomfortable happen? What was the problem, and How did you deal with the situation?",
    questionKo: "교통수단과 관련하여 겪은 어떤 문제가 있었나요? 길이 막혔거나 불편한 일이 있었나요? 문제가 무엇이었고 어떻게 해결했나요?",
    tips: "★[2-3 과거 시제] 폭설이나 사고로 지하철이 지연되었거나 극심한 버스 교통체증 때문에 지각할 뻔했던 경험을 과거 시제로 말하세요.",
    sampleAnswerIM: "Yes, I had a very stressful experience last winter. It was snowing heavily in the morning. I got on the city bus to go to an important job interview, but the bus was completely stuck in terrible traffic. The bus didn't move at all for 30 minutes! I was so anxious. So I quickly got off the bus and ran to the nearest subway station. Fortunately, the subway ran normally, and I arrived just 5 minutes before the interview. It was such a close call.",
    keywords: ["snowing heavily", "stuck in terrible traffic", "so anxious", "got off the bus", "nearest subway station", "close call"],
    level: "IM"
  },

  // 3-2. 라이브 음악 / 콘서트 경험 [과거 시제] (8번과 10번은 기존 음악 콤보와 연결)
  {
    id: "q_real_09_music_live",
    category: "survey",
    topic: "music",
    topicName: "음악 감상 (3-2)",
    comboType: "past_experience",
    comboTypeName: "3-2: 라이브 음악/콘서트 경험 [과거 시제]",
    questionEn: "Tell me about a particular time when you went to listen to some live music. Did you go to concerts or a live café? What did you do there, and what happened? what made this experience memorable?",
    questionKo: "라이브 음악을 들으러 갔던 특정한 때에 대해 말해주세요. 콘서트나 라이브 카페에 갔었나요? 무슨 일이 있었고 왜 기억에 남나요?",
    tips: "★[3-2 과거 시제] 콘서트나 버스킹 공연을 보며 떼창하고 열광했던 기억을 과거형 동사로 말하세요.",
    sampleAnswerIM: "Last summer, I went to an outdoor music festival with my friends. It was held at an Olympic park. Many famous indie bands and K-pop singers performed on stage. We stood in the front row, singing along to our favorite songs and jumping together. The live band sound was so powerful and energetic. Even though it was hot and my legs hurt, I felt completely alive and happy. It was the best concert of my life.",
    keywords: ["last summer", "outdoor music festival", "performed on stage", "singing along", "powerful and energetic"],
    level: "IM"
  },

  // 4-1. 롤플레이 11번: 렌터카 문의 질문하기 [현재 시제]
  {
    id: "q_real_11_rp_car_ask",
    category: "roleplay",
    topic: "roleplay_car",
    topicName: "롤플레이 렌터카 (11번)",
    comboType: "roleplay_question",
    comboTypeName: "11번: 렌터카 직원에게 질문 3~4가지",
    questionEn: "I'd like to give you a situation and ask you to act it out. You are on vacation in New York City. Now you are at a car rental company. You need to rent a car, and you are speaking to the person who works at the car rental company. Ask him 3 or 4 questions about renting a car.",
    questionKo: "[롤플레이 11번] 뉴욕 여행 중 렌터카 회사에 있습니다. 직원에게 자동차 렌트에 대해 3~4가지 질문을 하세요.",
    tips: "친절한 인사 -> 렌트 희망 차종 -> 비용 -> 보험 -> 네비게이션 질문 순서로 3~4가지 질문하세요.",
    sampleAnswerIM: "Hello there, good morning! I'd like to rent a car for three days while staying in New York. First, do you have any compact cars or mid-size sedans available right now? How much is the daily rental rate including full insurance? Also, does the car come with a GPS navigation system? Lastly, what time do I need to return the car on Sunday? Thank you for your help!",
    keywords: ["rent a car for three days", "compact car", "daily rental rate", "full insurance", "GPS navigation"],
    level: "IM"
  },
  // 4-2. 롤플레이 12번: 면허증 문제 대안 제시 [현재 시제]
  {
    id: "q_real_12_rp_car_prob",
    category: "roleplay",
    topic: "roleplay_car",
    topicName: "롤플레이 렌터카 (12번)",
    comboType: "roleplay_problem",
    comboTypeName: "12번: 면허증 문제 설명 및 대안 2~3가지",
    questionEn: "I'm sorry, but there is a problem that you need to resolve. I'm not sure if you are allowed to rent a car because you don't have an international driver's license or an American driver's license. Please explain what your license says and suggest 2 or 3 alternatives to rent a car.",
    questionKo: "[롤플레이 12번] 국제면허증이 없어 렌트가 불투명합니다. 면허증에 대해 설명하고 2~3가지 해결 대안을 제시하세요.",
    tips: "면허증 설명(영문 면허증임을 설명) -> 대안 1(국제면허증 가진 친구를 주운전자로 등록) -> 대안 2(여권/보증금 추가 제출) 제시.",
    sampleAnswerIM: "Oh, I see what the problem is. Actually, my Korean driver's license has English on the back, which is officially accepted in many countries. But if that is not allowed here, here are a few alternatives. First, my travel friend has an international driver's license. Can we register him as the primary driver instead? Or second, can I show you my passport and pay a deposit with my credit card to guarantee? Please let me know what works best for you.",
    keywords: ["has English on the back", "officially accepted", "register friend as driver", "show passport", "pay a deposit"],
    level: "IM"
  },
  // 4-3. 롤플레이 13번: 과거 렌터카 곤란했던 경험 [★과거 시제 필수]
  {
    id: "q_real_13_rp_car_exp",
    category: "roleplay",
    topic: "roleplay_car",
    topicName: "롤플레이 렌터카 (13번)",
    comboType: "past_experience",
    comboTypeName: "13번: 렌터카 과거 곤란했던 경험 [★과거 시제]",
    questionEn: "That's the end of the situation. Have you ever rented a car for your traveling? What was the reason you rented a car? Did something crazy or terrible happen? What happened, and how did you solve it? Why was the experience so memorable?",
    questionKo: "[롤플레이 13번] 여행 중 렌터카를 빌렸다가 곤란했거나 끔찍했던 과거 경험에 대해 말해주세요.",
    tips: "★[13번 과거 시제] 제주도나 여행지에서 타이어에 펑크가 났거나 시동이 안 걸렸던 에피소드를 과거 시제로 말하세요.",
    sampleAnswerIM: "Yes, I had a very scary experience when I rented a car in Jeju Island two years ago. I was driving along the coastal road at night. Suddenly, the car tire went flat! The car started shaking and I had to pull over immediately. It was pitch black outside. I called the rental car emergency service right away. Fortunately, an insurance mechanic arrived within 30 minutes and changed the flat tire with a spare tire. I was so relieved.",
    keywords: ["two years ago", "driving along coastal road", "tire went flat", "pulled over", "emergency service", "spare tire"],
    level: "IM"
  },

  // 5-1. 14번 심화: 세대별 인터넷 사용 비교
  {
    id: "q_real_14_internet_age",
    category: "advanced",
    topic: "internet",
    topicName: "인터넷 세대별 비교 (14번)",
    comboType: "comparison",
    comboTypeName: "14번: 연령대별 인터넷 사용 차이 비교",
    questionEn: "How is the way of using the internet different in different age groups? What does the younger group typically do on the internet, and how do the older people use the internet? Please discuss how they use the internet differently.",
    questionKo: "[14번 심화] 서로 다른 나이 그룹에서 인터넷을 사용하는 방법은 어떻게 다른가요? 젊은 세대와 나이 많은 사람들의 사용 차이를 말해주세요.",
    tips: "젊은 세대(SNS, 틱톡/유튜브 쇼츠, 온라인 게임, 웹툰) vs 어르신 세대(유튜브 뉴스, 카카오톡, 날씨 확인)로 명확히 나누어 비교하세요.",
    sampleAnswerIM: "There is a big difference in how different age groups use the internet. Young people use the internet mostly for social media, short-form videos like YouTube Shorts, and online gaming. They communicate through Instagram and watch streaming shows. On the other hand, older generations use the internet mainly for practical purposes. For example, my parents mainly read daily news, check the weather, and send messages on KakaoTalk. So younger people focus on entertainment, while older people focus on information.",
    keywords: ["big difference", "short-form videos", "social media", "older generations", "read daily news", "entertainment vs information"],
    level: "IM"
  },
  // 5-2. 15번 심화: 인터넷 관련 사회적 이슈 (보안, 개인정보)
  {
    id: "q_real_15_internet_issues",
    category: "advanced",
    topic: "internet",
    topicName: "인터넷 이슈 (15번)",
    comboType: "issue",
    comboTypeName: "15번: 인터넷 보안 및 개인정보 문제 이슈",
    questionEn: "Tell me some issues regarding the internet these days. For example, security problems, personal information, or related to society. How have these concerns changed over the years, and how do they affect people in your country?",
    questionKo: "[15번 심화] 요즘 인터넷과 관련한 보안 문제, 개인정보 유출 등 사회적 이슈에 대해 말해주세요.",
    tips: "보이스피싱(voice phishing), 개인정보 유출(leak of personal data), 가짜 뉴스(fake news)를 언급하며 주의가 필요하다고 마무리하세요.",
    sampleAnswerIM: "Nowadays, the biggest issue regarding the internet is cyber security and personal data leaks. Many people receive voice phishing scam messages pretending to be bank officers or delivery companies. If people click suspicious links, their personal information can be stolen. Also, fake news spreads so quickly on social media, confusing many citizens. Because of these problems, people are becoming more cautious and companies are strengthening their security systems.",
    keywords: ["cyber security", "personal data leaks", "phishing scam messages", "suspicious links", "fake news spreads", "more cautious"],
    level: "IM"
  }
];

// 오픽만수르 실전 15문항 기출 고정 세트 ID 리스트
const REAL_MANSUR_SET_IDS = [
  "q_intro_1",
  "q_real_02_bar_desc",
  "q_real_03_bar_change",
  "q_real_04_bar_incident",
  "q_real_05_transit_desc",
  "q_real_06_transit_diff",
  "q_real_07_transit_prob",
  "q_music_desc",
  "q_real_09_music_live",
  "q_music_exp",
  "q_real_11_rp_car_ask",
  "q_real_12_rp_car_prob",
  "q_real_13_rp_car_exp",
  "q_real_14_internet_age",
  "q_real_15_internet_issues"
];

// OPIc Background Survey Topics Definition
const SURVEY_OPTIONS = {
  status: [
    { id: "job_none", label: "일 경험 없음 (권장 ★)", checked: true, category: "job" },
    { id: "student_no", label: "학생 아님 (5년 이상 지남) (권장 ★)", checked: true, category: "student" }
  ],
  residence: [
    { id: "res_family", label: "가족과 함께 아파트 거주 (권장 ★)", checked: true, category: "housing" },
    { id: "res_alone", label: "홀로 거주", checked: false, category: "housing" }
  ],
  // 황금 12개 취미/여가/운동/휴가
  hobbies: [
    { id: "opt_park", topic: "park", name: "공원 가기", category: "여가", golden: true, checked: true },
    { id: "opt_music", topic: "music", name: "음악 감상", category: "취미", golden: true, checked: true },
    { id: "opt_movie", topic: "movie", name: "영화 보기", category: "여가", golden: true, checked: true },
    { id: "opt_concert", topic: "concert", name: "콘서트 보기", category: "여가", golden: true, checked: true },
    { id: "opt_beach", topic: "beach", name: "해변 가기", category: "여가", golden: true, checked: true },
    { id: "opt_jogging", topic: "jogging", name: "조깅", category: "운동", golden: true, checked: true },
    { id: "opt_walking", topic: "walking", name: "걷기", category: "운동", golden: true, checked: true },
    { id: "opt_bicycle", topic: "bicycle", name: "자전거 타기", category: "운동", golden: true, checked: true },
    { id: "opt_no_exercise", topic: "no_exercise", name: "운동을 전혀 하지 않음", category: "운동", golden: true, checked: true },
    { id: "opt_home_vac", topic: "home_vacation", name: "집에서 보내는 휴가", category: "휴가", golden: true, checked: true },
    { id: "opt_travel_dom", topic: "travel_domestic", name: "국내 여행", category: "휴가", golden: true, checked: true },
    { id: "opt_travel_intl", topic: "travel_intl", name: "해외 여행", category: "휴가", golden: true, checked: true },
    // 추가 선택 가능한 기타 주제들
    { id: "opt_cafe", topic: "cafe", name: "카페 가기", category: "여가", golden: false, checked: false },
    { id: "opt_cooking", topic: "cooking", name: "요리하기", category: "취미", golden: false, checked: false },
    { id: "opt_camping", topic: "camping", name: "캠핑 가기", category: "여가", golden: false, checked: false },
    { id: "opt_fitness", topic: "fitness", name: "헬스 / 휘트니스", category: "운동", golden: false, checked: false }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { OPIC_QUESTIONS, SURVEY_OPTIONS, REAL_MANSUR_SET_IDS };
}
