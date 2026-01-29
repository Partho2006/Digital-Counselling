import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const isCrisisMessage = (message) => {
  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "self-harm",
    "hurt myself",
    "no reason to live"
  ];
  return crisisKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
};

const getSupportResponse = (message) => {
  const text = message.toLowerCase();

  // Engineering Student Support
  if (text.includes("engineering") && (text.includes("difficult") || text.includes("hard") || text.includes("tough") || text.includes("struggle"))) {
    return `Engineering is challenging, and it's completely normal to find it difficult. Many successful engineers felt the same way during their studies.

Focus on understanding concepts rather than memorizing. Form study groups, use YouTube tutorials, and don't hesitate to ask professors during office hours. Practice problems are your best friend.

Which engineering subject is giving you the most trouble right now?`;
  }

  if (text.includes("coding") || text.includes("programming") || text.includes("debug") || text.includes("code")) {
    return `Coding challenges are part of every programmer's journey. Debugging can be frustrating, but each bug you solve makes you better.

Break problems into smaller parts, use print statements to trace issues, read documentation carefully, and don't be afraid to look up solutions on Stack Overflow. Practice on platforms like LeetCode, HackerRank, or CodeChef.

What programming challenge are you currently facing?`;
  }

  if (text.includes("hackathon") || text.includes("coding competition") || text.includes("competitive programming")) {
    return `Hackathons and coding competitions are excellent for skill development and networking! They can feel intimidating at first, but everyone starts somewhere.

Popular platforms include:
• Hackathons: MLH (Major League Hacking), Devpost, HackerEarth
• Competitive Programming: Codeforces, CodeChef, AtCoder, LeetCode
• Company Competitions: Google Code Jam, Meta Hacker Cup, Microsoft Imagine Cup

Start with beginner-friendly events, team up with friends, and remember—learning matters more than winning.

Are you looking for hackathons to join or tips on how to participate?`;
  }

  if (text.includes("gate") || text.includes("competitive exam") || text.includes("entrance exam")) {
    return `Preparing for GATE or other competitive exams is a marathon, not a sprint. The pressure is real, but consistent preparation beats last-minute cramming.

Create a study schedule covering all subjects, solve previous year papers, take mock tests regularly, and identify weak areas to focus on. Join online communities for doubt-clearing and motivation.

How is your preparation going, and what's your biggest challenge right now?`;
  }

  if (text.includes("internship") && (text.includes("engineering") || text.includes("cs") || text.includes("tech"))) {
    return `Landing a tech internship is competitive but definitely achievable with the right approach.

Build projects and showcase them on GitHub, practice Data Structures & Algorithms on LeetCode/GeeksforGeeks, prepare for system design basics, polish your resume, and leverage LinkedIn and company career pages. Don't ignore smaller startups—they offer great learning experiences.

Start early (September-October for summer internships), apply widely, and don't get discouraged by rejections.

What stage are you at in your internship search?`;
  }

  if (text.includes("web development") || text.includes("frontend") || text.includes("backend") || text.includes("full stack")) {
    return `Web development is a fantastic field with endless opportunities! The learning curve can feel steep with so many technologies, but focus on fundamentals first.

Start with HTML/CSS/JavaScript basics, then pick either frontend (React, Vue, Angular) or backend (Node.js, Python Django/Flask, Java Spring). Build real projects—they matter more than tutorials.

Resources: FreeCodeCamp, The Odin Project, MDN Web Docs, and YouTube channels like Traversy Media.

What specific area of web development interests you most?`;
  }

  if (text.includes("data science") || text.includes("machine learning") || text.includes("artificial intelligence") || text.includes("ai/ml")) {
    return `Data Science and AI/ML are booming fields with incredible career potential. The math and statistics can be daunting, but take it step by step.

Learn Python first, then NumPy, Pandas, and Matplotlib. Move to machine learning with scikit-learn, then deep learning with TensorFlow/PyTorch. Kaggle competitions are perfect for practice.

Don't skip the fundamentals: statistics, linear algebra, and calculus are crucial for understanding how models work.

What aspect of data science/ML are you most interested in or struggling with?`;
  }

  if (text.includes("college project") || text.includes("final year project") || text.includes("major project")) {
    return `Final year/major projects can feel overwhelming, but they're great opportunities to showcase your skills and learn deeply.

Choose something you're genuinely interested in—passion makes the long hours worth it. Break it into phases: research, design, implementation, testing, and documentation. Set weekly milestones and track progress.

Your project doesn't need to revolutionize the world; it needs to demonstrate solid understanding and execution.

What kind of project are you thinking about or working on?`;
  }

  if (text.includes("open source") || text.includes("github") || text.includes("contribute")) {
    return `Contributing to open source is an excellent way to build skills, network, and strengthen your resume. It can feel intimidating to start, but the community is generally welcoming.

Look for "good first issue" or "beginner-friendly" labels on GitHub. Start small—fix documentation, add tests, or tackle minor bugs. Google Summer of Code (GSoC) and Outreachy are great programs for structured contributions.

Don't worry about making mistakes; that's part of learning!

Have you found any projects you'd like to contribute to?`;
  }

  // CS/Tech Career Paths
  if (text.includes("career path") && (text.includes("cs") || text.includes("computer") || text.includes("tech") || text.includes("engineering"))) {
    return `Tech careers offer diverse paths, and it's okay to feel uncertain about which direction to take.

Some popular paths:
• Software Development (Frontend/Backend/Full Stack)
• Data Science & Machine Learning
• DevOps & Cloud Engineering
• Cybersecurity
• Mobile Development
• Product Management (technical background helps)
• Quality Assurance & Testing
• Research & Academia

Try internships, personal projects, and online courses to explore different areas. Your first job doesn't lock you in—many people switch specializations.

Which areas interest you most, or what are your strengths?`;
  }

  if (text.includes("placement") || text.includes("campus recruitment") || text.includes("job interview")) {
    return `Campus placements and tech interviews are stressful, but preparation significantly improves your chances.

Focus on:
• Data Structures & Algorithms (practice 200+ LeetCode problems)
• System Design basics (for experienced roles)
• Object-Oriented Programming concepts
• DBMS, OS, and Computer Networks fundamentals
• Behavioral questions (STAR method)
• Mock interviews with peers

Companies look for problem-solving ability and communication, not just correct answers. Stay calm, think aloud during interviews, and ask clarifying questions.

How is your placement preparation going?`;
  }

  if (text.includes("startup") && (text.includes("join") || text.includes("work") || text.includes("career"))) {
    return `Joining a startup versus an established company is a common dilemma. Both have pros and cons.

Startups offer:
• Faster learning and broader responsibility
• Direct impact on product
• Potential equity/stock options
• Less bureaucracy

But also:
• Less job security
• Potentially longer hours
• Fewer resources/mentorship

Established companies offer:
• Better training programs
• Higher initial salary
• Brand value on resume
• More structured career path

Consider your risk tolerance, learning style, and career goals. There's no wrong choice—just different paths.

What matters most to you in your first job?`;
  }

  // Medical Student Support
  if (text.includes("medical school") || text.includes("mbbs") || text.includes("med student")) {
    return `Medical school is one of the most demanding academic journeys. The volume of information and pressure can feel crushing, but you're not alone.

Focus on understanding rather than rote memorization where possible. Use active recall, spaced repetition (Anki flashcards), and visual aids. Form study groups for difficult topics and practice clinical skills regularly.

Remember to take care of your mental and physical health—you can't pour from an empty cup.

Which year are you in, and what's your biggest challenge right now?`;
  }

  if (text.includes("neet") || text.includes("medical entrance") || text.includes("medical exam")) {
    return `NEET preparation is intense and requires dedication, but with the right strategy, you can succeed.

Create a realistic study plan covering Physics, Chemistry, and Biology. Solve previous year questions and take regular mock tests. Focus on NCERT thoroughly for Biology. Join a test series for time management practice.

Take care of your health—proper sleep, nutrition, and breaks are essential for retention and focus.

How many hours are you studying daily, and are you finding time for self-care?`;
  }

  if (text.includes("clinical") || text.includes("hospital") || text.includes("patient") || text.includes("rotation")) {
    return `Clinical rotations and patient interactions can be emotionally demanding. Dealing with suffering, making mistakes, or feeling incompetent is part of the learning process.

Be compassionate with yourself as you learn. Mistakes will happen—what matters is learning from them. Talk to senior residents and mentors about difficult cases. Practice self-care to avoid burnout.

Patient care is both a science and an art that develops with experience.

What aspect of clinical work is affecting you most?`;
  }

  if (text.includes("residency") || text.includes("specialization") || text.includes("medical field choice")) {
    return `Choosing a medical specialization is a significant decision that depends on your interests, lifestyle preferences, and strengths.

Consider:
• What patient populations interest you?
• Do you prefer procedures or patient interaction?
• What lifestyle do you envision (work-life balance)?
• Which rotations did you enjoy most?

Shadow doctors in fields you're considering, talk to residents about their experiences, and remember—there's no "best" specialty, only what's best for you.

Which specialties are you considering, or what are you looking for in a field?`;
  }

  if (text.includes("medical competition") || text.includes("case study") || text.includes("medical quiz")) {
    return `Medical competitions like case study presentations, quiz competitions, and research symposiums are great for learning and networking.

Look for:
• Case presentation competitions at medical conferences
• Research paper competitions (ICMR, medical college fests)
• Medical quiz competitions (national and international)
• Poster presentation opportunities
• Medical olympiads for undergraduates

These experiences strengthen your CV and help develop clinical reasoning and presentation skills.

Are you looking for competitions to participate in, or preparation tips?`;
  }

  // 10th & 12th Grade Student Support
  if (text.includes("10th") || text.includes("tenth") || text.includes("board exam") && !text.includes("12th")) {
    return `10th grade boards are your first major exam, and it's natural to feel pressure. Remember, these marks don't define your entire future.

Focus on understanding concepts, especially in Math and Science. Practice previous year papers, manage your time during exams, and don't neglect weaker subjects. Study consistently rather than cramming.

Take short breaks, sleep well, and eat properly—your brain needs fuel to perform!

Which subjects are you most worried about?`;
  }

  if (text.includes("12th") || text.includes("twelfth") || text.includes("board exam") && !text.includes("10th")) {
    return `12th boards along with competitive exam prep can feel overwhelming. You're juggling a lot, and that stress is valid.

Prioritize based on your goals. If preparing for JEE/NEET/other exams, allocate time wisely between boards and entrance prep. Boards need consistent effort but entrance exams need strategic practice.

Use PYQs (previous year questions), take mock tests, and identify weak areas. Don't sacrifice sleep and health—they're crucial for performance.

Are you preparing for any entrance exams alongside boards?`;
  }

  if (text.includes("stream") || text.includes("science or commerce") || text.includes("pcm or pcb") || text.includes("after 10th")) {
    return `Choosing your stream after 10th is an important decision, but it's not irreversible, so don't stress too much.

Consider:
• Science (PCM): Engineering, Architecture, Pure Sciences, Defense
• Science (PCB): Medical, Pharmacy, Biotechnology, Life Sciences
• Commerce: CA, Business, Economics, Finance, Management
• Humanities: Law, Psychology, Sociology, Journalism, Design

Choose based on your interests and strengths, not just what others expect. Talk to people in different fields, and remember—success is possible in any stream with dedication.

What are you interested in, or what are your strengths?`;
  }

  if (text.includes("jee") || text.includes("iit")) {
    return `JEE preparation is challenging and requires sustained effort and smart strategies. The competition is tough, but remember—many paths lead to success.

Focus on NCERT first, then reference books. Solve previous year JEE Main and Advanced papers. Take regular mock tests and analyze mistakes. Join test series for time management.

Balance is key—don't burn out. Many successful people didn't get into IITs but did well. Your worth isn't determined by one exam.

How is your preparation going, and what challenges are you facing?`;
  }

  if (text.includes("olympiad") || text.includes("ntse") || text.includes("kvpy")) {
    return `Olympiads and competitive exams like NTSE, KVPY (now INSPIRE) are excellent for developing problem-solving skills and standing out.

Popular science/math olympiads:
• National Science Olympiad (NSO)
• International Math Olympiad (IMO)
• NTSE (National Talent Search Exam)
• KVPY/INSPIRE for science students

These require conceptual clarity beyond school syllabus. Use specialized books, previous papers, and online resources. Don't let these stress you out—they're opportunities, not necessities.

Which olympiad are you interested in or preparing for?`;
  }

  if (text.includes("coaching") || text.includes("tuition") || text.includes("self study")) {
    return `The coaching vs. self-study debate is personal—there's no one-size-fits-all answer.

Coaching helps with:
• Structured study plan
• Regular tests and peer competition
• Expert doubt-solving
• Motivation and discipline

Self-study works if you're:
• Self-disciplined and consistent
• Good at planning and time management
• Using quality online resources (Khan Academy, YouTube, Unacademy)

Many students combine both. Evaluate what works for your learning style and resources.

Are you currently in coaching, self-studying, or trying to decide?`;
  }

  if (text.includes("career counseling") || text.includes("future") && (text.includes("confused") || text.includes("don't know"))) {
    return `Feeling confused about your future is completely normal, especially with so many options available today.

Instead of trying to have everything figured out now, explore:
• What subjects/topics genuinely interest you?
• What activities make you lose track of time?
• What problems do you want to solve?
• What kind of lifestyle do you envision?

Take career aptitude tests, talk to professionals in different fields, try internships or shadowing. Your first choice doesn't lock you in forever—many people change careers.

What fields are you considering, or what are your main interests?`;
  }

  if (text.includes("peer pressure") || text.includes("friends doing better") || text.includes("everyone else")) {
    return `Seeing friends excel or choose different paths can trigger comparison and pressure. Remember—everyone's journey is different.

Your timeline is your own. Someone choosing engineering doesn't mean you should. Someone scoring higher doesn't diminish your effort. Focus on your growth, not their highlight reel.

Social media makes comparison worse—limit exposure if needed. Celebrate friends' successes while working on your own goals at your own pace.

What specific situation is making you feel this pressure?`;
  }

  if (text.includes("scholarship") || text.includes("financial aid") || text.includes("education loan")) {
    return `Financial concerns about education are stressful but manageable with proper planning and information.

Explore options:
• Merit-based scholarships (institutional, government, private)
• Need-based financial aid
• Education loans (government schemes often have lower interest)
• Part-time work or freelancing (if feasible)
• Crowdfunding for exceptional cases

Many universities have financial aid offices—reach out and explain your situation. Don't let finances stop you from applying to good institutions.

What level of education are you seeking financial support for?`;
  }

  // Additional Engineering/Tech Topics
  if (text.includes("imposter syndrome") && (text.includes("engineer") || text.includes("developer") || text.includes("programmer"))) {
    return `Imposter syndrome is incredibly common in tech. Even experienced developers feel like they don't know enough—tech evolves so fast that no one knows everything.

Remember:
• Everyone starts somewhere—senior developers were once beginners
• Making mistakes is how you learn programming
• Asking questions is a sign of intelligence, not weakness
• Your unique perspective and problem-solving approach have value

Focus on your progress, not perfection. Build projects, contribute to discussions, and be kind to yourself.

What situations trigger your imposter feelings most?`;
  }

  if (text.includes("burnout") && (text.includes("engineer") || text.includes("developer") || text.includes("cs") || text.includes("tech"))) {
    return `Tech burnout is real, especially with tight deadlines, on-call duties, or constant learning pressure. Your mental health matters more than any project.

Signs of burnout: exhaustion, cynicism, reduced productivity, physical symptoms. If you're experiencing these, take them seriously.

Solutions:
• Set boundaries—no work after certain hours
• Take real breaks away from screens
• Exercise and maintain hobbies outside tech
• Talk to your manager about workload
• Consider therapy if feelings persist

You're a human being, not a code-producing machine.

How long have you been feeling burned out?`;
  }

  if (text.includes("switch") && (text.includes("engineer") || text.includes("cs")) && text.includes("career")) {
    return `Wanting to switch from engineering/CS to another field (or vice versa) is more common than you think. Your degree doesn't permanently define you.

Many engineers move into:
• Product Management
• Technical Writing
• Data Analysis
• Teaching/Training
• Business/Entrepreneurship
• Design (UI/UX)

And many from other fields transition into tech through bootcamps or self-learning.

Explore your interests through side projects, courses, or informational interviews. Career changes take planning but are definitely possible.

What field are you considering switching to or from?`;
  }

  if (text.includes("remote work") || text.includes("work from home") || text.includes("wfh")) {
    return `Remote work in tech has pros and cons. It's common now, but the isolation and blurred boundaries can affect mental health.

Benefits: No commute, flexibility, location independence
Challenges: Isolation, overworking, communication issues, home distractions

Create structure: dedicated workspace, regular hours, breaks, and social interaction (virtual or in-person). Join online communities to feel connected.

Is remote work affecting your productivity or mental health?`;
  }

  // General academic topics (original code)
  if (text.includes("exam") || text.includes("study") || text.includes("grades")) {
    return `It sounds like academic pressure is really on you right now. Seeing friends do better can feel discouraging, but remember: everyone has their own pace and strengths.

Try breaking tasks into small goals and celebrate progress. Comparing yourself constantly can be draining, focus on your growth instead. Even 20–30 minutes of focused study sessions with breaks can help a lot.

What's one small thing you could do today to feel more in control of your studies?`;
  }

  if (text.includes("anxiety") || text.includes("nervous") || text.includes("panic")) {
    return `Feeling anxious is completely normal, especially with exams, deadlines, or social situations. Your mind is reacting to stress, not failing you.

Grounding techniques can help. Try breathing in for 4 seconds, hold for 4, exhale for 6, and repeat a few times. Even a quick walk can calm your mind.

What tends to trigger your anxiety the most?`;
  }

  if (text.includes("lonely") || text.includes("alone") || text.includes("isolated")) {
    return `Feeling lonely at university happens to more people than you realize. It's okay to crave connection, and reaching out is brave.

Try joining clubs, online communities, or study groups—small steps make a difference. Even chatting with a classmate once can lift your mood.

Have you found anyone you feel comfortable talking to, even a little?`;
  }

  if (text.includes("overwhelmed") || text.includes("too much") || text.includes("pressure")) {
    return `Everything piling up can feel impossible. When life is overwhelming, it's easy to freeze.

Use the "one thing at a time" method: pick a small task and finish it. Break bigger projects into tiny chunks. Celebrate completing even tiny steps.

What's the heaviest thing on your plate right now?`;
  }

  if (text.includes("sleep") || text.includes("tired") || text.includes("exhausted") || text.includes("insomnia")) {
    return `Sleep is crucial for focus, mood, and stress. Feeling exhausted is your body asking for a break.

Try to wind down without screens 30–60 minutes before bed. Small changes, like a consistent bedtime or relaxing music, can help.

Has anything specific been keeping you awake at night?`;
  }

  if (text.includes("friend") || text.includes("relationship") || text.includes("roommate")) {
    return `Relationships can be rewarding and challenging. Misunderstandings happen to everyone.

Using "I feel…" statements instead of blaming helps a lot. Honest, calm communication often clears things up. Sometimes just listening to each other without arguing can work wonders.

Do you want to tell me what happened?`;
  }

  if (text.includes("future") || text.includes("career") || text.includes("job")) {
    return `The future can feel uncertain and scary. Everyone worries about career choices, but it's normal to take things step by step.

Exploring internships, clubs, and talking to mentors can give clarity. Remember, nobody has everything figured out at once.

Which part of your future feels the most unclear or stressful?`;
  }

  if (text.includes("comparison") || text.includes("better than me") || text.includes("friend did better")) {
    return `It's tough when someone else seems ahead. Keep in mind, their path is not yours. Focus on your journey, not just results.

You can identify what worked for them, but adapt it to your style. Small, consistent improvements beat temporary bursts.

What's one thing you could try this week to feel more confident about your progress?`;
  }

  if (text.includes("motivation") || text.includes("lazy") || text.includes("can't study") || text.includes("procrastinat")) {
    return `Losing motivation happens to everyone. Start with something tiny—reading one page, writing one sentence, or a 5-minute review.

Celebrate these small wins—they build momentum. Sometimes, removing distractions is more effective than forcing yourself.

What small task could you tackle first to get going?`;
  }

  if (text.includes("stress") || text.includes("burnout") || text.includes("pressure")) {
    return `Stress can feel crushing, but your body is just signaling it needs relief. Short breaks, walks, or listening to music can help reset your mind.

Remember, it's okay to take care of yourself. Balance is not lazy—it's necessary.

What's one small way you can take a break today?`;
  }

  if (text.includes("parents") || text.includes("family") || text.includes("mom") || text.includes("dad") || text.includes("home")) {
    return `Family dynamics can be complicated, especially when balancing their expectations with your own needs and goals. It's natural to feel caught between wanting to make them proud and living your own life.

Open conversations can help—try explaining your perspective calmly. Remember, it's okay to set boundaries while still showing respect and love.

What specific family situation has been weighing on you?`;
  }

  if (text.includes("depression") || text.includes("depressed") || text.includes("sad all the time") || text.includes("hopeless")) {
    return `Feeling persistently down or hopeless is really tough, and I'm glad you're reaching out. Depression is more common than you think, and it's not a sign of weakness.

Small steps matter—even getting out of bed or taking a shower counts as progress. Consider talking to a counselor or therapist; they can provide real support tailored to you.

How long have you been feeling this way?`;
  }

  if (text.includes("eating") || text.includes("appetite") || text.includes("food") || text.includes("weight")) {
    return `Changes in eating habits often reflect what's happening emotionally. Stress, anxiety, or depression can affect appetite in different ways.

Being gentle with yourself is important. Try to maintain regular meal times even if you're not very hungry, and focus on nutritious options when possible.

Have you noticed any patterns in when your appetite changes?`;
  }

  if (text.includes("homesick") || text.includes("miss home") || text.includes("miss family")) {
    return `Homesickness is a natural part of being away from familiar places and people. It shows you have meaningful connections, which is beautiful.

Creating small routines, decorating your space with familiar items, and scheduling regular calls home can help. Building a new support network takes time, so be patient with yourself.

What do you miss most about home?`;
  }

  if (text.includes("breakup") || text.includes("broke up") || text.includes("ex") || text.includes("heartbreak")) {
    return `Breakups can feel devastating, and it's completely okay to grieve the loss of the relationship. Healing isn't linear, and some days will be harder than others.

Focus on yourself—reconnect with hobbies, spend time with supportive friends, and allow yourself to feel without judgment. With time, the pain will ease.

How are you taking care of yourself right now?`;
  }

  if (text.includes("presentation") || text.includes("public speaking") || text.includes("speech")) {
    return `Public speaking anxiety is incredibly common—you're definitely not alone in feeling nervous about presentations.

Practice helps a lot. Rehearse multiple times, know your material well, and remember that small mistakes are normal. Deep breathing before you start can calm your nerves.

What aspect of presenting makes you most anxious?`;
  }

  if (text.includes("confidence") || text.includes("self-esteem") || text.includes("not good enough")) {
    return `Struggling with self-confidence is something many people face, especially in competitive environments like university. Your worth isn't determined by grades, achievements, or what others think.

Focus on your strengths and past successes, even small ones. Challenge negative self-talk by asking if you'd say those things to a friend.

What makes you feel most insecure or doubtful about yourself?`;
  }

  if (text.includes("money") || text.includes("financial") || text.includes("afford") || text.includes("budget")) {
    return `Financial stress is a real burden, especially as a student. It's hard to focus on studies when you're worried about making ends meet.

Look into campus resources—many universities offer emergency funds, food pantries, or financial counseling. Creating a simple budget can also help you feel more in control.

What's your biggest financial concern right now?`;
  }

  if (text.includes("group project") || text.includes("teamwork") || text.includes("group work")) {
    return `Group projects can be frustrating, especially when team members don't contribute equally or communication breaks down.

Try setting clear expectations early, dividing tasks fairly, and using shared documents to track progress. If issues persist, don't hesitate to talk to your professor.

What's the main challenge with your group right now?`;
  }

  if (text.includes("professor") || text.includes("teacher") || text.includes("instructor")) {
    return `Difficult interactions with professors can add unnecessary stress to your academic life. Remember, they're human too and usually want to help students succeed.

Attend office hours with specific questions, communicate respectfully via email, and don't be afraid to seek clarification. If there's a serious issue, academic advisors can help mediate.

What's been happening with your professor?`;
  }

  if (text.includes("time management") || text.includes("manage time") || text.includes("deadline")) {
    return `Time management is a skill that takes practice. With multiple classes, assignments, and personal life, it's easy to feel like there aren't enough hours in the day.

Try using a planner or digital calendar, prioritizing tasks by urgency and importance, and building in buffer time for unexpected things. The Pomodoro technique (25-minute focused sessions) works great too.

What's making time management most difficult for you right now?`;
  }

  if (text.includes("failure") || text.includes("failed") || text.includes("failing")) {
    return `Experiencing failure is painful, but it's also a universal part of learning and growth. Even the most successful people have faced setbacks—it's how you respond that matters.

Reflect on what went wrong without harsh self-judgment, identify lessons learned, and make a plan to move forward. One failure doesn't define you or your future.

What happened, and how are you feeling about it?`;
  }

  if (text.includes("concentration") || text.includes("focus") || text.includes("distract") || text.includes("attention")) {
    return `Difficulty concentrating is increasingly common with constant digital distractions and stress. Your brain might be overloaded or simply tired.

Try the Pomodoro technique, remove distractions (phone in another room, website blockers), and take regular breaks. Sometimes changing your study environment helps too.

When do you find it hardest to concentrate?`;
  }

  if (text.includes("doubt") || text.includes("imposter") || text.includes("don't belong")) {
    return `Imposter syndrome—feeling like you don't belong or aren't good enough despite evidence of your competence—is extremely common among students, especially high achievers.

Remind yourself that you earned your place. Keep a record of accomplishments and positive feedback. Talk to others; you'll find many feel the same way.

What situation makes you feel most like an imposter?`;
  }

  if (text.includes("drugs") || text.includes("alcohol") || text.includes("drinking") || text.includes("substance")) {
    return `Substance use can sometimes be a way of coping with stress, anxiety, or social pressure, but it can create more problems over time.

If you're concerned about your use or someone else's, campus health services offer confidential support. It's okay to seek help, and doing so is actually a sign of strength.

What's prompting you to think about this right now?`;
  }

  if (text.includes("exercise") || text.includes("gym") || text.includes("fitness") || text.includes("workout")) {
    return `Physical activity is one of the best things for mental health—it reduces stress, improves mood, and boosts energy. But starting or maintaining a routine can be tough.

You don't need intense workouts; even 15-20 minutes of walking, yoga, or dancing counts. Find something you enjoy, not just what you think you "should" do.

What's stopping you from being as active as you'd like?`;
  }

  if (text.includes("identity") || text.includes("who am i") || text.includes("finding myself")) {
    return `Questions about identity are a natural part of young adulthood. University is often when people explore different aspects of themselves—values, beliefs, interests, and relationships.

Give yourself permission to evolve and change. Try new experiences, reflect on what feels authentic, and know that figuring out who you are is a lifelong journey, not a destination.

What aspects of your identity are you exploring or questioning?`;
  }

  if (text.includes("bullying") || text.includes("bullied") || text.includes("harass")) {
    return `Being bullied or harassed is never okay, and it's not your fault. No one deserves to be treated that way, and you have every right to feel safe and respected.

Document incidents, reach out to campus authorities or counselors, and lean on supportive friends. Many universities have specific policies and resources for harassment.

What's been happening, and have you told anyone yet?`;
  }

  if (text.includes("change major") || text.includes("wrong major") || text.includes("switch major")) {
    return `Questioning your major is more common than you think. Many students change their path, and it's better to adjust now than stay in something that doesn't fit.

Talk to academic advisors, attend career counseling, and explore different fields through electives or internships. It's okay to not have everything figured out immediately.

What's making you reconsider your current major?`;
  }

  if (text.includes("discrimination") || text.includes("racism") || text.includes("sexism") || text.includes("prejudice")) {
    return `Experiencing discrimination is deeply painful and unjust. Your feelings of hurt, anger, or frustration are completely valid.

Many campuses have diversity offices, counseling services, and advocacy groups that can provide support. Document incidents and don't hesitate to report them through proper channels.

Would you like to share what happened?`;
  }

  if (text.includes("sexual") || text.includes("consent") || text.includes("assault") || text.includes("abuse")) {
    return `If you've experienced sexual harassment, assault, or any form of abuse, please know that it's not your fault and you deserve support.

Campus resources often include confidential counseling, advocacy services, and medical care. You can also contact local crisis centers or national hotlines for immediate help.

You don't have to go through this alone. Is there a trusted person you can talk to?`;
  }

  if (text.includes("transfer") || text.includes("switching school") || text.includes("different university")) {
    return `Thinking about transferring schools is a big decision and deserves careful consideration. Whether it's for academic, financial, social, or personal reasons, it's okay to explore this option.

Research transfer requirements, talk to advisors at both institutions, and weigh the pros and cons carefully. Make sure the grass is actually greener before making the move.

What's driving your desire to transfer?`;
  }

  if (text.includes("graduation") || text.includes("graduating") || text.includes("after college")) {
    return `Approaching graduation brings mixed emotions—excitement, anxiety, uncertainty. The transition from student life to the "real world" can feel overwhelming.

Remember that most people don't have everything figured out right after graduation. It's okay to take time to explore, and your first job doesn't define your entire career.

What aspect of post-graduation life worries you most?`;
  }

  if (text.includes("religion") || text.includes("faith") || text.includes("spiritual")) {
    return `Religious or spiritual questions and struggles are deeply personal. Whether you're questioning your faith, feeling disconnected, or seeking deeper meaning, these explorations are valid.

Many campuses have chaplains, religious organizations, or interfaith groups where you can discuss these questions safely. Take your time with these reflections.

What's been on your mind regarding faith or spirituality?`;
  }

  if (text.includes("lgbtq") || text.includes("sexuality") || text.includes("gender") || text.includes("coming out")) {
    return `Exploring your sexuality or gender identity is a personal journey that deserves respect and support. It's okay to take your time figuring things out.

Many campuses have LGBTQ+ resource centers, support groups, and allies. Connecting with others who share similar experiences can be incredibly helpful.

How are you feeling about this journey right now?`;
  }

  if (text.includes("pregnancy") || text.includes("pregnant") || text.includes("abortion")) {
    return `An unexpected pregnancy can feel overwhelming and scary. Whatever you're feeling—confused, anxious, or conflicted—is completely understandable.

Campus health services often provide confidential counseling to discuss all your options. You deserve accurate information and support, whatever you decide.

Do you have someone you trust to talk to about this?`;
  }

  if (text.includes("grief") || text.includes("death") || text.includes("died") || text.includes("loss")) {
    return `Losing someone you care about is one of life's most painful experiences. Grief doesn't follow a timeline or rules, and everyone processes loss differently.

Allow yourself to feel whatever comes up—sadness, anger, numbness, or even moments of normalcy. Campus counseling can provide grief support, and memorial services or support groups might help too.

Who did you lose, and how are you coping?`;
  }

  if (text.includes("add") || text.includes("adhd") || text.includes("attention deficit")) {
    return `If you're struggling with attention, focus, or executive function, you're not alone. ADHD and similar challenges are manageable with the right support.

Consider getting evaluated through campus disability services—accommodations like extended test time can make a real difference. Strategies like breaking tasks down, using timers, and structured routines also help.

What symptoms are you experiencing most?`;
  }

  if (text.includes("disability") || text.includes("accommodation") || text.includes("chronic illness")) {
    return `Managing a disability or chronic illness while in school adds extra challenges. It's important to advocate for the support and accommodations you need.

Register with disability services if you haven't already—they can arrange academic accommodations. Don't hesitate to communicate with professors about your needs.

What specific challenges are you facing with your disability or illness?`;
  }

  if (text.includes("social media") || text.includes("instagram") || text.includes("comparison online")) {
    return `Social media can be a highlight reel that makes everyone else's life look perfect while yours feels messy. The comparison trap is real and can seriously affect mental health.

Consider limiting your time on these platforms, unfollowing accounts that make you feel bad, and remembering that what you see online is curated, not reality.

How is social media affecting your wellbeing?`;
  }

  if (text.includes("purpose") || text.includes("meaning of life") || text.includes("why am i here")) {
    return `Questions about life's purpose and meaning are profound and universal. Feeling directionless or searching for purpose is a common part of the human experience, especially during transformative years.

Purpose often emerges through experiences, relationships, and values rather than being found all at once. Exploring different interests, volunteering, and reflecting on what matters to you can help.

What do you find most meaningful or fulfilling, even in small ways?`;
  }

  if (text.includes("creativity") || text.includes("creative block") || text.includes("artist")) {
    return `Creative blocks are frustrating but completely normal for artists, writers, and creators. Pressure to produce can paradoxically make it harder to create.

Try creating without expectations, switching mediums, or taking in others' work for inspiration. Sometimes stepping away and living life gives you material to work with.

What kind of creative work do you do, and when did you start feeling blocked?`;
  }

  if (text.includes("language barrier") || text.includes("english") || text.includes("international student")) {
    return `Being an international student or dealing with language barriers adds another layer of challenge to university life. It takes courage to study in a non-native language.

Most universities offer ESL support, conversation partners, and writing centers. Don't be afraid to ask for clarification or extra time. Your perspective as an international student is valuable.

What language challenges are you facing most?`;
  }

  if (text.includes("hate") || text.includes("everyone") || text.includes("people")) {
    return `Feeling irritated with or disconnected from people around you might signal that you're overwhelmed, burned out, or dealing with underlying stress or depression.

It's worth examining what's really bothering you. Sometimes we project internal struggles onto others. If these feelings persist, talking to a counselor might help you understand what's going on.

What's making you feel this way toward others?`;
  }

  if (text.includes("fake") || text.includes("pretend") || text.includes("mask")) {
    return `Feeling like you have to put on a mask or be someone you're not is exhausting. Authenticity matters for genuine connection and mental wellbeing.

Start small—share something real with someone you trust. You might be surprised how many people appreciate the real you more than the "perfect" version.

In what situations do you feel most like you're pretending?`;
  }

  if (text.includes("club") || text.includes("organization") || text.includes("extracurricular")) {
    return `Getting involved in clubs and organizations is a great way to meet people, develop skills, and find community. But it can also feel intimidating to join new groups.

Most clubs welcome new members at any time. Start with something aligned with your interests, attend a few meetings to get a feel, and don't pressure yourself to commit immediately.

What kind of activities interest you?`;
  }

  if (text.includes("summer") || text.includes("job search")) {
    return `Searching for internships or summer opportunities can be stressful and competitive. Rejection is part of the process and doesn't reflect your worth.

Start early, customize each application, leverage career services and alumni networks, and don't underestimate the value of smaller companies or non-traditional opportunities.

What field are you looking for opportunities in?`;
  }

  // Off-topic handler - must be checked last
  const supportKeywords = [
    "exam", "study", "grades", "anxiety", "nervous", "panic", "lonely", "alone", "isolated",
    "overwhelmed", "too much", "pressure", "sleep", "tired", "exhausted", "friend", "relationship",
    "roommate", "future", "career", "job", "comparison", "better than me", "motivation", "lazy",
    "stress", "burnout", "parents", "family", "depression", "sad", "eating", "homesick", "breakup",
    "presentation", "confidence", "self-esteem", "money", "financial", "group project", "professor",
    "time management", "deadline", "failure", "failed", "concentration", "focus", "doubt", "imposter",
    "drugs", "alcohol", "exercise", "identity", "bullying", "harass", "change major", "discrimination",
    "transfer", "graduation", "religion", "faith", "lgbtq", "sexuality", "gender", "pregnancy",
    "grief", "death", "adhd", "disability", "social media", "purpose", "meaning", "creativity",
    "language", "international", "hate", "fake", "club", "help", "worried", "scared",
    "afraid", "concern", "problem", "struggle", "difficult", "hard time", "upset", "frustrated",
    "angry", "confused", "lost", "stuck", "feel", "feeling", "emotion", "engineering", "medical",
    "coding", "programming", "hackathon", "neet", "jee", "board", "10th", "12th", "olympiad",
    "cs", "tech", "developer", "residency", "mbbs", "clinical", "stream", "pcm", "pcb"
  ];

  const hasRelevantKeyword = supportKeywords.some(keyword => text.includes(keyword));

  if (!hasRelevantKeyword) {
    return `I appreciate you reaching out, but I'm specifically designed to provide mental health and emotional support for students and young adults facing challenges.

I'm here to help with things like academic stress, anxiety, relationships, career worries, personal struggles, and general wellbeing concerns—especially for students in engineering, CS, medical fields, or high school.

Is there something on your mind that's been bothering you lately? I'm here to listen and support you.`;
  }

  return `Thanks for sharing that with me. Your feelings are valid, and it's okay to talk about them.

Sometimes just putting thoughts into words makes things lighter. You're not alone, and I'm here to listen.

Can you tell me a bit more about what's been on your mind lately?`;
};

app.post("/api/chat", (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required" });
    }

    const crisis = isCrisisMessage(message);
    let response = getSupportResponse(message);

    if (crisis) {
      response += `

🚨 IMPORTANT: You deserve immediate support.
Please consider reaching out right now:
• Call your local emergency number
• Contact a suicide prevention helpline in your country
• Reach out to a trusted person nearby
• Contact your campus counselling center

You are not alone, and help is available.`;
    }

    res.json({ response, isCrisis: crisis });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Unable to process your request at this time." });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Offline counselling server running" });
});

app.get("/api/suggestions", (req, res) => {
  res.json({
    suggestions: [
      // General
      "I'm stressed about exams",
      "I feel socially anxious",
      "I feel overwhelmed with coursework",
      "I'm feeling lonely at university",
      "I'm worried about my career",
      "I'm having trouble sleeping",
      "I'm dealing with relationship issues",
      
      // Engineering/CS
      "I'm struggling with engineering concepts",
      "I can't debug my code",
      "I want to participate in hackathons",
      "I'm preparing for GATE exam",
      "How do I find a tech internship?",
      "I'm interested in web development",
      "I want to learn data science and AI/ML",
      "I'm working on my final year project",
      "Should I contribute to open source?",
      "What tech career path should I choose?",
      "I'm nervous about campus placements",
      "Should I join a startup or big company?",
      "I feel like an imposter as a developer",
      "I'm experiencing burnout from coding",
      
      // Medical
      "Medical school is overwhelming",
      "I'm preparing for NEET",
      "Clinical rotations are emotionally draining",
      "I'm confused about which medical specialization to choose",
      "How can I participate in medical competitions?",
      
      // High School (10th & 12th)
      "I'm worried about my 10th board exams",
      "I'm stressed about 12th boards and JEE/NEET",
      "I don't know which stream to choose after 10th",
      "I'm preparing for JEE/IIT",
      "How do I prepare for olympiads like NTSE?",
      "Should I join coaching or self-study?",
      "I'm confused about my future career",
      "I'm feeling peer pressure about career choices",
      "I need information about scholarships",
      
      // Others
      "A friend did better than me in studies",
      "I feel unmotivated to study",
      "I'm feeling burned out",
      "I failed an important exam",
      "I can't concentrate on anything",
      "I feel like I don't belong here",
      "I'm having issues with my parents' expectations",
      "Social media is affecting my mental health"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🧠 Offline Counselling Server running on http://localhost:${PORT}`);
});